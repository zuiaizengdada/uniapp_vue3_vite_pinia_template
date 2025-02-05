import { useAppTabbarStyles } from './modules/useAppTabbarStyles'
import { useAppTabbarAnimation } from './modules/useAppTabbarAnimation'
import type { AppTabbarProps, AppTabbarEmits, TabBarItem } from '../type'

export function useAppTabbar(props: AppTabbarProps, emit: AppTabbarEmits, safeAreaInsets: UniApp.SafeAreaInsets | undefined) {
  const { tabBarStyles, getTabItemStyles, getTabContentStyles, getTabIconStyles, getAnimationStyles, getTabBarContainerStyles } = useAppTabbarStyles(
    props.styles!,
    safeAreaInsets,
    props.selected,
    props.tabBarList
  )

  const { selected, animation, tabBarList } = toRefs(props)
  const { isMoving, targetImage, animationPosition } = useAppTabbarAnimation(selected, animation!, tabBarList)

  const switchTab = (item: TabBarItem, index: number) => {
    emit('change', item, index)
  }

  return {
    ...toRefs(props),
    tabBarStyles,
    getTabItemStyles,
    getTabContentStyles,
    getTabIconStyles,
    getAnimationStyles,
    getTabBarContainerStyles,
    switchTab,
    isMoving,
    targetImage,
    animationPosition
  }
}
