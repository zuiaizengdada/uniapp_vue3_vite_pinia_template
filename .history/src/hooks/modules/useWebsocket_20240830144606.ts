import { type UseWebSocketOptions } from '../type'

const DEFAULT_RECONNECT_INTERVAL = 5000
const MAX_RECONNECT_INTERVAL = 60000
const DEFAULT_OPTIONS: UseWebSocketOptions = {
  url: '',
  shouldReconnect: true,
  reconnectInterval: DEFAULT_RECONNECT_INTERVAL,
  maxReconnectAttempts: 10,
  onOpen: () => {},
  onMessage: () => {},
  onError: () => {},
  onClose: () => {},
  onReconnectAttempt: () => {},
  onReconnectSuccess: () => {},
  onReconnectFail: () => {}
}

export function useWebSocket(options: UseWebSocketOptions = DEFAULT_OPTIONS) {
  const isConnected = ref<boolean>(false)
  const message = ref<string | null>(null)
  const error = ref<string | null>(null)

  // 提取回调函数
  const {
    onOpen = DEFAULT_OPTIONS.onOpen,
    onMessage = DEFAULT_OPTIONS.onMessage,
    onError = DEFAULT_OPTIONS.onError,
    onClose = DEFAULT_OPTIONS.onClose,
    onReconnectAttempt = DEFAULT_OPTIONS.onReconnectAttempt,
    onReconnectSuccess = DEFAULT_OPTIONS.onReconnectSuccess,
    onReconnectFail = DEFAULT_OPTIONS.onReconnectFail,
    ...configOptions
  } = options

  const callbacks = {
    onOpen,
    onMessage,
    onError,
    onClose,
    onReconnectAttempt,
    onReconnectSuccess,
    onReconnectFail
  }

  let socket: UniApp.SocketTask | null = null
  let reconnectAttempts = 0
  let reconnectTimeoutId: number | NodeJS.Timeout | null = null
  let isConnecting = false

  // 私有方法对象
  const internal = {
    // 连接成功处理
    handleConnectionSuccess() {
      console.log('WebSocket 连接请求已成功发送')
    },

    // 连接失败处理
    handleConnectionFailure(err: any, reject: any) {
      const errMsg = `WebSocket 连接请求发送失败: ${err.errMsg}`
      internal.handleErrorCommon(errMsg, reject)
      internal.attemptReconnect()
    },

    // 连接建立处理
    handleOpen() {
      internal.setConnectionState(true)
      console.log('WebSocket 连接已成功建立')
      callbacks.onOpen!()
    },

    // 接收到消息处理
    handleMessage(res: any) {
      message.value = res.data
      const parsedMessage = internal.parseMessage(res.data)
      callbacks.onMessage!(parsedMessage)
    },

    // 解析消息
    parseMessage(data: string) {
      try {
        const parsedData = JSON.parse(data)
        if (typeof parsedData === 'object' && parsedData !== null) {
          return parsedData
        }
      } catch {
        return data
      }
    },

    // 错误处理通用函数
    handleErrorCommon(errMsg: string, reject: any) {
      error.value = errMsg
      callbacks.onError!(errMsg)
      if (reject) reject(errMsg)
    },

    // 连接错误处理
    handleError(err: any, reject: any) {
      const errMsg = `WebSocket 连接错误: ${err.errMsg}`
      internal.handleErrorCommon(errMsg, reject)
      internal.attemptReconnect()
    },

    // 连接关闭处理
    handleClose() {
      console.log('WebSocket 连接关闭')
      internal.setConnectionState(false)
      callbacks.onClose!()
      internal.attemptReconnect()
    },

    // 尝试重连
    attemptReconnect() {
      if (internal.shouldReconnect()) {
        reconnectAttempts++
        callbacks.onReconnectAttempt!(reconnectAttempts)
        console.log(`尝试重连第 ${reconnectAttempts} 次...`)
        reconnectTimeoutId = setTimeout(() => {
          connect().then(callbacks.onReconnectSuccess).catch(callbacks.onReconnectFail)
        }, configOptions.reconnectInterval)
      }
    },

    // 判断是否需要重连
    shouldReconnect() {
      return configOptions.shouldReconnect
    },


    // 发送消息处理
    prepareMessage(message: string | Record<string, any>) {
      return typeof message === 'string' ? message : JSON.stringify(message)
    },

    // 发送消息失败处理
    handleSendMessageFailure(err: any) {
      const errMsg = `消息发送失败: ${err.errMsg}`
      internal.handleErrorCommon(errMsg, null)
    },

    // 关闭连接失败处理
    handleCloseFailure(err: any) {
      const errMsg = `WebSocket 关闭失败: ${err.errMsg}`
      internal.handleErrorCommon(errMsg, null)
    },

    // 清除重连计时器
    clearReconnectTimeout() {
      if (reconnectTimeoutId !== null) {
        clearTimeout(reconnectTimeoutId)
        reconnectTimeoutId = null
      }
    },

    // 处理URL变化
    handleUrlChange(newValue: string, oldValue: string) {
      if (newValue !== oldValue) {
        if (isConnected) close()
        if (!isConnecting) {
          isConnecting = true
          connect().finally(() => {
            isConnecting = false
          })
        }
      }
    },

    // 设置连接状态
    setConnectionState(connected: boolean) {
      isConnected.value = connected
      if (!connected) socket = null
    }
  }

  // 连接函数
  async function connect(): Promise<boolean> {
    if (socket) return Promise.resolve(isConnected.value)

    return new Promise((resolve, reject) => {
      console.log('尝试请求连接 WebSocket...')
      socket = uni.connectSocket({
        header: { 'content-type': 'application/json' },
        success: internal.handleConnectionSuccess,
        fail: (err) => internal.handleConnectionFailure(err, reject),
        ...configOptions
      })

      socket.onOpen(() => {
        internal.handleOpen()
        resolve(isConnected.value)
      })
      socket.onMessage(internal.handleMessage)
      socket.onError((err) => internal.handleError(err, reject))
      socket.onClose(internal.handleClose)
    })
  }

  // 发送消息
  function sendMessage(message: string | Record<string, any>) {
    if (isConnected && socket) {
      const requestMessage = internal.prepareMessage(message)
      socket.send({
        data: requestMessage,
        success: () => console.log('消息发送成功'),
        fail: internal.handleSendMessageFailure
      })
    } else {
      console.warn('WebSocket 未连接')
    }
  }

  // 关闭连接
  function close() {
    if (socket) {
      socket.close({
        success: () => console.log('WebSocket 关闭成功'),
        fail: internal.handleCloseFailure
      })
      internal.clearReconnectTimeout()
    }
  }

  // 组件卸载时清理连接
  onUnmounted(() => {
    close()
  })

  // 监听URL变化
  watch(() => configOptions.url, internal.handleUrlChange)

  // 返回API
  return {
    isConnected,
    message,
    error,
    sendMessage,
    close,
    connect,
    onOpen: callbacks.onOpen,
    onMessage: (callback: (message: string) => void) => {
      callbacks.onMessage = callback
    },
    onError: (callback: (error: string) => void) => {
      callbacks.onError = callback
    },
    onClose: (callback: () => void) => {
      callbacks.onClose = callback
    },
    onReconnectAttempt: (callback: (attempt: number) => void) => {
      callbacks.onReconnectAttempt = callback
    },
    onReconnectSuccess: (callback: () => void) => {
      callbacks.onReconnectSuccess = callback
    },
    onReconnectFail: (callback: () => void) => {
      callbacks.onReconnectFail = callback
    }
  }
}
