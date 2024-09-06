import { createSSRApp } from 'vue'
import App from './App.vue'
import registerApp from '@/common/register/RegisterApp'

export function createApp() {
  const app = createSSRApp(App)

  const registeredItems = registerApp(app)

  return {
    ...registeredItems
  }
}
