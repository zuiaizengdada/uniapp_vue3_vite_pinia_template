import { TabBarStyles } from '../../type'

const defaultStyles: TabBarStyles = {
  background: 'rgba(255, 255, 255, 0.95)',
  height: '100rpx',
  fontSize: '24rpx',
  iconSize: '40rpx',
  color: '#666',
  selectedColor: '#333',
  boxShadow: '0 4px 15px rgba(165, 168, 171, 0.83)',
  borderRadius: '30rpx'
} as const

export { defaultStyles }
