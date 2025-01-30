<script setup lang="ts">
import PageIndexComponent from '@/pages/index/index.vue'
import PageMittComponent from '@/pages/mitt/index.vue'
import PageScrollComponent from '@/pages/scroll/index.vue'
import PageWebsocketComponent from '@/pages/websocket/index.vue'
import { tabBarList } from '@/common/constants'
import { usePageContainer } from './index'

const { tabIndex, getPageAnimationClass, getPageShowCondition, handleTabChange, handleTouchStart, handleTouchMove, handleTouchEnd } = usePageContainer()
</script>

<template>
  <view class="flex relative flex-col h-screen">
    <view class="overflow-hidden relative flex-1 pointer-events-none" @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
      <scroll-view class="absolute inset-0 h-full" :class="getPageAnimationClass(0)" :style="getPageAnimationClass(0).style" scroll-y v-show="getPageShowCondition(0)">
        <PageIndexComponent :tab-index="tabIndex" />
      </scroll-view>

      <scroll-view class="absolute inset-0 h-full" :class="getPageAnimationClass(1)" :style="getPageAnimationClass(1).style" scroll-y v-show="getPageShowCondition(1)">
        <PageWebsocketComponent :tab-index="tabIndex" />
      </scroll-view>

      <scroll-view class="absolute inset-0 h-full" :class="getPageAnimationClass(2)" :style="getPageAnimationClass(2).style" scroll-y v-show="getPageShowCondition(2)">
        <PageMittComponent :tab-index="tabIndex" />
      </scroll-view>

      <scroll-view class="absolute inset-0 h-full" :class="getPageAnimationClass(3)" :style="getPageAnimationClass(3).style" scroll-y v-show="getPageShowCondition(3)">
        <PageScrollComponent :tab-index="tabIndex" />
      </scroll-view>
    </view>

    <AppTabbar class="z-50" :selected="tabIndex" :animation="true" :tabBarList="tabBarList" @change="handleTabChange" />
  </view>
</template>
