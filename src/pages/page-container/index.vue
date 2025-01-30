<script setup lang="ts">
import PageIndexComponent from '@/pages/index/index.vue'
import PageMittComponent from '@/pages/mitt/index.vue'
import PageScrollComponent from '@/pages/scroll/index.vue'
import PageWebsocketComponent from '@/pages/websocket/index.vue'
import { tabBarList } from '@/common/constants'
import { type TabBarItem } from '@/components/AppTabbar/type'

const tabIndex = ref(0)

function handleTabChange(_: TabBarItem, index: number) {
  tabIndex.value = index
}
</script>

<template>
  <view class="flex relative flex-col h-screen">
    <scroll-view class="flex-1 h-0 animate-fadeIn" scroll-y v-show="tabIndex === 0">
      <PageIndexComponent :tab-index="tabIndex" />
    </scroll-view>

    <scroll-view class="flex-1 h-0 animate-fadeIn" scroll-y v-show="tabIndex === 1">
      <PageWebsocketComponent :tab-index="tabIndex" />
    </scroll-view>

    <scroll-view class="flex-1 h-0 animate-fadeIn" scroll-y v-show="tabIndex === 2">
      <PageMittComponent :tab-index="tabIndex" />
    </scroll-view>

    <scroll-view class="flex-1 h-0 animate-fadeIn" scroll-y v-show="tabIndex === 3">
      <PageScrollComponent :tab-index="tabIndex" />
    </scroll-view>

    <AppTabbar :selected="tabIndex" :tabBarList="tabBarList" @change="handleTabChange" />
  </view>
</template>
