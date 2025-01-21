export interface AppTabbarProps {
  selected: number
  tabBarList: TabBarItem[]
  styles: TabBarStyles
}

export interface AppTabbarEmits {
  (event: 'change', index: number): void
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
