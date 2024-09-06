import { createSSRApp } from 'vue'
import App from './App.vue'
import { RegisterApp } from '@/common/register'

export function createApp() {
  const app = createSSRApp(App)

  const registeredItems = RegisterApp(app)

  return {
    ...registeredItems
  }
}
