<script setup lang="ts">
import i18n from '@/locale'
import { router } from '@/utils'
const { userName, setUserName } = useStore('user')

const t = i18n.global.t

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
    <view class="name w-full text-center">
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

    <view class="box flex-c-c">box</view>
  </view>
</template>

<style lang="scss" scoped>
.box {
  @apply w-[302px] h-[100px] bg-red-500;
}
</style>
