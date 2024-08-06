<script setup lang="ts">
import { useAppHeaderStyles } from './hooks'

export interface AppHeaderProps {
  backgroundColor?: string
  containStatusBar?: boolean
  showBackButton?: boolean
  showTitle?: boolean
}

const props = withDefaults(defineProps<AppHeaderProps>(), {
  backgroundColor: 'red',
  containStatusBar: false,
  showBackButton: false,
  showTitle: true
})

const { statusBarBoxStyle, menuButtonBoxStyle } = useAppHeaderStyles(props)
</script>

<template>
  <view class="app-header">
    <!-- 状态栏头部 -->
    <view :style="statusBarBoxStyle"></view>
    <!-- 状态栏胶囊 -->
    <view class="relative flex items-center justify-between" :style="menuButtonBoxStyle">
      <!-- 左边插槽 -->
      <view class="flex-grow-0 flex-shrink-1 basis-auto">
        <slot name="left">
          <text>返回</text>
        </slot>
      </view>
      <!-- 中间插槽 -->
      <view class="absolute -translate-x-1/2 left-1/2">
        <slot name="center">
          <text>标题</text>
        </slot>
      </view>
    </view>
  </view>
</template>
