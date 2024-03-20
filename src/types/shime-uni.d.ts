import mitt from 'mitt'
import { Composer } from 'vue-i18n'
export {}

declare module 'vue' {
  type Hooks = App.AppInstance & Page.PageInstance
  interface ComponentCustomOptions extends Hooks {
    $t: Composer['t']
  }

  export interface ComponentCustomProperties {
    $mitt: typeof mitt
  }
}
