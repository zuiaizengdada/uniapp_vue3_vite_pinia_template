//@ts-nockeck
export default {
  mode: 'jit',
  darkMode: 'class',
  content: ['./index.html', '!./src/**/__tests__/*', './src/**/*.{vue,ts,tsx}']

  // theme: {
  //   // 内边距
  //   padding: Array.from({ length: 1000 }).reduce((map, _, index) => {
  //     map[index] = `${index}rpx`
  //     return map
  //   }, {}),
  //   // 外边距
  //   spacing: Array.from({ length: 1000 }).reduce((map, _, index) => {
  //     map[index] = `${index}rpx`
  //     return map
  //   }, {}),
  //   // 圆角
  //   borderRadius: Array.from({ length: 1000 }).reduce((map, _, index) => {
  //     map[index] = `${index}rpx`
  //     return map
  //   }, {}),
  //   extend: {
  //     // 宽度
  //     width: Array.from({ length: 1000 }).reduce((map, _, index) => {
  //       map[index] = `${index}rpx`
  //       return map
  //     }, {}),
  //     // 高度
  //     height: Array.from({ length: 1000 }).reduce((map, _, index) => {
  //       map[index] = `${index}rpx`
  //       return map
  //     }, {}),
  //     // 字体大小
  //     fontSize: Array.from({ length: 100 }).reduce((map, _, index) => {
  //       map[index] = `${index}rpx`
  //       return map
  //     }, {}),
  //     // 行高
  //     lineHeight: Array.from({ length: 1000 }).reduce((map, _, index) => {
  //       map[index] = `${index}rpx`
  //       return map
  //     }, {}),
  //     colors: {
  //       //自定义颜色
  //       layout: {
  //         main: '#417eb7'
  //       },
  //       colorQianHui: '#f5f5f5',
  //       colorHui: '#aaabac',
  //       colorRed: '#dc6060',
  //       colorQianLan: '#d9ecff',
  //       colorShenHei: '#303133'
  //     },
  //     animation: {
  //       //自定义动画
  //       'icon-bounce': 'icon-bounce 3s infinite'
  //     },
  //     keyframes: {
  //       'icon-bounce': {
  //         '0%': { transform: 'translateY(-5%)', animationTimingFunction: 'cubic - bezier(0.8, 0, 1, 1)' },
  //         '50%': { transform: 'translateY(0)', animationTimingFunction: 'cubic - bezier(0, 0, 0.2, 1)' },
  //         '100%': { transform: 'translateY(-5%)', animationTimingFunction: 'cubic - bezier(0.8, 0, 1, 1)' }
  //       }
  //     }
  //   }
  // },
}
