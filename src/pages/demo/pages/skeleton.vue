<script setup lang="ts">
import Skeleton from '../components/Skeleton.vue'

// 轮播图数据
const swiperList = ref([
  { id: 1, img: 'https://picsum.photos/id/10/800/400' },
  { id: 2, img: 'https://picsum.photos/id/11/800/400' },
  { id: 3, img: 'https://picsum.photos/id/12/800/400' }
])

// 分类数据
const categoryList = ref([
  { id: 1, name: '女装', icon: 'cart' },
  { id: 2, name: '男装', icon: 'shop' },
  { id: 3, name: '鞋包', icon: 'gift' },
  { id: 4, name: '数码', icon: 'phone' },
  { id: 5, name: '美妆', icon: 'heart' },
  { id: 6, name: '家居', icon: 'home' },
  { id: 7, name: '食品', icon: 'star' },
  { id: 8, name: '饰品', icon: 'medal' }
])

// 商品列表数据
const goodsList = ref([
  {
    id: 1,
    img: 'https://picsum.photos/id/101/400/400',
    title: '2023新款夏季连衣裙气质显瘦a字裙',
    price: 129,
    originPrice: 199,
    sales: 1200
  },
  {
    id: 2,
    img: 'https://picsum.photos/id/102/400/400',
    title: '轻薄透气男士短袖T恤纯棉打底衫',
    price: 69,
    originPrice: 99,
    sales: 980
  },
  {
    id: 3,
    img: 'https://picsum.photos/id/103/400/400',
    title: '新品休闲女士单肩包时尚百搭斜挎包',
    price: 159,
    originPrice: 259,
    sales: 568
  },
  {
    id: 4,
    img: 'https://picsum.photos/id/104/400/400',
    title: '夏季新款平底凉鞋女外穿时尚百搭',
    price: 89,
    originPrice: 129,
    sales: 720
  }
])

// 限时抢购数据
const flashSaleList = ref([
  {
    id: 1,
    img: 'https://picsum.photos/id/201/400/400',
    title: '无线蓝牙耳机双耳迷你隐形',
    price: 79,
    originPrice: 199,
    progress: 80
  },
  {
    id: 2,
    img: 'https://picsum.photos/id/202/400/400',
    title: '夏季薄款防晒衣女长袖防紫外线',
    price: 99,
    originPrice: 269,
    progress: 65
  },
  {
    id: 3,
    img: 'https://picsum.photos/id/203/400/400',
    title: '智能手表男女多功能运动计步',
    price: 129,
    originPrice: 399,
    progress: 45
  }
])

// 倒计时
const countdown = ref({
  hours: 2,
  minutes: 30,
  seconds: 0
})

// 模拟倒计时
const startCountdown = () => {
  const timer = setInterval(() => {
    if (countdown.value.seconds > 0) {
      countdown.value.seconds--
    } else {
      if (countdown.value.minutes > 0) {
        countdown.value.minutes--
        countdown.value.seconds = 59
      } else {
        if (countdown.value.hours > 0) {
          countdown.value.hours--
          countdown.value.minutes = 59
          countdown.value.seconds = 59
        } else {
          clearInterval(timer)
        }
      }
    }
  }, 1000)
}

const loading = ref(true)

onMounted(() => {
  startCountdown()
  setTimeout(() => {
    loading.value = false
  }, 3000)
})
</script>

<template>
  <Skeleton v-if="loading" />
  <view class="container" v-else>
    <!-- 搜索栏 -->
    <view class="search-bar">
      <view class="search-input">
        <uni-icons type="search" size="18" color="#999"></uni-icons>
        <text class="placeholder">搜索商品</text>
      </view>
    </view>

    <!-- 轮播图 -->
    <swiper class="banner" circular autoplay interval="3000" indicator-dots indicator-color="rgba(255, 255, 255, 0.6)" indicator-active-color="#ff5000">
      <swiper-item v-for="item in swiperList" :key="item.id">
        <image :src="item.img" mode="widthFix" class="banner-img" />
      </swiper-item>
    </swiper>

    <!-- 分类导航 -->
    <view class="category">
      <view class="category-item" v-for="item in categoryList" :key="item.id">
        <view class="category-icon">
          <uni-icons :type="item.icon" size="24" color="#ff5000"></uni-icons>
        </view>
        <text class="category-name">{{ item.name }}</text>
      </view>
    </view>

    <!-- 限时抢购 -->
    <view class="flash-sale">
      <view class="section-title">
        <view class="title-left">
          <text class="title-text">限时抢购</text>
          <view class="countdown">
            <text class="countdown-box">{{ countdown.hours }}</text>
            <text class="countdown-colon">:</text>
            <text class="countdown-box">{{ countdown.minutes }}</text>
            <text class="countdown-colon">:</text>
            <text class="countdown-box">{{ countdown.seconds }}</text>
          </view>
        </view>
        <view class="title-right">
          <text>更多</text>
          <uni-icons type="right" size="14" color="#999"></uni-icons>
        </view>
      </view>
      <scroll-view class="flash-list" scroll-x>
        <view class="flash-item" v-for="item in flashSaleList" :key="item.id">
          <image :src="item.img" mode="aspectFill" class="flash-img" />
          <view class="flash-info">
            <text class="flash-title">{{ item.title }}</text>
            <view class="flash-price-box">
              <text class="flash-price">¥{{ item.price }}</text>
              <text class="flash-origin-price">¥{{ item.originPrice }}</text>
            </view>
            <view class="progress-bar">
              <view class="progress" :style="{ width: item.progress + '%' }"></view>
              <text class="progress-text">已抢{{ item.progress }}%</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- 商品推荐 -->
    <view class="recommend">
      <view class="section-title">
        <view class="title-left">
          <text class="title-text">商品推荐</text>
        </view>
        <view class="title-right">
          <text>更多</text>
          <uni-icons type="right" size="14" color="#999"></uni-icons>
        </view>
      </view>
      <view class="goods-list">
        <view class="goods-item" v-for="item in goodsList" :key="item.id">
          <image :src="item.img" mode="aspectFill" class="goods-img" />
          <view class="goods-info">
            <text class="goods-title">{{ item.title }}</text>
            <view class="goods-price-box">
              <text class="goods-price">¥{{ item.price }}</text>
              <text class="goods-origin-price">¥{{ item.originPrice }}</text>
            </view>
            <view class="goods-bottom">
              <text class="goods-sales">已售{{ item.sales }}件</text>
              <view class="cart-btn">
                <uni-icons type="cart" size="16" color="#fff"></uni-icons>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部提示 -->
    <view class="footer">
      <text class="footer-text">我是有底线的～</text>
    </view>
  </view>
</template>

<style lang="scss">
.container {
  background-color: #f5f5f5;
  min-height: 100vh;
}

/* 搜索栏 */
.search-bar {
  background-color: #ff5000;
  padding: 20rpx 30rpx;
  position: sticky;
  top: 0;
  z-index: 100;
}

.search-input {
  background-color: #fff;
  height: 70rpx;
  border-radius: 35rpx;
  display: flex;
  align-items: center;
  padding: 0 30rpx;
}

.placeholder {
  color: #999;
  font-size: 28rpx;
  margin-left: 10rpx;
}

/* 轮播图 */
.banner {
  width: 100%;
  height: 300rpx;
}

.banner-img {
  width: 100%;
  height: 300rpx;
}

/* 分类导航 */
.category {
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  padding: 20rpx 0;
  margin-bottom: 20rpx;
}

.category-item {
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20rpx;
}

.category-icon {
  width: 80rpx;
  height: 80rpx;
  background-color: #f8f8f8;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10rpx;
}

.category-name {
  font-size: 24rpx;
  color: #333;
}

/* 标题栏 */
.section-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 30rpx;
  background-color: #fff;
  border-bottom: 1px solid #eee;
}

.title-left {
  display: flex;
  align-items: center;
}

.title-text {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-right: 20rpx;
}

.title-right {
  color: #999;
  font-size: 24rpx;
  display: flex;
  align-items: center;
}

/* 限时抢购 */
.flash-sale {
  background-color: #fff;
  margin-bottom: 20rpx;
}

.countdown {
  display: flex;
  align-items: center;
}

.countdown-box {
  background-color: #333;
  color: #fff;
  font-size: 22rpx;
  padding: 4rpx 8rpx;
  border-radius: 4rpx;
}

.countdown-colon {
  color: #333;
  margin: 0 5rpx;
}

.flash-list {
  white-space: nowrap;
  padding: 20rpx;
}

.flash-item {
  display: inline-block;
  width: 280rpx;
  margin-right: 20rpx;
  background-color: #fff;
  border-radius: 10rpx;
  overflow: hidden;
}

.flash-img {
  width: 280rpx;
  height: 280rpx;
}

.flash-info {
  padding: 10rpx;
}

.flash-title {
  font-size: 26rpx;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.flash-price-box {
  margin: 10rpx 0;
}

.flash-price {
  font-size: 32rpx;
  color: #ff5000;
  font-weight: bold;
  margin-right: 10rpx;
}

.flash-origin-price {
  font-size: 24rpx;
  color: #999;
  text-decoration: line-through;
}

.progress-bar {
  position: relative;
  height: 30rpx;
  background-color: #f5f5f5;
  border-radius: 15rpx;
  overflow: hidden;
}

.progress {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background-color: rgba(255, 80, 0, 0.2);
}

.progress-text {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 30rpx;
  font-size: 20rpx;
  color: #ff5000;
}

/* 商品列表 */
.recommend {
  background-color: #fff;
}

.goods-list {
  padding: 20rpx;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.goods-item {
  width: 345rpx;
  background-color: #fff;
  border-radius: 10rpx;
  overflow: hidden;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.goods-img {
  width: 345rpx;
  height: 345rpx;
}

.goods-info {
  padding: 15rpx;
}

.goods-title {
  font-size: 28rpx;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  height: 76rpx;
}

.goods-price-box {
  margin: 10rpx 0;
}

.goods-price {
  font-size: 32rpx;
  color: #ff5000;
  font-weight: bold;
  margin-right: 10rpx;
}

.goods-origin-price {
  font-size: 24rpx;
  color: #999;
  text-decoration: line-through;
}

.goods-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.goods-sales {
  font-size: 22rpx;
  color: #999;
}

.cart-btn {
  width: 50rpx;
  height: 50rpx;
  background-color: #ff5000;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 底部提示 */
.footer {
  padding: 30rpx;
  text-align: center;
}

.footer-text {
  font-size: 24rpx;
  color: #999;
}
</style>
