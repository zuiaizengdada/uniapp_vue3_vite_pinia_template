import { tabBarList } from '@/components/AppTabbar/config'
import { type TabBarItem } from '@/components/AppTabbar/type'

export function usePageContainer() {
  const tabIndex = ref<number>(0)
  const previousIndex = ref<number>(0)
  const isAnimating = ref<boolean>(false)
  const touchStartX = ref<number>(0)
  const minSwipeDistance = 50 // 最小滑动距离
  const translateX = ref<number>(0)
  const isDragging = ref<boolean>(false)
  const screenWidth = ref(uni.getSystemInfoSync().windowWidth)

  // 计算页面的位移
  const getTranslateX = computed(() => {
    return (index: number): number => {
      const baseOffset = (index - tabIndex.value) * screenWidth.value

      if (isDragging.value || isAnimating.value) {
        return baseOffset + translateX.value
      }

      return baseOffset
    }
  })

  // 获取页面样式类
  const getPageClass = computed(() => {
    return (index: number) => ({
      'z-20': tabIndex.value === index || isDragging.value,
      'pointer-events-auto': tabIndex.value === index
    })
  })

  // 获取页面样式
  const getPageStyle = computed(() => {
    return (index: number) => ({
      transform: `translateX(${getTranslateX.value(index)}px)`,
      transition: isAnimating.value ? 'transform 0.3s ease-out' : 'none'
    })
  })

  // 获取页面显示条件
  const getPageShowCondition = computed(() => {
    return (index: number) => (isDragging.value ? Math.abs(index - tabIndex.value) <= 1 : tabIndex.value === index || (isAnimating.value && previousIndex.value === index))
  })

  function handleTabChange(_: TabBarItem, index: number, fromSwipe: boolean = false) {
    if (isAnimating.value) return
    if (index === tabIndex.value) return

    previousIndex.value = tabIndex.value
    tabIndex.value = index
    translateX.value = 0 // 在这里重置位移

    // 只有在滑动触发时才添加动画
    if (fromSwipe) {
      isAnimating.value = true
      setTimeout(() => {
        isAnimating.value = false
      }, 300)
    }
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
        handleTabChange(tabBarList[tabIndex.value + 1], tabIndex.value + 1, true) // 传入 true 表示是滑动触发
      }
      // 向右滑动，切换到上一个标签
      else if (distance > 0 && tabIndex.value > 0) {
        handleTabChange(tabBarList[tabIndex.value - 1], tabIndex.value - 1, true) // 传入 true 表示是滑动触发
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
    getPageClass,
    getPageStyle,
    getPageShowCondition,
    handleTabChange,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  }
}
