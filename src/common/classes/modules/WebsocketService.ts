import type { WebSocketHeartBeatConfig, UseWebSocketOptions } from '../type'

const DEFAULT_OPTIONS: UseWebSocketOptions = {
  url: '',
  shouldReconnect: true,
  reconnectInterval: 10,
  maxReconnectAttempts: 10,
  heartBeat: false,
  autoConnect: true,
  onOpen: () => {},
  onMessage: () => {},
  onError: () => {},
  onClose: () => {},
  onReconnectAttempt: () => {},
  onReconnectSuccess: () => {},
  onReconnectFail: () => {}
}

export class WebSocketService {
  private socket: UniApp.SocketTask | null = null
  private reconnectAttempts = 0
  private reconnectTimeoutId: number | NodeJS.Timeout | null = null
  private heartBeatIntervalId: number | NodeJS.Timeout | null = null
  private isConnecting = false
  private isClosedManually = false

  public isConnected = ref(false)
  public message = ref<string | null>(null)
  public error = ref<string | null>(null)

  private callbacks = reactive({
    onOpen: DEFAULT_OPTIONS.onOpen,
    onMessage: DEFAULT_OPTIONS.onMessage,
    onError: DEFAULT_OPTIONS.onError,
    onClose: DEFAULT_OPTIONS.onClose,
    onReconnectAttempt: DEFAULT_OPTIONS.onReconnectAttempt,
    onReconnectSuccess: DEFAULT_OPTIONS.onReconnectSuccess,
    onReconnectFail: DEFAULT_OPTIONS.onReconnectFail
  })

  constructor(public options: UseWebSocketOptions = DEFAULT_OPTIONS) {
    this.updateOptions(options)
    this.setupAutoReconnect()
  }

  private updateOptions(options: UseWebSocketOptions) {
    const { onOpen, onMessage, onError, onClose, onReconnectAttempt, onReconnectSuccess, onReconnectFail, ...configOptions } = { ...DEFAULT_OPTIONS, ...options }

    this.callbacks.onOpen = onOpen || DEFAULT_OPTIONS.onOpen
    this.callbacks.onMessage = onMessage || DEFAULT_OPTIONS.onMessage
    this.callbacks.onError = onError || DEFAULT_OPTIONS.onError
    this.callbacks.onClose = onClose || DEFAULT_OPTIONS.onClose
    this.callbacks.onReconnectAttempt = onReconnectAttempt || DEFAULT_OPTIONS.onReconnectAttempt
    this.callbacks.onReconnectSuccess = onReconnectSuccess || DEFAULT_OPTIONS.onReconnectSuccess
    this.callbacks.onReconnectFail = onReconnectFail || DEFAULT_OPTIONS.onReconnectFail

    Object.assign(this.options, configOptions)
  }

  private handleConnectionSuccess() {
    console.log('WebSocket 连接请求已成功发送')
  }

  private handleConnectionFailure(err: any, reject: any) {
    const errMsg = `WebSocket 连接请求发送失败: ${err.errMsg}`
    this.handleErrorCommon(errMsg, reject)
    this.attemptReconnect()
  }

  private handleOpen() {
    this.setConnectionState(true)
    console.log('WebSocket 连接已成功建立')

    if (this.options.heartBeat) {
      this.startHeartBeat()
    }

    this.callbacks.onOpen!()
  }

  private handleMessage(res: any) {
    this.message.value = res.data
    const parsedMessage = this.parseMessage(res.data)
    this.callbacks.onMessage!(parsedMessage)
  }

  private parseMessage(data: string) {
    try {
      const parsedData = JSON.parse(data)
      if (typeof parsedData === 'object' && parsedData !== null) {
        return parsedData
      }
    } catch {
      return data
    }
  }

  private handleErrorCommon(errMsg: string, reject: any) {
    this.error.value = errMsg
    this.callbacks.onError!(errMsg)
    if (reject) reject(errMsg)
  }

  private handleError(err: any, reject: any) {
    const errMsg = `WebSocket 连接错误: ${err.errMsg}`
    this.handleErrorCommon(errMsg, reject)
    this.attemptReconnect()
  }

  private handleClose() {
    console.log('WebSocket 连接关闭')
    this.setConnectionState(false)

    this.stopHeartBeat()

    this.callbacks.onClose!()

    // 判断是否是主动断开连接
    if (this.isClosedManually) {
      this.isClosedManually = false
      return
    }

    this.attemptReconnect()
  }

  private attemptReconnect() {
    if (this.shouldReconnect()) {
      this.reconnectAttempts++
      this.callbacks.onReconnectAttempt!(this.reconnectAttempts)
      console.log(`尝试重连第 ${this.reconnectAttempts} 次...`)
      this.reconnectTimeoutId = setTimeout(() => {
        this.connect().then(this.callbacks.onReconnectSuccess).catch(this.callbacks.onReconnectFail)
      }, this.options.reconnectInterval)
    }
  }

  private shouldReconnect() {
    return this.options.shouldReconnect && this.reconnectAttempts < this.options.maxReconnectAttempts!
  }

  private prepareMessage(message: string | Record<string, any>) {
    return typeof message === 'string' ? message : JSON.stringify(message)
  }

  private handleSendMessageFailure(err: any) {
    const errMsg = `消息发送失败: ${err.errMsg}`
    this.handleErrorCommon(errMsg, null)
  }

  private handleCloseFailure(err: any) {
    const errMsg = `WebSocket 关闭失败: ${err.errMsg}`
    this.handleErrorCommon(errMsg, null)
  }

  private clearReconnectTimeout() {
    if (this.reconnectTimeoutId !== null) {
      clearTimeout(this.reconnectTimeoutId)
      this.reconnectTimeoutId = null
    }
  }

  private startHeartBeat() {
    if (this.heartBeatIntervalId !== null) return

    const heartBeatConfig: WebSocketHeartBeatConfig =
      typeof this.options.heartBeat === 'object'
        ? this.options.heartBeat
        : {
            interval: 10000,
            message: {
              user: 'check',
              scene_id: -1,
              llm_type: -1,
              qa_mode: 'check',
              chat_template: null
            }
          }

    this.heartBeatIntervalId = setInterval(() => {
      if (this.isConnected.value && this.socket) {
        this.sendMessage(heartBeatConfig.message)
      }
    }, heartBeatConfig.interval)
  }

  // 停止心跳机制
  private stopHeartBeat() {
    if (this.heartBeatIntervalId !== null) {
      clearInterval(this.heartBeatIntervalId)
      this.heartBeatIntervalId = null
    }
  }

  private setConnectionState(connected: boolean) {
    this.isConnected.value = connected
    if (!connected) {
      this.socket = null
      this.stopHeartBeat()
    }
  }

  private setupAutoReconnect() {
    // 监听URL变化，自动重新连接
    watch(() => this.options.url, this.handleUrlChange.bind(this))
  }

  private handleUrlChange(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      if (this.isConnected.value) this.close()
      if (!this.isConnecting) {
        this.isConnecting = true
        this.connect().finally(() => {
          this.isConnecting = false
        })
      }
    }
  }

  public async connect(): Promise<boolean> {
    if (this.socket) return Promise.resolve(this.isConnected.value)

    return new Promise((resolve, reject) => {
      console.log('尝试请求连接 WebSocket...')
      this.socket = uni.connectSocket({
        header: { 'content-type': 'application/json' },
        success: this.handleConnectionSuccess.bind(this),
        fail: (err) => this.handleConnectionFailure(err, reject),
        ...this.options
      })

      this.socket.onOpen(() => {
        this.handleOpen()
        resolve(this.isConnected.value)
      })
      this.socket.onMessage(this.handleMessage.bind(this))
      this.socket.onError((err) => this.handleError(err, reject))
      this.socket.onClose(this.handleClose.bind(this))
    })
  }

  public sendMessage(message: string | Record<string, any>) {
    if (this.isConnected.value && this.socket) {
      const requestMessage = this.prepareMessage(message)
      this.socket.send({
        data: requestMessage,
        success: () => console.log('消息发送成功'),
        fail: this.handleSendMessageFailure.bind(this)
      })
    } else {
      console.warn('WebSocket 未连接')
    }
  }

  public close() {
    if (this.socket) {
      this.isClosedManually = true
      this.socket.close({
        success: () => console.log('WebSocket 关闭成功'),
        fail: this.handleCloseFailure.bind(this)
      })
      this.clearReconnectTimeout()
      this.stopHeartBeat()
    }
  }

  // 暴露回调函数方法
  public onOpen(callback: () => void) {
    this.callbacks.onOpen = callback
  }

  public onMessage(callback: (message: any) => void) {
    this.callbacks.onMessage = callback
  }

  public onError(callback: (error: string) => void) {
    this.callbacks.onError = callback
  }

  public onClose(callback: () => void) {
    this.callbacks.onClose = callback
  }

  public onReconnectAttempt(callback: (attempt: number) => void) {
    this.callbacks.onReconnectAttempt = callback
  }

  public onReconnectSuccess(callback: () => void) {
    this.callbacks.onReconnectSuccess = callback
  }

  public onReconnectFail(callback: () => void) {
    this.callbacks.onReconnectFail = callback
  }
}

const webSocketInstances: Record<symbol, WebSocketService> = {}

export async function createWebSocketInstance(id: symbol, options: UseWebSocketOptions): Promise<WebSocketService> {
  if (!webSocketInstances[id]) {
    webSocketInstances[id] = new WebSocketService(options)
    if (options.autoConnect) {
      await getWebSocketInstance(id)?.connect()
    }
  }
  return webSocketInstances[id]
}

export function getWebSocketInstance(id: symbol): WebSocketService | undefined {
  return webSocketInstances[id]
}

export function removeWebSocketInstance(id: symbol) {
  if (webSocketInstances[id]) {
    webSocketInstances[id].close()
    delete webSocketInstances[id]
  }
}
