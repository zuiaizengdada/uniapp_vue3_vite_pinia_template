import mitt from 'mitt'

import { App } from 'vue'

export default function registerProperties(app: App): void {
  app.config.globalProperties.$mitt = mitt
}
