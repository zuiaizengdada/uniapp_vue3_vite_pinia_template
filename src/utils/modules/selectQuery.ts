import { type ComponentInternalInstance } from 'vue'

export function selectorQueryClientRect(selector: string | string[], instance?: ComponentInternalInstance): Promise<UniApp.NodeInfo | UniApp.NodeInfo[]> {
  return new Promise((resolve) => {
    nextTick(() => {
      const query = instance ? uni.createSelectorQuery().in(instance) : uni.createSelectorQuery()

      if (Array.isArray(selector)) {
        selector.forEach((item) => {
          query.select(item).boundingClientRect()
        })
      } else {
        query.select(selector).boundingClientRect()
      }

      query.exec((res: UniApp.NodeInfo[]) => {
        if (res.length > 1) {
          resolve(res)
        } else {
          resolve(res[0])
        }
      })
    })
  })
}
