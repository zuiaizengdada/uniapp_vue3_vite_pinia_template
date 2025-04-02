<script setup lang="ts" generic="T">
import { useGlobalProperties } from '@/common/hooks'

const { users = [] } = defineProps<{
  users: T[]
}>()

const { $mitt } = useGlobalProperties()

const text = ref<string>('组件一的值')

function handleSendMsgToComponent2(msg: string) {
  $mitt.emit('changeMsg', msg)
}

defineExpose({
  text
})
</script>

<template>
  <view class="flex flex-col items-center component1">
    <text>这是组件一</text>
    <text>{{ text }}</text>
    {{ users }}
    <button class="custom-btn" @tap="handleSendMsgToComponent2('组件一改变了组件二的值')">向组件二发送消息</button>
  </view>
</template>

<style lang="scss" scoped>
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
