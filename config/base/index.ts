import { resolve } from 'node:path'
import type { UserConfig } from 'vite'

export const createBase = (): UserConfig => {
  return {
    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve(process.cwd(), 'src')
        }
      ]
    },
    base: './'
  }
}
