import '@/common/register/modules/RegisterImport'
import { RegisterProperties } from './RegisterProperties'
import { App, FunctionPlugin } from 'vue'
// 国际化
import i18n from '@/locale'

// pinia
import store, { Pinia } from '@/store'

export function RegisterApp(app: App) {
  RegisterProperties(app)

  app.use(store as unknown as FunctionPlugin<[]>)
  app.use(i18n as unknown as FunctionPlugin<[]>)

  return {
    app,
    Pinia
  }
}
