import { useSystemInfo } from '@/hooks'
import { type CSSProperties } from 'vue'
import { type AppHeaderProps } from '../AppHeader.vue'

type useAppHeaderStylesProps = Pick<AppHeaderProps, 'containStatusBar' | 'backgroundColor'>

export function useAppHeaderStyles(props: useAppHeaderStylesProps) {
  const { screenWidth, right, height, top } = useSystemInfo()

  const statusBarBoxStyle = computed<CSSProperties>(() => ({
    height: `${top}px`,
    backgroundColor: props.containStatusBar ? props.backgroundColor : 'transparent'
  }))

  const menuButtonBoxStyle = computed<CSSProperties>(() => ({
    height: `${height}px`,
    backgroundColor: props.backgroundColor,
    paddingLeft: `${screenWidth - right}px`
  }))

  return {
    statusBarBoxStyle,
    menuButtonBoxStyle
  }
}
