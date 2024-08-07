export function useSystemInfo() {
  const menuButtomInfo = (uni.getMenuButtonBoundingClientRect && uni.getMenuButtonBoundingClientRect()) || {}
  const systemInfo = uni.getSystemInfoSync()

  return {
    ...menuButtomInfo,
    ...systemInfo
  }
}
