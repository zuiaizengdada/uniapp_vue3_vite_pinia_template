import ApiService from '../request'
import { type Data } from '../request/type'
import type { Post, PageData } from './type'

const apiService = new ApiService({}, { mock: true })

// 获取文章数据（支持分页）
export function getPosts(page?: number, pageSize?: number): Promise<Data<Post[]> | Data<PageData<Post>>> {
  if (page && pageSize) {
    return apiService.get('/posts', { page, pageSize }) as Promise<Data<PageData<Post>>>
  }
  return apiService.get('/posts') as Promise<Data<Post[]>>
}

// 根据文章id获取文章数据
export function getPostById(id: number): Promise<Data<Post>> {
  return apiService.get(`/post/${id}`)
}

// 更新文章
export function updatePost(id: number, title: string, body: string): Promise<Data<Post>> {
  return apiService.put(`/post/${id}`, { title, body })
}

// 删除文章
export function deletePost(id: number): Promise<Data<Post>> {
  return apiService.delete(`/post/${id}`)
}

// 创建文章
export function createPost(title: string, body: string): Promise<Data<Post>> {
  return apiService.post('/post', { title, body })
}
