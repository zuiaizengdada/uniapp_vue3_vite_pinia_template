<script setup lang="ts">
import { useScroll } from '@/common/hooks'
import { ComponentInternalInstance } from 'vue'

const instance = getCurrentInstance() as ComponentInternalInstance
const { scrollTop, scrollToBottom } = useScroll(instance)

scrollToBottom('.scroll-container', '.scroll-content')
</script>

<template>
  <scroll-view class="scroll-container h-[400px] bg-red-500" :scrollTop="scrollTop" scroll-with-animation scroll-y>
    <view class="scroll-content">
      <template v-for="item in 100" :key="item">
        <view :id="`id${item}`" class="item">{{ item }}</view>
      </template>
    </view>
  </scroll-view>
</template>
