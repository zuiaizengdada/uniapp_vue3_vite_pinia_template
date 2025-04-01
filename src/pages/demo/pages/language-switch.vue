<script setup lang="ts">
import { useGlobalProperties } from '@/common/hooks'

// 语言切换
type Languages = 'zh' | 'en'
const { $t, $changeLocale } = useGlobalProperties()
function handleSwitchLanguage(language: Languages) {
  $changeLocale(language)
}
</script>

<template>
  <view class="flex flex-col gap-5 p-4">
    <view class="flex-c-c">
      <text>翻译后的结果: {{ $t('demo') }}</text>
    </view>
    <view class="flex-wrap gap-5 flex-c-c">
      <button @tap="handleSwitchLanguage('zh')">中文</button>
      <button @tap="handleSwitchLanguage('en')">English</button>
      <button @tap="handleSwitchLanguage('fr')">Français</button>
      <button @tap="handleSwitchLanguage('de')">Deutsch</button>
      <button @tap="handleSwitchLanguage('es')">Español</button>
      <button @tap="handleSwitchLanguage('ru')">Русский</button>
      <button @tap="handleSwitchLanguage('ja')">日本語</button>
    </view>
  </view>
</template>

<style lang="scss" scoped></style>
