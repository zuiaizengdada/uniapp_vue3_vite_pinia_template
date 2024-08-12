const userStore = defineStore(
  'user',
  () => {
    let userName = $ref<string>('zengge')
    const setUserName = (name: string) => {
      userName = name
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
