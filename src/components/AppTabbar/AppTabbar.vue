<script setup lang="ts">
import type { TabBarItem, TabBarStyles } from './type'
import { computed } from 'vue'
import { useSystemInfo } from '@/common/hooks'

const props = defineProps<{
  selected: number
  tabBarList: TabBarItem[]
  styles: TabBarStyles
}>()

const { safeAreaInsets } = useSystemInfo()

// 默认样式
const defaultStyles: TabBarStyles = {
  background: 'rgba(255, 255, 255, 0.95)',
  height: '120rpx',
  fontSize: '24rpx',
  iconSize: '40rpx',
  color: '#666',
  selectedColor: '#333',
  boxShadow: '0 4px 15px rgba(165, 168, 171, 0.83)',
  borderRadius: '30rpx'
}

// 计算最终的样式
const computedTabBarStyles = computed<TabBarStyles>(() => {
  const mergedStyles = { ...defaultStyles, ...props.styles }
  return {
    background: mergedStyles.background,
    backgroundImage: mergedStyles.backgroundImage,
    height: mergedStyles.height,
    boxShadow: mergedStyles.boxShadow,
    borderRadius: mergedStyles.borderRadius,
    paddingBottom: `${safeAreaInsets?.bottom || 0}px`
  }
})

// 发出点击事件
const emit = defineEmits<{
  change: [index: number]
}>()

// 修改 switchTab 函数
const switchTab = (item: TabBarItem, index: number) => {
  emit('change', index)
  const url = item.pagePath
  uni.switchTab({
    url
  })
}

uni.hideTabBar()
</script>

<template>
  <view
    class="fixed left-[15rpx] right-[15rpx] p-[10rpx] flex justify-between items-center"
    :style="{
      ...computedTabBarStyles,
      bottom: `${15 + (safeAreaInsets?.bottom || 0)}rpx`
    }"
  >
    <view
      v-for="(item, index) in tabBarList"
      :key="index"
      :class="['relative z-2 text-center flex justify-center items-center flex-col py-[15rpx] bg-transparent', { 'current-tab': selected == item.id }]"
      :style="{ width: `${100 / tabBarList.length}%` }"
      @click="switchTab(item, index)"
    >
      <view
        class="flex flex-col items-center transition-transform duration-300 ease-in-out"
        :class="{ 'font-medium scale-105': selected == index }"
        :style="{
          color: selected == index ? styles.selectedColor : styles.color,
          fontSize: styles.fontSize
        }"
      >
        <image v-if="item.iconPath" class="mb-[5rpx]" :style="{ width: styles.iconSize, height: styles.iconSize }" :src="selected == index ? item.selectedIconPath : item.iconPath" />
        <view v-if="item.text" class="text-center">{{ item.text }}</view>
      </view>
    </view>
  </view>
</template>
