<script setup lang="ts">
import { router } from '@/utils'
import { usePlatform } from '@/common/hooks'

const { isH5 } = usePlatform()

const { navigateTo } = router

const list = [
  {
    id: 1,
    icon: 'Language',
    name: '多语言切换(国际化)',
    path: '/pages/demo/pages/language-switch'
  },
  {
    id: 2,
    icon: 'Scroll',
    name: '列表滚动',
    path: '/pages/demo/pages/list-scroll'
  },
  {
    id: 3,
    icon: 'WebSocket',
    name: 'WebSocket',
    path: '/pages/demo/pages/web-socket'
  },
  {
    id: 4,
    icon: 'Lottie',
    name: 'Lottie动画',
    path: '/pages/demo/pages/lottie'
  },
  {
    id: 5,
    icon: 'Mitt',
    name: 'Mitt通信(兄弟组件)',
    path: '/pages/demo/pages/mitt'
  },
  {
    id: 6,
    icon: 'Skeleton',
    name: '骨架屏',
    path: '/pages/demo/pages/skeleton'
  },
  {
    id: 7,
    icon: 'Pinia',
    name: 'Pinia数据持久化',
    path: '/pages/demo/pages/pinia'
  },
  {
    id: 8,
    icon: 'Mock',
    name: 'Mock数据(Posts)',
    path: '/pages/demo/pages/mock'
  },
  {
    id: 9,
    icon: 'TanStackQuery',
    name: 'TanStack Query示例(Todo List)',
    path: '/pages/demo/pages/tanstack-query'
  },
  {
    id: 10,
    icon: 'Hooks',
    name: '常用hook合集',
    path: '/pages/demo/pages/hooks'
  }
]
</script>
<template>
  <view
    class="flex flex-col p-4"
    :style="{
      height: isH5 ? 'calc(100vh - 44px)' : '100vh'
    }"
  >
    <view class="flex flex-col gap-1">
      <text class="text-2xl font-bold break-words">uniapp_vue3_vite_pinia_cli</text>
      <text class="text-gray-500 break-words text-md">基于hooks的uniapp项目模板</text>
      <text class="text-sm">
        此项目是uniapp + vue3 + vite + pinia + tailwindcss + mock技术栈组成的模板，集成了各种优秀的工具库，如vue-use，lodash，mitt，tanStack Query等等，可用于APP、小程序、h5项目的快速搭建。
      </text>
    </view>

    <text class="block my-4 font-bold text-md">功能示例</text>

    <view class="overflow-auto flex-1">
      <view class="flex flex-col gap-2">
        <view v-for="item in list" :key="item.id" class="p-2 bg-gray-100 rounded-md flex-c-sb" @tap="navigateTo(item.path)">
          <view class="flex-c-sa">
            <!-- <uni-icons :type="item.icon" size="20" color="#999" /> -->
            <text>{{ item.name }}</text>
          </view>
          <uni-icons type="arrowright" size="20" color="#999" />
        </view>
      </view>
    </view>
  </view>
</template>
