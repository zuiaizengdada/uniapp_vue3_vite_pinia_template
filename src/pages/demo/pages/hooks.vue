<script setup lang="ts">
import { ref, computed } from 'vue'
import { useFile } from '@/common/hooks'

// 从useFile钩子中获取上传和下载功能
const { useFileUpload, useFileDownload, taskList } = useFile()
const { chooseAndUploadFile, pauseUpload, resumeUpload, cancelUpload } = useFileUpload()
const { startDownload, pauseDownload, resumeDownload, cancelDownload, openFile } = useFileDownload()

// 上传URL (请替换成您实际的上传接口)
const uploadUrl = ref('https://httpbin.org/post')
// 下载URL (请替换成您实际的下载文件)
const downloadUrl = ref('https://httpbin.org/image/png')

// 上传任务和下载任务
const uploadTasks = computed(() => taskList.value.filter((task) => task.options.url === uploadUrl.value && ['uploading', 'paused', 'pending', 'completed', 'failed'].includes(task.status)))

const downloadTasks = computed(() => taskList.value.filter((task) => task.options.url === downloadUrl.value && ['downloading', 'paused', 'pending', 'completed', 'failed'].includes(task.status)))

// 选择并上传文件
const handleUpload = async () => {
  try {
    const taskIds = await chooseAndUploadFile({
      url: uploadUrl.value,
      fileType: '*', // 允许所有文件类型
      count: 9, // 最多选择9个文件
      name: 'file'
    })
    console.log('上传任务已创建，任务ID:', taskIds)
  } catch (error) {
    console.error('选择文件失败:', error)
    uni.showToast({
      title: '选择文件失败',
      icon: 'none'
    })
  }
}

// 开始下载文件
const handleDownload = () => {
  const taskId = startDownload({
    url: downloadUrl.value,
    // 下载文件保存路径，根据不同平台有不同的处理方式
    filePath: `${(uni as any).env?.USER_DATA_PATH || ''}/downloaded_file.jpg`
  })
  console.log('下载任务已创建，任务ID:', taskId)
}

// 暂停任务
const handlePause = (taskId: string, isDownload = false) => {
  if (isDownload) {
    pauseDownload(taskId)
  } else {
    pauseUpload(taskId)
  }
}

// 恢复任务
const handleResume = (taskId: string, isDownload = false) => {
  if (isDownload) {
    resumeDownload(taskId)
  } else {
    resumeUpload(taskId)
  }
}

// 取消任务
const handleCancel = (taskId: string, isDownload = false) => {
  if (isDownload) {
    cancelDownload(taskId)
  } else {
    cancelUpload(taskId)
  }
}

// 打开下载的文件
const handleOpenFile = (task: any) => {
  if (task.options.filePath) {
    openFile(task.options.filePath)
  } else {
    uni.showToast({
      title: '文件路径不存在',
      icon: 'none'
    })
  }
}

// 格式化文件大小
const formatSize = (size?: number) => {
  if (!size) return '未知'
  if (size < 1024) return `${size}B`
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)}KB`
  return `${(size / (1024 * 1024)).toFixed(2)}MB`
}

// 获取文件名
const getFileName = (task: any) => {
  if (task.options.filePath) {
    return task.options.filePath.split('/').pop() || '未知文件'
  }
  return '未知文件'
}

// 获取状态文本
const getStatusText = (status: string) => {
  const statusMap: Record<string, string> = {
    pending: '准备中',
    uploading: '上传中',
    downloading: '下载中',
    paused: '已暂停',
    completed: '已完成',
    failed: '失败'
  }
  return statusMap[status] || '未知'
}

// 格式化速度
const formatSpeed = (speed?: number) => {
  if (!speed) return ''
  if (speed < 1024) return `${speed}B/s`
  if (speed < 1024 * 1024) return `${(speed / 1024).toFixed(2)}KB/s`
  return `${(speed / (1024 * 1024)).toFixed(2)}MB/s`
}
</script>

<template>
  <view class="hooks-container">
    <view class="hooks-header">
      <text class="hooks-title">hooks合集 - useFile演示</text>
    </view>

    <view class="file-section">
      <view class="section-title">文件上传</view>

      <view class="action-buttons">
        <button class="primary-btn" @click="handleUpload">选择并上传文件</button>
      </view>

      <view class="task-list" v-if="uploadTasks.length > 0">
        <view v-for="task in uploadTasks" :key="task.id" class="task-item">
          <view class="task-header">
            <text class="file-name">{{ getFileName(task) }}</text>
            <text class="task-status" :class="'status-' + task.status">{{ getStatusText(task.status) }}</text>
          </view>

          <view class="task-progress">
            <view class="progress-bar">
              <view class="progress-inner" :style="{ width: task.progress + '%' }"></view>
            </view>
            <view class="progress-info">
              <text class="progress-text">{{ task.progress }}%</text>
              <text v-if="task.speed" class="speed-text">{{ formatSpeed(task.speed) }}</text>
            </view>
          </view>

          <view class="file-info" v-if="task.totalSize">
            <text>{{ formatSize(task.currentSize) }} / {{ formatSize(task.totalSize) }}</text>
          </view>

          <view class="task-actions">
            <button v-if="task.status === 'uploading'" class="action-btn" @click="handlePause(task.id)">暂停</button>
            <button v-if="task.status === 'paused'" class="action-btn" @click="handleResume(task.id)">继续</button>
            <button v-if="task.status !== 'completed'" class="action-btn cancel-btn" @click="handleCancel(task.id)">取消</button>
          </view>
        </view>
      </view>
      <view v-else class="no-tasks">
        <text>暂无上传任务</text>
      </view>
    </view>

    <view class="file-section">
      <view class="section-title">文件下载</view>

      <view class="action-buttons">
        <button class="primary-btn" @click="handleDownload">开始下载文件</button>
      </view>

      <view class="task-list" v-if="downloadTasks.length > 0">
        <view v-for="task in downloadTasks" :key="task.id" class="task-item">
          <view class="task-header">
            <text class="file-name">{{ task.options.url.split('/').pop() || '未知文件' }}</text>
            <text class="task-status" :class="'status-' + task.status">{{ getStatusText(task.status) }}</text>
          </view>

          <view class="task-progress">
            <view class="progress-bar">
              <view class="progress-inner" :style="{ width: task.progress + '%' }"></view>
            </view>
            <view class="progress-info">
              <text class="progress-text">{{ task.progress }}%</text>
              <text v-if="task.speed" class="speed-text">{{ formatSpeed(task.speed) }}</text>
            </view>
          </view>

          <view class="file-info" v-if="task.totalSize">
            <text>{{ formatSize(task.currentSize) }} / {{ formatSize(task.totalSize) }}</text>
          </view>

          <view class="task-actions">
            <button v-if="task.status === 'downloading'" class="action-btn" @click="handlePause(task.id, true)">暂停</button>
            <button v-if="task.status === 'paused'" class="action-btn" @click="handleResume(task.id, true)">继续</button>
            <button v-if="task.status !== 'completed'" class="action-btn cancel-btn" @click="handleCancel(task.id, true)">取消</button>
            <button v-if="task.status === 'completed'" class="action-btn" @click="handleOpenFile(task)">打开</button>
          </view>
        </view>
      </view>
      <view v-else class="no-tasks">
        <text>暂无下载任务</text>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.hooks-container {
  padding: 20rpx;
}

.hooks-header {
  margin-bottom: 30rpx;
}

.hooks-title {
  font-size: 32rpx;
  font-weight: bold;
}

.file-section {
  background-color: #ffffff;
  border-radius: 12rpx;
  padding: 20rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 30rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
  color: #333;
}

.action-buttons {
  margin-bottom: 20rpx;
}

.primary-btn {
  background-color: #007aff;
  color: #fff;
  border: none;
  font-size: 28rpx;
  padding: 12rpx 30rpx;
  border-radius: 6rpx;
}

.task-list {
  margin-top: 20rpx;
}

.task-item {
  background-color: #f8f8f8;
  border-radius: 8rpx;
  padding: 16rpx;
  margin-bottom: 16rpx;
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16rpx;
}

.file-name {
  font-size: 28rpx;
  color: #333;
  max-width: 70%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.task-status {
  font-size: 24rpx;
  padding: 4rpx 12rpx;
  border-radius: 20rpx;
  background-color: #e0e0e0;
}

.status-uploading,
.status-downloading {
  background-color: #e3f2fd;
  color: #1976d2;
}

.status-paused {
  background-color: #fff8e1;
  color: #ff8f00;
}

.status-completed {
  background-color: #e8f5e9;
  color: #388e3c;
}

.status-failed {
  background-color: #ffebee;
  color: #d32f2f;
}

.task-progress {
  margin-bottom: 12rpx;
}

.progress-bar {
  height: 6rpx;
  background-color: #e0e0e0;
  border-radius: 3rpx;
  overflow: hidden;
  margin-bottom: 8rpx;
}

.progress-inner {
  height: 100%;
  background-color: #007aff;
  transition: width 0.3s;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  font-size: 24rpx;
  color: #666;
}

.file-info {
  font-size: 24rpx;
  color: #666;
  margin-bottom: 12rpx;
}

.task-actions {
  display: flex;
  gap: 16rpx;
}

.action-btn {
  font-size: 24rpx;
  padding: 6rpx 20rpx;
  border-radius: 4rpx;
  background-color: #f0f0f0;
  color: #333;
}

.cancel-btn {
  background-color: #f5f5f5;
  color: #f44336;
}

.no-tasks {
  text-align: center;
  padding: 40rpx 0;
  color: #999;
  font-size: 28rpx;
}
</style>
