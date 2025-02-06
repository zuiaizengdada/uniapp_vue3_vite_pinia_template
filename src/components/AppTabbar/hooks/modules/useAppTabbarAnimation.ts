import type { TabBarItem } from '../../type'

export function useAppTabbarAnimation(selected: Ref<number>, animation: Ref<boolean | undefined>, tabBarList: TabBarItem[]) {
  const isMoving = ref<boolean>(false)
  const targetImage = ref<string>('')

  // 使用computed计算动画位置
  const animationPosition = computed(() => {
    const index = selected.value
    return {
      x: `calc(10rpx + (100% - 20rpx) / ${tabBarList.length} * ${index} + (100% - 20rpx) / ${tabBarList.length * 2})`,
      y: '50%'
    }
  })

  watch(selected, (newVal) => {
    if (!animation.value) return

    const iconPath = tabBarList[newVal].selectedIconPath
    if (!iconPath) {
      console.warn(`Tab ${newVal} 缺少 selectedIconPath`)
      return
    }
    targetImage.value = iconPath

    isMoving.value = true
    setTimeout(() => {
      isMoving.value = false
    }, 300)
  })

  return {
    isMoving,
    targetImage,
    animationPosition
  }
}
