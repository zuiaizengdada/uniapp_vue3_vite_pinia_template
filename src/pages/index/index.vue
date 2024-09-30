<script setup lang="ts">
import { router } from '@/utils'
import { useGlobalProperties } from '@/common/hooks'
import { createPost, deletePost, getPosts, getPostById, updatePost } from '@/apis'
const { userName, setUserName } = useStore('user')

onMounted(async () => {
  const { getBoundingClientRect } = useSelectorQuery()
  const rect = await getBoundingClientRect('.scroll-content')
  console.log(rect)

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

function handleGotoWebsocket() {
  router.navigateTo('/pages/websocket/index')
}

function handleGotoMitt() {
  router.navigateTo('/pages/mitt/index')
}
</script>

<template>
  <view class="flex flex-col items-center w-full gap-[10px] scroll-content">
    <view>
      <text>倒计时{{ count }}</text>
    </view>

    <view class="flex items-center gap-5">
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

    <view class="flex items-center gap-5">
      <button @tap="handleSwitchLanguage('zh')">中文</button>
      <button @tap="handleSwitchLanguage('en')">English</button>
    </view>

    <view class="flex items-center">
      <button @tap="handleGotoWebsocket">websocket演示</button>
    </view>

    <view class="flex items-center">
      <button @tap="handleGotoMitt">mitt库演示</button>
    </view>
  </view>
</template>
