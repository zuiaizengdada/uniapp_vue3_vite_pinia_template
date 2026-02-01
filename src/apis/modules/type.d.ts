export interface Post {
  // 文章id
  id: number
  // 用户id
  userId: number
  // 文章标题
  title: string
  // 文章内容
  content: string
}

export interface TodoItem {
  // 待办id
  id: number
  // 用户id
  userId: number
  // 待办标题
  title: string
  // 是否完成
  completed: boolean
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

export interface PostSearchParams {
  // 当前页码
  page?: number
  // 每页条数
  pageSize?: number
  // 文章标题
  title?: string
  // 文章内容
  content?: string
}

export interface TodoSearchParams {
  // 当前页码
  page: number
  // 每页条数
  pageSize: number
  // 待办标题
  title?: string
  // 是否完成
  completed?: boolean
}

type LoginType = 'mini' | 'web'

export interface LoginByWechatData {
  // 微信登录code
  code: string
  // 类型
  type?: LoginType = "mini"
}

export interface LoginByWechatReturn {
  // 访问令牌
  access_token?: string
  refresh_token?: string
  user_id?: number
  user_nicename?: string
}

export interface UpdateUserProfileData {
  nickname?: string
  avatar?: string
}

export interface UserProfile {
  id: number | string
  openid: string
  nickname: string
  avatar: string
  role: string
  createdAt: string
}