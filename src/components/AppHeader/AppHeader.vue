<script setup lang="ts">
import { useAppHeaderStyles } from './hooks'
import { type CSSProperties } from 'vue'
import type { AppHeaderEmits, AppHeaderSlots, AppHeaderProps } from './type'

const {
  backgroundColor = 'red',
  keepStatusBarBgColor = false,
  showLeft = false,
  showCenter = true,
  showRight = false,
  customStyle = {} as CSSProperties,
  safeAreaInsetTop = true
} = defineProps<AppHeaderProps>()

const emits = defineEmits<AppHeaderEmits>()

defineSlots<AppHeaderSlots>()

const { statusBarBoxStyle, menuButtonBoxStyle } = useAppHeaderStyles({
  backgroundColor,
  keepStatusBarBgColor
})
</script>

<template>
  <view class="w-full z-[1000] top app-header" :style="customStyle">
    <!-- 状态栏头部 -->
    <view v-if="safeAreaInsetTop" :style="statusBarBoxStyle"></view>

    <!-- 状态栏胶囊 -->
    <view class="relative flex items-center justify-between" :style="menuButtonBoxStyle">
      <!-- 左边插槽 -->
      <view v-if="showLeft" class="flex-grow-0 flex-shrink-1 basis-auto">
        <slot name="left">
          <text @click="emits('leftClick')">返回</text>
        </slot>
      </view>

      <!-- 中间插槽 -->
      <view v-if="showCenter" class="absolute -translate-x-1/2 left-1/2">
        <slot name="center">
          <text @click="emits('centerClick')">标题</text>
        </slot>
      </view>

      <!-- 右边插槽 -->
      <view v-if="showRight" class="flex-grow-0 flex-shrink-1 basis-auto">
        <slot name="right">
          <text @click="emits('rightClick')">更多</text>
        </slot>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.app-header {
  background-color: v-bind(backgroundColor);
}
</style>
