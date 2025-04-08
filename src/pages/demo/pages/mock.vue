<script setup lang="ts">
import { createPost, getPosts, updatePost, deletePost } from '@/apis'
import { usePlatform } from '@/common/hooks'
import type { PageData, Post } from '@/apis/modules/type'
import { type Data } from '@/apis/request/type'

const { isH5 } = usePlatform()

const postList = ref<Post[]>([])
const page = ref(1)
const pageSize = ref(5)
const total = ref(0)
const searchValue = ref('')
const mockCount = ref(1)

// 编辑相关
const showEditModal = ref(false)
const currentPost = ref<Post | null>(null)
const editForm = ref({
  title: '',
  content: ''
})

// 创建Mock文章
async function generateMockData() {
  const postData = {
    title: `Mock文章${mockCount.value}`,
    content: `Mock文章内容${mockCount.value}`,
    id: mockCount.value,
    userId: mockCount.value
  }
  await createPost(postData)
  mockCount.value++
  getPostList()
}

// 获取文章列表
async function getPostList() {
  const res = (await getPosts({
    page: page.value,
    pageSize: pageSize.value,
    title: searchValue.value
  })) as Data<PageData<Post>>

  postList.value = res.data.list
  total.value = res.data.total
}

// 搜索文章（使用防抖）
const searchPost = debounce(async () => {
  page.value = 1 // 重置页码
  await getPostList()
}, 300)

// 重置搜索
function resetSearch() {
  searchValue.value = ''
  page.value = 1
  getPostList()
}

// 页码变化
async function handlePageChange(newPage: number) {
  page.value = newPage
  await getPostList()
}

// 打开编辑弹窗
function openEditModal(post: Post) {
  currentPost.value = post
  editForm.value = {
    title: post.title,
    content: post.content
  }
  showEditModal.value = true
}

// 关闭编辑弹窗
function closeEditModal() {
  showEditModal.value = false
  currentPost.value = null
  editForm.value = {
    title: '',
    content: ''
  }
}

// 保存编辑
async function handleSaveEdit() {
  if (!currentPost.value) return

  try {
    await updatePost(currentPost.value.id, {
      ...currentPost.value,
      ...editForm.value
    })
    closeEditModal()
    getPostList()
  } catch (error) {
    console.error('更新失败:', error)
  }
}

// 删除文章
async function handleDelete(post: Post) {
  // 使用uni-app的API代替浏览器的confirm
  uni.showModal({
    title: '提示',
    content: '确定要删除这篇文章吗？',
    success: async function (res) {
      if (res.confirm) {
        try {
          await deletePost(post.id)
          getPostList()
        } catch (error) {
          console.error('删除失败:', error)
        }
      }
    }
  })
}

onMounted(() => {
  getPostList()
})
</script>

<template>
  <view
    class="flex flex-col"
    :style="{
      height: isH5 ? 'calc(100vh - 44px)' : '100vh'
    }"
  >
    <!-- 搜索和添加区域 -->
    <view class="flex justify-between items-center p-4 border-b">
      <view class="flex flex-1 items-center mr-2">
        <input type="text" placeholder="搜索文章..." class="flex-1 px-3 py-2 h-full rounded-md border" v-model="searchValue" @input="searchPost" />
        <button v-if="searchValue" class="px-2 py-1 ml-2 text-gray-500 hover:text-gray-700" @click="resetSearch">清除</button>
      </view>
      <button class="px-4 py-2 text-white bg-blue-500 rounded-md custom-btn" @click="generateMockData">添加文章</button>
    </view>

    <!-- 文章列表（可滚动区域） -->
    <scroll-view scroll-y class="overflow-hidden flex-1 p-4">
      <view class="space-y-3">
        <view v-for="item in postList" :key="item.id" class="p-3 bg-white rounded-md border">
          <view class="flex justify-between items-center">
            <view class="flex-1">
              <view class="mb-1 font-medium">
                <text>
                  {{ item.title }}
                </text>
              </view>
              <view class="text-sm text-gray-500">
                <text>
                  {{ item.content }}
                </text>
              </view>
              <view class="text-sm text-gray-500">
                <text>作者 {{ item.id }}</text>
              </view>
            </view>
            <view class="flex gap-2">
              <button class="text-blue-500 custom-btn" @click="openEditModal(item)">编辑</button>
              <button class="text-red-500 custom-btn" @click="handleDelete(item)">删除</button>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>

    <!-- 分页 -->
    <view class="flex gap-2 justify-center p-4 border-t">
      <button class="px-3 py-1 rounded-md border custom-btn" :disabled="page <= 1" @click="handlePageChange(page - 1)">上一页</button>
      <button class="px-3 py-1 text-white bg-blue-500 rounded-md custom-btn">{{ page }}</button>
      <button class="px-3 py-1 rounded-md border custom-btn" :disabled="page * pageSize >= total" @click="handlePageChange(page + 1)">下一页</button>
    </view>

    <!-- 编辑弹窗 -->
    <view v-if="showEditModal" class="flex fixed inset-0 justify-center items-center bg-black bg-opacity-50">
      <view class="p-4 w-80 bg-white rounded-lg">
        <view class="mb-4 text-lg font-medium">编辑文章</view>
        <view class="space-y-4">
          <view>
            <view class="mb-1 text-sm text-gray-600">标题</view>
            <input type="text" v-model="editForm.title" class="px-3 py-2 w-full h-full rounded-md border" />
          </view>
          <view>
            <view class="mb-1 text-sm text-gray-600">内容</view>
            <textarea v-model="editForm.content" class="px-3 py-2 w-full h-32 rounded-md border"></textarea>
          </view>
        </view>
        <view class="flex gap-2 justify-end mt-4">
          <button class="px-4 py-2 text-gray-600 hover:text-gray-800 custom-btn" @click="closeEditModal">取消</button>
          <button class="px-4 py-2 text-white bg-blue-500 rounded-md custom-btn" @click="handleSaveEdit">保存</button>
        </view>
      </view>
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
  background-color: #f8f8f8; /* 确保背景色一致 */

  &::after {
    border: none; /* 移除微信小程序中的默认边框 */
  }
}
/* #endif */

/* 针对头条小程序的特定调整 */
/* #ifdef MP-TOUTIAO */
button.custom-btn {
  overflow: visible;
  background-color: #f8f8f8;

  &::after {
    border: none;
  }
}
/* #endif */
</style>
