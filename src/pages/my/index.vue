<script lang="ts" setup>
import { useScroll } from '@/common/hooks'
import { type ComponentInternalInstance } from 'vue'

const instance = getCurrentInstance() as ComponentInternalInstance

const { scrollTop, scrollToBottom } = useScroll(instance)
onMounted(() => {
  scrollToBottom('.list', '.content')
})
</script>

<template>
  <view class="my">
    <!-- 列表 -->
    <scroll-view :scroll-top scroll-y scroll-with-animation class="list">
      <view class="content">
        <view class="item" v-for="item in 20" :key="item">
          <text class="iconfont icon-dingdan"></text>
          <text>我的订单</text>
          <text class="iconfont icon-you"></text>

          <view class="badge"> 2 </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<style lang="scss" scoped>
.my {
  background-color: #f7f7f7;
  .list {
    background-color: #fff;
    padding: 0 20rpx;
    height: 500px;

    .item {
      height: 100rpx;
      line-height: 100rpx;
      display: flex;
      align-items: center;
      font-size: 30rpx;
      position: relative;
      margin-bottom: 20px;
      .iconfont {
        width: 40rpx;
        font-size: 40rpx;
      }
      .icon-dingdan {
        color: #ff6600;
      }
      .icon-you {
        color: #ccc;
        position: absolute;
        right: 0;
      }
      .badge {
        background-color: #ff6600;
        color: #fff;
        padding: 0 10rpx;
        height: 30rpx;
        line-height: 30rpx;
        border-radius: 20rpx;
        position: absolute;
        right: 60rpx;
        top: 35rpx;
        font-size: 20rpx;
      }
    }
  }
}
</style>
