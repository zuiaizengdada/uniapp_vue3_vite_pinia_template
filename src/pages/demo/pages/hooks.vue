<script setup lang="ts">
import { useUploadFile, usePlatform } from '@/common/hooks'

// Tab状态管理
const currentTab = ref(0)
const tabs = [{ name: '第三方Hooks' }, { name: '自定义Hooks' }]

// useCounter示例
const count = ref(0)
const increment = () => count.value++
const decrement = () => count.value--

// useUploadFile示例
const { uploadFile, isLoading, progress, fileType, filePath } = useUploadFile<string>('https://httpbin.org/post', { name: 'file' }, { immediate: false })

// usePlatform示例
const { isMpWeixin, isH5, isApp } = usePlatform()
const platformInfo = computed(() => {
  if (isMpWeixin) return '微信小程序'
  if (isH5) return 'H5'
  if (isApp) return 'App'
  return '其他平台'
})
</script>

<template>
  <view class="container">
    <!-- Tab切换 -->
    <view class="tabs">
      <view v-for="(tab, index) in tabs" :key="index" :class="['tab-item', { active: currentTab === index }]" @tap="currentTab = index">
        {{ tab.name }}
      </view>
    </view>

    <!-- 内容区域 -->
    <view class="content">
      <!-- 第三方Hooks -->
      <view v-if="currentTab === 0" class="hook-list">
        <view class="hook-card">
          <view class="hook-title">useCounter</view>
          <view class="hook-desc">计数器Hook，提供计数管理功能</view>
          <view class="hook-demo">
            <text class="count">{{ count }}</text>
            <view class="button-group">
              <button @tap="increment">+1</button>
              <button @tap="decrement">-1</button>
            </view>
          </view>
          <view class="hook-code">
            <text>使用方法：</text>
            <text class="code-block">const { count, increment, decrement } = useCounter()</text>
          </view>
        </view>
      </view>

      <!-- 自定义Hooks -->
      <view v-if="currentTab === 1" class="hook-list">
        <!-- useUploadFile Hook -->
        <view class="hook-card">
          <view class="hook-title">useUploadFile</view>
          <view class="hook-desc">文件上传Hook，支持图片、视频、文件上传</view>
          <view class="hook-demo">
            <button @tap="uploadFile({ type: 'image' })">选择图片上传</button>
            <button @tap="uploadFile({ type: 'video' })">选择视频上传</button>
            <button @tap="uploadFile({ type: 'file' })">选择文件上传</button>

            <view v-if="filePath" class="preview">
              <image v-if="fileType === 'image'" :src="filePath" mode="aspectFill" />
              <video v-else-if="fileType === 'video'" :src="filePath" controls></video>
              <view v-else-if="fileType === 'file'" class="file-info">
                <image src="/static/icon/file.png" class="file-icon" />
                <text>{{ filePath.split('/').pop() }}</text>
              </view>
            </view>

            <view v-if="isLoading" class="progress-info">
              <text>上传进度：{{ progress }}%</text>
              <progress :percent="progress" show-info stroke-width="4" />
            </view>
          </view>
          <view class="hook-code">
            <text>使用方法：</text>
            <text class="code-block">const { uploadFile, isLoading, progress } = useUploadFile(url, config)</text>
          </view>
        </view>

        <!-- usePlatform Hook -->
        <view class="hook-card">
          <view class="hook-title">usePlatform</view>
          <view class="hook-desc">平台信息Hook，提供当前运行平台的判断</view>
          <view class="hook-demo">
            <view class="platform-info">
              <text>当前平台：{{ platformInfo }}</text>
            </view>
          </view>
          <view class="hook-code">
            <text>使用方法：</text>
            <text class="code-block">const { isMpWeixin, isH5, isApp } = usePlatform()</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
.container {
  padding: 32rpx;
}

/* Tab样式 */
.tabs {
  display: flex;
  background-color: #fff;
  border-radius: 8rpx;
  margin-bottom: 32rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0rpx;
  z-index: 100;
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 24rpx 0;
  font-size: 28rpx;
  color: #666;
  position: relative;
}

.tab-item.active {
  color: #2979ff;
  font-weight: 500;
}

.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 40rpx;
  height: 4rpx;
  background-color: #2979ff;
  border-radius: 2rpx;
}

/* Hook卡片样式 */
.hook-list {
  display: flex;
  flex-direction: column;
  gap: 32rpx;
}

.hook-card {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 32rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
}

.hook-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 16rpx;
}

.hook-desc {
  font-size: 28rpx;
  color: #666;
  margin-bottom: 32rpx;
}

.hook-demo {
  background-color: #f8f9fa;
  border-radius: 12rpx;
  padding: 24rpx;
  margin-bottom: 24rpx;
}

/* useCounter样式 */
.count {
  font-size: 48rpx;
  font-weight: bold;
  color: #333;
  display: block;
  text-align: center;
  margin-bottom: 24rpx;
}

.button-group {
  display: flex;
  gap: 24rpx;
  justify-content: center;
}

.button-group button {
  min-width: 120rpx;
  font-size: 28rpx;
}

/* useUploadFile样式 */
.preview {
  margin-top: 24rpx;
}

.preview image {
  width: 100%;
  height: 300rpx;
  border-radius: 8rpx;
}

.preview video {
  width: 100%;
  border-radius: 8rpx;
}

.file-info {
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 16rpx;
  border-radius: 8rpx;
}

.file-icon {
  width: 80rpx;
  height: 80rpx;
  margin-right: 20rpx;
}

.progress-info {
  margin-top: 24rpx;
}

/* usePlatform样式 */
.platform-info {
  text-align: center;
  font-size: 32rpx;
  color: #333;
}

/* 代码块样式 */
.hook-code {
  margin-top: 24rpx;
  padding: 24rpx;
  background-color: #f8f9fa;
  border-radius: 8rpx;
}

.code-block {
  display: block;
  font-family: monospace;
  font-size: 24rpx;
  color: #333;
  margin-top: 16rpx;
  padding: 16rpx;
  background-color: #fff;
  border-radius: 4rpx;
  border: 2rpx solid #eee;
}
</style>
