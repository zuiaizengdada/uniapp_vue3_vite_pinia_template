import { useSystemInfo } from '@/hooks'
import { type CSSProperties } from 'vue'
import { type AppHeaderProps } from '../../AppHeader.vue'

type useAppHeaderStylesProps = Pick<AppHeaderProps, 'containStatusBar' | 'backgroundColor'>

export function useAppHeaderStyles(props: useAppHeaderStylesProps) {
  const { screenWidth, right, height, top, left } = useSystemInfo()

  const statusBarBoxStyle = computed<CSSProperties>(() => ({
    height: `${top}px`,
    backgroundColor: props.containStatusBar ? props.backgroundColor : 'transparent'
  }))

  const menuButtonBoxStyle = computed<CSSProperties>(() => ({
    height: height ? `${height}px` : '100%',
    backgroundColor: props.backgroundColor,
    paddingLeft: `${right ? screenWidth - right : 0}px`,
    paddingRight: `${left ? screenWidth - left : 0}px`
  }))

  return {
    statusBarBoxStyle,
    menuButtonBoxStyle
  }
}
