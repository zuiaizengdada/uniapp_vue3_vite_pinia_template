import { computed } from 'vue'
import { defaultStyles } from '../../config'
import type { TabBarStyles, TabBarItem } from '../../type'

export function useAppTabbarStyles(customStyles: TabBarStyles, safeAreaInsets: UniApp.SafeAreaInsets | undefined, selected: number, tabBarList: TabBarItem[]) {
  const mergedStyles = { ...defaultStyles, ...customStyles }

  const tabBarStyles = computed<TabBarStyles>(() => ({
    background: mergedStyles.background,
    height: mergedStyles.height,
    fontSize: mergedStyles.fontSize,
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

  return {
    tabBarStyles,
    getTabItemStyles,
    getTabContentStyles,
    getTabIconStyles
  }
}
