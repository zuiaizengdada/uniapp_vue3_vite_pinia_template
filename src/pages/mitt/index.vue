<script setup lang="ts">
import Component1 from './components/Component1/Component1.vue'
import Component2 from './components/Component2/Component2.vue'

const props = defineProps<{
  tabIndex: number
}>()

const isShow = ref(true)
let timer: any
const users = ref([{ name: 'John' }])

watchEffect(() => {
  if (props.tabIndex === 2) {
    timer = setTimeout(() => {
      isShow.value = false
      users.value.push({ name: 'joy' })
    }, 2000)
  } else {
    isShow.value = true
    users.value = [{ name: 'John' }]
    clearTimeout(timer)
  }
})
</script>
<template>
  <AppSkeleton v-if="isShow" />
  <view v-else class="flex flex-col gap-2.5 justify-center items-center w-full h-screen mitt">
    <view class="flex flex-col gap-2.5 justify-center items-center w-full bg-red-300">
      <Component1 ref="component1Ref" :users="users" />
    </view>
    <view class="flex flex-col gap-2.5 justify-center items-center w-full bg-blue-300">
      <Component2 />
    </view>
  </view>
</template>
