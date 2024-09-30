<script setup lang="ts">
import { createWebSocketInstance, WebSocketService } from '@/common/classes'
import { WS_ID } from '@/common/constants'
import { crypto } from '@/utils'

let websocket: WebSocketService

onMounted(async () => {
  websocket = await createWebSocketInstance(WS_ID, {
    url: 'wss://dev.cloud.hokkj.cn/cloud/hok-ai/ws/chat/',
    protocols: [encodeURIComponent(crypto.secretKey), encodeURIComponent(crypto.handshakeCode)],
    heartBeat: {
      interval: 10000,
      message: {
        user: 'check',
        scene_id: -1,
        llm_type: -1,
        qa_mode: 'check',
        chat_template: null
      }
    },
    onMessage(message) {
      console.log(message)
    }
  })

  websocket.sendMessage({
    user: '你好世界',
    scene_id: 1,
    llm_type: 11,
    qa_mode: 'free',
    conversation_id: '111',
    from_product: 'guzi'
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
