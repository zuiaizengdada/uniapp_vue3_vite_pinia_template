<script setup lang="ts">
import { useWebSocket } from '@vueuse/core'

const { status, send, close } = useWebSocket(import.meta.env.VITE_WEBSOCKET_URL, {
  onConnected: () => {
    console.log('onConnected')
  },
  onDisconnected: () => {
    console.log('onDisconnected')
  },
  onMessage: (_, { data }: MessageEvent) => {
    console.log(data)
  },
  autoReconnect: {
    delay: 1000,
    retries: 10
  }
})

onMounted(() => {
  if (status.value === 'CONNECTING') {
    send('hello')
  }
})

onUnmounted(() => {
  close()
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
