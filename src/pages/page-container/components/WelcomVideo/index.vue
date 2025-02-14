<script setup lang="ts">
import { useWelcomVideo } from './hooks'

const { handleSkip } = useWelcomVideo()
</script>

<template>
  <!-- 视频背景 -->
  <video
    class="object-cover relative w-full h-full z-1"
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
    @click.stop
    @touchstart.stop
    @touchmove.stop
    @touchend.stop
    :enable-play-gesture="false"
    :vslide-gesture="false"
    :vslide-gesture-in-fullscreen="false"
  >
    <!-- Logo区域 -->
    <cover-view class="flex absolute top-1/2 left-1/2 flex-col gap-10 items-center -translate-x-1/2 -translate-y-1/2 z-2" style="z-index: 9999">
      <button class="bg-white/20 text-white border-2 border-white rounded-[40rpx] px-[60rpx] py-[20rpx] text-[32rpx] active:opacity-80 !opacity-100 !block" @tap="handleSkip">开始体验</button>
    </cover-view>
  </video>
</template>
