<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app'

const { userInfo, logining, userName, onGetPhoneNumber, onChooseAvatar, onNicknameBlur, fetchUserInfo, hasValidToken } = useStore('user')

onShow(() => {

    console.log('hasValidToken', hasValidToken())
    // 页面显示时，如果已登录（有token），则尝试刷新用户信息
    if (hasValidToken()) {
        fetchUserInfo().catch(err => {
            console.log('Fetch user info failed', err)
        })
    }
})
</script>

<template>
    <view class="h-screen flex flex-col items-center pt-32 px-6 bg-white">
        <!-- 未登录状态 -->
        <view v-if="!userInfo" class="w-full flex flex-col items-center">
            <view class="mb-12 flex flex-col items-center">
                <uni-icons type="weixin" size="80" color="#07c160" />
                <text class="mt-4 text-xl font-bold text-gray-800">微信授权登录</text>
            </view>

            <!-- 使用 open-type="getPhoneNumber" 获取手机号授权 -->
            <button
                class="w-full bg-[#07c160] active:bg-[#06ad56] text-white rounded-full py-2 text-md font-medium shadow-sm border-0"
                hover-class="opacity-90" :loading="logining" :disabled="logining" open-type="getPhoneNumber"
                @getphonenumber="onGetPhoneNumber">
                {{ logining ? '登录中...' : '微信一键登录' }}
            </button>
            <text class="mt-4 text-xs text-gray-400 text-center">
                登录即代表同意用户协议与隐私政策
            </text>
        </view>

        <!-- 登录成功状态 -->
        <view v-else class="flex flex-col items-center gap-6 animate-fade-in mt-10 w-full px-10">

            <!-- 头像修改 -->
            <view class="relative">
                <button class="p-0 border-0 bg-transparent flex flex-col items-center overflow-visible after:border-0"
                    open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
                    <image :src="userInfo.avatarUrl" class="w-24 h-24 rounded-full border-4 border-gray-100 shadow-md"
                        mode="aspectFill" />
                    <view class="absolute bottom-0 right-0 bg-gray-800 bg-opacity-60 rounded-full p-1.5">
                        <uni-icons type="camera-filled" size="14" color="#fff" />
                    </view>
                </button>
            </view>

            <!-- 昵称修改 -->
            <view class="w-full bg-gray-50 rounded-lg px-4 py-3 flex items-center">
                <text class="text-gray-500 mr-4 font-bold">昵称</text>
                <input type="nickname" class="flex-1 text-gray-900 font-medium" :value="userName" placeholder="请输入昵称"
                    @blur="onNicknameBlur" @confirm="onNicknameBlur" />
            </view>

            <view class="mt-4 text-xs text-gray-400">
                点击头像可修改，点击昵称可输入
            </view>
        </view>
    </view>
</template>

<style scoped>
.animate-fade-in {
    animation: fadeIn 0.6s ease-out forwards;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* 消除button默认样式 */
button::after {
    border: none;
}
</style>
