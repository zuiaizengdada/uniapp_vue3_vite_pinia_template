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
    <button @tap="handleSendMsgToComponent2('组件一改变了组件二的值')">向组件二发送消息</button>
  </view>
</template>
