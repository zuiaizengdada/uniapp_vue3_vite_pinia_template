<script setup lang="ts">
import { getTodos, createTodo, updateTodo, deleteTodo } from '@/apis'
import { useListQuery, useMutations } from '@/common/hooks'
import type { PageData, Todo, TodoSearchParams } from '@/apis/modules/type'
import { type Data } from '@/apis/request/type'

const {
  list: todoList,
  finished,
  loading,
  loadMore
} = useListQuery<Todo, TodoSearchParams>({
  queryKey: ['todos'],
  queryFn: (params) => getTodos(params) as Promise<Data<PageData<Todo>>>,
  defaultParams: {
    page: 1,
    pageSize: 10
  }
})

const newTodo = ref('')
const {
  create: { mutate: createTodoMutation }
} = useMutations<Todo, Todo, { id: number; data: Todo }, number>({
  createFn: createTodo,
  updateFn: ({ id, data }) => updateTodo(id, data),
  deleteFn: deleteTodo
})

// // 模拟数据
// const todoList = ref([
//   {
//     userId: 1,
//     id: 1,
//     title: 'delectus aut autem',
//     completed: false
//   },
//   {
//     userId: 1,
//     id: 2,
//     title: 'quis ut nam facilis et officia qui',
//     completed: false
//   },
//   {
//     userId: 1,
//     id: 3,
//     title: 'fugiat veniam minus',
//     completed: false
//   },
//   {
//     userId: 1,
//     id: 4,
//     title: 'fugiat veniam minus',
//     completed: false
//   },
//   {
//     userId: 1,
//     id: 5,
//     title: 'fugiat veniam minus',
//     completed: false
//   },
//   {
//     userId: 1,
//     id: 6,
//     title: 'fugiat veniam minus',
//     completed: false
//   },
//   {
//     userId: 1,
//     id: 7,
//     title: 'fugiat veniam minus',
//     completed: false
//   },
//   {
//     userId: 1,
//     id: 8,
//     title: 'fugiat veniam minus',
//     completed: false
//   },
//   {
//     userId: 1,
//     id: 9,
//     title: 'fugiat veniam minus',
//     completed: false
//   },
//   {
//     userId: 1,
//     id: 10,
//     title: 'fugiat veniam minus',
//     completed: false
//   },
//   {
//     userId: 1,
//     id: 11,
//     title: 'fugiat veniam minus',
//     completed: false
//   },
//   {
//     userId: 1,
//     id: 12,
//     title: 'fugiat veniam minus',
//     completed: false
//   }
// ])

// // 分页相关状态
// const pageSize = 10
// const currentPage = ref(1)
// const isLoading = ref(false)
// const hasMore = ref(true)

// // 新增待办事项
// const newTodo = ref('')
// function addTodo() {
//   if (!newTodo.value.trim()) return
//   todoList.value.push({
//     userId: 1,
//     id: todoList.value.length + 1,
//     title: newTodo.value,
//     completed: false
//   })
//   newTodo.value = ''
// }

// // 切换待办事项状态
// function toggleTodo(id: number) {
//   const todo = todoList.value.find((item) => item.id === id)
//   if (todo) {
//     todo.completed = !todo.completed
//   }
// }

// // 删除待办事项
// function deleteTodo(id: number) {
//   todoList.value = todoList.value.filter((item) => item.id !== id)
// }

// // 加载更多数据
// async function loadMore() {
//   if (isLoading.value || !hasMore.value) return

//   isLoading.value = true
//   try {
//     // 模拟API请求
//     await new Promise((resolve) => setTimeout(resolve, 1000))

//     // 模拟新数据
//     const newTodos = Array.from({ length: pageSize }, (_, index) => ({
//       userId: 1,
//       id: todoList.value.length + index + 1,
//       title: `待办事项 ${todoList.value.length + index + 1}`,
//       completed: false
//     }))

//     todoList.value = [...todoList.value, ...newTodos]
//     currentPage.value++

//     // 模拟数据加载完毕
//     if (currentPage.value >= 5) {
//       hasMore.value = false
//     }
//   } finally {
//     isLoading.value = false
//   }
// }

// // 监听滚动到底部
// function onScrollToLower() {
//   loadMore()
// }
</script>

<template>
  <view class="flex flex-col h-screen bg-gray-50">
    <!-- 头部 -->
    <view class="flex-none p-4 pb-0 bg-white shadow-sm">
      <view class="text-xl font-bold text-gray-800">待办事项</view>
    </view>

    <!-- 添加待办 -->
    <view class="flex-none p-4 bg-white border-b">
      <view class="flex gap-2 items-center">
        <input
          v-model="newTodo"
          type="text"
          placeholder="添加新的待办事项..."
          class="flex-1 px-4 py-2 h-full rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
          @keypress.enter="createTodoMutation({ title: newTodo })"
        />
        <button @click="createTodoMutation({ title: newTodo })" class="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 active:bg-blue-700 custom-btn">添加</button>
      </view>
    </view>

    <!-- 待办列表 -->
    <scroll-view scroll-y class="overflow-hidden flex-1" :style="{ height: 'calc(100vh - 120px)' }" @scrolltolower="loadMore">
      <view class="p-4 space-y-3">
        <view v-for="todo in todoList" :key="todo.id" class="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm">
          <view class="flex gap-3 items-center">
            <checkbox :checked="todo.completed" @tap="toggleTodo(todo.id)" class="w-5 h-5 text-blue-500 rounded border-gray-300 focus:ring-blue-500" />
            <text :class="['text-gray-800', todo.completed ? 'line-through text-gray-400' : '']">
              {{ todo.title }}
            </text>
          </view>
          <uni-icons type="trash" size="20" color="#ef4444" @click="deleteTodo(todo.id)"></uni-icons>
        </view>
      </view>

      <!-- 加载状态 -->
      <view v-if="loading" class="py-4 pt-0 text-center text-gray-500">加载中...</view>
      <view v-if="!finished && !loading" class="py-4 pt-0 text-center text-gray-500">没有更多数据了</view>
    </scroll-view>
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
