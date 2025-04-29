<script setup lang="ts">
import { getTodos, createTodo, updateTodo, deleteTodo } from '@/apis'
import { usePlatform } from '@/common/hooks'
import type { PageData, TodoItem } from '@/apis/modules/type'
import { type Data } from '@/apis/request/type'

const { isH5 } = usePlatform()
const showToast = useToast()

// --- 基础状态
const newTodo = ref('')
const searchKeyword = ref('')
const editingTodo = ref<TodoItem | null>(null)
const editPopup = ref()

const queryClient = useQueryClient()

const {
  data: todoList,
  fetchNextPage,
  refetch,
  isFetched,
  isFetching
} = useInfiniteQuery({
  queryKey: ['todos', searchKeyword.value],
  queryFn: ({ pageParam = 1 }) =>
    getTodos({
      page: pageParam,
      pageSize: 10,
      title: searchKeyword.value
    }) as Promise<Data<PageData<TodoItem>>>,
  getNextPageParam: (lastPage) => {
    const pageData = lastPage.data
    if (pageData.list.length < pageData.pageSize) return undefined
    if (pageData.page * pageData.pageSize >= pageData.total) return undefined
    return pageData.page + 1
  },
  initialPageParam: 1,
  select: (data) => data.pages.flatMap((page) => page.data.list)
})

// --- 处理搜索

function handleSearch() {
  debounce(() => {
    refetch()
  }, 300)
}

// --- 监听搜索关键词变化
watch(searchKeyword, () => {
  console.log(111)
  handleSearch()
})

// --- 添加待办
const { mutate: createTodoMutation } = useMutation({
  mutationFn: async (payload: { title: string }) => {
    if (!payload.title.trim()) {
      return showToast({
        title: '请输入待办事项',
        icon: 'none'
      })
    }
    return await createTodo({ id: 1, userId: 1, title: payload.title, completed: false })
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['todos'] })
    newTodo.value = ''
  }
})

// --- 删除待办
const { mutate: deleteTodoMutation } = useMutation({
  mutationFn: deleteTodo,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['todos'] })
  }
})

// --- 更新待办
const { mutate: updateTodoMutation } = useMutation({
  mutationFn: (todo: TodoItem) => updateTodo(todo.id, todo),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['todos'] })
    editPopup.value.close()
    editingTodo.value = null
  }
})

// --- 切换待办完成状态
function toggleTodo(todo: TodoItem) {
  updateTodoMutation({ ...todo, completed: !todo.completed })
}

// --- 编辑待办
function startEdit(todo: TodoItem) {
  editingTodo.value = { ...todo }
  editPopup.value.open()
}

// --- 取消编辑
function cancelEdit() {
  editingTodo.value = null
  editPopup.value.close()
}

// --- 确认编辑
function confirmEdit() {
  if (editingTodo.value) {
    updateTodoMutation(editingTodo.value)
  }
}

function scrolltoupper() {
  console.log('scrolltoupper')
  refetch()
}
</script>

<template>
  <view
    class="flex flex-col bg-gray-50"
    :style="{
      height: isH5 ? 'calc(100vh - 44px)' : '100vh'
    }"
  >
    <view class="flex-none p-4 pb-0 bg-white shadow-sm">
      <view class="text-xl font-bold text-gray-800">待办事项</view>
    </view>

    <view class="flex-none p-4 bg-white border-b">
      <!-- 添加搜索框 -->
      <view class="flex items-center gap-2 mb-4">
        <input v-model="searchKeyword" type="text" placeholder="搜索待办事项..." class="flex-1 h-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </view>
      <!-- 添加待办输入框 -->
      <view class="flex items-center gap-2">
        <input
          v-model="newTodo"
          type="text"
          placeholder="添加新的待办事项..."
          class="flex-1 h-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          @keypress.enter="createTodoMutation({ title: newTodo })"
        />
        <button @click="createTodoMutation({ title: newTodo })" class="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 active:bg-blue-700 custom-btn">添加</button>
      </view>
    </view>

    <scroll-view scroll-y class="flex-1 overflow-hidden" :style="{ height: 'calc(100vh - 120px)' }" @scrolltolower="fetchNextPage" @scrolltoupper="scrolltoupper">
      <view class="p-4 space-y-3">
        <view v-for="(todo, index) in todoList" :key="index" class="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
          <view class="flex items-center gap-3">
            <checkbox :checked="todo.completed" @tap="toggleTodo(todo)" class="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500" />
            <text :class="['text-gray-800', todo.completed ? 'line-through text-gray-400' : '']" @tap="startEdit(todo)">
              {{ todo.title }}
            </text>
          </view>
          <uni-icons type="trash" size="20" color="#ef4444" @click="deleteTodoMutation(todo.id)"></uni-icons>
        </view>
      </view>

      <view v-if="isFetching" class="py-4 pt-0 text-center text-gray-500">加载中...</view>
      <view v-if="isFetched && !isFetching" class="py-4 pt-0 text-center text-gray-500">没有更多数据了</view>
    </scroll-view>

    <uni-popup ref="editPopup" type="center">
      <view class="p-4 bg-white rounded-lg w-80">
        <view class="mb-4 text-lg font-bold">编辑待办</view>
        <input
          v-if="editingTodo"
          v-model="editingTodo.title"
          type="text"
          class="w-full h-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="请输入待办事项..."
        />
        <view class="flex justify-center gap-2">
          <button @click="cancelEdit" class="text-gray-600 bg-gray-100 rounded-lg custom-btn">取消</button>
          <button @click="confirmEdit" class="text-white bg-blue-500 rounded-lg custom-btn">确定</button>
        </view>
      </view>
    </uni-popup>
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
