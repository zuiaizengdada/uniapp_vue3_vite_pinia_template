// WebSocket连接选项
export interface UseWebSocketOptions extends UniNamespace.ConnectSocketOption {
  shouldReconnect?: boolean
  reconnectInterval?: number
  maxReconnectAttempts?: number
  onOpen?: () => void
  onMessage?: (message: string) => void
  onError?: (error: string) => void
  onClose?: () => void
  onReconnectAttempt?: (attempt: number) => void
  onReconnectSuccess?: () => void
  onReconnectFail?: () => void
}
