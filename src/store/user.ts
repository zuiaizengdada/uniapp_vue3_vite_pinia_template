import { loginByWechatApi, updateUserProfileApi, getUserProfileApi } from '@/apis'
import { useUniStorage } from '@/common/hooks'
const { getSync, setSync } = useUniStorage()

const userStore = defineStore(
  'user',
  () => {
    const showToast = useToast()

    const isLogin = ref<boolean>(false)
    function setIsLogin(value: boolean) {
      isLogin.value = value
    }

    const logining = ref<boolean>(false)
    function setLogining(value: boolean) {
      logining.value = value
    }

    const token = ref<string>('')
    function setToken(access_token: string) {
      token.value = access_token
      // 手动同步到独立存储，与 ApiService 保持一致
      uni.setStorageSync('user.token', access_token)
    }

    const userInfo = ref<UniApp.UserInfo>()

    function setUserInfo(info: Partial<UniApp.UserInfo>) {
      userInfo.value = { ...userInfo.value, ...info } as UniApp.UserInfo
    }

    async function loginByWechat(phoneCode?: string) {
      setLogining(true)

      try {
        // 1. 设置默认用户信息 
        const defaultUserInfo = {
          nickName: '微信用户',
          avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
        }

        // 设置初始默认值
        setUserInfo(defaultUserInfo)
        setUserName(defaultUserInfo.nickName)

        // 2. 获取登录凭证 code
        const { code } = await uni.login({
          provider: 'weixin'
        })

        // 3. 调用后端登录接口
        const { data } = await loginByWechatApi({
          code,
          type: 'mini'
        })

        // 4. 设置 token 和登录状态
        setToken(data.access_token!)
        setIsLogin(true)

        showToast({
          title: '登录成功',
          icon: 'success'
        })

      } catch (err: any) {
        console.error('Login failed:', err)
        showToast({
          title: '登录失败: ' + (err.message || '请重试'),
          icon: 'none'
        })
      } finally {
        setLogining(false)
      }
    }

    // 获取手机号回调
    const onGetPhoneNumber = (e: any) => {
      console.log('getPhoneNumber result:', e)

      if (e.detail.errMsg && e.detail.errMsg !== 'getPhoneNumber:ok') {
        showToast({
          title: '您取消了授权',
          icon: 'none'
        })
        return
      }

      loginByWechat(e.detail.code)
    }

    // 选择头像回调
    const onChooseAvatar = (e: any) => {
      console.log('chooseAvatar result:', e)
      const { avatarUrl } = e.detail

      // 更新store中的头像
      setUserInfo({
        avatarUrl
      })

      // 同步更新到后端
      updateUserProfileApi({
        avatar: avatarUrl
      }).then(() => {
        showToast({
          title: '头像更新成功',
          icon: 'success'
        })
      }).catch(err => {
        console.error('Update avatar failed:', err)
        showToast({
          title: '头像同步失败',
          icon: 'none'
        })
      })
    }

    // 昵称输入框失焦/回车回调
    const onNicknameBlur = (e: any) => {
      console.log('nickname blur:', e)
      const nickName = e.detail.value
      // 微信有时触发blur但没有值，或者用户没输入，这里简单判空
      if (nickName) {
        setUserInfo({ nickName })
        setUserName(nickName)

        // 同步更新到后端
        updateUserProfileApi({
          nickname: nickName
        }).then(() => {
          showToast({
            title: '昵称更新成功',
            icon: 'success'
          })
        }).catch(err => {
          console.error('Update nickname failed:', err)
          showToast({
            title: '昵称同步失败',
            icon: 'none'
          })
        })
      }
    }

    const userName = ref<string>('曾哥')

    function setUserName(name: string) {
      userName.value = name
    }

    // 获取用户信息
    async function fetchUserInfo() {
      try {
        const { data } = await getUserProfileApi()
        if (data) {
          setUserInfo({
            nickName: data.nickname,
            avatarUrl: data.avatar
            // 其他字段按需映射
          })
          setUserName(data.nickname)
          // 确保登录状态
          setIsLogin(true)
        }
      } catch (error) {
        console.error('Fetch user info failed:', error)
        throw error
      }
    }

    function hasValidToken() {
      return !!getSync('user.token')
    }

    return {
      isLogin,
      userInfo,
      token,
      setToken,
      setUserInfo,
      userName,
      setUserName,
      loginByWechat,
      logining,
      setIsLogin,
      onGetPhoneNumber,
      onChooseAvatar,
      onNicknameBlur,
      fetchUserInfo,
      hasValidToken
    }
  },
  {
    unistorage: true
  }
)

export default userStore
