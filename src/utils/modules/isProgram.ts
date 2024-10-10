import { EPlatform } from '@/common/constants'

/**使用条件编译获取平台信息*/
export function ifDefPlatform(): EPlatform {
  let platform: EPlatform
  //#ifdef APP-PLUS
  platform = EPlatform.AppPlus
  //#endif
  //#ifdef APP-PLUS-NVUE
  platform = EPlatform.AppPlusNvue
  //#endif
  //#ifdef H5
  platform = EPlatform.H5
  //#endif
  //#ifdef MP-WEIXIN
  platform = EPlatform.MpWeixin
  //#endif
  //#ifdef MP-ALIPAY
  platform = EPlatform.MpAlipay
  //#endif
  //#ifdef MP-BAIDU
  platform = EPlatform.MpBaidu
  //#endif
  //#ifdef MP-TOUTIAO
  platform = EPlatform.MpToutiao
  //#endif
  //#ifdef MP-QQ
  platform = EPlatform.MpQq
  //#endif
  //#ifdef MP-360
  platform = EPlatform.Mp360
  //#endif
  //#ifdef MP
  platform = EPlatform.Mp
  //#endif
  //#ifdef quickapp-webview
  platform = EPlatform.QuickappWebview
  //#endif
  //#ifdef quickapp-webview-union
  platform = EPlatform.QuickappWebviewUnion
  //#endif
  //#ifdef quickapp-webview-huawei
  platform = EPlatform.QuickappWebviewHuawei
  //#endif
  return platform
}

/**平台类型*/
export const Platform: EPlatform = ifDefPlatform()
/**默认导出平台类型*/
export default Platform

/**App*/
export const isAppPlus = Platform == EPlatform.AppPlus
/**App nvue*/
export const isAppPlusNvue = Platform == EPlatform.AppPlusNvue
/**H5*/
export const isH5 = Platform == EPlatform.H5
/**微信小程序*/
export const isMpWeixin = Platform == EPlatform.MpWeixin
/**支付宝小程序*/
export const isMpAlipay = Platform == EPlatform.MpAlipay
/**百度小程序*/
export const isMpBaidu = Platform == EPlatform.MpBaidu
/**字节跳动小程序*/
export const isMpToutiao = Platform == EPlatform.MpToutiao
/**QQ小程序*/
export const isMpQq = Platform == EPlatform.MpQq
/**360小程序*/
export const isMp360 = Platform == EPlatform.Mp360
/**微信小程序/支付宝小程序/百度小程序/字节跳动小程序/QQ小程序/360小程序*/
export const isMp = Platform == EPlatform.Mp
/**快应用通用(包含联盟、华为)*/
export const isQuickappWebview = Platform == EPlatform.QuickappWebview
/**快应用联盟*/
export const isQuickappWebviewUnion = Platform == EPlatform.QuickappWebviewUnion
/**快应用华为*/
export const isQuickappWebviewHuawei = Platform == EPlatform.QuickappWebviewHuawei
/**是否开发环境*/
export const isDevelopment = process.env.NODE_ENV == 'development'
/**是否线上环境*/
export const isProduction = process.env.NODE_ENV == 'production'
/**抖音小程序*/
export const isMpDouyinApp = uni.getSystemInfoSync().appName == 'Douyin'
/**头条小程序*/
export const isMpToutiaoApp = uni.getSystemInfoSync().appName == 'Toutiao'
