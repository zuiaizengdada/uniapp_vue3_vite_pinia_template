<script setup lang="ts">
import { useAppHeaderStyles } from './hooks'
import type { AppHeaderEmits, AppHeaderSlots, AppHeaderProps } from './type'

const props = withDefaults(defineProps<AppHeaderProps>(), {
  backgroundColor: 'transparent',
  keepStatusBarBgColor: false,
  showLeft: false,
  showCenter: true,
  showRight: false,
  safeAreaInsetTop: true,
  centerText: '标题',
  leftIcon: '',
  rightIcon: '',
  customStyle: () => ({}),
  centerStyle: () => ({}),
  rightStyle: () => ({}),
  leftStyle: () => ({})
})

const emits = defineEmits<AppHeaderEmits>()

defineSlots<AppHeaderSlots>()

const { statusBarBoxStyle, menuButtonBoxStyle } = useAppHeaderStyles(props)
</script>

<template>
  <view class="w-full z-[1000] fixed top-0 left-0 right-0" :style="{ backgroundColor, ...customStyle }">
    <!-- 状态栏头部 -->
    <view v-if="safeAreaInsetTop" :style="statusBarBoxStyle"></view>

    <!-- 状态栏胶囊 -->
    <view class="flex relative justify-between items-center" :style="menuButtonBoxStyle">
      <!-- 左边插槽 -->
      <view v-if="showLeft" class="flex-grow-0 flex-shrink-1 basis-auto">
        <slot name="left">
          <text v-if="leftIcon" class="iconfont" :class="leftIcon" @click="emits('leftClick')" :style="props.leftStyle"></text>
          <text v-else @click="emits('leftClick')" :style="props.leftStyle">返回</text>
        </slot>
      </view>

      <!-- 中间插槽 -->
      <view v-if="showCenter" class="absolute left-1/2 -translate-x-1/2">
        <slot name="center">
          <text @click="emits('centerClick')" :style="props.centerStyle">{{ props.centerText }}</text>
        </slot>
      </view>

      <!-- 右边插槽 -->
      <view v-if="showRight" class="flex-grow-0 flex-shrink-1 basis-auto">
        <slot name="right">
          <text v-if="rightIcon" class="iconfont" :class="rightIcon" @click="emits('rightClick')" :style="props.rightStyle"></text>
          <text v-else @click="emits('rightClick')" :style="props.rightStyle">更多</text>
        </slot>
      </view>
    </view>
  </view>
</template>
