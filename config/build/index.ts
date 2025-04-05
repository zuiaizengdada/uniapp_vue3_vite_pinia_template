import type { BuildOptions } from 'vite'

export const createBuild = (mode: string): BuildOptions => {
  const isProd = mode === 'production'

  return {
    // CSS代码拆分
    cssCodeSplit: true,
    // 小于4kb的静态资源内联为base64
    assetsInlineLimit: 4096,
    // Rollup打包配置
    rollupOptions: {
      output: {
        // 控制chunks拆分
        manualChunks: {
          'vue-vendor': ['vue', 'pinia'],
          'uni-vendor': ['@dcloudio/uni-ui']
        }
      }
    },
    // 压缩选项
    minify: isProd ? 'terser' : false,
    // Terser配置
    terserOptions: isProd
      ? {
          compress: {
            drop_console: true,
            drop_debugger: true
          }
        }
      : undefined,
    // 是否生成sourcemap
    sourcemap: !isProd,
    // 输出目录
    outDir: 'dist'
  }
}
