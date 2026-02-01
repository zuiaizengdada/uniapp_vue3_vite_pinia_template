import ApiService from '../request'
import type { Data, CustomConfig } from '../request/type'
import type { UpdateUserProfileData, UserProfile } from './type'

const apiService = new ApiService()

// 更新用户信息
export function updateUserProfileApi(data: UpdateUserProfileData, options?: Partial<UniApp.RequestOptions & CustomConfig>): Promise<Data<any>> {
  return apiService.patch('/users/profile', data, options)
}

// 获取用户信息
export function getUserProfileApi(options?: Partial<UniApp.RequestOptions & CustomConfig>): Promise<Data<UserProfile>> {
  return apiService.get('/users/profile', undefined, options)
}
