import { HttpMethods, HttpStatusCode } from '@/common/constants'
import { BASE_URL, TIME_OUT } from '../request/config'
import { isProduction, router, uniStorage } from '@/utils'
import i18n from '@/locale'
import type { RequestConfig, Data, CustomConfig } from './type'

const t = i18n.global.t

const defaultRequestConfig: RequestConfig = {
  baseURL: BASE_URL,
  timeout: TIME_OUT
}

const defaultCustomConfig: CustomConfig = {
  mock: false,
  enabled: false,
  AccessTokenKey: 'Authorization',
  tokenStoragePath: 'user.AccessToken'
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
        options.header[options.AccessTokenKey] = uniStorage.getSync(options.tokenStoragePath!)
      }
    }
  }

  private request<T>(options: UniApp.RequestOptions): Promise<Data<T>> {
    return new Promise<Data<T>>((resolve, reject) => {
      uni.request({
        ...options,
        success(res) {
          if (res.statusCode >= HttpStatusCode.OK && res.statusCode < HttpStatusCode.MultipleChoices) {
            resolve(res.data as Data<T>)
          } else if (res.statusCode === HttpStatusCode.Unauthorized) {
            // 重定向到登录页
            router.redirectTo('/pages/login/index')

            uni.showToast({
              icon: 'none',
              title: (res.data as Data<T>).message || t('request.Unauthorized')
            })

            reject(res)
          } else if (res.statusCode === HttpStatusCode.NotFound) {
            uni.showToast({
              icon: 'none',
              title: (res.data as Data<T>).message || t('request.NotFound')
            })

            reject(res)
          }
        },
        fail(err) {
          if (err.errMsg?.includes('timeout')) {
            uni.showToast({
              icon: 'none',
              title: t('request.TimeOut')
            })
          } else {
            uni.showToast({
              icon: 'none',
              title: t('request.Unkown')
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
}

export default ApiService
