/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, never>, Record<string, never>, any>
  export default component
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface ImportMetaEnv {
  readonly VITE_APP_BASE_URL: string
  readonly VITE_WEBSOCKET_URL: string
  readonly VITE_BASE_NAME: string
  readonly VITE_MOCK: string
}
