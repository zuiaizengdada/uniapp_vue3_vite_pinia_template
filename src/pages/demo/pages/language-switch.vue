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
      <button class="custom-btn" @tap="handleSwitchLanguage('zh')">中文</button>
      <button class="custom-btn" @tap="handleSwitchLanguage('en')">English</button>
      <button class="custom-btn" @tap="handleSwitchLanguage('fr')">Français</button>
      <button class="custom-btn" @tap="handleSwitchLanguage('de')">Deutsch</button>
      <button class="custom-btn" @tap="handleSwitchLanguage('es')">Español</button>
      <button class="custom-btn" @tap="handleSwitchLanguage('ru')">Русский</button>
      <button class="custom-btn" @tap="handleSwitchLanguage('ja')">日本語</button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.custom-btn {
  /* 基础样式 */
  display: inline-block;
  margin: 5px;
  padding: 8px 15px;
  font-size: 16px;
  line-height: 1.5;
  text-align: center;
  background-color: #f8f8f8;
  color: #333;
  border-radius: 4px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

/* 针对H5的特定调整 */
/* #ifdef H5 */
button.custom-btn {
  outline: none;

  &::after {
    display: none; /* 移除H5中的after伪元素 */
  }
}
/* #endif */

/* 针对微信小程序的特定调整 */
/* #ifdef MP-WEIXIN */
button.custom-btn {
  overflow: visible;
  background-color: #f8f8f8 !important; /* 确保背景色一致 */

  &::after {
    border: none; /* 移除微信小程序中的默认边框 */
  }
}
/* #endif */

/* 针对头条小程序的特定调整 */
/* #ifdef MP-TOUTIAO */
button.custom-btn {
  overflow: visible;
  background-color: #f8f8f8 !important;

  &::after {
    border: none;
  }
}
/* #endif */
</style>
