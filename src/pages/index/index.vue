<script setup lang="ts">
import { useGlobalProperties, useSystemInfo } from '@/common/hooks'
import { createPost, deletePost, getPosts, getPostById, updatePost } from '@/apis'
import { useAppHeaderStyles } from '@/components/AppHeader/hooks'
import { isAppPlus, isH5 } from '@/utils'
import type { Post, PageData } from '@/apis/modules/type'
import { type Data } from '@/apis/request/type'
import { type InfiniteData } from '@tanstack/vue-query'

// 文章列表查询hook
function usePostsQuery(tabIndex: Ref<number>) {
  const pageSize = 10
  const queryClient = useQueryClient()

  const {
    data: postsData,
    isLoading: postsLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery<Data<PageData<Post>>, Error, InfiniteData<Data<PageData<Post>>>, [string]>({
    queryKey: ['posts'] as const,
    queryFn: ({ pageParam = 1 }) => getPosts({ page: pageParam as number, pageSize }) as Promise<Data<PageData<Post>>>,
    getNextPageParam: (lastPage: Data<PageData<Post>>) => {
      const hasMore = lastPage.data.page * lastPage.data.pageSize < lastPage.data.total
      return hasMore ? lastPage.data.page + 1 : undefined
    },
    initialPageParam: 1,
    select: (data) => data,
    enabled: computed(() => tabIndex.value === 0)
  })

  // 获取单个文章的查询
  const { data: postData, isLoading: postLoading } = useQuery<Data<Post>, Error, Post>({
    queryKey: ['post', 1],
    queryFn: () => getPostById(1),
    select: (data) => data.data,
    enabled: computed(() => tabIndex.value === 0)
  })

  const list = computed<Post[]>(() => postsData.value?.pages.reduce((acc, page) => [...acc, ...(page.data?.list || [])], [] as Post[]) || [])

  const finished = computed(() => !hasNextPage.value)

  function loadMore() {
    if (postsLoading.value || isFetchingNextPage.value || !hasNextPage.value) return
    fetchNextPage()
  }

  function refresh() {
    return queryClient.resetQueries({ queryKey: ['posts'] })
  }

  return {
    list,
    finished,
    postsLoading,
    isFetchingNextPage,
    loadMore,
    refresh,
    postData,
    postLoading
  }
}

// 文章操作hook
function usePostMutations() {
  const queryClient = useQueryClient()

  const { mutate: createMutation } = useMutation<Data<Post>, Error, Post>({
    mutationFn: (newPost: Post) => createPost(newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    }
  })

  const { mutate: updateMutation } = useMutation<Data<Post>, Error, { id: number; data: Post }>({
    mutationFn: ({ id, data }: { id: number; data: Post }) => updatePost(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      queryClient.invalidateQueries({ queryKey: ['post', 1] })
    }
  })

  const { mutate: deleteMutation } = useMutation<Data<Post>, Error, number>({
    mutationFn: (id: number) => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    }
  })

  return {
    createMutation,
    updateMutation,
    deleteMutation
  }
}

const { userName, setUserName } = useStore('user')
const { windowHeight, windowWidth, screenWidth, screenHeight, safeAreaInsets, height, top, safeArea } = useSystemInfo()

const props = defineProps<{
  tabIndex: number
}>()

const { tabIndex } = toRefs(props)

// 使用文章查询hook
const { list, finished, postsLoading, loadMore, refresh } = usePostsQuery(tabIndex)

// 使用文章操作hook
const { createMutation, updateMutation, deleteMutation } = usePostMutations()

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
      class="flex-1 h-0"
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

        <view v-for="item in list" :key="item.id" class="px-4 py-2 mb-3 bg-white rounded-lg shadow">
          <view class="mb-2 text-lg font-bold">{{ item.title }}</view>
          <view class="text-gray-600">{{ item.content }}</view>
        </view>

        <!-- 加载状态提示 -->
        <view class="text-center text-gray-500">
          <text v-if="postsLoading">加载中...</text>
          <text v-else-if="finished">没有更多数据了</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>
