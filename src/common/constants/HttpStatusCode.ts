// Http请求状态码
export enum HttpStatusCode {
  // 成功响应
  OK = 200, // 请求成功
  Created = 201, // 请求已成功，并且服务器创建了新的资源
  Accepted = 202, // 服务器已接受请求，但尚未处理
  NoContent = 204, // 服务器成功处理了请求，但没有返回任何内容

  // 重定向响应
  MultipleChoices = 300, // 请求有多种可能的响应
  MovedPermanently = 301, // 请求的资源已永久移动到新位置
  Found = 302, // 请求的资源临时从不同的 URI 响应请求

  // 客户端错误响应
  BadRequest = 400, // 服务器无法理解请求的格式，客户端不应该尝试再次使用相同的内容进行请求
  Unauthorized = 401, // 请求未经授权，请求缺少有效的身份验证凭据
  Forbidden = 403, // 服务器拒绝了请求
  NotFound = 404, // 服务器找不到请求的资源

  // 服务器错误响应
  InternalServerError = 500, // 服务器遇到了一个阻止它完成请求的错误
  NotImplemented = 501, // 服务器不支持请求中要求的功能
  BadGateway = 502, // 作为网关或代理工作的服务器从上游服务器收到无效响应
  ServiceUnavailable = 503, // 服务器目前无法使用（由于超载或停机维护）
  GatewayTimeout = 504 // 作为网关或代理的服务器未能及时从上游服务器或辅助服务器接收请求
}
