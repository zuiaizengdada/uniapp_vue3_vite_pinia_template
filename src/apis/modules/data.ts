import apiService from '@/apis'
import type { Data } from '@/apis/request/type'

export function getBookData(): Promise<Data<any>> {
  return apiService.get('/book', {}, { mock: true })
}
