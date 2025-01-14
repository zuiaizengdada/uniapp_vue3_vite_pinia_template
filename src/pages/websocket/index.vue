<script setup lang="ts">
import { createWebSocketInstance, WebSocketService } from '@/common/classes'
import { tabBarList } from '@/common/constants'
import { WS_ID } from '@/common/constants'
import { crypto } from '@/utils'

let websocket: WebSocketService

onShow(async () => {
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

onHide(() => {
  websocket.close()
})
</script>
<template>
  <view class="flex justify-center items-center w-full h-screen login">
    <view class="text-center title">
      <text class="text-red-500">登录页面</text>
    </view>
  </view>

  <AppTabbar
    :selected="1"
    :tabBarList="tabBarList"
    :styles="{
      background: 'linear-gradient(to right, #4A90E2, #67B26F)',
      color: 'rgba(255,255,255,0.7)',
      selectedColor: '#ffffff',
      fontSize: '26rpx'
    }"
  />
</template>
