<script setup lang="ts">
import { router } from '@/utils'

const { navigateTo } = router

const list = [
  {
    id: 1,
    icon: 'language',
    name: '多语言切换(国际化)',
    path: '/pages/demo/pages/language-switch'
  },
  {
    id: 2,
    icon: 'scroll',
    name: '列表滚动',
    path: '/pages/demo/pages/list-scroll'
  },
  {
    id: 3,
    icon: 'websocket',
    name: 'WebSocket',
    path: '/pages/demo/pages/web-socket'
  }
]
</script>
<template>
  <view class="p-4 w-screen h-screen">
    <view class="flex flex-col gap-1">
      <text class="text-2xl font-bold break-words">uniapp_vue3_vite_pinia_cli</text>
      <text class="text-gray-500 text-md">基于hooks的uniapp项目模板</text>
      <text class="text-sm">
        此项目是uniapp+vue3+vite+pinia+tailwindcss+mock技术栈组成的模板，集成了各种优秀的工具库，如vue-use，lodash，mitt，tanStack Query等等，可用于APP、小程序、h5项目的快速搭建。
      </text>
    </view>

    <text class="block my-4 font-bold text-md">功能示例</text>

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
</template>

<style lang="scss" scoped></style>
