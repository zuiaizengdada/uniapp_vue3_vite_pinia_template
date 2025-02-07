<script setup lang="ts">
import { useScroll } from '@/common/hooks'
import { ComponentInternalInstance } from 'vue'
import { useDebounceFn } from '@vueuse/core'
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

defineProps<{
  tabIndex: number
}>()

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
  <scroll-view class="h-full" scroll-y>
    <view class="flex flex-col items-center w-full gap-[10px]" :style="{ padding: '0 0 150rpx' }">
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
          <template v-for="item in 100" :key="item">
            <view :id="`id${item}`" class="item">{{ item }}</view>
          </template>
        </view>
      </scroll-view>
      <view class="absolute right-0 bottom-[20%]" @click="scrollToTop"><text>回到顶部</text></view>
      <view class="flex flex-col gap-5">
        <text>scrollTop: {{ scrollTop }}</text>
        <button @click="scrollToElement('id10')">Scroll to Item 10</button>
        <button @click="scrollToElement('id50')">Scroll to Item 50</button>
        <button @click="scrollToElement('id99')">Scroll to Item 99</button>
        <button @click="scrollToBottom('.scroll-container', '.scroll-content')">Scroll to Bottom</button>
      </view>
    </view>
  </scroll-view>
</template>
