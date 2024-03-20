// 获取元素实例
export const selectorQueryClientRect = (
  selector: string
): Promise<UniApp.NodeInfo | UniApp.NodeInfo[]> =>
  new Promise((resolve) => {
    const query = uni.createSelectorQuery()
    query
      .select(selector)
      .boundingClientRect((res: UniApp.NodeInfo | UniApp.NodeInfo[]) => {
        resolve(res)
      })
      .exec()
  })
