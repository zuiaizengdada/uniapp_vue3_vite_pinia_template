import { createI18n } from 'vue-i18n'

import zh from './lang/zh.json'
import en from './lang/en.json'
import ja from './lang/ja.json'
import fr from './lang/fr.json'
import de from './lang/de.json'
import es from './lang/es.json'
import ru from './lang/ru.json'

const messages = {
  en,
  zh,
  ja,
  fr,
  de,
  es,
  ru
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
