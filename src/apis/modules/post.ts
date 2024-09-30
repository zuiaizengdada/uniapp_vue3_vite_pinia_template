import ApiService from '../request'
import { BASE_URL } from '../request/config'
import { type Data } from '../request/type'
import { type Post } from './type'

const apiService = new ApiService({ baseURL: BASE_URL })

// 获取所有文章数据
export function getPosts(): Promise<Data<Post>> {
  return apiService.get('/posts', {}, { mock: true })
}

// 根据文章id获取文章数据
export function getPostById(id: number): Promise<Data<Post>> {
  return apiService.get(`/post/${id}`, {}, { mock: true })
}

// 更新文章
export function updatePost(id: number, title: string, body: string): Promise<Data<Post>> {
  return apiService.put(`/post/${id}`, { title, body }, { mock: true })
}

// 删除文章
export function deletePost(id: number): Promise<Data<Post>> {
  return apiService.delete(`/post/${id}`, {}, { mock: true })
}

// 创建文章
export function createPost(title: string, body: string): Promise<Data<Post>> {
  return apiService.post('/post', { title, body }, { mock: true })
}
