import type { TabBarItem } from '../../type'

export function useAppTabbarAnimation(selected: Ref<number>, animation: Ref<boolean | undefined>, tabBarList: Ref<TabBarItem[]>) {
  const isMoving = ref<boolean>(false)
  const targetImage = ref<string>('')

  // 使用computed计算动画位置
  const animationPosition = computed(() => {
    const index = selected.value
    return {
      x: `calc(10rpx + (100% - 20rpx) / ${tabBarList.value.length} * ${index} + (100% - 20rpx) / ${tabBarList.value.length * 2})`,
      y: '50%'
    }
  })

  watch(selected, (newVal) => {
    if (!animation.value) return

    if (tabBarList.value[newVal]?.selectedIconPath) {
      targetImage.value = tabBarList.value[newVal].selectedIconPath
    }

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
