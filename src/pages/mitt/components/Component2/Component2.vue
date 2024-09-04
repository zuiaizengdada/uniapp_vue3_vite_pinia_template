<script setup lang="ts">
import { useGlobalProperties } from '@/common/hooks'
const { $mitt } = useGlobalProperties()

const text = ref<string>('组件二的值')

$mitt.on('changeMsg', (e) => {
  text.value = e.msg
})
</script>

<template>
  <view class="flex flex-col items-center component2">
    <text>这是组件二</text>
    <text>{{ text }}</text>
  </view>
</template>
