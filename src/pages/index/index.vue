<script setup lang="ts">
import { useGlobalProperties, useSystemInfo, useListQuery, useItemQuery, useMutations } from '@/common/hooks'
import { createPost, deletePost, getPosts, getPostById, updatePost } from '@/apis'
import { useAppHeaderStyles } from '@/components/AppHeader/hooks'
import { isAppPlus, isH5 } from '@/utils'
import type { Post, PostSearchParams, PageData } from '@/apis/modules/type'
import type { Data } from '@/apis/request/type'

const { userName, setUserName } = useStore('user')
const { windowHeight, windowWidth, screenWidth, screenHeight, safeAreaInsets, height, top, safeArea } = useSystemInfo()

const props = defineProps<{
  tabIndex: number
}>()

const { tabIndex } = toRefs(props)

// 文章列表查询
const { list, finished, loading, loadMore, refresh } = useListQuery<Post, PostSearchParams>({
  queryFn: (params) => getPosts(params) as Promise<Data<PageData<Post>>>,
  queryKey: ['posts'],
  defaultParams: { page: 1, pageSize: 10 }
})

// 文章单项查询
const { data: post } = useItemQuery<Post, number>({
  queryFn: (id) => getPostById(id),
  queryKey: ['post', 1],
  params: 1
})

// 文章操作
const {
  create: { mutate: createMutation },
  update: { mutate: updateMutation },
  remove: { mutate: deleteMutation }
} = useMutations<Post, Post, { id: number; data: Post }, number>({
  createFn: createPost,
  updateFn: ({ id, data }) => updatePost(id, data),
  deleteFn: deletePost,
  invalidateQueryKeys: [['posts'], ['post', 1]]
})

// 下拉刷新相关
const triggered = ref<boolean>(false)

function handleRefresherPulling() {
  console.log('自定义下拉刷新控件被下拉')
  triggered.value = true
}

function handleRefresherRefresh() {
  console.log('自定义下拉刷新被触发')
  triggered.value = true
  refresh().then(() => {
    setTimeout(() => {
      triggered.value = false
      console.log('自定义下拉刷新被完成')
    }, 1500)
  })
}

function handleRefresherrestore() {
  console.log('自定义下拉刷新被复位')
}

function handleRefresherabort() {
  console.log('自定义下拉刷新被中止')
}

// 其他UI相关
const { menuButtonBoxStyle } = useAppHeaderStyles({
  backgroundColor: 'transparent',
  keepStatusBarBgColor: true
})

// 倒计时相关
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

// 语言切换
type Languages = 'zh' | 'en'
const { $t, $changeLocale } = useGlobalProperties()
function handleSwitchLanguage(language: Languages) {
  $changeLocale(language)
}

// 页面跳转
function handleJumpToSubPackage() {
  uni.navigateTo({
    url: '/pagesSubPackage/common/test/test'
  })
}

// 生命周期
onMounted(async () => {
  if (tabIndex.value !== 0) return

  const { getBoundingClientRect } = useSelectorQuery()
  const rect = await getBoundingClientRect('.page-container')
  console.log(rect)

  console.log(`屏幕宽度：${windowWidth}`)
  console.log(`屏幕高度：${windowHeight}`)
  console.log(`可使用窗口宽度：${screenWidth}`)
  console.log(`可使用窗口高度：${screenHeight}`)

  // 演示文章操作
  createMutation({ id: 1, userId: 1, title: '测试文章', content: '测试文章内容' })
  updateMutation({ id: 1, data: { id: 1, userId: 1, title: '更新文章', content: '更新文章内容' } })
  deleteMutation(1)
  console.log(post.value)
})

function handleScrollToUpper() {
  console.log('滚动到顶部了')
}

function handleScrollToLower() {
  console.log('滚动到底部了')
  loadMore()
}

const throttledScrollToLower = useDebounceFn(handleScrollToLower, 200)
</script>

<template>
  <view class="flex flex-col w-full h-screen">
    <AppHeader backgroundColor="transparent" keepStatusBarBgColor />

    <scroll-view
      class="flex-1 h-0 scroll-container"
      scroll-y
      :lower-threshold="50"
      :upper-threshold="50"
      @scrolltolower="throttledScrollToLower"
      @scrolltoupper="handleScrollToUpper"
      refresher-enabled
      :refresher-triggered="triggered"
      @refresherpulling="handleRefresherPulling"
      @refresherrefresh="handleRefresherRefresh"
      @refresherrestore="handleRefresherrestore"
      @refresherabort="handleRefresherabort"
    >
      <view class="scroll-content">
        <!-- 占位盒子 -->
        <view class="w-full bg-transparent" :style="{ height: isH5 || isAppPlus ? menuButtonBoxStyle.height : `${height + top || safeArea!.top}px` }" />

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

          <view v-for="item in list" :key="`post-${item.id}-${item.title}`" class="px-4 py-2 mb-3 bg-white rounded-lg shadow">
            <view class="mb-2 text-lg font-bold">{{ item.title }}</view>
            <view class="text-gray-600">{{ item.content }}</view>
          </view>

          <!-- 加载状态提示 -->
          <view class="text-center text-gray-500">
            <text v-if="loading">加载中...</text>
            <text v-else-if="finished">没有更多数据了</text>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>
