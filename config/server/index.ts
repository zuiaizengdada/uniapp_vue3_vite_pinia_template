import type { ServerOptions } from 'vite'

export const createServer = (mode: string): ServerOptions => {
  const isDev = mode === 'development'

  return {
    allowedHosts: isDev ? true : undefined,
    port: 3000,
    open: true,
    hmr: true,
    host: true,
    proxy: {}
  }
}
