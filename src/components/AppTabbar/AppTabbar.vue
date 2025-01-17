<script setup lang="ts">
import type { TabBarItem, TabBarStyles } from './type'
import { computed } from 'vue'
import { useSystemInfo } from '@/common/hooks'

const { selected, tabBarList, styles } = defineProps<{
  selected: number
  tabBarList: TabBarItem[]
  styles: TabBarStyles
}>()

const { safeAreaInsets } = useSystemInfo()

// 默认样式
const defaultStyles: TabBarStyles = {
  background: 'rgba(255, 255, 255, 0.95)',
  height: '100rpx',
  fontSize: '24rpx',
  iconSize: '40rpx',
  color: '#666',
  selectedColor: '#333',
  boxShadow: '0 4px 15px rgba(165, 168, 171, 0.83)',
  borderRadius: '30rpx'
}

// 计算最终的样式
const computedTabBarStyles = computed<TabBarStyles>(() => {
  const mergedStyles = { ...defaultStyles, ...styles }
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
      bottom: `${30 + (safeAreaInsets?.bottom || 0)}rpx`
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
        <image v-if="selected == index && item.selectedIconPath" class="mb-[5rpx] relative z-2" :style="{ width: styles.iconSize, height: styles.iconSize }" :src="item.selectedIconPath" />
        <view v-if="selected != index && item.text" class="relative text-center z-2">
          {{ item.text }}
        </view>
      </view>
    </view>
  </view>
</template>
