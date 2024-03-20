//判断是否微信浏览器
export const isWechat = () => {
  const ua = window.navigator.userAgent.toLowerCase()

  const isWeixin = ua.indexOf('micromessenger') != -1

  return isWeixin
}
