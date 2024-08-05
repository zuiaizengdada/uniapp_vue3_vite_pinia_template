import mock from 'better-mock/dist/mock.mp'

mock.mock('/book', 'GET', {
  code: 1,
  msg: 'success',
  'data|1-10': [
    {
      'id|+1': 1,
      name: '@name',
      author: '@name',
      date: '@date',
      'price|1-100': 100,
      'publish|1': ['@name', '@name', '@name'],
      'category|1': ['@name', '@name', '@name'],
      'description|1': ['@name', '@name', '@name'],
      'cover|1': [
        'https://cdn.uviewui.com/uview/swiper/1.jpg',
        'https://cdn.uviewui.com/uview/swiper/2.jpg',
        'https://cdn.uviewui.com/uview/swiper/3.jpg'
      ]
    }
  ]
})
