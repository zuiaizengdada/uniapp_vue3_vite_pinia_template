import { type ComponentInternalInstance } from 'vue'
import { selectorQueryClientRect } from '@/utils'

export function useScroll(instance: ComponentInternalInstance) {
  const scrollTop = ref<number | null>(0)

  function setScrollTop(value: number) {
    scrollTop.value = value
  }

  const targetElementId = ref<string | null>(null)

  async function scrollToTop(scrollAnimation: boolean = true) {
    setScrollWithAnimation(scrollAnimation)
    targetElementId.value = null
    setScrollTop(0)
  }

  const scrollWithAnimation = ref<boolean>(true)

  function setScrollWithAnimation(flag: boolean) {
    scrollWithAnimation.value = flag
  }

  async function scrollToBottom(scrollViewEl: string, scrollContentEl: string, scrollAnimation: boolean = true) {
    setScrollWithAnimation(scrollAnimation)

    const [{ height: scrollViewHeight }, { height: scrollContentHeight }] = (await selectorQueryClientRect([scrollViewEl, scrollContentEl], instance)) as UniApp.NodeInfo[]

    if (scrollContentHeight! > scrollViewHeight!) {
      scrollTop.value = scrollContentHeight! - scrollViewHeight!
    }
  }

  return {
    scrollTop,
    targetElementId,
    scrollToBottom,
    scrollToTop,
    setScrollTop,
    scrollWithAnimation,
    setScrollWithAnimation
  }
}
