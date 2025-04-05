import type { PreviewOptions } from 'vite'

export const createPreview = (): PreviewOptions => {
  return {
    // 预览服务器端口
    port: 5000,
    // 监听所有地址
    host: true,
    // 如果端口已被占用则直接退出
    strictPort: true
  }
}
