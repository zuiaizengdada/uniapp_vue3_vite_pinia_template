// #ifdef H5
import 'better-mock/dist/mock.browser'
const mockBrowser = Mock.mock
// #endif
// #ifdef MP-WEIXIN || MP-TOUTIAO || APP || APP-PLUS
import { mock as mockMP } from 'better-mock/dist/mock.mp'
// #endif
import { HttpMethods } from '@/common/constants'
import { isH5 } from '@/utils'
import type { PageData, Post } from '@/apis/modules/type'

const mock = isH5 ? mockBrowser : mockMP

const posts = mock({
  'data|100': [
    {
      'id|+1': 1,
      'userId|+1': 1,
      title: '@ctitle',
      body: '@cparagraph'
    }
  ]
}).data as Post[]

interface Response {
  body: Record<string, any> | null
  headers: any
  type: HttpMethods
  url: string
}

// 获取文章数据（支持分页）
mock('/posts', 'GET', (res: Response) => {
  const { page, pageSize } = res.body || {}

  // 如果没有传分页参数，返回所有数据
  if (!page || !pageSize) {
    return {
      code: 1,
      message: 'success',
      data: posts as Post[]
    }
  }

  // 有分页参数时返回分页数据
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const pageData: PageData<Post> = {
    list: posts.slice(start, end),
    total: posts.length,
    page,
    pageSize
  }

  return {
    code: 1,
    message: 'success',
    data: pageData
  }
})

// 根据文章id获取文章数据
mock('/post/:id', 'GET', (res: Response) => {
  const id = parseInt(res.url.match(/\/post\/(\d+)/)![1])
  const post = posts.find((post) => post.id === id)
  if (post) {
    return {
      code: 1,
      message: 'success',
      data: post
    }
  } else {
    return {
      code: 0,
      message: 'Article not found'
    }
  }
})

// 更新文章
mock('/post/:id', 'PUT', (res: Response) => {
  const id = parseInt(res.url.match(/\/post\/(\d+)/)![1])
  const post = posts.find((post) => post.id === id)
  if (post) {
    const { title, body } = res.body!
    post.title = title
    post.body = body
    return {
      code: 1,
      message: 'success',
      data: post
    }
  } else {
    return {
      code: 0,
      message: 'Article not found'
    }
  }
})

// 删除文章
mock('/post/:id', 'DELETE', (res: Response) => {
  const id = parseInt(res.url.match(/\/post\/(\d+)/)![1])
  const post = posts.find((post) => post.id === id)
  if (post) {
    posts.splice(posts.indexOf(post), 1)
    return {
      code: 1,
      message: 'success',
      data: post
    }
  } else {
    return {
      code: 0,
      message: 'Article not found'
    }
  }
})

// 创建文章
mock('/post', 'POST', (res: Response) => {
  const { title, body } = res.body!
  const post = {
    id: posts.length + 1,
    userId: 1,
    title,
    body
  }
  posts.push(post)
  return {
    code: 1,
    message: 'success',
    data: post
  }
})
