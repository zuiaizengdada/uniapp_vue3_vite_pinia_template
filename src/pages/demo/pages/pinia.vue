<script setup lang="ts">
const { userName, setUserName } = useStore('user')
</script>

<template>
  <view class="flex flex-col gap-5 p-4">
    <view class="w-full text-center">
      <text>
        {{ userName }}
      </text>
    </view>

    <view>
      <button @tap="setUserName('曾哥（已本地持久化缓存）')">修改名字 pinia 数据持久化</button>
    </view>
  </view>
</template>
