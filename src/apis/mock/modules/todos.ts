// #ifdef H5
import 'better-mock/dist/mock.browser'
const mockBrowser = Mock.mock
// #endif
// #ifdef MP-WEIXIN || MP-TOUTIAO || APP || APP-PLUS
import { mock as mockMP } from 'better-mock/dist/mock.mp'
// #endif
import { HttpMethods } from '@/common/constants'
import { isH5 } from '@/utils'
import type { PageData, Todo } from '@/apis/modules/type'

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

const todos = mock({
  'data|21': [
    {
      'id|+1': 1,
      'userId|+1': 1,
      title: '@ctitle',
      completed: '@boolean'
    }
  ]
}).data as Todo[]

interface Response {
  body: Record<string, any> | null
  headers: any
  type: HttpMethods
  url: string
  query: Record<string, any>
}

// 获取待办事项数据（支持分页和模糊查询）
mock('/todos', 'GET', (res: Response) => {
  const params = parseQueryString(res.url)
  const page = Number(params.page) || 1
  const pageSize = Number(params.pageSize) || 10
  const title = params.title

  // 过滤数据
  let filteredTodos = [...todos]
  if (title) {
    filteredTodos = filteredTodos.filter((todo) => todo.title.toLowerCase().includes(title.toLowerCase()))
  }

  // 计算分页数据
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const pageData: PageData<Todo> = {
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
      message: 'Todo not found'
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
      message: 'Todo not found'
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
      message: 'Todo not found'
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
  todos.push(todo)
  return {
    code: 1,
    message: 'success',
    data: todo
  }
})
