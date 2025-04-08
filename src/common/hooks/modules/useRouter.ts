export function useRouter() {
  const buildUrl = (path: string, params?: Record<string, any>): string => {
    if (!params) return path
    const query = Object.keys(params)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key] as string)}`)
      .join('&')
    return `${path}?${query}`
  }

  const navigateTo = (path: string, params?: Record<string, any>, options?: UniApp.NavigateToOptions) => {
    try {
      const url = buildUrl(path, params)
      uni.navigateTo({ url, ...options })
    } catch (error) {
      console.error(error)
    }
  }

  const redirectTo = (path: string, params?: Record<string, any>, success?: () => void, fail?: () => void, complete?: () => void) => {
    try {
      const url = buildUrl(path, params)
      uni.redirectTo({ url, success, fail, complete })
    } catch (error) {
      console.error(error)
    }
  }

  const navigateBack = (delta: number = 1, options?: UniApp.NavigateBackOptions) => {
    try {
      uni.navigateBack({ delta, ...options })
    } catch (error) {
      console.error(error)
    }
  }

  const switchTab = (path: string, success?: () => void, fail?: () => void, complete?: () => void) => {
    try {
      uni.switchTab({ url: path, success, fail, complete })
    } catch (error) {
      console.error(error)
    }
  }

  const reLaunch = (path: string, params?: Record<string, any>, success?: () => void, fail?: () => void, complete?: () => void) => {
    try {
      const url = buildUrl(path, params)
      uni.reLaunch({ url, success, fail, complete })
    } catch (error) {
      console.error(error)
    }
  }

  return {
    navigateTo,
    redirectTo,
    navigateBack,
    switchTab,
    reLaunch
  }
}
