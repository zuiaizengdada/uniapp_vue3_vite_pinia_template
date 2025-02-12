<script setup lang="ts">
import { router } from '@/utils'
function handleSkip() {
  router.redirectTo('/pages/page-container/index')
}

onMounted(() => {
  // 设置页面全屏
  uni.setNavigationBarColor({
    frontColor: '#ffffff',
    backgroundColor: '#000000'
  })
})
</script>

<template>
  <view class="relative w-screen h-screen bg-black">
    <!-- 视频背景 -->
    <video
      class="object-cover absolute top-0 left-0 w-full h-full z-1"
      src="https://hok-one-oss.oss-accelerate.aliyuncs.com/hok_web/video/7jo2otk120g000051.mov"
      autoplay
      loop
      muted
      :controls="false"
      :show-play-btn="false"
      :enable-progress-gesture="false"
      :show-progress="false"
      :show-fullscreen-btn="false"
      :show-center-play-btn="false"
      object-fit="cover"
    />

    <!-- Logo区域 -->
    <view class="flex absolute top-1/2 left-1/2 flex-col gap-10 items-center -translate-x-1/2 -translate-y-1/2 z-2">
      <button class="bg-white/20 text-white border-2 border-white rounded-[40rpx] px-[60rpx] py-[20rpx] text-[32rpx] active:opacity-80" @tap="handleSkip">开始体验</button>
    </view>
  </view>
</template>
