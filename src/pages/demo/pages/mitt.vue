<script setup lang="ts">
import Component1 from '../components/Component1.vue'
import Component2 from '../components/Component2.vue'

const isShow = ref<boolean>(true)
let timer: any
const users = ref<{ name: string }[]>([{ name: 'John' }])

onLoad(() => {
  timer = setTimeout(() => {
    isShow.value = false
    users.value.push({ name: 'joy' })
  }, 2000)
})

onUnload(() => {
  isShow.value = true
  users.value = [{ name: 'John' }]
  clearTimeout(timer)
})
</script>
<template>
  <AppSkeleton v-if="isShow" />
  <view v-else class="flex flex-col gap-4 justify-center items-center w-full h-screen">
    <view class="flex flex-col gap-4 justify-center items-center w-full bg-red-300">
      <Component1 ref="component1Ref" :users="users" />
    </view>
    <view class="flex flex-col gap-4 justify-center items-center w-full bg-blue-300">
      <Component2 />
    </view>
  </view>
</template>
