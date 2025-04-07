<template>
  <view class="container">
    <button @click="selectImage">选择图片上传</button>

    <view v-if="filePath" style="margin-top: 20rpx">
      <image :src="filePath" style="width: 200rpx; height: 200rpx" mode="aspectFill" />
    </view>

    <view v-if="isLoading" style="margin-top: 20rpx">
      <text>上传进度：{{ progress }}%</text>
      <progress :percent="progress" show-info stroke-width="4" />
    </view>

    <view v-if="data" style="margin-top: 20rpx">
      <text>上传成功！返回：{{ data }}</text>
    </view>

    <view v-if="error" style="margin-top: 20rpx; color: red">
      <text>上传失败：{{ error.errMsg }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useUploadFile } from '@/common/hooks'
const filePath = ref<string>('')

const { execute, isLoading, data, error, progress } = useUploadFile<string>(
  'https://httpbin.org/post',
  {
    name: 'file'
  },
  {
    immediate: false,
    onSuccess: (res: any) => {
      console.log('上传成功', res)
    },
    onError: (err: any) => {
      console.log('上传失败', err)
    }
  }
)

// 选择图片
const selectImage = () => {
  uni.chooseImage({
    count: 1,
    success(res) {
      filePath.value = res.tempFilePaths[0]
      // 开始上传
      execute({
        filePath: filePath.value
      })
    },
    fail(err) {
      console.error('选择图片失败', err)
    }
  })
}
</script>

<style scoped>
.container {
  padding: 32rpx;
}
</style>
