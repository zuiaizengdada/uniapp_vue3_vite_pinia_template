import { type TabBarItem } from '@/components/AppTabbar/type'

export function usePageContainer() {
  const tabIndex = ref<number>(0)
  const previousIndex = ref<number>(0)
  const slideDirection = ref<'left' | 'right'>('right')
  const isAnimating = ref<boolean>(false)

  // 获取页面动画类
  function getPageAnimationClass(index: number) {
    return {
      'animate-slideInRight': isAnimating.value && slideDirection.value === 'right' && tabIndex.value === index,
      'animate-slideInLeft': isAnimating.value && slideDirection.value === 'left' && tabIndex.value === index,
      'animate-slideOutLeft': isAnimating.value && slideDirection.value === 'right' && previousIndex.value === index,
      'animate-slideOutRight': isAnimating.value && slideDirection.value === 'left' && previousIndex.value === index,
      'z-20': tabIndex.value === index,
      'z-10': previousIndex.value === index,
      'pointer-events-auto': tabIndex.value === index
    }
  }

  // 获取页面显示条件
  function getPageShowCondition(index: number) {
    return tabIndex.value === index || (isAnimating.value && previousIndex.value === index)
  }

  function handleTabChange(_: TabBarItem, index: number) {
    if (isAnimating.value) return
    if (index === tabIndex.value) return

    isAnimating.value = true
    slideDirection.value = index > tabIndex.value ? 'right' : 'left'
    previousIndex.value = tabIndex.value
    tabIndex.value = index

    setTimeout(() => {
      isAnimating.value = false
    }, 300)
  }

  return {
    tabIndex,
    getPageAnimationClass,
    getPageShowCondition,
    handleTabChange
  }
}
