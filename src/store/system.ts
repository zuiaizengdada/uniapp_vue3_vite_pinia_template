import { uniStorage } from '@/utils'

const systemStore = defineStore(
  'system',
  () => {
    // 是否是首次进入
    const isFirstEnter = ref<boolean>(uniStorage.getSync('system.isFirstEnter') || true)

    function setIsFirstEnter(value: boolean) {
      isFirstEnter.value = value
    }

    return {
      isFirstEnter,
      setIsFirstEnter
    }
  },
  {
    persist: true,
    unistorage: true
  }
)

export default systemStore
