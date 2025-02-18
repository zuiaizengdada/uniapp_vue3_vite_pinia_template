const systemStore = defineStore(
  'system',
  () => {
    // 是否是首次进入
    const isFirstEnterApp = ref<boolean>(true)

    function setIsFirstEnter(value: boolean) {
      isFirstEnterApp.value = value
    }

    return {
      isFirstEnterApp,
      setIsFirstEnter
    }
  },
  {
    unistorage: true,
    persist: true
  }
)

export default systemStore
