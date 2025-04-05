import type { SSROptions } from 'vite'

export const createSsr = (): SSROptions => {
  return {
    // 不进行外部化的依赖
    noExternal: ['@dcloudio/uni-ui']
  }
}
