import mitt from 'mitt'
import i18n from '@/locale'
import { App } from 'vue'

export function RegisterProperties(app: App): void {
  app.config.globalProperties.$mitt = mitt()
  app.config.globalProperties.$changeLocale = (locale: 'zh' | 'en') => {
    i18n.global.locale.value = locale
  }
  app.config.globalProperties.$t = i18n.global.t
}
