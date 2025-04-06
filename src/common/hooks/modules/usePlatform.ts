import { EPlatform } from '@/common/constants'

/**
 * 获取当前平台
 */
export function usePlatform() {
  const platform = uni.getSystemInfoSync().uniPlatform as EPlatform

  const isApp = platform === 'app'
  const isH5 = platform === 'web'
  const isMpWeixin = platform === 'mp-weixin'
  const isMpAlipay = platform === 'mp-alipay'
  const isMpBaidu = platform === 'mp-baidu'
  const isMpToutiao = platform === 'mp-toutiao'
  const isMpLark = platform === 'mp-lark'
  const isMpQq = platform === 'mp-qq'
  const isMpKuaiShou = platform === 'mp-kuaishou'
  const isMpJd = platform === 'mp-jd'
  const isMp360 = platform === 'mp-360'
  const isQuickappWebview = platform === 'quickapp-webview'
  const isQuickappWebviewUnion = platform === 'quickapp-webview-union'
  const isQuickappWebviewHuawei = platform === 'quickapp-webview-huawei'
  const isDevelopment = process.env.NODE_ENV == 'development'
  const isProduction = process.env.NODE_ENV == 'production'

  return {
    isH5,
    isApp,
    isMpWeixin,
    isMpAlipay,
    isMpBaidu,
    isMpToutiao,
    isMpLark,
    isMpQq,
    isMpKuaiShou,
    isMpJd,
    isMp360,
    isQuickappWebview,
    isQuickappWebviewUnion,
    isQuickappWebviewHuawei,
    platform,
    isDevelopment,
    isProduction
  }
}
