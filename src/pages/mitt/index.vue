<script setup lang="ts">
import Component1 from './components/Component1/Component1.vue'
import Component2 from './components/Component2/Component2.vue'
</script>
<template>
  <view class="mitt w-full h-screen flex flex-col items-center justify-center gap-2.5">
    <view class="w-full bg-red-300 flex flex-col items-center justify-center gap-2.5">
      <Component1 ref="component1Ref" :users="[{ name: '曾宇奇' }]" />
    </view>
    <view class="w-full bg-blue-300 flex flex-col items-center justify-center gap-2.5">
      <Component2 />
    </view>
  </view>
</template>
