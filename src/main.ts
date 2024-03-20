import { createSSRApp } from 'vue'
import App from './App.vue'
import registerApp from '@/common/register/RegisterApp'

// pinia
import store, { Pinia } from '@/store'

// 国际化
import i18n from '@/locale'

// css初始化
import 'normalize.css'

export function createApp() {
  const app = createSSRApp(App)

  registerApp(app)

  app.use(store)
  app.use(i18n)
  return {
    app,
    Pinia
  }
}
