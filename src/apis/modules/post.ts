import apiService from '@/apis'
import type { Data } from '@/types/global'

export function getPosts(): Promise<Data<any>> {
  return apiService.get('/posts')
}
