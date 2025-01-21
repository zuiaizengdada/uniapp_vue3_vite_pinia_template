import { useAppTabbarStyles } from './modules/useAppTabbarStyles'
import { router } from '@/utils'
import type { AppTabbarProps, AppTabbarEmits, TabBarItem } from '../type'

export function useAppTabbar(props: AppTabbarProps, emit: AppTabbarEmits, safeAreaInsets: UniApp.SafeAreaInsets | undefined) {
  const { tabBarStyles, getTabItemStyles, getTabContentStyles, getTabIconStyles } = useAppTabbarStyles(props.styles, safeAreaInsets, props.selected, props.tabBarList)

  const switchTab = (item: TabBarItem, index: number) => {
    emit('change', index)

    router.switchTab(item.pagePath)
  }

  uni.hideTabBar()

  return {
    tabBarStyles,
    getTabItemStyles,
    getTabContentStyles,
    getTabIconStyles,
    switchTab
  }
}
