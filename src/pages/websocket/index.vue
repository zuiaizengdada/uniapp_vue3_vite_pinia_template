<script setup lang="ts">
import { createWebSocketInstance, WebSocketService, removeWebSocketInstance } from '@/common/classes'
import { WS_ID } from '@/common/constants'
import { crypto } from '@/utils'

let websocket: WebSocketService

const props = defineProps<{
  tabIndex: number
}>()

watchEffect(async () => {
  if (props.tabIndex !== 1) {
    websocket?.close()
    removeWebSocketInstance(WS_ID)
    return
  }

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
    },
    onOpen() {
      console.log('open')
    }
  })

  const isConnected = websocket.isConnected
  console.log(isConnected, 'isConnected')

  websocket.sendMessage({
    user: '你好世界',
    scene_id: 1,
    llm_type: 11,
    qa_mode: 'free',
    conversation_id: '111',
    from_product: 'guzi'
  })
})
</script>

<template>
  <view class="flex justify-center items-center w-full h-screen login">
    <view class="text-center title">
      <text class="text-red-500">登录页面</text>
    </view>
  </view>
</template>
