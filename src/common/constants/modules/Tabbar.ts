import { TabBarItem } from '@/components/AppTabbar/types'

export const tabBarList: TabBarItem[] = [
  {
    id: 0,
    pagePath: '/pages/index/index',

    text: '首页'
  },
  {
    id: 1,
    pagePath: '/pages/websocket/index',
    text: 'websocket'
  },
  {
    id: 2,
    pagePath: '/pages/mitt/index',
    text: 'mitt'
  },
  {
    id: 3,
    pagePath: '/pages/scroll/index',
    text: 'scroll'
  }
] as const
