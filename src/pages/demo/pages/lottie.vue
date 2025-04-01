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
      <view class="btnBox">
        <button @click="loadHotItem" size="mini">热销(在线链接)</button>
        <button @click="loadLetterItem" size="mini">字母(在线链接)</button>
        <button @click="loadLocalItem" size="mini">完成(本地)</button>
      </view>
      <view>播放暂停</view>
      <view class="btnBox">
        <button @click="cLottieRef.call('play')" size="mini">播放</button>
        <button @click="cLottieRef.call('setDirection', -1)" size="mini">反向播放</button>
        <button @click="cLottieRef.call('pause')" size="mini">暂停播放</button>
        <button @click="cLottieRef.call('stop')" size="mini">停止播放</button>
      </view>
      <view>播放速度</view>
      <view class="btnBox">
        <button @click="cLottieRef.call('setSpeed', 1)" size="mini">播放速度1x</button>
        <button @click="cLottieRef.call('setSpeed', 2)" size="mini">播放速度2x</button>
      </view>
      <view>播放其它设置</view>
      <view class="btnBox">
        <button @click="cLottieRef.call('goToAndStop', [2000, false])" size="mini">跳转到2s并暂停</button>
        <button @click="cLottieRef.call('goToAndPlay', [2000, false])" size="mini">跳转到2s并播放</button>
      </view>
      <view class="btnBox">
        <button @click="cLottieRef.call('goToAndStop', [2, true])" size="mini">跳转到第2帧并暂停</button>
        <button @click="cLottieRef.call('goToAndPlay', [2, true])" size="mini">跳转到第2帧并播放</button>
      </view>
      <view class="btnBox">
        <button @click="cLottieRef.call('playSegments', [[10, 20], false])" size="mini">播放完之前的片段，播放10-20帧</button>
      </view>
      <view class="btnBox">
        <button
          @click="
            cLottieRef.call('playSegments', [
              [
                [0, 5],
                [10, 18]
              ],
              true
            ])
          "
          size="mini"
        >
          直接播放0-5帧和10-18帧
        </button>
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
.btnBox {
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 20rpx;
  margin-bottom: 30rpx;
}
</style>
