import { defineConfig } from 'vite'
import { uniPolyfill } from './src/common/plugins'
import uni from '@dcloudio/vite-plugin-uni'
import AutoImport from 'unplugin-auto-import/vite'
import PiniaAutoRefs from 'pinia-auto-refs'
import uniTailwind from '@uni-helper/vite-plugin-uni-tailwind'
import { uniuseAutoImports } from '@uni-helper/uni-use'
import Inspector from 'unplugin-vue-inspector/vite'
import { resolve } from 'path'
import tailwindcss from 'tailwindcss'

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
    Inspector({
      enabled: true,
      launchEditor: 'cursor'
    }),
    uniTailwind(),
    AutoImport({
      imports: [
        'vue',
        'pinia',
        'uni-app',
        'vitest',
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
      plugins: [tailwindcss]
    },
    preprocessorOptions: {
      scss: {
        api: 'modern'
      }
    }
  },
  optimizeDeps: {
    exclude: ['better-mock']
  }
})
