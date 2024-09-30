export type WebSocketHeartBeatMessage =
  | string
  | {
      user: 'check'
      scene_id: -1
      llm_type: -1
      qa_mode: 'check'
      chat_template: null
    }
  | Record<string, any>

export interface WebSocketHeartBeatConfig {
  interval: number
  message: WebSocketHeartBeatMessage
  pongTimeout?: number
}

export interface UseWebSocketOptions extends UniNamespace.ConnectSocketOption {
  shouldReconnect?: boolean
  reconnectInterval?: number
  maxReconnectAttempts?: number
  autoConnect?: boolean
  heartBeat?: boolean | WebSocketHeartBeatConfig
  onOpen?: () => void
  onMessage?: (message: string) => void
  onError?: (error: string) => void
  onClose?: () => void
  onReconnectAttempt?: (attempt: number) => void
  onReconnectSuccess?: () => void
  onReconnectFail?: () => void
}
