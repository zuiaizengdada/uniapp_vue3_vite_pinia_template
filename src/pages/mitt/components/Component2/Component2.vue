<script setup lang="ts">
import { type ComponentInternalInstance } from 'vue'

const {
  appContext: {
    config: {
      globalProperties: { $mitt }
    }
  }
} = getCurrentInstance() as ComponentInternalInstance

const text = ref<string>('组件二的值')

$mitt.on('changeMsg', (e) => {
  text.value = e.msg
})
</script>

<template>
  <view class="component2 flex flex-col items-center">
    <text>这是组件二</text>
    <text>{{ text }}</text>
  </view>
</template>
