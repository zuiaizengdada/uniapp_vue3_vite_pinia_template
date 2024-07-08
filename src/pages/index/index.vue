<script setup lang="ts">
const { userName, setUserName } = useStore('user')
</script>

<template>
  <view class="index">
    {{ userName }}

    <button @tap="setUserName('zengdada1')">修改名字</button>
  </view>
</template>

<style lang="scss" scoped>
.index {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
