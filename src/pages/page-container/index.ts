import { type TabBarItem } from '@/components/AppTabbar/type'
import { tabBarList } from '@/common/constants'

export function usePageContainer() {
  const tabIndex = ref<number>(0)
  const previousIndex = ref<number>(0)
  const isAnimating = ref<boolean>(false)
  const touchStartX = ref<number>(0)
  const minSwipeDistance = 50 // 最小滑动距离
  const translateX = ref<number>(0)
  const isDragging = ref<boolean>(false)
  const screenWidth = ref(uni.getSystemInfoSync().windowWidth)

  // 获取页面动画类
  function getPageAnimationClass(index: number) {
    const style = {
      transform: `translateX(${getTranslateX(index)}px)`,
      transition: isAnimating.value ? 'transform 0.3s ease-out' : 'none'
    }

    return {
      'z-20': tabIndex.value === index || isDragging.value,
      'pointer-events-auto': tabIndex.value === index,
      style
    }
  }

  // 计算页面的位移
  function getTranslateX(index: number): number {
    const baseOffset = (index - tabIndex.value) * screenWidth.value

    if (isDragging.value || isAnimating.value) {
      // 在拖动或动画时，基于当前页面位置计算偏移
      return baseOffset + translateX.value
    }

    // 静止状态下，直接返回基础偏移
    return baseOffset
  }

  // 获取页面显示条件
  function getPageShowCondition(index: number) {
    // 显示当前页面和相邻页面
    return isDragging.value ? Math.abs(index - tabIndex.value) <= 1 : tabIndex.value === index || (isAnimating.value && previousIndex.value === index)
  }

  function handleTabChange(_: TabBarItem, index: number) {
    if (isAnimating.value) return
    if (index === tabIndex.value) return

    isAnimating.value = true
    previousIndex.value = tabIndex.value
    tabIndex.value = index
    translateX.value = 0 // 在这里重置位移

    setTimeout(() => {
      isAnimating.value = false
    }, 300)
  }

  function handleTouchStart(event: TouchEvent) {
    if (isAnimating.value) return
    isDragging.value = true
    touchStartX.value = event.touches[0].clientX
  }

  function handleTouchMove(event: TouchEvent) {
    if (!isDragging.value) return
    const currentX = event.touches[0].clientX
    const diff = currentX - touchStartX.value

    // 限制第一页向右滑动和最后一页向左滑动
    if ((tabIndex.value === 0 && diff > 0) || (tabIndex.value === tabBarList.length - 1 && diff < 0)) {
      translateX.value = 0 // 禁止滑动
    } else {
      translateX.value = diff
    }
  }

  function handleTouchEnd(event: TouchEvent) {
    if (!isDragging.value) return

    const touchEndX = event.changedTouches[0].clientX
    const distance = touchEndX - touchStartX.value
    const progress = Math.abs(distance / screenWidth.value)

    // 判断是否满足切换条件：超过最小滑动距离或滑动超过屏幕宽度的 20%
    const shouldSwitch = Math.abs(distance) > minSwipeDistance || progress > 0.2

    isDragging.value = false

    if (shouldSwitch) {
      // 向左滑动，切换到下一个标签
      if (distance < 0 && tabIndex.value < tabBarList.length - 1) {
        handleTabChange(tabBarList[tabIndex.value + 1], tabIndex.value + 1)
      }
      // 向右滑动，切换到上一个标签
      else if (distance > 0 && tabIndex.value > 0) {
        handleTabChange(tabBarList[tabIndex.value - 1], tabIndex.value - 1)
      }
    } else {
      // 如果不切换，添加回弹动画
      isAnimating.value = true
      translateX.value = 0
      setTimeout(() => {
        isAnimating.value = false
      }, 300)
    }
  }

  return {
    tabIndex,
    getPageAnimationClass,
    getPageShowCondition,
    handleTabChange,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  }
}
