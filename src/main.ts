import { createSSRApp } from 'vue'
import App from './App.vue'
import registerApp from '@/common/register/RegisterApp'

// mock
import '@/apis/mock'

// pinia
import store, { Pinia } from '@/store'

// 国际化
import i18n from '@/locale'

// css初始化
import 'normalize.css'
import '@/static/style/reset.scss'

// tailwind初始化
import '@/static/style/tailwind.scss'

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
