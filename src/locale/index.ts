import { createI18n } from 'vue-i18n'

import zh from './lang/zh.json'
import en from './lang/en.json'

const messages = {
  en,
  zh
}

const i18n = createI18n({
  legacy: false,
  // 设置默认语言
  locale: 'zh',
  // 设置备用语言
  fallbackLocale: 'en',
  globalInjection: true,
  messages
})

export default i18n
