import { type CSSProperties } from 'vue'

export interface AppHeaderProps {
  backgroundColor?: string
  keepStatusBarBgColor?: boolean
  showLeft?: boolean
  showCenter?: boolean
  showRight?: boolean
  customStyle?: CSSProperties
  safeAreaInsetTop?: boolean
  centerText?: string
  leftIcon?: string
  rightIcon?: string
  centerStyle?: CSSProperties
  leftStyle?: CSSProperties
  rightStyle?: CSSProperties
}

export interface AppHeaderEmits {
  leftClick: []
  centerClick: []
  rightClick: []
  [key: string]: any
}

export interface AppHeaderSlots {
  left: []
  center: []
  right: []
}
