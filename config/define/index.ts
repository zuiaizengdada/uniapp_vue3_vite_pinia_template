export const createDefine = (mode: string) => {
  return {
    // 环境变量
    'process.env': {
      NODE_ENV: JSON.stringify(mode)
    },
    // 应用版本
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    // 是否为生产环境
    __IS_PROD__: mode === 'production'
  }
}
