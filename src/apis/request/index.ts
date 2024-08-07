import { HttpStatusCode } from '@/common/constants'
import { router } from '@/utils'
import { uniStorage } from '@/utils'
import i18n from '@/locale'
import type { RequestConfig, Data, CustomConfig } from './type'

const t = i18n.global.t

class ApiService {
  constructor(
    private config: RequestConfig,
    private needToken: boolean = false,
    private mock: boolean = false
  ) {}

  private setupInterceptors(options: Partial<UniApp.RequestOptions & CustomConfig>) {
    if (!options.url!.startsWith('http') && !this.mock && !options.mock) {
      options.url = this.config.baseURL + options.url
    }

    options.timeout = this.config.timeout || 15000
    options.header = {
      'source-client': 'miniapp',
      ...options.header
    }

    if (this.needToken) {
      const AccessTokenKey = 'Authorization'
      const AccessToken = uniStorage.getSync('user.AccessToken')

      if (AccessToken) {
        options.header[AccessTokenKey] = AccessToken
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

  public get<T>(
    url: string,
    params?: Record<string, any>,
    options?: Partial<UniApp.RequestOptions & CustomConfig>
  ): Promise<Data<T>> {
    const requestOptions: UniApp.RequestOptions = {
      ...options,
      url,
      method: 'GET',
      data: params
    }
    this.setupInterceptors(requestOptions)
    return this.request<T>(requestOptions)
  }

  public post<T>(
    url: string,
    data?: Record<string, any>,
    options?: Partial<UniApp.RequestOptions & CustomConfig>
  ): Promise<Data<T>> {
    const requestOptions: UniApp.RequestOptions = {
      ...options,
      url,
      method: 'POST',
      data
    }
    this.setupInterceptors(requestOptions)
    return this.request<T>(requestOptions)
  }

  public put<T>(
    url: string,
    data?: Record<string, any>,
    options?: Partial<UniApp.RequestOptions & CustomConfig>
  ): Promise<Data<T>> {
    const requestOptions: UniApp.RequestOptions = {
      ...options,
      url,
      method: 'PUT',
      data
    }
    this.setupInterceptors(requestOptions)
    return this.request<T>(requestOptions)
  }

  public delete<T>(
    url: string,
    params?: Record<string, any>,
    options?: Partial<UniApp.RequestOptions & CustomConfig>
  ): Promise<Data<T>> {
    const requestOptions: UniApp.RequestOptions = {
      ...options,
      url,
      method: 'DELETE',
      data: params
    }
    this.setupInterceptors(requestOptions)
    return this.request<T>(requestOptions)
  }
}

export default ApiService
