<script setup lang="ts">
import { useAppTabbar } from './hooks'
import { useSystemInfo } from '@/common/hooks'
import type { AppTabbarProps, AppTabbarEmits } from './type'

const props = defineProps<AppTabbarProps>()
const emit = defineEmits<AppTabbarEmits>()

const { safeAreaInsets } = useSystemInfo()
const { tabBarStyles, getTabItemStyles, getTabContentStyles, getTabIconStyles, switchTab } = useAppTabbar(props, emit, safeAreaInsets)
</script>

<template>
  <view class="fixed left-[15rpx] right-[15rpx] p-[10rpx] flex justify-between items-center" :style="tabBarStyles">
    <view
      v-for="(item, index) in tabBarList"
      :key="index"
      :class="['relative z-2 text-center flex justify-center items-center flex-col py-[15rpx] bg-transparent', { 'current-tab': props.selected == item.id }]"
      :style="getTabItemStyles(index)"
      @click="switchTab(item, index)"
    >
      <view class="flex flex-col items-center transition-transform duration-300 ease-in-out" :class="{ 'font-medium scale-105': props.selected == index }" :style="getTabContentStyles(index)">
        <image v-if="props.selected == index && item.selectedIconPath" class="mb-[5rpx] relative z-2" :style="getTabIconStyles()" :src="item.selectedIconPath" />
        <view v-if="props.selected != index && item.text" class="relative text-center z-2">
          {{ item.text }}
        </view>
      </view>
    </view>
  </view>
</template>
