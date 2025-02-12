<script setup lang="ts">
import { useGlobalProperties, useSystemInfo } from '@/common/hooks'
import { createPost, deletePost, getPosts, getPostById, updatePost } from '@/apis'
import { useAppHeaderStyles } from '@/components/AppHeader/hooks'
import { isH5 } from '@/utils'

const { userName, setUserName } = useStore('user')
const { windowHeight, windowWidth, screenWidth, screenHeight, safeAreaInsets, height, top, safeArea } = useSystemInfo()

const props = defineProps<{
  tabIndex: number
}>()

const { tabIndex } = toRefs(props)

onMounted(async () => {
  if (tabIndex.value !== 0) return

  const { getBoundingClientRect } = useSelectorQuery()
  const rect = await getBoundingClientRect('.page-container')
  console.log(rect)

  console.log(`屏幕宽度：${windowWidth}`)
  console.log(`屏幕高度：${windowHeight}`)
  console.log(`可使用窗口宽度：${screenWidth}`)
  console.log(`可使用窗口高度：${screenHeight}`)

  const res = await getPosts()
  console.log(res)

  const res2 = await getPostById(1)
  console.log(res2)

  const res3 = await updatePost(1, '更新文章', '更新文章内容')
  console.log(res3)

  const res4 = await deletePost(1)
  console.log(res4)

  const res5 = await createPost('测试文章', '测试文章内容')
  console.log(res5)
})

const { count, dec, reset } = useCounter(60, { min: 0, max: 60 })
let timer: number | null | NodeJS.Timeout = null

function handleGetCode() {
  if (timer) return

  reset()

  timer = setInterval(() => {
    dec()
    if (!count.value) {
      clearInterval(timer!)
      timer = null
    }
  }, 1000)
}

type Languages = 'zh' | 'en'
const { $t, $changeLocale } = useGlobalProperties()
function handleSwitchLanguage(language: Languages) {
  $changeLocale(language)
}

function handleJumpToSubPackage() {
  uni.navigateTo({
    url: '/pagesSubPackage/common/test/test'
  })
}

function handleScrollToUpper() {
  console.log('滚动到顶部了')
}

function handleScrollToLower() {
  console.log('滚动到底部了')
}

const triggered = ref<boolean>(false)

function handleRefresherPulling() {
  console.log('自定义下拉刷新控件被下拉')
  triggered.value = true
}

function handleRefresherRefresh() {
  console.log('自定义下拉刷新被触发')
  triggered.value = true
  setTimeout(() => {
    triggered.value = false
    console.log('自定义下拉刷新被完成')
  }, 1500)
}

function handleRefresherrestore() {
  console.log('自定义下拉刷新被复位')
}

function handleRefresherabort() {
  console.log('自定义下拉刷新被中止')
}

const { menuButtonBoxStyle } = useAppHeaderStyles({
  backgroundColor: 'transparent',
  keepStatusBarBgColor: true
})
console.log(menuButtonBoxStyle.value)
</script>

<template>
  <view>
    <AppHeader backgroundColor="transparent" keepStatusBarBgColor />

    <scroll-view
      class="h-full"
      scroll-y
      @scrolltolower="handleScrollToLower"
      @scrolltoupper="handleScrollToUpper"
      refresher-enabled
      :refresher-triggered="triggered"
      @refresherpulling="handleRefresherPulling"
      @refresherrefresh="handleRefresherRefresh"
      @refresherrestore="handleRefresherrestore"
      @refresherabort="handleRefresherabort"
      :upper-threshold="0"
      :lower-threshold="0"
    >
      <!-- 占位盒子 -->
      <view class="w-full bg-transparent" :style="{ height: isH5 ? menuButtonBoxStyle.height : `${height + top || safeArea!.top}px` }" />

      <view class="flex flex-col items-center w-full gap-[10px] page-container" :style="{ paddingBottom: `${safeAreaInsets?.bottom ? '180' : '150'}rpx` }">
        <view>
          <text>倒计时{{ count }}</text>
        </view>

        <view class="flex gap-5 items-center">
          <button @click="handleGetCode">获取验证码</button>
        </view>

        <view class="w-full text-center name">
          <text>
            {{ userName }}
          </text>
        </view>

        <view>
          <button @tap="setUserName('zengdada1')">修改名字 pinia 数据持久化</button>
        </view>

        <view>
          <text>{{ $t('demo') }}</text>
        </view>

        <view>
          <button @tap="handleJumpToSubPackage">跳转到分包页面</button>
        </view>

        <view class="flex gap-5 items-center">
          <button @tap="handleSwitchLanguage('zh')">中文</button>
          <button @tap="handleSwitchLanguage('en')">English</button>
        </view>

        <view v-for="(item, index) in 100" :key="index">
          <text>{{ item }}</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>
