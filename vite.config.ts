import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import AutoImport from 'unplugin-auto-import/vite'
import PiniaAutoRefs from 'pinia-auto-refs'
import tailwindcss from 'tailwindcss'
import uniTailwind from '@uni-helper/vite-plugin-uni-tailwind'
import { resolve } from 'path'

export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src')
      }
    ]
  },
  base: './',
  plugins: [
    uni(),
    uniTailwind(),
    AutoImport({
      imports: [
        'vue',
        'pinia',
        'uni-app',
        {
          '@/utils/modules/pinia-auto-refs': ['useStore']
        }
      ],
      //为true时在项目根目录自动创建
      dts: 'src/types/auto-import.d.ts'
    }),
    PiniaAutoRefs({
      outputFile: 'src/utils/modules/pinia-auto-refs.ts'
    })
  ],
  css: {
    postcss: {
      plugins: [tailwindcss()]
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://devzyh5.hokkj.cn',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
