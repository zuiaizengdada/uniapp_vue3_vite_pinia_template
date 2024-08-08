<script setup lang="ts">
import i18n from '@/locale'
import { isMiniProgram, router, selectorQueryClientRect } from '@/utils'
import { createPost, deletePost, getPosts, getPostById, updatePost } from '@/apis/modules/post'
import { useScroll } from '@/hooks'
import { ComponentInternalInstance } from 'vue'
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

  const res6 = await selectorQueryClientRect('.name')
  console.log(res6)
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

const instance = getCurrentInstance() as ComponentInternalInstance
const { scrollTop, scrollToBottom } = useScroll(instance)

onMounted(() => {
  scrollToBottom('.scroll-wrapper', '.scroll-content')
})
</script>

<template>
  <AppHeader keepStatusBarBgColor showLeft :safeAreaInsetTop="isMiniProgram()" />
  <scroll-view
    :scroll-top="scrollTop"
    scroll-y
    scroll-with-animation
    class="w-full flex flex-col items-center h-[500px] overflow-scroll bg-yellow-400 scroll-wrapper"
  >
    <view class="flex flex-col items-center w-full gap-[10px] scroll-content">
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
      <view>1</view>
      <view>1</view>
      <view>1</view>
      <view>1zz</view>
      <view>1zz</view>
      <view>1zz</view>
      <view>1zz</view>
      <view>1zz</view>
      <view>1zz</view>
      <view>1zz</view>
      <view>1zz</view>
      <view>1zz</view>
      <view>1zz</view>
      <view>1zz</view>
      <view>1zz</view>
      <view>1zz</view>
      <view>1zz</view>
      <view>1zz</view>
      <view>1zz</view>
      <view>1zz</view>
      <view>1zz</view>
      <view>1zz</view>
      <view>1zz</view>
      <view>1zz</view>
      <view>1zz</view>
      <view>1zz</view>
      <view>1zz</view>
      <view>1zz</view>
      <view>1zz</view>
      <view>1zz</view>
      <view>1zz</view>
      <view>1zz</view>
      <view>1zz</view>
      <view>1zz</view>
      <view>1zz</view>
    </view>
  </scroll-view>
  <!-- <AppTabbar /> -->
</template>
