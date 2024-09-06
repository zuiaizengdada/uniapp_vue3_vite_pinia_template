import type { EventType, Emitter } from 'mitt'
import { Composer } from 'vue-i18n'
export {}

declare module 'vue' {
  type Hooks = App.AppInstance & Page.PageInstance
  interface ComponentCustomOptions extends Hooks {
    $t: Composer['t']
  }

  export interface ComponentCustomProperties {
    $mitt: Emitter<Record<EventType, any>>
    $changeLocale: (locale: 'zh' | 'en') => void
  }
}
