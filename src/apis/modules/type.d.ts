export interface Post {
  // 文章id
  id: number
  // 用户id
  userId: number
  // 文章标题
  title: string
  // 文章内容
  body: string
}

export interface PageData<T> {
  // 列表数据
  list: T[]
  // 总条数
  total: number
  // 当前页码
  page: number
  // 每页条数
  pageSize: number
}
