import { setupAbortControllerPolyfill } from './modules/abortController-polyfill'

/**
 * 设置所有polyfills
 */
export function setupPolyfills() {
  setupAbortControllerPolyfill()
}
