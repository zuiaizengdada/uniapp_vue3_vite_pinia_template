import ApiService from '../request'
import type { CustomConfig, Data } from '../request/type'
import type { TodoItem, PageData, TodoSearchParams } from './type'

const apiService = new ApiService({}, { mock: true })

// 获取待办事项数据（支持分页）
export function getTodos(params?: TodoSearchParams, options?: Partial<UniApp.RequestOptions & CustomConfig>): Promise<Data<TodoItem[]> | Data<PageData<TodoItem>>> {
  return apiService.get('/todos', params, options) as Promise<Data<PageData<TodoItem>>>
}

// 根据待办事项id获取待办事项数据
export function getTodoById(id: number, options?: Partial<UniApp.RequestOptions & CustomConfig>): Promise<Data<TodoItem>> {
  return apiService.get(`/todo/${id}`, {}, options)
}

// 更新待办事项
export function updateTodo(id: number, data: TodoItem, options?: Partial<UniApp.RequestOptions & CustomConfig>): Promise<Data<TodoItem>> {
  return apiService.put(`/todo/${id}`, data, options)
}

// 删除待办事项
export function deleteTodo(id: number, options?: Partial<UniApp.RequestOptions & CustomConfig>): Promise<Data<TodoItem>> {
  return apiService.delete(`/todo/${id}`, {}, options)
}

// 创建待办事项
export function createTodo(data: TodoItem, options?: Partial<UniApp.RequestOptions & CustomConfig>): Promise<Data<TodoItem>> {
  return apiService.post('/todo', data, options)
}
