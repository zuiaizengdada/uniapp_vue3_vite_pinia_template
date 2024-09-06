import '@/common/register/RegisterImport'
import registerProperties from './RegisterProperties'
import { App } from 'vue'
// 国际化
import i18n from '@/locale'

// pinia
import store, { Pinia } from '@/store'

function registerApp(app: App) {
  registerProperties(app)

  app.use(store)
  app.use(i18n)

  return {
    app,
    Pinia
  }
}

export default registerApp
