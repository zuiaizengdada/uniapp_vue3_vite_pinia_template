import type { DepOptimizationOptions } from 'vite'

export const createOptimizeDeps = (): DepOptimizationOptions => {
  return {
    // 需要强制预构建的依赖
    include: ['better-mock'],
    // 排除一些不需要预构建的依赖
    exclude: [],
    // 启动时预构建
    esbuildOptions: {
      // 配置 esbuild 优化项
      target: 'es2020' // 指定目标环境，根据实际浏览器支持调整
    },
    // 是否强制执行依赖预构建
    force: true
  }
}
