// 网络请求返回格式
export type Data<T> = {
  // 状态码
  code?: number
  // 响应对象
  data: T
  // 状态描述
  message?: string
  // 是否成功
  success?: boolean
  // 时间戳
  timestamp?: number
  // 分布式链路id
  traceId?: string
}

// UniStorage请求方法
export interface UniStorageMethods {
  get: (key: string) => any
  getSync: (key: string) => any
  set: (params: {
    key: string
    data: any
    success?: () => void
    fail?: (error: Error) => void
  }) => void
  setSync: (key: string, data: any) => void
  remove: (key: string) => void
  removeSync: (key: string) => void
  clear: () => void
  clearSync: () => void
}
