import type { CSSOptions } from 'vite'
import tailwindcss from 'tailwindcss'

export const createCss = (): CSSOptions => {
  return {
    postcss: {
      plugins: [tailwindcss]
    },
    preprocessorOptions: {
      scss: {
        api: 'modern',
        logger: {
          warn: () => {
            // 忽略所有警告
          }
        }
      }
    },
    devSourcemap: true,
    modules: {
      localsConvention: 'camelCaseOnly'
    }
  }
}
