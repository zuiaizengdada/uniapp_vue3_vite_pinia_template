/**
 * AbortController的Polyfill
 * 为不支持AbortController的环境（如微信小程序）提供基本实现
 */

export function setupAbortControllerPolyfill() {
  if (typeof AbortController === 'undefined') {
    // @ts-expect-error 微信小程序环境中不存在AbortController
    globalThis.AbortController = class AbortController {
      signal = { aborted: false }
      abort() {
        this.signal.aborted = true
      }
    }
  }
}
