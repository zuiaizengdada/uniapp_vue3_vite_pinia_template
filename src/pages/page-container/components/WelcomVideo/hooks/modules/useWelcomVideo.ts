const { setIsFirstEnter } = useStore('system')

export function useWelcomVideo() {
  function handleSkip() {
    setIsFirstEnter(false)
  }

  onMounted(() => {
    // 设置页面全屏
    uni.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#000000'
    })
  })

  return {
    handleSkip
  }
}
