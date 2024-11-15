import { defineConfig } from 'vite'
import { uniPolyfill } from './src/common/plugins'
import uni from '@dcloudio/vite-plugin-uni'
import AutoImport from 'unplugin-auto-import/vite'
import PiniaAutoRefs from 'pinia-auto-refs'
import tailwindcss from 'tailwindcss'
import uniTailwind from '@uni-helper/vite-plugin-uni-tailwind'
import { uniuseAutoImports } from '@uni-helper/uni-use'
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
        },
        '@vueuse/core',
        uniuseAutoImports()
      ],
      dts: 'src/types/auto-import.d.ts'
    }),
    PiniaAutoRefs({
      outputFile: 'src/utils/modules/pinia-auto-refs.ts'
    }),
    uniPolyfill()
  ],
  css: {
    postcss: {
      plugins: [tailwindcss()]
    },
    preprocessorOptions: {
      scss: {
        api: 'modern'
      }
    }
  }
})
