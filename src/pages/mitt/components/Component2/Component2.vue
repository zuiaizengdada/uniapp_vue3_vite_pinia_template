<script setup lang="ts">
import { type ComponentInternalInstance } from 'vue'

const {
  appContext: {
    config: {
      globalProperties: { $mitt }
    }
  }
} = getCurrentInstance() as ComponentInternalInstance

let text = ref<string>('组件二的值')

$mitt.on('changeMsg', (e) => {
  text = e.msg
})
</script>

<template>
  <view class="flex flex-col items-center component2">
    <text>这是组件二</text>
    <text>{{ text }}</text>
  </view>
</template>
