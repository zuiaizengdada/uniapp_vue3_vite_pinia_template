<script setup lang="ts">
import { createWebSocketInstance, WebSocketService, removeWebSocketInstance } from '@/common/classes'
import { WS_ID } from '@/common/constants'

let websocket: WebSocketService

onLoad(async () => {
  websocket = await createWebSocketInstance(WS_ID, {
    url: import.meta.env.VITE_WEBSOCKET_URL,
    onMessage(message) {
      receiveMessage.value = message
    }
  })
})

onUnload(() => {
  websocket?.close()
  removeWebSocketInstance(WS_ID)
})

const message = ref('')
const receiveMessage = ref('')

function sendMessage() {
  const messageToSend = String(message.value).trim()
  if (/^\d+$/.test(messageToSend)) {
    websocket.sendMessage('msg:' + messageToSend)
  } else {
    websocket.sendMessage(messageToSend)
  }
}
</script>

<template>
  <view class="flex flex-col gap-5 p-4">
    <view class="gap-2 flex-c-c">
      <input class="p-2 h-full rounded-md border border-gray-300" type="text" v-model="message" />
      <button class="p-2 text-white bg-blue-500 rounded-md custom-btn" @tap="sendMessage">发送</button>
    </view>

    <view class="flex-col gap-2 flex-c">
      <text>WebSocket收到的消息: </text>
      <text>{{ receiveMessage }}</text>
    </view>
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
  background-color: #f8f8f8; /* 确保背景色一致 */

  &::after {
    border: none; /* 移除微信小程序中的默认边框 */
  }
}
/* #endif */

/* 针对头条小程序的特定调整 */
/* #ifdef MP-TOUTIAO */
button.custom-btn {
  overflow: visible;
  background-color: #f8f8f8;

  &::after {
    border: none;
  }
}
/* #endif */
</style>
