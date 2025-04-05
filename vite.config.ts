import type { ConfigEnv, UserConfig } from 'vite'
import { createBase, createPlugins, createCss, createServer, createOptimizeDeps, createBuild, createPreview, createDefine, createWorker, createSsr, createExperimental } from './config'

export default ({ mode }: ConfigEnv): UserConfig => {
  return {
    ...createBase(),
    plugins: createPlugins(mode),
    css: createCss(),
    server: createServer(mode),
    optimizeDeps: createOptimizeDeps(),
    build: createBuild(mode),
    preview: createPreview(),
    define: createDefine(mode),
    worker: createWorker(),
    ssr: createSsr(),
    experimental: createExperimental()
  }
}
