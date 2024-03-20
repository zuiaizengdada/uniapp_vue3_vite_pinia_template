// 网络请求返回格式
export type Data<T> = {
  code: string
  msg: string
  result: T
}
