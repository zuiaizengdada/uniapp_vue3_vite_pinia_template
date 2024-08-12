import { type ComponentInternalInstance } from 'vue'
import { selectorQueryClientRect } from '@/utils'

export function useScroll(instance: ComponentInternalInstance) {
  let scrollTop = $ref<number>(0)

  async function scrollToBottom(scrollViewClass: string, scrollContentClass: string) {
    const [{ height: scrollViewHeight }, { height: scrollContentHeight }] = (await selectorQueryClientRect(
      [scrollViewClass, scrollContentClass],
      instance
    )) as UniApp.NodeInfo[]

    if (scrollContentHeight! > scrollViewHeight!) {
      scrollTop = scrollContentHeight! - scrollViewHeight!
    }
  }
  return {
    scrollTop,
    scrollToBottom
  }
}
