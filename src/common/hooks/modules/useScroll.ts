import { type ComponentInternalInstance } from 'vue'
import { selectorQueryClientRect } from '@/utils'

export function useScroll(instance: ComponentInternalInstance) {
  const scrollTop = ref<number>(0)

  async function scrollToBottom(scrollViewEl: string, scrollContentEl: string) {
    const [{ height: scrollViewHeight }, { height: scrollContentHeight }] = (await selectorQueryClientRect([scrollViewEl, scrollContentEl], instance)) as UniApp.NodeInfo[]

    if (scrollContentHeight! > scrollViewHeight!) {
      scrollTop.value = scrollContentHeight! - scrollViewHeight!
    }
  }
  return {
    scrollTop,
    scrollToBottom
  }
}
