<template name="skeleton">
  <view class="sk-container">
    <view class="flex relative flex-col h-screen">
      <scroll-view scroll-y="true" class="flex-1 h-0">
        <view class="pages/mitt/index">
          <view
            class="flex flex-col justify-center items-center w-full h-screen mitt-index--flex mitt-index--flex-col gap-2-d-5 mitt-index--gap-2-d-5 mitt-index--justify-center mitt-index--items-center mitt-index--w-full mitt-index--h-screen mitt mitt-index--mitt"
          >
            <view
              class="flex flex-col justify-center items-center w-full bg-red-300 mitt-index--flex mitt-index--flex-col gap-2-d-5 mitt-index--gap-2-d-5 mitt-index--justify-center mitt-index--items-center mitt-index--w-full mitt-index--bg-red-300"
            >
              <view class="r mitt-index--r">
                <view class="flex flex-col items-center Component1--flex Component1--flex-col Component1--items-center component1 Component1--component1 sk-transparent">
                  <text class="sk-transparent sk-text-14-2857-923 sk-text">这是组件一</text>
                  <text class="sk-transparent sk-text-14-2857-74 sk-text">组件一的值</text> [ { "name": "John" }, { "name": "joy" } ]
                  <button class="sk-transparent sk-button sk-pseudo sk-pseudo-circle">向组件二发送消息</button>
                </view>
              </view>
            </view>
            <view
              class="flex flex-col justify-center items-center w-full bg-blue-300 mitt-index--flex mitt-index--flex-col gap-2-d-5 mitt-index--gap-2-d-5 mitt-index--justify-center mitt-index--items-center mitt-index--w-full mitt-index--bg-blue-300"
            >
              <view class="pages/mitt/components/Component2/Component2">
                <view class="flex flex-col items-center Component2--flex Component2--flex-col Component2--items-center component2 Component2--component2">
                  <text class="sk-transparent sk-text-14-2857-720 sk-text">这是组件二</text>
                  <text class="sk-transparent sk-text-14-2857-376 sk-text">组件二的值</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script setup lang="ts"></script>

<style>
.sk-transparent {
  color: transparent !important;
}
.sk-text-14-2857-923 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 44.8rpx;
  position: relative !important;
}
.sk-text {
  background-origin: content-box !important;
  background-clip: content-box !important;
  background-color: transparent !important;
  color: transparent !important;
  background-repeat: repeat-y !important;
}
.sk-text-14-2857-74 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 44.8rpx;
  position: relative !important;
}
.sk-text-14-2857-720 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 44.8rpx;
  position: relative !important;
}
.sk-text-14-2857-376 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 44.8rpx;
  position: relative !important;
}
.sk-button {
  color: #efefef !important;
  background: #efefef !important;
  border: none !important;
  box-shadow: none !important;
}
.sk-pseudo::before,
.sk-pseudo::after {
  background: #efefef !important;
  background-image: none !important;
  color: transparent !important;
  border-color: transparent !important;
}
.sk-pseudo-rect::before,
.sk-pseudo-rect::after {
  border-radius: 0 !important;
}
.sk-pseudo-circle::before,
.sk-pseudo-circle::after {
  border-radius: 50% !important;
}
.sk-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: transparent;
  animation: skeleton-fade 2s linear infinite;
}

@keyframes skeleton-fade {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    opacity: 1;
  }
}
</style>
