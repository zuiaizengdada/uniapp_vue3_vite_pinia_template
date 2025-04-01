const userStore = defineStore(
  'user',
  () => {
    const userName = ref<string>('曾哥')
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
