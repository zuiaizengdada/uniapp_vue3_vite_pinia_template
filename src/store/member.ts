import { defineStore } from 'pinia'
import { ref } from 'vue'

// 定义 Store
const useMemberStore = defineStore(
  'member',
  () => {
    // 会员信息
    const profile = ref<any>()

    // 保存会员信息，登录时使用
    const setProfile = (val: any) => {
      profile.value = val
    }

    // 清理会员信息，退出时使用
    const clearProfile = () => {
      profile.value = undefined
    }

    return {
      profile,
      setProfile,
      clearProfile
    }
  },
  {
    unistorage: true
  }
)

export default useMemberStore
