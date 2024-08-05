import { mock } from 'better-mock/dist/mock.mp'
import { type Post } from '@/apis/modules/type'

const posts = mock({
  'data|10': [
    {
      'id|+1': 1,
      'userId|+1': 1,
      title: '@ctitle',
      body: '@cparagraph'
    }
  ]
}).data as Post[]

// 获取所有文章数据
mock('/posts', 'GET', {
  code: 1,
  message: 'success',
  data: posts
})

// 根据文章id获取文章数据
mock('/post/:id', 'GET', (req: any) => {
  const id = parseInt(req.url.match(/\/post\/(\d+)/)[1])
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
mock('/post/:id', 'PUT', (req: any) => {
  const id = parseInt(req.url.match(/\/post\/(\d+)/)[1])
  const post = posts.find((post) => post.id === id)
  if (post) {
    const { title, body } = req.body
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
mock('/post/:id', 'DELETE', (req: any) => {
  const id = parseInt(req.url.match(/\/post\/(\d+)/)[1])
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
mock('/post', 'POST', (req: any) => {
  const { title, body } = req.body
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
