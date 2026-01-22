<script setup lang="ts">
const { userName, setUserName } = useStore('user')

const name = ref('')

onLoad(() => {
  name.value = userName.value
})
</script>

<template>
  <view class="flex flex-col gap-5 p-4">
    <view class="w-full text-center">
      <text>
        {{ userName }}
      </text>
    </view>

    <view class="gap-2 flex-c input-row">
      <input class="rounded-md border border-gray-300 name-input" type="text" v-model="name" />
      <button class="m-0 text-white bg-blue-500 rounded-md action-btn custom-btn" @tap="setUserName(name)">修改名字</button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.input-row {
  height: 72rpx;
}

.name-input {
  flex: 1;
  height: 72rpx;
  line-height: 72rpx;
  padding-left: 24rpx;
  padding-right: 24rpx;
  background-color: #fff;
  /* 注意：字体相关样式和 iOS 基线修复已在全局 reset.scss 和 tailwind.scss 中统一处理 */
}

.action-btn {
  height: 72rpx;
  line-height: 72rpx;
  padding: 0 24rpx;
  box-sizing: border-box;
  font-size: 28rpx;
}

.custom-btn {
  /* 基础样式 */
  display: inline-block;
  margin: 5px;
  padding: 8px 15px;
  font-size: 16px;
  line-height: 1.5;
  text-align: center;
  background-color: #f8f8f8;
  color: #333;
  border-radius: 4px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

/* 针对H5的特定调整 */
/* #ifdef H5 */
button.custom-btn {
  outline: none;

  &::after {
    display: none; /* 移除H5中的after伪元素 */
  }
}
/* #endif */

/* 针对微信小程序的特定调整 */
/* #ifdef MP-WEIXIN */
button.custom-btn {
  overflow: visible;
  background-color: #f8f8f8; /* 确保背景色一致 */

  &::after {
    border: none; /* 移除微信小程序中的默认边框 */
  }
}
/* #endif */

/* 针对头条小程序的特定调整 */
/* #ifdef MP-TOUTIAO */
button.custom-btn {
  overflow: visible;
  background-color: #f8f8f8;

  &::after {
    border: none;
  }
}
/* #endif */
</style>
