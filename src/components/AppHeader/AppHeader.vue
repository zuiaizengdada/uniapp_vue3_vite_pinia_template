<script setup lang="ts">
import { useAppHeaderStyles } from './hooks'
import type { AppHeaderEmits, AppHeaderSlots, AppHeaderProps } from './type'

const props = withDefaults(defineProps<AppHeaderProps>(), {
  backgroundColor: 'red',
  keepStatusBarBgColor: false,
  showLeft: false,
  showCenter: true,
  showRight: false,
  safeAreaInsetTop: true,
  customStyle: () => ({})
})

const emits = defineEmits<AppHeaderEmits>()

defineSlots<AppHeaderSlots>()

const { statusBarBoxStyle, menuButtonBoxStyle } = useAppHeaderStyles({
  backgroundColor: props.backgroundColor,
  keepStatusBarBgColor: props.keepStatusBarBgColor
})
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
          <text @click="emits('leftClick')">返回</text>
        </slot>
      </view>

      <!-- 中间插槽 -->
      <view v-if="showCenter" class="absolute left-1/2 -translate-x-1/2">
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
