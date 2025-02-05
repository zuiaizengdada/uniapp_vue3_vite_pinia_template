import { defaultStyles } from '../../config'
import type { TabBarStyles, TabBarItem } from '../../type'

export function useAppTabbarStyles(customStyles: TabBarStyles, safeAreaInsets: UniApp.SafeAreaInsets | undefined, selected: number, tabBarList: TabBarItem[]) {
  const mergedStyles = { ...defaultStyles, ...customStyles }

  const tabBarStyles = computed<TabBarStyles>(() => ({
    background: mergedStyles.background,
    height: mergedStyles.height,
    fontSize: mergedStyles.fontSize,
    fontWeight: mergedStyles.fontWeight,
    iconSize: mergedStyles.iconSize,
    color: mergedStyles.color,
    selectedColor: mergedStyles.selectedColor,
    boxShadow: mergedStyles.boxShadow,
    borderRadius: mergedStyles.borderRadius,
    bottom: `${30 + (safeAreaInsets?.bottom ?? 0)}rpx`
  }))

  function getTabItemStyles() {
    return {
      width: `${100 / tabBarList.length}%`
    }
  }

  function getTabContentStyles(index: number) {
    return {
      color: selected === index ? mergedStyles.selectedColor : mergedStyles.color,
      fontSize: mergedStyles.fontSize
    }
  }

  function getTabIconStyles() {
    return {
      width: mergedStyles.iconSize,
      height: mergedStyles.iconSize
    }
  }

  const getAnimationStyles = (animationPosition: { x: number; y: number }, isMoving: boolean) => {
    return {
      top: animationPosition.y,
      left: animationPosition.x,
      transform: `translate(-50%, -50%)`,
      opacity: isMoving ? 1 : 0,
      transition: isMoving ? 'left 0.3s, top 0.3s' : 'none',
      objectFit: 'contain'
    }
  }

  const getTabBarContainerStyles = (tabBarStyles: Record<string, any>, tabBarList: TabBarItem[], selected: number) => {
    return [
      tabBarStyles,
      {
        '--tab-count': tabBarList.length,
        '--selected-index': selected
      }
    ]
  }

  return {
    tabBarStyles,
    getTabItemStyles,
    getTabContentStyles,
    getTabIconStyles,
    getAnimationStyles,
    getTabBarContainerStyles
  }
}
