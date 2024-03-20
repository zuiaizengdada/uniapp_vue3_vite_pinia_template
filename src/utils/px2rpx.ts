// px转rpx
export const px2rpx = (px: number) => {
  const systemInfo = uni.getSystemInfoSync()
  const screenWidth = systemInfo.screenWidth
  return (750 / screenWidth) * px
}
