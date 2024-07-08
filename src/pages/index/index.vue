<script setup lang="ts">
import i18n from '@/locale'
const { userName, setUserName } = useStore('user')

const t = i18n.global.t

type Languages = 'zh' | 'en'
function handleChangeLanguageTap(language: Languages) {
  i18n.global.locale = language
}
</script>

<template>
  <view class="index bg-rose-600">
    <view class="name">
      <text>
        {{ userName }}
      </text>
    </view>

    <view class="btn-group">
      <button @tap="setUserName('zengdada1')">修改名字</button>
    </view>

    <view class="i18n">
      <text>{{ t('demo') }}</text>
    </view>

    <view class="btn-group">
      <button @tap="handleChangeLanguageTap('zh')">中文</button>
      <button @tap="handleChangeLanguageTap('en')">English</button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.index {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;

  .name {
    width: 100%;
    text-align: center;
  }
}
</style>
