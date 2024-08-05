const userStore = defineStore(
  'user',
  () => {
    const userName = ref<string>('zengge')
    const setUserName = (name: string) => {
      userName.value = name
    }

    return {
      userName,
      setUserName
    }
  },
  {
    unistorage: true
  }
)

export default userStore
