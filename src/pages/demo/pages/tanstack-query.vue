<script setup lang="ts">
import { getTodos, createTodo, updateTodo, deleteTodo } from '@/apis'
import { useListQuery, useMutations, usePlatform } from '@/common/hooks'
import type { PageData, Todo, TodoSearchParams } from '@/apis/modules/type'
import { type Data } from '@/apis/request/type'

const { isH5 } = usePlatform()

const {
  list: todoList,
  finished,
  loading,
  loadMore,
  refresh
} = useListQuery<Todo, TodoSearchParams>({
  queryKey: ['todos'],
  queryFn: (params) => getTodos(params) as Promise<Data<PageData<Todo>>>,
  defaultParams: {
    page: 1,
    pageSize: 10
  }
})

const newTodo = ref('')
const editPopup = ref()
const editingTodo = ref<Todo | null>(null)

const {
  create: { mutate: createTodoMutation },
  update: { mutate: updateTodoMutation },
  remove: { mutate: deleteTodoMutation }
} = useMutations<Todo, Todo, { id: number; data: Todo }, number>({
  createFn: createTodo,
  updateFn: ({ id, data }) => updateTodo(id, data),
  deleteFn: deleteTodo,
  invalidateQueryKeys: [['todos']],
  createSuccess: () => {
    newTodo.value = ''
  }
})

// 切换待办状态
function toggleTodo(todo: Todo) {
  updateTodoMutation({
    id: todo.id,
    data: {
      ...todo,
      completed: !todo.completed
    }
  })
}

// 开始编辑
function startEdit(todo: Todo) {
  editingTodo.value = { ...todo }
  editPopup.value.open()
}

// 取消编辑
function cancelEdit() {
  editingTodo.value = null
  editPopup.value.close()
}

// 确认编辑
function confirmEdit() {
  if (!editingTodo.value) return
  updateTodoMutation({
    id: editingTodo.value.id,
    data: {
      ...editingTodo.value
    }
  })
  editPopup.value.close()
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

    <scroll-view scroll-y class="overflow-hidden flex-1" :style="{ height: 'calc(100vh - 120px)' }" @scrolltolower="loadMore" @scrolltoupper="refresh">
      <view class="p-4 space-y-3">
        <view v-for="(todo, index) in todoList" :key="index" class="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm">
          <view class="flex gap-3 items-center">
            <checkbox :checked="todo.completed" @tap="toggleTodo(todo)" class="w-5 h-5 text-blue-500 rounded border-gray-300 focus:ring-blue-500" />
            <text :class="['text-gray-800', todo.completed ? 'line-through text-gray-400' : '']" @tap="startEdit(todo)">
              {{ todo.title }}
            </text>
          </view>
          <uni-icons type="trash" size="20" color="#ef4444" @click="deleteTodoMutation(todo.id)"></uni-icons>
        </view>
      </view>

      <view v-if="loading" class="py-4 pt-0 text-center text-gray-500">加载中...</view>
      <view v-if="finished && !loading" class="py-4 pt-0 text-center text-gray-500">没有更多数据了</view>
    </scroll-view>

    <uni-popup ref="editPopup" type="center">
      <view class="p-4 w-80 bg-white rounded-lg">
        <view class="mb-4 text-lg font-bold">编辑待办</view>
        <input
          v-if="editingTodo"
          v-model="editingTodo.title"
          type="text"
          class="px-4 py-2 mb-4 w-full h-full rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="请输入待办事项..."
        />
        <view class="flex gap-2 justify-center">
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
