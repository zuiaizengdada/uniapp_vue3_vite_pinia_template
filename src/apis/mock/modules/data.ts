import mock from 'better-mock/dist/mock.mp'

mock.mock('/book', 'GET', {
  code: 1,
  msg: 'success',
  'data|1-10': [
    {
      'id|+1': 1,
      name: '@name'
    }
  ]
})
