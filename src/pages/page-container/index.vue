<script setup lang="ts">
import PageIndexComponent from '@/pages/index/index.vue'
import PageMittComponent from '@/pages/mitt/index.vue'
import PageScrollComponent from '@/pages/scroll/index.vue'
import PageWebsocketComponent from '@/pages/websocket/index.vue'
import { usePageContainer } from './index'

const { tabIndex, getPageClass, getPageStyle, getPageShowCondition, handleTabChange, handleTouchStart, handleTouchMove, handleTouchEnd } = usePageContainer()
</script>

<template>
  <view class="flex relative flex-col h-screen">
    <view class="overflow-hidden relative flex-1 pointer-events-none" @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
      <PageIndexComponent class="absolute inset-0" :class="getPageClass(0)" :style="getPageStyle(0)" v-show="getPageShowCondition(0)" :tab-index="tabIndex" />

      <PageWebsocketComponent class="absolute inset-0" :class="getPageClass(1)" :style="getPageStyle(1)" v-show="getPageShowCondition(1)" :tab-index="tabIndex" />

      <PageMittComponent class="absolute inset-0" :class="getPageClass(2)" :style="getPageStyle(2)" v-show="getPageShowCondition(2)" :tab-index="tabIndex" />

      <PageScrollComponent class="absolute inset-0" :class="getPageClass(3)" :style="getPageStyle(3)" v-show="getPageShowCondition(3)" :tab-index="tabIndex" />
    </view>

    <AppTabbar :selected="tabIndex" @change="handleTabChange" />
  </view>
</template>
