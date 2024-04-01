import { HttpStatusCode } from '@/common/constants/HttpStatusCode'
import { router } from '@/utils'
import { uniStorage } from '@/utils/uni-storage'
import i18n from '@/locale'
import type { Data } from '@/types/global'
import type { RequestConfig } from './type'

const t = i18n.global.t

class ApiService {
  constructor(private config: RequestConfig, private needToken: boolean = false) { }

  private setupInterceptors(options: UniApp.RequestOptions) {
    if (!options.url.startsWith('http')) {
      options.url = this.config.baseURL + options.url
    }
    options.timeout = this.config.timeout || 15000
    options.header = {
      'source-client': 'miniapp',
      ...options.header
    }

    if (this.needToken) {
      const AccessToken = uniStorage.getSync('user.AccessToken')

      if (AccessToken) {
        options.header.Authorization = AccessToken
      }
    }
  }

  private request<T>(options: UniApp.RequestOptions): Promise<Data<T>> {
    return new Promise<Data<T>>((resolve, reject) => {
      uni.request({
        ...options,
        success(res) {
          if (
            res.statusCode >= HttpStatusCode.OK &&
            res.statusCode < HttpStatusCode.MultipleChoices
          ) {
            resolve(res.data as Data<T>)
          } else if (res.statusCode === HttpStatusCode.Unauthorized) {
            router.redirectTo('/pages/login/login')
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
    params?: any,
    options?: UniApp.RequestOptions
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
    data?: any,
    options?: UniApp.RequestOptions
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
    data?: any,
    options?: UniApp.RequestOptions
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
    params?: any,
    options?: UniApp.RequestOptions
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
