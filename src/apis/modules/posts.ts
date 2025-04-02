import ApiService from '../request'
import type { CustomConfig, Data } from '../request/type'
import type { Post, PageData, PostSearchParams } from './type'

const apiService = new ApiService({}, { mock: true })

// 获取文章数据（支持分页）
export function getPosts(params?: PostSearchParams, options?: Partial<UniApp.RequestOptions & CustomConfig>): Promise<Data<Post[]> | Data<PageData<Post>>> {
  return apiService.get('/posts', params, options) as Promise<Data<PageData<Post>>>
}

// 根据文章id获取文章数据
export function getPostById(id: number, options?: Partial<UniApp.RequestOptions & CustomConfig>): Promise<Data<Post>> {
  return apiService.get(`/post/${id}`, {}, options)
}

// 更新文章
export function updatePost(id: number, data: Post, options?: Partial<UniApp.RequestOptions & CustomConfig>): Promise<Data<Post>> {
  return apiService.put(`/post/${id}`, data, options)
}

// 删除文章
export function deletePost(id: number, options?: Partial<UniApp.RequestOptions & CustomConfig>): Promise<Data<Post>> {
  return apiService.delete(`/post/${id}`, {}, options)
}

// 创建文章
export function createPost(data: Post, options?: Partial<UniApp.RequestOptions & CustomConfig>): Promise<Data<Post>> {
  return apiService.post('/post', data, options)
}
