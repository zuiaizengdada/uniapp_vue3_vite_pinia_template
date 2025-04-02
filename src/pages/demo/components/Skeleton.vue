<template>
  <!-- #ifdef MP-WEIXIN -->
  <template name="skeleton">
    <view class="sk-container">
      <view class="container">
        <view class="search-bar">
          <view class="search-input">
            <view>
              <text class="uni-icons icons--uni-icons uniui-search icons--uniui-search sk-pseudo sk-pseudo-circle" style="color: #999; font-size: 18px"></text>
            </view>
            <text class="placeholder sk-transparent sk-text-14-2857-9 sk-text">搜索商品</text>
          </view>
        </view>
        <swiper autoplay="false" circular="true" indicator-dots="true" class="banner" indicator-active-color="#ff5000" indicator-color="rgba(255, 255, 255, 0.6)" interval="3000" current="0"></swiper>
        <view class="category">
          <view class="category-item">
            <view class="category-icon">
              <view>
                <text class="uni-icons icons--uni-icons uniui-cart icons--uniui-cart sk-pseudo sk-pseudo-circle" style="color: #ff5000; font-size: 24px"></text>
              </view>
            </view>
            <text class="category-name sk-transparent sk-text-14-2857-664 sk-text">女装</text>
          </view>
          <view class="category-item">
            <view class="category-icon">
              <view>
                <text class="uni-icons icons--uni-icons uniui-shop icons--uniui-shop sk-pseudo sk-pseudo-circle" style="color: #ff5000; font-size: 24px"></text>
              </view>
            </view>
            <text class="category-name sk-transparent sk-text-14-2857-843 sk-text">男装</text>
          </view>
          <view class="category-item">
            <view class="category-icon">
              <view>
                <text class="uni-icons icons--uni-icons uniui-gift icons--uniui-gift sk-pseudo sk-pseudo-circle" style="color: #ff5000; font-size: 24px"></text>
              </view>
            </view>
            <text class="category-name sk-transparent sk-text-14-2857-107 sk-text">鞋包</text>
          </view>
          <view class="category-item">
            <view class="category-icon">
              <view>
                <text class="uni-icons icons--uni-icons uniui-phone icons--uniui-phone sk-pseudo sk-pseudo-circle" style="color: #ff5000; font-size: 24px"></text>
              </view>
            </view>
            <text class="category-name sk-transparent sk-text-14-2857-619 sk-text">数码</text>
          </view>
          <view class="category-item">
            <view class="category-icon">
              <view>
                <text class="uni-icons icons--uni-icons uniui-heart icons--uniui-heart sk-pseudo sk-pseudo-circle" style="color: #ff5000; font-size: 24px"></text>
              </view>
            </view>
            <text class="category-name sk-transparent sk-text-14-2857-595 sk-text">美妆</text>
          </view>
          <view class="category-item">
            <view class="category-icon">
              <view>
                <text class="uni-icons icons--uni-icons uniui-home icons--uniui-home sk-pseudo sk-pseudo-circle" style="color: #ff5000; font-size: 24px"></text>
              </view>
            </view>
            <text class="category-name sk-transparent sk-text-14-2857-698 sk-text">家居</text>
          </view>
          <view class="category-item">
            <view class="category-icon">
              <view>
                <text class="uni-icons icons--uni-icons uniui-star icons--uniui-star sk-pseudo sk-pseudo-circle" style="color: #ff5000; font-size: 24px"></text>
              </view>
            </view>
            <text class="category-name sk-transparent sk-text-14-2857-577 sk-text">食品</text>
          </view>
          <view class="category-item">
            <view class="category-icon">
              <view>
                <text class="uni-icons icons--uni-icons uniui-medal icons--uniui-medal sk-pseudo sk-pseudo-circle" style="color: #ff5000; font-size: 24px"></text>
              </view>
            </view>
            <text class="category-name sk-transparent sk-text-14-2857-70 sk-text">饰品</text>
          </view>
        </view>
        <view class="flash-sale">
          <view class="section-title">
            <view class="title-left">
              <text class="title-text sk-transparent sk-text-14-2857-152 sk-text">限时抢购</text>
              <view class="countdown">
                <text class="countdown-box sk-transparent sk-text-14-2857-846 sk-text">2</text>
                <text class="countdown-colon sk-transparent sk-opacity">:</text>
                <text class="countdown-box sk-transparent sk-text-14-2857-409 sk-text">19</text>
                <text class="countdown-colon sk-transparent sk-opacity">:</text>
                <text class="countdown-box sk-transparent sk-text-14-2857-223 sk-text">39</text>
              </view>
            </view>
            <view class="title-right">
              <text class="sk-transparent sk-text-14-2857-353 sk-text">更多</text>
              <view>
                <text class="uni-icons icons--uni-icons uniui-right icons--uniui-right sk-pseudo sk-pseudo-circle" style="color: #999; font-size: 14px"></text>
              </view>
            </view>
          </view>
          <scroll-view scroll-x="true" class="flash-list">
            <view class="flash-item">
              <image class="flash-img sk-image" mode="aspectFill"></image>
              <view class="flash-info">
                <text class="flash-title sk-transparent sk-text-14-2857-420 sk-text">无线蓝牙耳机双耳迷你隐形</text>
                <view class="flash-price-box">
                  <text class="flash-price sk-transparent sk-text-14-2857-520 sk-text">¥79</text>
                  <text class="flash-origin-price sk-transparent sk-text-14-2857-559 sk-text" style="text-decoration-color: transparent">¥199</text>
                </view>
                <view class="progress-bar">
                  <view class="progress" style="width: 80%"></view>
                  <text class="progress-text sk-transparent sk-text-16-6667-999 sk-text" style="background-position-x: 50%">已抢80%</text>
                </view>
              </view>
            </view>
            <view class="flash-item">
              <image class="flash-img sk-image" mode="aspectFill"></image>
              <view class="flash-info">
                <text class="flash-title sk-transparent sk-text-14-2857-906 sk-text">夏季薄款防晒衣女长袖防紫外线</text>
                <view class="flash-price-box">
                  <text class="flash-price sk-transparent sk-text-14-2857-906 sk-text">¥99</text>
                  <text class="flash-origin-price sk-transparent sk-text-14-2857-889 sk-text" style="text-decoration-color: transparent">¥269</text>
                </view>
                <view class="progress-bar">
                  <view class="progress" style="width: 65%"></view>
                  <text class="progress-text sk-transparent sk-text-16-6667-132 sk-text" style="background-position-x: 50%">已抢65%</text>
                </view>
              </view>
            </view>
            <view class="flash-item">
              <image class="flash-img sk-image" mode="aspectFill"></image>
              <view class="flash-info">
                <text class="flash-title sk-transparent sk-text-14-2857-914 sk-text">智能手表男女多功能运动计步</text>
                <view class="flash-price-box">
                  <text class="flash-price sk-transparent sk-text-14-2857-792 sk-text">¥129</text>
                  <text class="flash-origin-price sk-transparent sk-text-14-2857-541 sk-text" style="text-decoration-color: transparent">¥399</text>
                </view>
                <view class="progress-bar">
                  <view class="progress" style="width: 45%"></view>
                  <text class="progress-text sk-transparent sk-text-16-6667-793 sk-text" style="background-position-x: 50%">已抢45%</text>
                </view>
              </view>
            </view>
          </scroll-view>
        </view>
        <view class="recommend">
          <view class="section-title">
            <view class="title-left">
              <text class="title-text sk-transparent sk-text-14-2857-199 sk-text">商品推荐</text>
            </view>
            <view class="title-right">
              <text class="sk-transparent sk-text-14-2857-421 sk-text">更多</text>
              <view>
                <text class="uni-icons icons--uni-icons uniui-right icons--uniui-right sk-pseudo sk-pseudo-circle" style="color: #999; font-size: 14px"></text>
              </view>
            </view>
          </view>
          <view class="goods-list">
            <view class="goods-item">
              <image class="goods-img sk-image" mode="aspectFill"></image>
              <view class="goods-info">
                <text class="goods-title sk-transparent sk-text-14-2857-2 sk-text">2023新款夏季连衣裙气质显瘦a字裙</text>
                <view class="goods-price-box">
                  <text class="goods-price sk-transparent sk-text-14-2857-260 sk-text">¥129</text>
                  <text class="goods-origin-price sk-transparent sk-text-14-2857-713 sk-text" style="text-decoration-color: transparent">¥199</text>
                </view>
                <view class="goods-bottom">
                  <text class="goods-sales sk-transparent sk-text-14-2857-118 sk-text">已售1200件</text>
                  <view class="cart-btn">
                    <view>
                      <text class="uni-icons icons--uni-icons uniui-cart icons--uniui-cart sk-pseudo sk-pseudo-circle" style="color: #fff; font-size: 16px"></text>
                    </view>
                  </view>
                </view>
              </view>
            </view>
            <view class="goods-item">
              <image class="goods-img sk-image" mode="aspectFill"></image>
              <view class="goods-info">
                <text class="goods-title sk-transparent sk-text-14-2857-422 sk-text">轻薄透气男士短袖T恤纯棉打底衫</text>
                <view class="goods-price-box">
                  <text class="goods-price sk-transparent sk-text-14-2857-594 sk-text">¥69</text>
                  <text class="goods-origin-price sk-transparent sk-text-14-2857-647 sk-text" style="text-decoration-color: transparent">¥99</text>
                </view>
                <view class="goods-bottom">
                  <text class="goods-sales sk-transparent sk-text-14-2857-713 sk-text">已售980件</text>
                  <view class="cart-btn">
                    <view>
                      <text class="uni-icons icons--uni-icons uniui-cart icons--uniui-cart sk-pseudo sk-pseudo-circle" style="color: #fff; font-size: 16px"></text>
                    </view>
                  </view>
                </view>
              </view>
            </view>
            <view class="goods-item">
              <image class="goods-img sk-image" mode="aspectFill"></image>
              <view class="goods-info">
                <text class="goods-title sk-transparent sk-text-14-2857-281 sk-text">新品休闲女士单肩包时尚百搭斜挎包</text>
                <view class="goods-price-box">
                  <text class="goods-price sk-transparent sk-text-14-2857-477 sk-text">¥159</text>
                  <text class="goods-origin-price sk-transparent sk-text-14-2857-494 sk-text" style="text-decoration-color: transparent">¥259</text>
                </view>
                <view class="goods-bottom">
                  <text class="goods-sales sk-transparent sk-text-14-2857-929 sk-text">已售568件</text>
                  <view class="cart-btn">
                    <view>
                      <text class="uni-icons icons--uni-icons uniui-cart icons--uniui-cart sk-pseudo sk-pseudo-circle" style="color: #fff; font-size: 16px"></text>
                    </view>
                  </view>
                </view>
              </view>
            </view>
            <view class="goods-item">
              <image class="goods-img sk-image" mode="aspectFill"></image>
              <view class="goods-info">
                <text class="goods-title sk-transparent sk-text-14-2857-130 sk-text">夏季新款平底凉鞋女外穿时尚百搭</text>
                <view class="goods-price-box">
                  <text class="goods-price sk-transparent sk-text-14-2857-672 sk-text">¥89</text>
                  <text class="goods-origin-price sk-transparent sk-text-14-2857-392 sk-text" style="text-decoration-color: transparent">¥129</text>
                </view>
                <view class="goods-bottom">
                  <text class="goods-sales sk-transparent sk-text-14-2857-999 sk-text">已售720件</text>
                  <view class="cart-btn">
                    <view>
                      <text class="uni-icons icons--uni-icons uniui-cart icons--uniui-cart sk-pseudo sk-pseudo-circle" style="color: #fff; font-size: 16px"></text>
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
        <view class="footer">
          <text class="footer-text sk-transparent sk-text-14-2857-812 sk-text" style="background-position-x: 50%">我是有底线的～</text>
        </view>
      </view>
    </view>
  </template>
  <!-- #endif -->

  <!-- #ifdef H5 -->
  <view class="sk-container">
    <view class="container">
      <view class="search-bar">
        <view class="search-input">
          <view class="search-icon"></view>
          <view class="placeholder-block"></view>
        </view>
      </view>
      <view class="banner-skeleton"></view>
      <view class="category">
        <view v-for="i in 8" :key="i" class="category-item">
          <view class="category-icon"></view>
          <view class="category-name-block"></view>
        </view>
      </view>
      <view class="flash-sale">
        <view class="section-title">
          <view class="title-left">
            <view class="title-text-block"></view>
            <view class="countdown-skeleton"></view>
          </view>
          <view class="title-right">
            <view class="more-block"></view>
          </view>
        </view>
        <view class="flash-list-skeleton">
          <view v-for="i in 3" :key="i" class="flash-item-skeleton"></view>
        </view>
      </view>
      <view class="recommend">
        <view class="section-title">
          <view class="title-left">
            <view class="title-text-block"></view>
          </view>
          <view class="title-right">
            <view class="more-block"></view>
          </view>
        </view>
        <view class="goods-list">
          <view v-for="i in 4" :key="i" class="goods-item-skeleton"></view>
        </view>
      </view>
      <view class="footer">
        <view class="footer-text-block"></view>
      </view>
    </view>
  </view>
  <!-- #endif -->
</template>

<style lang="scss">
/* 公共样式 */
.sk-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: transparent;
}

/* #ifdef MP-WEIXIN */
.sk-transparent {
  color: transparent !important;
}
.sk-text-14-2857-9 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 39.2rpx;
  position: relative !important;
}
.sk-text {
  background-origin: content-box !important;
  background-clip: content-box !important;
  background-color: transparent !important;
  color: transparent !important;
  background-repeat: repeat-y !important;
}
.sk-text-14-2857-664 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 33.6rpx;
  position: relative !important;
}
.sk-text-14-2857-843 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 33.6rpx;
  position: relative !important;
}
.sk-text-14-2857-107 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 33.6rpx;
  position: relative !important;
}
.sk-text-14-2857-619 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 33.6rpx;
  position: relative !important;
}
.sk-text-14-2857-595 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 33.6rpx;
  position: relative !important;
}
.sk-text-14-2857-698 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 33.6rpx;
  position: relative !important;
}
.sk-text-14-2857-577 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 33.6rpx;
  position: relative !important;
}
.sk-text-14-2857-70 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 33.6rpx;
  position: relative !important;
}
.sk-text-14-2857-152 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 44.8rpx;
  position: relative !important;
}
.sk-text-14-2857-846 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 30.8rpx;
  position: relative !important;
}
.sk-opacity {
  opacity: 0 !important;
}
.sk-text-14-2857-409 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 30.8rpx;
  position: relative !important;
}
.sk-text-14-2857-223 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 30.8rpx;
  position: relative !important;
}
.sk-text-14-2857-353 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 33.6rpx;
  position: relative !important;
}
.sk-text-14-2857-420 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-14-2857-520 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 44.8rpx;
  position: relative !important;
}
.sk-text-14-2857-559 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 33.6rpx;
  position: relative !important;
}
.sk-text-16-6667-999 {
  background-image: linear-gradient(transparent 16.6667%, #eeeeee 0%, #eeeeee 83.3333%, transparent 0%) !important;
  background-size: 100% 30rpx;
  position: absolute !important;
}
.sk-text-14-2857-906 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-14-2857-889 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 33.6rpx;
  position: relative !important;
}
.sk-text-16-6667-132 {
  background-image: linear-gradient(transparent 16.6667%, #eeeeee 0%, #eeeeee 83.3333%, transparent 0%) !important;
  background-size: 100% 30rpx;
  position: absolute !important;
}
.sk-text-14-2857-914 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-14-2857-792 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 44.8rpx;
  position: relative !important;
}
.sk-text-14-2857-541 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 33.6rpx;
  position: relative !important;
}
.sk-text-16-6667-793 {
  background-image: linear-gradient(transparent 16.6667%, #eeeeee 0%, #eeeeee 83.3333%, transparent 0%) !important;
  background-size: 100% 30rpx;
  position: absolute !important;
}
.sk-text-14-2857-199 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 44.8rpx;
  position: relative !important;
}
.sk-text-14-2857-421 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 33.6rpx;
  position: relative !important;
}
.sk-text-14-2857-2 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 39.2rpx;
  position: relative !important;
}
.sk-text-14-2857-260 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 44.8rpx;
  position: relative !important;
}
.sk-text-14-2857-713 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 33.6rpx;
  position: relative !important;
}
.sk-text-14-2857-118 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 30.8rpx;
  position: relative !important;
}
.sk-text-14-2857-422 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 39.2rpx;
  position: relative !important;
}
.sk-text-14-2857-594 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 44.8rpx;
  position: relative !important;
}
.sk-text-14-2857-647 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 33.6rpx;
  position: relative !important;
}
.sk-text-14-2857-281 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 39.2rpx;
  position: relative !important;
}
.sk-text-14-2857-477 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 44.8rpx;
  position: relative !important;
}
.sk-text-14-2857-494 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 33.6rpx;
  position: relative !important;
}
.sk-text-14-2857-929 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 30.8rpx;
  position: relative !important;
}
.sk-text-14-2857-130 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 39.2rpx;
  position: relative !important;
}
.sk-text-14-2857-672 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 44.8rpx;
  position: relative !important;
}
.sk-text-14-2857-392 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 33.6rpx;
  position: relative !important;
}
.sk-text-14-2857-999 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 30.8rpx;
  position: relative !important;
}
.sk-text-14-2857-812 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 33.6rpx;
  position: relative !important;
}
.sk-image {
  background: #efefef !important;
}
.sk-pseudo::before,
.sk-pseudo::after {
  background: #efefef !important;
  background-image: none !important;
  color: transparent !important;
  border-color: transparent !important;
}
.sk-pseudo-rect::before,
.sk-pseudo-rect::after {
  border-radius: 0 !important;
}
.sk-pseudo-circle::before,
.sk-pseudo-circle::after {
  border-radius: 50% !important;
}
.sk-container {
  animation: skeleton-fade 2s linear infinite;
}

@keyframes skeleton-fade {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    opacity: 1;
  }
}
/* #endif */

/* #ifdef H5 */
/* H5特定样式 */
.container {
  background-color: #f5f5f5;
  min-height: 100vh;
}

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

.search-icon {
  width: 36rpx;
  height: 36rpx;
  background-color: #efefef;
  border-radius: 50%;
}

.placeholder-block {
  width: 200rpx;
  height: 30rpx;
  background-color: #efefef;
  margin-left: 10rpx;
  border-radius: 4rpx;
}

.banner-skeleton {
  width: 100%;
  height: 300rpx;
  background-color: #efefef;
}

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
  background-color: #efefef;
  border-radius: 50%;
  margin-bottom: 10rpx;
}

.category-name-block {
  width: 60rpx;
  height: 30rpx;
  background-color: #efefef;
  border-radius: 4rpx;
}

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

.title-text-block {
  width: 120rpx;
  height: 40rpx;
  background-color: #efefef;
  border-radius: 4rpx;
  margin-right: 20rpx;
}

.countdown-skeleton {
  display: flex;
  align-items: center;
  width: 150rpx;
  height: 30rpx;
  background-color: #efefef;
  border-radius: 4rpx;
}

.title-right,
.more-block {
  width: 80rpx;
  height: 30rpx;
  background-color: #efefef;
  border-radius: 4rpx;
}

.flash-sale,
.recommend {
  background-color: #fff;
  margin-bottom: 20rpx;
}

.flash-list-skeleton {
  display: flex;
  padding: 20rpx;
  overflow-x: auto;
}

.flash-item-skeleton {
  flex-shrink: 0;
  width: 280rpx;
  height: 400rpx;
  margin-right: 20rpx;
  background-color: #efefef;
  border-radius: 10rpx;
}

.goods-list {
  padding: 20rpx;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.goods-item-skeleton {
  width: 345rpx;
  height: 480rpx;
  background-color: #efefef;
  border-radius: 10rpx;
  margin-bottom: 20rpx;
}

.footer {
  padding: 30rpx;
  text-align: center;
}

.footer-text-block {
  width: 200rpx;
  height: 30rpx;
  background-color: #efefef;
  border-radius: 4rpx;
  margin: 0 auto;
}

/* 添加淡入淡出动画 */
.sk-container {
  animation: h5-skeleton-fade 2s linear infinite;
}

@keyframes h5-skeleton-fade {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
/* #endif */
</style>
