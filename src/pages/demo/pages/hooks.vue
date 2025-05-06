<script setup lang="ts">
import { useUploadFile, usePlatform, useRouter, useSelectorQuery, useUniStorage } from '@/common/hooks'
import { ref, computed, getCurrentInstance, ComponentInternalInstance } from 'vue'

// 新增Hooks
const useModal = () => {
  const showModal = (options: UniApp.ShowModalOptions) => uni.showModal(options)
  const confirm = (title: string, content: string) => {
    return new Promise<void>((resolve, reject) => {
      showModal({
        title,
        content,
        success: (res) => (res.confirm ? resolve() : reject()),
        fail: reject
      })
    })
  }
  return { showModal, confirm }
}

const useLoading = () => {
  const isLoading = ref(false)
  const show = (title = '加载中') => {
    isLoading.value = true
    uni.showLoading({ title })
  }
  const hide = () => {
    isLoading.value = false
    uni.hideLoading()
  }
  return { isLoading, show, hide }
}

const useNavigate = () => {
  const navigateTo = (url: string) => uni.navigateTo({ url })
  const redirectTo = (url: string) => uni.redirectTo({ url })
  const switchTab = (url: string) => uni.switchTab({ url })
  const navigateBack = (delta = 1) => uni.navigateBack({ delta })
  return { navigateTo, redirectTo, switchTab, navigateBack }
}

const useSystemInfo = () => {
  const systemInfo = ref<UniApp.GetSystemInfoResult>(uni.getSystemInfoSync())
  const { platform, screenWidth, screenHeight, windowWidth, windowHeight, statusBarHeight } = systemInfo.value
  return {
    systemInfo,
    platform,
    screenWidth,
    screenHeight,
    windowWidth,
    windowHeight,
    statusBarHeight
  }
}

// Tab状态管理
const currentTab = ref(0)
const tabs = [{ name: '第三方Hooks' }, { name: '自定义Hooks' }]

// useCounter示例
const count = ref(0)
const increment = () => count.value++
const decrement = () => count.value--

// useStorage示例
const storageKey = 'demo-storage'
const storedValue = ref('')
const setStorageValue = (value: string) => {
  uni.setStorageSync(storageKey, value)
  storedValue.value = value
}
const getStorageValue = () => {
  const value = uni.getStorageSync(storageKey)
  storedValue.value = value || ''
}
function handleStoreInput(event: { detail: { value: string } }) {
  const value = event.detail.value
  setStorageValue(value)
}

// useThrottle示例
const throttleCount = ref(0)
const isThrottling = ref(false)
const throttledIncrement = () => {
  if (isThrottling.value) return
  isThrottling.value = true
  throttleCount.value++
  setTimeout(() => {
    isThrottling.value = false
  }, 1000)
}

// useDebounce示例
const searchText = ref('')
const searchResult = ref('')
let debounceTimer: number | null = null
const debouncedSearch = (text: string) => {
  searchText.value = text
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    searchResult.value = `搜索结果：${text}`
  }, 500) as unknown as number
}
function handleSearchInput(event: { detail: { value: string } }) {
  const text = event.detail.value
  debouncedSearch(text)
}

// useClipboard示例
const clipboardText = ref('')
const copyText = (text: string) => {
  uni.setClipboardData({
    data: text,
    success: () => {
      uni.showToast({ title: '复制成功', icon: 'success' })
    }
  })
}
const pasteText = () => {
  uni.getClipboardData({
    success: (res) => {
      clipboardText.value = res.data
    }
  })
}

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

// 新增Hooks示例
const { showModal, confirm } = useModal()
const { isLoading: loadingState, show: showLoading, hide: hideLoading } = useLoading()
const { navigateTo, redirectTo, switchTab, navigateBack } = useNavigate()
const { platform, screenWidth, screenHeight } = useSystemInfo()

// useRouter示例
const { navigateTo: routerNavigateTo, redirectTo: routerRedirectTo, navigateBack: routerNavigateBack, reLaunch } = useRouter()

// useSelectorQuery示例
const instance = getCurrentInstance() as ComponentInternalInstance
const elementInfo = ref<UniApp.NodeInfo | null>(null)
const getElementInfo = async () => {
  elementInfo.value = (await useSelectorQuery('.query-element', instance)) as UniApp.NodeInfo
}

// useUniStorage示例
const storage = useUniStorage()
const storageTestKey = 'test-key'
const storageTestValue = ref('')
const setTestStorage = () => {
  storage.setSync(storageTestKey, storageTestValue.value)
  uni.showToast({ title: '存储成功', icon: 'success' })
}
const getTestStorage = () => {
  const value = storage.getSync(storageTestKey)
  storageTestValue.value = value || ''
}
const clearTestStorage = () => {
  storage.removeSync(storageTestKey)
  storageTestValue.value = ''
  uni.showToast({ title: '已清除', icon: 'success' })
}
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
        <!-- useModal Hook -->
        <view class="hook-card">
          <view class="hook-title">useModal</view>
          <view class="hook-desc">模态框Hook，提供对话框和确认框功能</view>
          <view class="hook-demo">
            <view class="button-group">
              <button @tap="showModal({ title: '提示', content: '这是一个模态框示例', showCancel: true })">显示模态框</button>
              <button @tap="confirm('确认', '确定要执行此操作吗？').then(() => uni.showToast({ title: '已确认' }))">确认对话框</button>
            </view>
          </view>
          <view class="hook-code">
            <text>使用方法：</text>
            <text class="code-block">const { showModal, confirm } = useModal()</text>
          </view>
        </view>

        <!-- useLoading Hook -->
        <view class="hook-card">
          <view class="hook-title">useLoading</view>
          <view class="hook-desc">加载状态Hook，提供加载提示框控制</view>
          <view class="hook-demo">
            <view class="button-group">
              <button @tap="showLoading('数据加载中...')">显示加载</button>
              <button @tap="hideLoading()">隐藏加载</button>
            </view>
            <view class="loading-status" v-if="loadingState">
              <text>加载状态：正在加载</text>
            </view>
          </view>
          <view class="hook-code">
            <text>使用方法：</text>
            <text class="code-block">const { isLoading, show, hide } = useLoading()</text>
          </view>
        </view>

        <!-- useNavigate Hook -->
        <view class="hook-card">
          <view class="hook-title">useNavigate</view>
          <view class="hook-desc">页面导航Hook，提供页面跳转功能</view>
          <view class="hook-demo">
            <view class="button-group">
              <button @tap="navigateTo('/pages/index/index')">页面跳转</button>
              <button @tap="redirectTo('/pages/index/index')">页面重定向</button>
              <button @tap="switchTab('/pages/index/index')">切换Tab</button>
              <button @tap="navigateBack()">返回上页</button>
            </view>
          </view>
          <view class="hook-code">
            <text>使用方法：</text>
            <text class="code-block">const { navigateTo, redirectTo, switchTab, navigateBack } = useNavigate()</text>
          </view>
        </view>

        <!-- useSystemInfo Hook -->
        <view class="hook-card">
          <view class="hook-title">useSystemInfo</view>
          <view class="hook-desc">系统信息Hook，提供设备和系统信息</view>
          <view class="hook-demo">
            <view class="system-info">
              <text>平台：{{ platform }}</text>
              <text>屏幕宽度：{{ screenWidth }}px</text>
              <text>屏幕高度：{{ screenHeight }}px</text>
            </view>
          </view>
          <view class="hook-code">
            <text>使用方法：</text>
            <text class="code-block">const { systemInfo, platform, screenWidth, screenHeight } = useSystemInfo()</text>
          </view>
        </view>

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

        <!-- useStorage Hook -->
        <view class="hook-card">
          <view class="hook-title">useStorage</view>
          <view class="hook-desc">本地存储Hook，提供数据持久化功能</view>
          <view class="hook-demo">
            <input type="text" v-model="storedValue" placeholder="输入要存储的内容" class="input-field" @input="handleStoreInput" />
            <view class="button-group">
              <button @tap="getStorageValue">读取存储</button>
            </view>
            <view class="storage-value" v-if="storedValue">
              <text>存储的值：{{ storedValue }}</text>
            </view>
          </view>
          <view class="hook-code">
            <text>使用方法：</text>
            <text class="code-block">const { value, setValue, getValue } = useStorage(key)</text>
          </view>
        </view>

        <!-- useThrottle Hook -->
        <view class="hook-card">
          <view class="hook-title">useThrottle</view>
          <view class="hook-desc">节流Hook，限制函数执行频率</view>
          <view class="hook-demo">
            <text class="count">点击次数：{{ throttleCount }}</text>
            <view class="button-group">
              <button @tap="throttledIncrement" :disabled="isThrottling">点击（1秒内只能点击一次）</button>
            </view>
          </view>
          <view class="hook-code">
            <text>使用方法：</text>
            <text class="code-block">const throttledFn = useThrottle(fn, delay)</text>
          </view>
        </view>

        <!-- useDebounce Hook -->
        <view class="hook-card">
          <view class="hook-title">useDebounce</view>
          <view class="hook-desc">防抖Hook，延迟执行函数</view>
          <view class="hook-demo">
            <input type="text" :value="searchText" placeholder="输入搜索内容（停止输入0.5秒后显示结果）" class="input-field" @input="handleSearchInput" />
            <view class="search-result" v-if="searchResult">
              <text>{{ searchResult }}</text>
            </view>
          </view>
          <view class="hook-code">
            <text>使用方法：</text>
            <text class="code-block">const debouncedFn = useDebounce(fn, delay)</text>
          </view>
        </view>

        <!-- useClipboard Hook -->
        <view class="hook-card">
          <view class="hook-title">useClipboard</view>
          <view class="hook-desc">剪贴板Hook，提供复制和粘贴功能</view>
          <view class="hook-demo">
            <input type="text" v-model="clipboardText" placeholder="输入要复制的内容" class="input-field" />
            <view class="button-group">
              <button @tap="copyText(clipboardText)">复制</button>
              <button @tap="pasteText">粘贴</button>
            </view>
          </view>
          <view class="hook-code">
            <text>使用方法：</text>
            <text class="code-block">const { copy, paste } = useClipboard()</text>
          </view>
        </view>
      </view>

      <!-- 自定义Hooks -->
      <view v-if="currentTab === 1" class="hook-list">
        <!-- useUploadFile Hook -->
        <view class="hook-list">
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

          <!-- useRouter Hook -->
          <view class="hook-card">
            <view class="hook-title">useRouter</view>
            <view class="hook-desc">路由导航Hook，提供页面跳转、重定向、返回等功能</view>
            <view class="hook-demo">
              <view class="button-group">
                <button @tap="routerNavigateTo('/pages/index/index', { id: 1 })">带参数跳转</button>
                <button @tap="routerRedirectTo('/pages/index/index')">重定向</button>
                <button @tap="routerNavigateBack()">返回</button>
                <button @tap="reLaunch('/pages/index/index')">重新启动</button>
              </view>
            </view>
            <view class="hook-code">
              <text>使用方法：</text>
              <text class="code-block">const { navigateTo, redirectTo, navigateBack, reLaunch } = useRouter()</text>
            </view>
          </view>

          <!-- useSelectorQuery Hook -->
          <view class="hook-card">
            <view class="hook-title">useSelectorQuery</view>
            <view class="hook-desc">元素查询Hook，提供DOM元素信息获取功能</view>
            <view class="hook-demo">
              <view class="query-element" style="width: 200rpx; height: 200rpx; background-color: #2979ff"></view>
              <view class="button-group">
                <button @tap="getElementInfo">获取元素信息</button>
              </view>
              <view v-if="elementInfo" class="element-info">
                <text>宽度：{{ elementInfo.width }}px</text>
                <text>高度：{{ elementInfo.height }}px</text>
                <text>上边距：{{ elementInfo.top }}px</text>
                <text>左边距：{{ elementInfo.left }}px</text>
              </view>
            </view>
            <view class="hook-code">
              <text>使用方法：</text>
              <text class="code-block">const elementInfo = await useSelectorQuery('.query-element', instance)</text>
            </view>
          </view>

          <!-- useUniStorage Hook -->
          <view class="hook-card">
            <view class="hook-title">useUniStorage</view>
            <view class="hook-desc">本地存储Hook，提供更便捷的UniApp存储操作</view>
            <view class="hook-demo">
              <input type="text" v-model="storageTestValue" placeholder="输入要存储的内容" class="input-field" />
              <view class="button-group">
                <button @tap="setTestStorage">保存</button>
                <button @tap="getTestStorage">读取</button>
                <button @tap="clearTestStorage">清除</button>
              </view>
            </view>
            <view class="hook-code">
              <text>使用方法：</text>
              <text class="code-block">const storage = useUniStorage()</text>
            </view>
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

/* useLoading样式 */
.loading-status {
  margin-top: 24rpx;
  padding: 16rpx;
  background-color: #fff;
  border-radius: 8rpx;
  text-align: center;
  color: #2979ff;
}

/* useSystemInfo样式 */
.system-info {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.system-info text {
  font-size: 28rpx;
  color: #333;
  padding: 12rpx;
  background-color: #fff;
  border-radius: 8rpx;
}

/* 输入框样式 */
.input-field {
  width: 100%;
  height: 80rpx;
  padding: 0 24rpx;
  margin-bottom: 24rpx;
  background-color: #fff;
  border-radius: 8rpx;
  border: 2rpx solid #eee;
  font-size: 28rpx;
}

/* 存储值显示 */
.storage-value {
  margin-top: 24rpx;
  padding: 16rpx;
  background-color: #fff;
  border-radius: 8rpx;
  border: 2rpx solid #eee;
}

/* 搜索结果 */
.search-result {
  margin-top: 24rpx;
  padding: 16rpx;
  background-color: #fff;
  border-radius: 8rpx;
  border: 2rpx solid #eee;
  overflow: auto;
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

/* useScroll样式 */
.scroll-view {
  height: 400rpx;
  background-color: #fff;
  border-radius: 8rpx;
  border: 2rpx solid #eee;
}

.scroll-content {
  padding: 20rpx;
}

.scroll-item {
  padding: 20rpx;
  margin-bottom: 20rpx;
  background-color: #f8f9fa;
  border-radius: 8rpx;
}

/* useSelectorQuery样式 */
.query-element {
  margin-bottom: 20rpx;
}

.element-info {
  margin-top: 20rpx;
  padding: 20rpx;
  background-color: #fff;
  border-radius: 8rpx;
  border: 2rpx solid #eee;
}

.element-info text {
  display: block;
  margin-bottom: 10rpx;
  font-size: 28rpx;
  color: #333;
}
</style>
