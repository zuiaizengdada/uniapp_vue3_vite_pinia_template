import ApiService from '../request'
import type { CustomConfig, Data } from '../request/type'
import type { Todo, PageData, TodoSearchParams } from './type'

const apiService = new ApiService({}, { mock: false })

// 获取待办事项数据（支持分页）
export function getTodos(params?: TodoSearchParams, options?: Partial<UniApp.RequestOptions & CustomConfig>): Promise<Data<Todo[]> | Data<PageData<Todo>>> {
  return apiService.get('/todos', params, options) as Promise<Data<PageData<Todo>>>
}

// 根据待办事项id获取待办事项数据
export function getTodoById(id: number, options?: Partial<UniApp.RequestOptions & CustomConfig>): Promise<Data<Todo>> {
  return apiService.get(`/todo/${id}`, {}, options)
}

// 更新待办事项
export function updateTodo(id: number, data: Todo, options?: Partial<UniApp.RequestOptions & CustomConfig>): Promise<Data<Todo>> {
  return apiService.put(`/todo/${id}`, data, options)
}

// 删除待办事项
export function deleteTodo(id: number, options?: Partial<UniApp.RequestOptions & CustomConfig>): Promise<Data<Todo>> {
  return apiService.delete(`/todo/${id}`, {}, options)
}

// 创建待办事项
export function createTodo(data: Todo, options?: Partial<UniApp.RequestOptions & CustomConfig>): Promise<Data<Todo>> {
  return apiService.post('/todo', data, options)
}
