import { type CSSProperties } from 'vue'

export interface AppHeaderProps {
  backgroundColor?: string
  keepStatusBarBgColor?: boolean
  showLeft?: boolean
  showCenter?: boolean
  showRight?: boolean
  customStyle?: CSSProperties
  safeAreaInsetTop?: boolean
}

export interface AppHeaderSlots {
  left: []
  center: []
  right: []
}
