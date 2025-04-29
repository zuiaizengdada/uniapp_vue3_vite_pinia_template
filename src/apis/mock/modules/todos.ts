// #ifdef H5
import Mock from 'better-mock'
const mockBrowser = Mock.mock
// #endif
// #ifdef MP-WEIXIN || MP-TOUTIAO || APP || APP-PLUS
import { mock as mockMP } from 'better-mock/dist/mock.mp'
// #endif
import { HttpMethods } from '@/common/constants'
import { usePlatform } from '@/common/hooks'

import type { PageData, TodoItem } from '@/apis/modules/type'

const { isH5 } = usePlatform()

const mock = isH5 ? mockBrowser : mockMP

// 解析URL参数的函数
function parseQueryString(url: string) {
  const queryString = url.split('?')[1] || ''
  const params: Record<string, string> = {}

  if (queryString) {
    queryString.split('&').forEach((param) => {
      const [key, value] = param.split('=')
      if (key) {
        params[key] = decodeURIComponent(value || '')
      }
    })
  }

  return params
}

// 从请求体中获取参数
function getParamsFromBody(body: any): Record<string, any> {
  if (!body) return {}

  if (typeof body === 'string') {
    try {
      return JSON.parse(body)
    } catch (e) {
      return {}
    }
  }

  return body
}

const todos = mock({
  'data|21': [
    {
      'id|+1': 1,
      'userId|+1': 1,
      title: '@ctitle',
      completed: '@boolean'
    }
  ]
}).data as TodoItem[]

interface Response {
  body: Record<string, any> | null
  headers: any
  type: HttpMethods
  url: string
  query: Record<string, any>
}

// 获取待办事项数据（支持分页和模糊查询）
mock('/todos', 'GET', (res: Response) => {
  // 判断是否有查询参数
  const urlParams = parseQueryString(res.url)
  const bodyParams = getParamsFromBody(res.body)

  // 合并参数，优先使用body参数
  const params = { ...urlParams, ...bodyParams }
  const hasParams = Object.keys(params).length > 0

  // 根据是否有参数决定返回全部数据还是按条件查询
  if (!hasParams) {
    // 没有参数时返回全部数据
    return {
      code: 1,
      message: 'success',
      data: todos
    }
  }

  // 有参数时按条件查询
  // 过滤数据
  const page = Number(params.page) || 1
  const pageSize = Number(params.pageSize) || 10
  const title = params.title
  let filteredTodos = [...todos]

  if (title) {
    filteredTodos = filteredTodos.filter((todo) => todo.title.toLowerCase().includes(title.toLowerCase()))
  }

  // 计算分页数据
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const pageData: PageData<TodoItem> = {
    list: filteredTodos.slice(start, end),
    total: filteredTodos.length,
    page,
    pageSize
  }

  return {
    code: 1,
    message: 'success',
    data: pageData
  }
})

// 根据待办id获取待办数据
mock('/todo/:id', 'GET', (res: Response) => {
  const id = parseInt(res.url.match(/\/todo\/(\d+)/)![1])
  const todo = todos.find((todo) => todo.id === id)
  if (todo) {
    return {
      code: 1,
      message: 'success',
      data: todo
    }
  } else {
    return {
      code: 0,
      message: 'TodoItem not found'
    }
  }
})

// 更新待办
mock('/todo/:id', 'PUT', (res: Response) => {
  const id = parseInt(res.url.match(/\/todo\/(\d+)/)![1])
  const todo = todos.find((todo) => todo.id === id)

  if (todo) {
    if (typeof res.body === 'string') {
      const body = JSON.parse(res.body)
      todo.title = body.title
      todo.completed = body.completed
    } else {
      todo.title = res.body!.title
      todo.completed = res.body!.completed
    }

    return {
      code: 1,
      message: 'success',
      data: todo
    }
  } else {
    return {
      code: 0,
      message: 'TodoItem not found'
    }
  }
})

// 删除待办
mock('/todo/:id', 'DELETE', (res: Response) => {
  const id = parseInt(res.url.match(/\/todo\/(\d+)/)![1])
  const todo = todos.find((todo) => todo.id === id)
  if (todo) {
    todos.splice(todos.indexOf(todo), 1)
    return {
      code: 1,
      message: 'success',
      data: todo
    }
  } else {
    return {
      code: 0,
      message: 'TodoItem not found'
    }
  }
})

// 创建待办
mock('/todo', 'POST', (res: Response) => {
  let title = ''
  let completed = false
  if (typeof res.body === 'string') {
    const body = JSON.parse(res.body)
    title = body.title
  } else {
    title = res.body!.title
  }

  const todo = {
    id: todos.length + 1,
    userId: 1,
    title,
    completed
  }
  todos.unshift(todo)
  return {
    code: 1,
    message: 'success',
    data: todo
  }
})
