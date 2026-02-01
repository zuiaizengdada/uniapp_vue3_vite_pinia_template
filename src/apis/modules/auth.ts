import ApiService from '../request'
import type { CustomConfig, Data } from '../request/type'
import type { LoginByWechatData, LoginByWechatReturn } from './type'

const apiService = new ApiService()

// 登录获取Token
export function loginByWechatApi(data: LoginByWechatData, options?: Partial<UniApp.RequestOptions & CustomConfig>): Promise<Data<LoginByWechatReturn>> {
  return apiService.post('/auth/login/wechat', data, options)
}
