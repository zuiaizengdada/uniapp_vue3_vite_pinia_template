<script setup>
import lottieData from '@/static/animation/lottie.json'
const cLottieRef = ref()
let src = ref('https://mp-eeab6da6-80cd-4e80-844a-66b2a7203834.cdn.bspapp.com/cloudstorage/7b538fb7-d2d5-4524-bf21-6c20e3b5ce6f.json')
let data = ref(null)
const onLoopComplete = (val) => {
  console.log('当前循环播放完成', val)
}

// 定义处理点击的方法
const loadHotItem = () => {
  src.value = 'https://mp-eeab6da6-80cd-4e80-844a-66b2a7203834.cdn.bspapp.com/cloudstorage/7b538fb7-d2d5-4524-bf21-6c20e3b5ce6f.json'
  data.value = null
}

const loadLetterItem = () => {
  src.value = 'https://mp-eeab6da6-80cd-4e80-844a-66b2a7203834.cdn.bspapp.com/cloudstorage/c42b5f05-06b9-43e7-8436-c1029eee610a.json'
  data.value = null
}

const loadLocalItem = () => {
  data.value = lottieData
}
</script>

<template>
  <view>
    <c-lottie ref="cLottieRef" :src="src" :data="data" @LoopComplete="onLoopComplete" width="750rpx" height="750rpx" :loop="true"></c-lottie>
    <view class="content">
      <view>切换图像</view>
      <view>
        <button class="custom-btn" @click="loadHotItem" size="mini">热销(在线链接)</button>
        <button class="custom-btn" @click="loadLetterItem" size="mini">字母(在线链接)</button>
        <button class="custom-btn" @click="loadLocalItem" size="mini">完成(本地)</button>
      </view>
      <view>播放暂停</view>
      <view>
        <button class="custom-btn" @click="cLottieRef.call('play')" size="mini">播放</button>
        <button class="custom-btn" @click="cLottieRef.call('setDirection', -1)" size="mini">反向播放</button>
        <button class="custom-btn" @click="cLottieRef.call('pause')" size="mini">暂停播放</button>
        <button class="custom-btn" @click="cLottieRef.call('stop')" size="mini">停止播放</button>
      </view>
      <view>播放速度</view>
      <view>
        <button class="custom-btn" @click="cLottieRef.call('setSpeed', 1)" size="mini">播放速度1x</button>
        <button class="custom-btn" @click="cLottieRef.call('setSpeed', 2)" size="mini">播放速度2x</button>
      </view>
      <view>播放其它设置</view>
      <view>
        <button class="custom-btn" @click="cLottieRef.call('goToAndStop', [2000, false])" size="mini">跳转到2s并暂停</button>
        <button class="custom-btn" @click="cLottieRef.call('goToAndPlay', [2000, false])" size="mini">跳转到2s并播放</button>
      </view>
      <view>
        <button class="custom-btn" @click="cLottieRef.call('goToAndStop', [2, true])" size="mini">跳转到第2帧并暂停</button>
        <button class="custom-btn" @click="cLottieRef.call('goToAndPlay', [2, true])" size="mini">跳转到第2帧并播放</button>
      </view>
      <view>
        <button class="custom-btn" @click="cLottieRef.call('playSegments', [[10, 20], false])" size="mini">播放完之前的片段，播放10-20帧</button>
      </view>
      <view>
        <button class="custom-btn" @click="cLottieRef.call('playSegments', [[0, 5], [10, 18], true])" size="mini">直接播放0-5帧和10-18帧</button>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
.page {
  width: 100vw;
  overflow-x: hidden;
}
.content {
  padding: 20rpx;
  font-size: 28rpx;
}

.custom-btn {
  /* 基础样式 */
  display: inline-block;
  margin: 5px;
  padding: 8px 15px;
  font-size: 16px;
  line-height: 1.5;
  text-align: center;
  background-color: #f8f8f8;
  color: #333;
  border-radius: 4px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

/* 针对H5的特定调整 */
/* #ifdef H5 */
button.custom-btn {
  outline: none;

  &::after {
    display: none; /* 移除H5中的after伪元素 */
  }
}
/* #endif */

/* 针对微信小程序的特定调整 */
/* #ifdef MP-WEIXIN */
button.custom-btn {
  overflow: visible;
  background-color: #f8f8f8 !important; /* 确保背景色一致 */

  &::after {
    border: none; /* 移除微信小程序中的默认边框 */
  }
}
/* #endif */

/* 针对头条小程序的特定调整 */
/* #ifdef MP-TOUTIAO */
button.custom-btn {
  overflow: visible;
  background-color: #f8f8f8 !important;

  &::after {
    border: none;
  }
}
/* #endif */
</style>
