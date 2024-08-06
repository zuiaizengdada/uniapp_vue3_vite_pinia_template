export function useSystemInfo() {
  const menuButtomInfo = uni.getMenuButtonBoundingClientRect()
  const systemInfo = uni.getSystemInfoSync()

  return {
    ...menuButtomInfo,
    ...systemInfo
  }
}
