class Router {
  /**
   * 构建带查询参数的URL
   * @param path 页面路径
   * @param params 查询参数
   */
  private buildUrl(path: string, params?: Record<string, any>): string {
    if (!params) return path
    const query = Object.keys(params)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(
            params[key] as string
          )}`
      )
      .join('&')
    return `${path}?${query}`
  }

  /**
   * 跳转到指定页面
   * @param path 页面路径
   * @param params 页面查询参数
   */
  navigateTo(path: string, params?: Record<string, any>) {
    try {
      const url = this.buildUrl(path, params)
      uni.navigateTo({ url })
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * 重定向到指定页面
   * @param path 页面路径
   * @param params 页面查询参数
   */
  redirectTo(path: string, params?: Record<string, any>) {
    try {
      const url = this.buildUrl(path, params)
      uni.redirectTo({ url })
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * 返回上一页面或多级页面
   * @param delta 返回的页面数
   */
  navigateBack(delta: number = 1) {
    try {
      uni.navigateBack({ delta })
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * 切换到 tabBar 页面
   * @param path tabBar 页面的路径
   */
  switchTab(path: string) {
    try {
      uni.switchTab({ url: path })
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * 关闭所有页面，打开到应用内的某个页面
   * @param path 页面路径
   * @param params 页面查询参数
   */
  reLaunch(path: string, params?: Record<string, any>) {
    try {
      const url = this.buildUrl(path, params)
      uni.reLaunch({ url })
    } catch (error) {
      console.error(error)
    }
  }
}

export const router = new Router()
