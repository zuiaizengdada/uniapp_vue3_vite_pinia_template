import apiService from '@/apis'
import type { Data } from '@/apis/request/type'

export function getPosts(): Promise<Data<any>> {
  return apiService.get('/posts')
}
