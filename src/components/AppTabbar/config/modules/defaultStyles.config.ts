import { TabBarStyles } from '../../type'

const defaultStyles: TabBarStyles = {
  height: '100rpx',
  fontWeight: 'normal',
  background: '#3d3d3d',
  color: 'rgba(255,255,255,0.7)',
  fontSize: '26rpx',
  iconSize: '50rpx',
  selectedColor: 'rgba(255,255,255,0.7)',
  boxShadow: '0 4px 15px rgba(165, 168, 171, 0.83)',
  borderRadius: '30rpx'
} as const

export { defaultStyles }
