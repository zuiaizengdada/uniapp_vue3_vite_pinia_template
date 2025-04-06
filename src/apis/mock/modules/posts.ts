// #ifdef H5
import Mock from 'better-mock'
const mockBrowser = Mock.mock
// #endif
// #ifdef MP-WEIXIN || MP-TOUTIAO || APP || APP-PLUS
import { mock as mockMP } from 'better-mock/dist/mock.mp'
// #endif
import { HttpMethods } from '@/common/constants'
import { usePlatform } from '@/common/hooks'

import type { PageData, Post } from '@/apis/modules/type'

const { isH5 } = usePlatform()

const mock = isH5 ? mockBrowser : mockMP

const posts = mock({
  data: []
}).data as Post[]

interface Response {
  body: Record<string, any> | null
  headers: any
  type: HttpMethods
  url: string
}

// 获取文章数据（支持分页和模糊查询）
mock('/posts', 'GET', (res: Response) => {
  const { page = 1, pageSize = 10, title } = res.body || {}

  // 过滤数据
  let filteredPosts = [...posts]
  if (title) {
    filteredPosts = filteredPosts.filter((post) => post.title.toLowerCase().includes(title.toLowerCase()) || post.content.toLowerCase().includes(title.toLowerCase()))
  }

  // 计算分页数据
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const pageData: PageData<Post> = {
    list: filteredPosts.slice(start, end),
    total: filteredPosts.length,
    page: Number(page),
    pageSize: Number(pageSize)
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
    const { title, content } = res.body!
    post.title = title
    post.content = content
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
  let title = ''
  let content = ''
  if (typeof res.body === 'string') {
    const body = JSON.parse(res.body)
    title = body.title
    content = body.content
  } else {
    title = res.body!.title
    content = res.body!.content
  }

  const post = {
    id: posts.length + 1,
    userId: 1,
    title,
    content
  }
  posts.push(post)
  return {
    code: 1,
    message: 'success',
    data: post
  }
})
