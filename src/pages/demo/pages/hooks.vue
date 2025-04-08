<template>
  <view class="container">
    <button @tap="uploadFile({ type: 'image' })">选择图片上传</button>
    <button @tap="uploadFile({ type: 'video' })">选择视频上传</button>
    <button @tap="uploadFile({ type: 'file' })">选择文件上传</button>

    <view v-if="filePath" style="margin-top: 20rpx">
      <image v-if="fileType === 'image'" :src="filePath" mode="aspectFill" />
      <video v-else-if="fileType === 'video'" :src="filePath" controls></video>
      <view v-else-if="fileType === 'file'" style="display: flex; align-items: center">
        <image src="/static/icon/file.png" style="width: 80rpx; height: 80rpx; margin-right: 20rpx" />
        <view>
          <text>{{ filePath.split('/').pop() }}</text>
        </view>
      </view>
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

const { uploadFile, isLoading, data, error, progress, fileType, filePath } = useUploadFile<string>(
  'https://httpbin.org/post',
  {
    name: 'file'
  },
  {
    immediate: false
  }
)
</script>

<style scoped>
.container {
  padding: 32rpx;
}
</style>
