import mitt from 'mitt'
import i18n from '@/locale'
import { type App } from 'vue'
import { type Events } from '../type'

export function RegisterProperties(app: App) {
  app.config.globalProperties.$mitt = mitt<Events>()
  app.config.globalProperties.$changeLocale = (locale: 'zh' | 'en') => {
    i18n.global.locale.value = locale
  }
  app.config.globalProperties.$t = i18n.global.t
}
