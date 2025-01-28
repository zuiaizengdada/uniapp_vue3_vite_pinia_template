<script setup lang="ts">
import Component1 from './components/Component1/Component1.vue'
import Component2 from './components/Component2/Component2.vue'

defineProps<{
  tabIndex: number
}>()

const users = ref([{ name: 'John' }])

setTimeout(() => {
  users.value.push({ name: 'joy' })
}, 2000)
</script>
<template>
  <view class="flex flex-col gap-2.5 justify-center items-center w-full h-screen mitt">
    <view class="flex flex-col gap-2.5 justify-center items-center w-full bg-red-300">
      <Component1 ref="component1Ref" :users="users" />
    </view>
    <view class="flex flex-col gap-2.5 justify-center items-center w-full bg-blue-300">
      <Component2 />
    </view>
  </view>
</template>
