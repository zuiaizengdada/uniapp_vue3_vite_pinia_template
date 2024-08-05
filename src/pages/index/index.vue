<script setup lang="ts">
import i18n from '@/locale'
import { router } from '@/utils'
import { createPost, deletePost, getPosts, getPostById, updatePost } from '@/apis/modules/post'
const { userName, setUserName } = useStore('user')

const t = i18n.global.t

onMounted(async () => {
  const res2 = await getPostById(1)
  console.log(res2)

  const res3 = await updatePost(1, '更新文章', '更新文章内容')
  console.log(res3)

  const res4 = await deletePost(1)
  console.log(res4)

  const res5 = await createPost('测试文章', '测试文章内容')
  console.log(res5)

  const res = await getPosts()
  console.log(res)
})

type Languages = 'zh' | 'en'
function handleSwitchLanguage(language: Languages) {
  i18n.global.locale = language
}

function handleGotoLogin() {
  router.navigateTo('/pages/login/index')
}

function handleGotoMitt() {
  router.navigateTo('/pages/mitt/index')
}
</script>

<template>
  <view class="index w-full h-screen flex flex-col items-center justify-center gap-[10px]">
    <view class="w-full text-center name">
      <text>
        {{ userName }}
      </text>
    </view>

    <view>
      <button @tap="setUserName('zengdada1')">修改名字 pinia 数据持久化</button>
    </view>

    <view class="i18n">
      <text>{{ t('demo') }}</text>
    </view>

    <view class="flex items-center gap-5">
      <button @tap="handleSwitchLanguage('zh')">中文</button>
      <button @tap="handleSwitchLanguage('en')">English</button>
    </view>

    <view class="flex items-center">
      <button @tap="handleGotoLogin">跳转到登录页</button>
    </view>

    <view class="flex items-center">
      <button @tap="handleGotoMitt">跳转到mitt示例页面</button>
    </view>

    <TestComponent />

    <view class="flex-c-c bg-red-500 size-[200px]">
      <view class="line-clamp-3">
        示例红色背示例红色背景示例红色背景示例红色背景示例红色背景示例红色背景示例红色背景示例红色背景景
      </view>
    </view>
  </view>
</template>
