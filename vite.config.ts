import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import PiniaAutoRefs from 'pinia-auto-refs'

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
    AutoImport({
      imports: [
        'vue',
        'pinia',
        'uni-app',
        {
          '@/utils/pinia-auto-refs': ['useStore']
        }
      ],
      //为true时在项目根目录自动创建
      dts: 'src/types/auto-import.d.ts'
    }),
    PiniaAutoRefs({
      outputFile: 'src/utils/pinia-auto-refs.ts'
    }),
    Components({
      //自动加载的组件目录，默认值为 ['src/components']
      dirs: ['src/components'],
      //组件名称包含目录，防止同名组件冲突
      directoryAsNamespace: true,
      //指定类型声明文件，为true时在项目根目录创建
      dts: 'src/types/components.d.ts'
    })
  ]
})
