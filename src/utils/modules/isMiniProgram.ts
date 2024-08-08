import { EPlatform } from '@/common/constants'

export const isMiniProgram =
  uni.getSystemInfoSync().uniPlatform === EPlatform.MpWeixin ||
  uni.getSystemInfoSync().uniPlatform === EPlatform.MpAlipay ||
  uni.getSystemInfoSync().uniPlatform === EPlatform.MpBaidu ||
  uni.getSystemInfoSync().uniPlatform === EPlatform.MpToutiao ||
  uni.getSystemInfoSync().uniPlatform === EPlatform.MpQq ||
  uni.getSystemInfoSync().uniPlatform === EPlatform.Mp360 ||
  uni.getSystemInfoSync().uniPlatform === EPlatform.Mp
