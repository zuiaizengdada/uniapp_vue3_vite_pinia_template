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
    <view class="flex-c-c">
      <input class="p-2 h-full rounded-md border border-gray-300" type="text" v-model="message" />
      <button class="p-2 text-white bg-blue-500 rounded-md" @tap="sendMessage">发送</button>
    </view>

    <view class="flex-c-c">
      <text>WebSocket收到的消息: </text>
      <text>{{ receiveMessage }}</text>
    </view>
  </view>
</template>
