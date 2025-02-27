<script setup lang="ts">
import { useAppTabbar } from './hooks'
import { useSystemInfo } from '@/common/hooks'
import { tabBarList } from './config'
import type { AppTabbarProps, AppTabbarEmits } from './type'

const props = withDefaults(defineProps<AppTabbarProps>(), {
  selected: 0,
  styles: () => ({}),
  animation: true,
  tabBarList: () => tabBarList
})
const emits = defineEmits<AppTabbarEmits>()

const { safeAreaInsets } = useSystemInfo()
const {
  tabBarStyles,
  getTabItemStyles,
  getTabContentStyles,
  getTabIconStyles,
  getAnimationStyles,
  getTabBarContainerStyles,
  switchTab,
  animation,
  selected,
  isMoving,
  targetImage,
  animationPosition
} = useAppTabbar(props, emits, safeAreaInsets)
</script>

<template>
  <view class="fixed left-[15rpx] right-[15rpx] p-[10rpx] flex justify-between items-center z-50" :style="getTabBarContainerStyles(tabBarStyles, selected)">
    <!-- 动画圆点，只在启用动画时显示 -->
    <image
      v-if="animation"
      class="absolute w-[25px] h-[25px]"
      :class="[{ invisible: !isMoving, visible: isMoving }, 'transition-all duration-300 ease-in-out']"
      :style="getAnimationStyles(animationPosition, isMoving)"
      :src="targetImage"
    />

    <view
      v-for="(item, index) in tabBarList"
      :key="index"
      :class="[
        'relative z-2 text-center flex justify-center items-center flex-col py-[15rpx] bg-transparent',
        animation ? 'transition-transform duration-300 ease-in-out' : '',
        { 'translate-y-[-5rpx]': selected === index && animation }
      ]"
      :style="getTabItemStyles(index)"
      @click="switchTab(item, index)"
    >
      <view class="flex flex-col items-center" :class="{ 'font-medium': selected === index }" :style="getTabContentStyles(index)">
        <image
          v-if="selected === index && item.selectedIconPath"
          :class="['relative z-2', animation ? 'transition-all duration-300 ease-in-out animate-fadeIn' : '']"
          :style="getTabIconStyles()"
          :src="item.selectedIconPath"
        />
        <view v-if="selected !== index && item.text" :class="['relative text-center z-2', animation ? 'transition-all duration-300 ease-in-out' : '']">
          {{ item.text }}
        </view>
      </view>
    </view>
  </view>
</template>
