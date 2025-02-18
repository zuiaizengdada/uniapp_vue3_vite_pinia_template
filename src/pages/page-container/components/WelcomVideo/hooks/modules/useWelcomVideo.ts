const { setIsFirstEnter } = useStore('system')

export function useWelcomVideo() {
  // 创建视频上下文实例
  let videoContext: UniApp.VideoContext | null = null

  function handleSkip() {
    setIsFirstEnter(false)
  }

  // 恢复视频播放
  function resumeVideo() {
    if (videoContext) {
      videoContext.play()
    }
  }

  onMounted(() => {
    // 设置页面全屏
    uni.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#000000'
    })

    // 创建视频上下文
    videoContext = uni.createVideoContext('welcomeVideo')

    // 监听应用从后台恢复到前台的事件
    uni.onAppShow(() => {
      resumeVideo()
    })
  })

  return {
    handleSkip
  }
}
