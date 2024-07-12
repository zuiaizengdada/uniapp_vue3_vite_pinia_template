<script setup lang="ts">
import { type ComponentInternalInstance } from 'vue'

const {
  appContext: {
    config: {
      globalProperties: { $mitt }
    }
  }
} = getCurrentInstance() as ComponentInternalInstance

const text = ref<string>('组件一的值')

function handleSendMsgToComponent2(msg: string) {
  $mitt.emit('changeMsg', { msg })
}
</script>

<template>
  <view class="component1 flex flex-col items-center">
    <text>这是组件一</text>
    <text>{{ text }}</text>
    <button @tap="handleSendMsgToComponent2('组件一改变了组件二的值')">向组件二发送消息</button>
  </view>
</template>
