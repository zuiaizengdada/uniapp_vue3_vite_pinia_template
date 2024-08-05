import apiService from '@/apis'
import { type Data } from '@/apis/request/type'
import { type Book } from './type'

export function getBookData(): Promise<Data<Book>> {
  return apiService.get('/book', {}, { mock: true })
}
