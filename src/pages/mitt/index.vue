<script setup lang="ts">
import Component1 from './components/Component1/Component1.vue'
import Component2 from './components/Component2/Component2.vue'

const props = defineProps<{
  tabIndex: number
}>()

const { tabIndex } = toRefs(props)

const isShow = ref<boolean>(true)
let timer: any
const users = ref<{ name: string }[]>([{ name: 'John' }])

watchEffect(() => {
  if (tabIndex.value === 2) {
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
  <scroll-view class="h-full" scroll-y>
    <AppSkeleton v-if="isShow" />
    <view v-else class="flex flex-col gap-2.5 justify-center items-center w-full h-screen mitt">
      <view class="flex flex-col gap-2.5 justify-center items-center w-full bg-red-300">
        <Component1 ref="component1Ref" :users="users" />
      </view>
      <view class="flex flex-col gap-2.5 justify-center items-center w-full bg-blue-300">
        <Component2 />
      </view>
    </view>
  </scroll-view>
</template>
