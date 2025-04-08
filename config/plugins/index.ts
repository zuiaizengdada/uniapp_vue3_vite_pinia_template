import type { PluginOption } from 'vite'
import { uniPolyfill } from '../../src/common/plugins'
import uni from '@dcloudio/vite-plugin-uni'
import AutoImport from 'unplugin-auto-import/vite'
import PiniaAutoRefs from 'pinia-auto-refs'
import uniTailwind from '@uni-helper/vite-plugin-uni-tailwind'
import { uniuseAutoImports } from '@uni-helper/uni-use'
import Inspector from 'unplugin-vue-inspector/vite'
import * as VueQuery from '@tanstack/vue-query'
import lodash from 'lodash'

export const createPlugins = (mode: string): PluginOption[] => {
  // 基础插件，在所有环境中都会加载
  const basePlugins: PluginOption[] = [
    uni(),
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
        {
          '@tanstack/vue-query': Object.keys(VueQuery)
        },
        {
          lodash: Object.keys(lodash)
        },
        uniuseAutoImports()
      ],
      dts: 'src/types/auto-import.d.ts'
    }),
    PiniaAutoRefs({
      outputFile: 'src/common/plugins/modules/pinia-auto-refs.ts'
    }),
    uniPolyfill()
  ]

  // 开发环境特定插件
  const devPlugins: PluginOption[] = [
    Inspector({
      enabled: false,
      launchEditor: 'cursor'
    })
  ]

  // 生产环境特定插件
  const prodPlugins: PluginOption[] = [
    // 这里可以添加生产环境特定插件，例如：
    // - vite-plugin-imagemin 用于图片压缩
    // - vite-plugin-compression 用于 gzip/brotli 压缩
    // 由于这些插件需要额外安装，此处暂不添加
  ]

  // 根据当前模式返回合适的插件集合
  return [...basePlugins, ...(mode === 'production' ? prodPlugins : devPlugins)]
}
