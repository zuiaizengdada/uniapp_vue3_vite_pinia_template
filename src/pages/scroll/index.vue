<script setup lang="ts">
import { useScroll } from '@/common/hooks'
import { ComponentInternalInstance } from 'vue'
const instance = getCurrentInstance() as ComponentInternalInstance
const { scrollTop, scrollToBottom, scrollToTop, scrollWithAnimation, setScrollWithAnimation, setScrollTop, targetElementId } = useScroll(instance)

scrollToBottom('.scroll-container', '.scroll-content')

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

function handleScroll(e: any) {
  console.log(e)
  setScrollTop(e.detail.scrollTop)
  setScrollWithAnimation(false)
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
  <view class="button-container">
    <text>scrollTop: {{ scrollTop }}</text>
    <button @click="scrollToElement('id10')">Scroll to Item 10</button>
    <button @click="scrollToElement('id50')">Scroll to Item 50</button>
    <button @click="scrollToElement('id99')">Scroll to Item 99</button>
  </view>
</template>
