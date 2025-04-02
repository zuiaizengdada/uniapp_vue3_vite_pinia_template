<script setup lang="ts">
import { useScroll } from '@/common/hooks'
import { ComponentInternalInstance } from 'vue'

const instance = getCurrentInstance() as ComponentInternalInstance
const { scrollTop, scrollToBottom, scrollToTop, scrollWithAnimation, setScrollWithAnimation, setScrollTop, targetElementId } = useScroll(instance)

// 检查内容是否已经渲染完成
async function checkContentReady() {
  return new Promise((resolve) => {
    const query = uni.createSelectorQuery().in(instance.proxy)
    query
      .select('.scroll-content')
      .boundingClientRect((data) => {
        if (data && (data as unknown as UniApp.NodeInfo).height! > 0) {
          resolve(true)
        } else {
          setTimeout(() => checkContentReady().then(resolve), 50)
        }
      })
      .exec()
  })
}

// 使用异步函数等待内容准备就绪
onMounted(async () => {
  await checkContentReady()

  scrollToBottom('.scroll-container', '.scroll-content')
})

async function scrollToElement(id: string, scrollAnimation: boolean = true) {
  setScrollWithAnimation(scrollAnimation)
  targetElementId.value = id
}

function handleScrollToUpper() {
  console.log('滚动到顶部了')
}

function handleScrollToLower() {
  console.log('滚动到底部了')
}

// 创建防抖处理函数
const debouncedScrollHandler = useDebounceFn((scrollTop: number) => {
  setScrollTop(scrollTop)
  setScrollWithAnimation(false)
}, 50)

function handleScroll(e: any) {
  console.log(e)
  debouncedScrollHandler(e.detail.scrollTop)
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
</script>

<template>
  <view class="flex flex-col items-center w-full h-screen gap-[10px]">
    <scroll-view
      class="scroll-container h-[400px] bg-red-500"
      :scrollTop="scrollTop"
      :upper-threshold="0"
      :lower-threshold="0"
      :scroll-into-view="targetElementId"
      :scroll-with-animation="scrollWithAnimation"
      scroll-y
      refresher-enabled
      :refresher-triggered="triggered"
      @scrolltoupper="handleScrollToUpper"
      @scrolltolower="handleScrollToLower"
      @scroll="handleScroll"
      @refresherpulling="handleRefresherPulling"
      @refresherrefresh="handleRefresherRefresh"
      @refresherrestore="handleRefresherrestore"
      @refresherabort="handleRefresherabort"
    >
      <view class="scroll-content">
        <view v-for="item in 100" :key="item" :id="`id${item}`" class="item">{{ item }}</view>
      </view>
    </scroll-view>
    <view class="absolute right-0 bottom-[20%]" @click="scrollToTop"><text>回到顶部</text></view>
    <view class="flex flex-col gap-5">
      <text>scrollTop: {{ scrollTop }}</text>
      <button class="custom-btn" @click="scrollToElement('id10')">Scroll to Item 10</button>
      <button class="custom-btn" @click="scrollToElement('id50')">Scroll to Item 50</button>
      <button class="custom-btn" @click="scrollToElement('id99')">Scroll to Item 99</button>
      <button class="custom-btn" @click="scrollToBottom('.scroll-container', '.scroll-content')">Scroll to Bottom</button>
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
