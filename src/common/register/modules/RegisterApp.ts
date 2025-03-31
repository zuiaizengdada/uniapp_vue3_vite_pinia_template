import '@/common/register/modules/RegisterImport'
import { RegisterProperties } from './RegisterProperties'
import { App, FunctionPlugin } from 'vue'

// 国际化
import i18n from '@/locale'

// pinia
import store, { Pinia } from '@/store'

// polyfills
import { setupPolyfills } from '@/common/polyfills'

import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'
// 创建 QueryClient 实例
const queryClient = new QueryClient()

// 设置polyfills
setupPolyfills()

export function RegisterApp(app: App) {
  RegisterProperties(app)

  app.use(store as unknown as FunctionPlugin<[]>)
  app.use(i18n as unknown as FunctionPlugin<[]>)
  app.use(VueQueryPlugin, { queryClient })

  return {
    app,
    Pinia
  }
}
