<script setup lang="ts">
const { userName, setUserName } = useStore('user')
</script>

<template>
  <view class="index">
    <view class="name">
      {{ userName }}
    </view>

    <view class="btn">
      <button @tap="setUserName('zengdada1')">修改名字</button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.index {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .name {
    width: 100%;
    text-align: center;
  }

  .btn {
    margin-top: 10px;
  }
}
</style>
