<script setup lang="ts">
import { useWebSocket } from '@/hooks'

onMounted(async () => {
  const { sendMessage, connect, onMessage, onReconnectSuccess } = useWebSocket({
    shouldReconnect: false,
    url: import.meta.env.VITE_WEBSOCKET_URL
  })
  const isConnected = await connect()
  if (isConnected) {
    sendMessage({
      msg: 'hello'
    })
  }

  onMessage((res) => {
    console.log(res)
  })

  onReconnectSuccess(() => {
    console.log('重连成功')
  })
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
