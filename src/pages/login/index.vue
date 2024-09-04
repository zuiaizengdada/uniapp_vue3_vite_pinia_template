<script setup lang="ts">
import { createWebSocketInstance, WebSocketService } from '@/common/classes'
import { WS_ID } from '@/common/constants'

let websocket: WebSocketService

onMounted(async () => {
  websocket = createWebSocketInstance(WS_ID, {
    url: import.meta.env.VITE_WEBSOCKET_URL,
    shouldReconnect: true
  })

  const isConnected = await websocket.connect()
  if (isConnected) {
    websocket.sendMessage({
      msg: 'hello'
    })
  }

  websocket.onMessage((res) => {
    console.log(res)
  })

  websocket.onReconnectSuccess(() => {
    console.log('重连成功')
  })
})

onUnmounted(() => {
  websocket.close()
})
</script>
<template>
  <view class="flex items-center justify-center w-full h-screen login">
    <view class="text-center title">
      <text class="text-red-500">登录页面</text>
    </view>
  </view>
</template>

<script lang="ts" setup></script>
