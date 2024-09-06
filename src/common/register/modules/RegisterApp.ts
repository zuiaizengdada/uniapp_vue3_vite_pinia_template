import '@/common/register/modules/RegisterImport'
import { RegisterProperties } from './RegisterProperties'
import { App } from 'vue'
// 国际化
import i18n from '@/locale'

// pinia
import store, { Pinia } from '@/store'

export function RegisterApp(app: App) {
  RegisterProperties(app)

  app.use(store)
  app.use(i18n)

  return {
    app,
    Pinia
  }
}
