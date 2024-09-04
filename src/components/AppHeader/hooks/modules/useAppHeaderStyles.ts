import { useSystemInfo } from '@/common/hooks'
import { type CSSProperties } from 'vue'
import { type AppHeaderProps } from '../../type'

type useAppHeaderStylesProps = Pick<AppHeaderProps, 'keepStatusBarBgColor' | 'backgroundColor'>

export function useAppHeaderStyles(props: useAppHeaderStylesProps) {
  const { screenWidth, right, height, top, left, safeArea } = useSystemInfo()

  const statusBarBoxStyle = computed<CSSProperties>(() => ({
    height: `${(top || safeArea!.top) ?? 0}px`,
    backgroundColor: props.keepStatusBarBgColor ? props.backgroundColor : 'transparent'
  }))

  const menuButtonBoxStyle = computed<CSSProperties>(() => ({
    height: `${height ?? 50}px`,
    backgroundColor: props.backgroundColor,
    paddingLeft: `${right ? screenWidth - right : 0}px`,
    paddingRight: `${left ? screenWidth - left : 0}px`
  }))

  return {
    statusBarBoxStyle,
    menuButtonBoxStyle
  }
}
