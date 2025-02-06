import { type TabBarItem } from '@/components/AppTabbar/type'
import home from '@/static/icon/home.svg'
import homeActive from '@/static/icon/home-active.svg'
import websocket from '@/static/icon/websocket.svg'
import websocketActive from '@/static/icon/websocket-active.svg'
import mitt from '@/static/icon/mitt.svg'
import mittActive from '@/static/icon/mitt-active.svg'
import scroll from '@/static/icon/scroll.svg'
import scrollActive from '@/static/icon/scroll-active.svg'

export const tabBarList: TabBarItem[] = [
  {
    id: 0,
    pagePath: '/pages/index/index',
    iconPath: home,
    selectedIconPath: homeActive,
    text: '首页'
  },
  {
    id: 1,
    pagePath: '/pages/websocket/index',
    iconPath: websocket,
    selectedIconPath: websocketActive,
    text: 'websocket'
  },
  {
    id: 2,
    pagePath: '/pages/mitt/index',
    iconPath: mitt,
    selectedIconPath: mittActive,
    text: 'mitt'
  },
  {
    id: 3,
    pagePath: '/pages/scroll/index',
    iconPath: scroll,
    selectedIconPath: scrollActive,
    text: 'scroll'
  }
] as const
