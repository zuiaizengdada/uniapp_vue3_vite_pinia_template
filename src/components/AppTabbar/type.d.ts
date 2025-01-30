export interface AppTabbarProps {
  selected: number
  tabBarList: TabBarItem[]
  styles?: TabBarStyles
  animation?: boolean
}

export interface AppTabbarEmits {
  (event: 'change', item: TabBarItem, index: number): void
}

export interface TabBarItem {
  id: number
  pagePath: string
  iconPath?: string
  selectedIconPath?: string
  text?: string
}

export interface TabBarStyles {
  background?: string
  backgroundImage?: string
  height?: string
  fontSize?: string
  fontWeight?: string
  iconSize?: string
  color?: string
  selectedColor?: string
  boxShadow?: string
  borderRadius?: string
  itemWidth?: string
  itemHeight?: string
  activeScale?: number
  spacing?: string
}
