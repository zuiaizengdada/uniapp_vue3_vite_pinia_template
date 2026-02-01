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
  tokenStoragePath: 'user.token'
}
class ApiService {
  constructor(
    private requestConfig: RequestConfig = defaultRequestConfig,
    private customConfig: CustomConfig = defaultCustomConfig
  ) {
    this.requestConfig = { ...defaultRequestConfig, ...requestConfig }
    this.customConfig = { ...defaultCustomConfig, ...customConfig }
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

  private async request<T>(options: UniApp.RequestOptions): Promise<Data<T>> {
    return new Promise<Data<T>>((resolve, reject) => {
      uni.request({
        ...options,
        success: async (res) => {
          if (res.statusCode >= HttpStatusCode.OK && res.statusCode < HttpStatusCode.MultipleChoices) {
            resolve(res.data as Data<T>)
          } else if (res.statusCode === HttpStatusCode.Unauthorized) {
            // 处理401未授权错误
            uni.showToast({
              icon: 'none',
              title: (res.data as Data<T>).message || '访问未授权'
            })
            // 可以选择在这里清理token并跳转登录页
            // this.clearTokens()
            reject(res)
          } else if (res.statusCode === HttpStatusCode.NotFound) {
            uni.showToast({
              icon: 'none',
              title: (res.data as Data<T>).message || '请求未找到'
            })
            reject(res)
          } else {
            console.error('Request Error:', res)
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

  public patch<T>(url: string, data?: Record<string, any>, options?: Partial<UniApp.RequestOptions & CustomConfig>): Promise<Data<T>> {
    const requestOptions: UniApp.RequestOptions = {
      ...this.requestConfig,
      ...this.customConfig,
      ...options,
      url,
      method: 'PATCH' as unknown as any, // uniapp types might not have PATCH in some versions, force cast if needed or just string
      data
    }
    this.setupInterceptors(requestOptions)
    return this.request<T>(requestOptions)
  }

  // 清除token
  public clearTokens(): void {
    setSync(this.customConfig.tokenStoragePath!, '')
  }

  // 检查是否有有效的token
  public hasValidToken(): boolean {
    const token = getSync(this.customConfig.tokenStoragePath!)
    return !!token
  }
}

export default ApiService
