// 请求配置
export interface RequestConfig  {
  // 请求地址
  baseURL: string
  // 请求超时时间
  timeout?: number
}

// 自定义配置参数
export interface CustomConfig {
  // 是否开启mock
  mock:boolean
}

// 网络请求返回格式
export interface Data<T> {
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
