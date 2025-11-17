import { HttpMethods, HttpStatusCode } from '@/common/constants'
import { BASE_URL, TIME_OUT } from '../request/config'
import { usePlatform, useUniStorage } from '@/common/hooks'
import type { RequestConfig, Data, CustomConfig } from './type'

const { isProduction } = usePlatform()
const { getSync, setSync } = useUniStorage()

const defaultRequestConfig: RequestConfig = {
  baseURL: BASE_URL,
  timeout: TIME_OUT
}

const defaultCustomConfig: CustomConfig = {
  mock: false,
  enabled: true,
  AccessTokenKey: 'Authorization',
  tokenStoragePath: 'user.token',
  refreshTokenStoragePath: 'user.refreshToken'
}
class ApiService {
  private isRefreshing = false
  private failedQueue: Array<{
    resolve: (value: any) => void
    reject: (reason?: any) => void
    options: UniApp.RequestOptions
  }> = []

  constructor(
    private requestConfig: RequestConfig = defaultRequestConfig,
    private customConfig: CustomConfig = defaultCustomConfig
  ) {
    this.requestConfig = { ...defaultRequestConfig, ...requestConfig }
    this.customConfig = { ...defaultCustomConfig, ...customConfig }
  }

  private async refreshToken(): Promise<boolean> {
    try {
      const refreshToken = getSync(this.customConfig.refreshTokenStoragePath!)
      if (!refreshToken) {
        return false
      }

      // 直接使用uni.request调用refresh token接口，避免循环调用
      const response = await new Promise<Data<any>>((resolve, reject) => {
        uni.request({
          url: this.requestConfig.baseURL + '/wp-json/wxapp/v1/auth/tokens/refresh',
          method: HttpMethods.POST,
          data: { refresh_token: refreshToken },
          header: {
            'source-client': 'miniapp',
            'Content-Type': 'application/json'
          },
          timeout: this.requestConfig.timeout || 15000,
          success: (res) => {
            if (res.statusCode >= HttpStatusCode.OK && res.statusCode < HttpStatusCode.MultipleChoices) {
              resolve(res.data as Data<any>)
            } else {
              reject(new Error(`HTTP ${res.statusCode}`))
            }
          },
          fail: (err) => {
            reject(err)
          }
        })
      })

      if (response.code === 200 && response.data.access_token) {
        // 更新token
        setSync(this.customConfig.tokenStoragePath!, response.data.access_token)
        if (response.data.refresh_token) {
          setSync(this.customConfig.refreshTokenStoragePath!, response.data.refresh_token)
        }
        return true
      }
      return false
    } catch (error) {
      console.error('Token refresh failed:', error)
      return false
    }
  }

  private processQueue(error: any, token: string | null = null) {
    this.failedQueue.forEach(({ resolve, reject, options }) => {
      if (error) {
        reject(error)
      } else {
        // 更新token后重试请求
        if (token && options.header && this.customConfig.AccessTokenKey) {
          options.header[this.customConfig.AccessTokenKey] = `Bearer ${token}`
        }
        resolve(this.request(options))
      }
    })

    this.failedQueue = []
  }

  private setupInterceptors(options: Partial<UniApp.RequestOptions & CustomConfig>) {
    const useMock = !isProduction && (options.mock ?? this.customConfig.mock ?? import.meta.env.VITE_MOCK === 'true')

    if (!options.url!.startsWith('http') && !useMock) {
      options.url = this.requestConfig.baseURL! + options.url
    }

    options.timeout = this.requestConfig.timeout || 15000
    options.header = {
      'source-client': 'miniapp',
      ...options.header
    }

    if (options.enabled) {
      if (options.AccessTokenKey) {
        options.header[options.AccessTokenKey] = `Bearer ${getSync(options.tokenStoragePath!)}`
      }
    }
  }

  private async request<T>(options: UniApp.RequestOptions, retryCount: number = 0): Promise<Data<T>> {
    return new Promise<Data<T>>((resolve, reject) => {
      uni.request({
        ...options,
        success: async (res) => {
          if (res.statusCode >= HttpStatusCode.OK && res.statusCode < HttpStatusCode.MultipleChoices) {
            resolve(res.data as Data<T>)
          } else if (res.statusCode === HttpStatusCode.Unauthorized) {
            // 处理401未授权错误
            if (this.customConfig.enabled && this.customConfig.AccessTokenKey && !options.url?.includes('/auth/tokens/refresh')) {
              if (retryCount === 0) {
                // 第一次401：尝试使用refreshToken重试同一个接口
                const refreshToken = getSync(this.customConfig.refreshTokenStoragePath!)
                if (refreshToken) {
                  // 使用refreshToken重试请求
                  const retryOptions = { ...options }
                  if (retryOptions.header && this.customConfig.AccessTokenKey) {
                    retryOptions.header[this.customConfig.AccessTokenKey] = `Bearer ${refreshToken}`
                  }
                  try {
                    const retryResult = await this.request<T>(retryOptions, 1)
                    resolve(retryResult)
                    return
                  } catch (retryError) {
                    // refreshToken也失效了，继续执行下面的逻辑
                  }
                }
              }

              // 第二次401或refreshToken重试失败：调用refreshTokenApi获取新token
              this.failedQueue.push({ resolve, reject, options })

              if (!this.isRefreshing) {
                this.isRefreshing = true

                try {
                  const refreshSuccess = await this.refreshToken()
                  if (refreshSuccess) {
                    const newToken = getSync(this.customConfig.tokenStoragePath!)
                    this.processQueue(null, newToken)
                  } else {
                    // 刷新失败，清除token并跳转登录
                    this.processQueue(new Error('Token refresh failed'))
                    uni.showToast({
                      icon: 'none',
                      title: '登录已过期，请重新登录'
                    })
                    // 可以在这里添加跳转到登录页的逻辑
                    // uni.navigateTo({ url: '/pages/login/index' })
                  }
                } catch (error) {
                  this.processQueue(error)
                } finally {
                  this.isRefreshing = false
                }
              }
            } else {
              uni.showToast({
                icon: 'none',
                title: (res.data as Data<T>).message || '访问未授权'
              })
              reject(res)
            }
          } else if (res.statusCode === HttpStatusCode.NotFound) {
            uni.showToast({
              icon: 'none',
              title: (res.data as Data<T>).message || '请求未找到'
            })
            reject(res)
          } else {
            reject(res)
          }
        },
        fail(err) {
          if (err.errMsg?.includes('timeout')) {
            uni.showToast({
              icon: 'none',
              title: '请求超时'
            })
          } else {
            uni.showToast({
              icon: 'none',
              title: '未知错误'
            })
          }
          reject(err)
        }
      })
    })
  }

  public get<T>(url: string, params?: Record<string, any>, options?: Partial<UniApp.RequestOptions & CustomConfig>): Promise<Data<T>> {
    const requestOptions: UniApp.RequestOptions = {
      ...this.requestConfig,
      ...this.customConfig,
      ...options,
      url,
      method: HttpMethods.GET,
      data: params
    }
    this.setupInterceptors(requestOptions)
    return this.request<T>(requestOptions)
  }

  public post<T>(url: string, data?: Record<string, any>, options?: Partial<UniApp.RequestOptions & CustomConfig>): Promise<Data<T>> {
    const requestOptions: UniApp.RequestOptions = {
      ...this.requestConfig,
      ...this.customConfig,
      ...options,
      url,
      method: HttpMethods.POST,
      data
    }
    this.setupInterceptors(requestOptions)
    return this.request<T>(requestOptions)
  }

  public put<T>(url: string, data?: Record<string, any>, options?: Partial<UniApp.RequestOptions & CustomConfig>): Promise<Data<T>> {
    const requestOptions: UniApp.RequestOptions = {
      ...this.requestConfig,
      ...this.customConfig,
      ...options,
      url,
      method: HttpMethods.PUT,
      data
    }
    this.setupInterceptors(requestOptions)
    return this.request<T>(requestOptions)
  }

  public delete<T>(url: string, params?: Record<string, any>, options?: Partial<UniApp.RequestOptions & CustomConfig>): Promise<Data<T>> {
    const requestOptions: UniApp.RequestOptions = {
      ...this.requestConfig,
      ...this.customConfig,
      ...options,
      url,
      method: HttpMethods.DELETE,
      data: params
    }
    this.setupInterceptors(requestOptions)
    return this.request<T>(requestOptions)
  }

  // 清除token和refresh token
  public clearTokens(): void {
    setSync(this.customConfig.tokenStoragePath!, '')
    setSync(this.customConfig.refreshTokenStoragePath!, '')
  }

  // 检查是否有有效的token
  public hasValidToken(): boolean {
    const token = getSync(this.customConfig.tokenStoragePath!)
    return !!token
  }
}

export default ApiService
