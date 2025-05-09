import type { UniStorageMethods } from '../type'

export function useUniStorage(): UniStorageMethods {
  const get = (key: string): any => {
    const keys = key.split('.')
    let value: any = uni.getStorageSync(keys[0])
    for (let i = 1; i < keys.length; i++) {
      if (!value || typeof JSON.parse(value) !== 'object') {
        return undefined
      }
      value = JSON.parse(value)[keys[i]]
    }
    return value
  }

  const getSync = (key: string): any => {
    const keys = key.split('.')
    let value: any = uni.getStorageSync(keys[0])
    for (let i = 1; i < keys.length; i++) {
      if (!value || typeof JSON.parse(value) !== 'object') {
        return undefined
      }
      value = JSON.parse(value)[keys[i]]
    }
    return value
  }

  const set = (params: { key: string; data: any; success?: () => void; fail?: (error: Error) => void }): void => {
    const keys = params.key.split('.')
    const obj: any = {}
    let temp = obj
    for (let i = 0; i < keys.length - 1; i++) {
      temp[keys[i]] = {}
      temp = temp[keys[i]]
    }
    temp[keys[keys.length - 1]] = params.data

    uni.setStorage({
      key: keys[0],
      data: obj,
      success: params.success,
      fail(error: Error) {
        if (params.fail) {
          params.fail(error)
        } else {
          console.error('Failed to set storage:', error)
        }
      }
    })
  }

  const setSync = (key: string, data: any): void => {
    const keys = key.split('.')
    const obj: any = {}
    let temp = obj
    for (let i = 0; i < keys.length - 1; i++) {
      temp[keys[i]] = {}
      temp = temp[keys[i]]
    }
    temp[keys[keys.length - 1]] = data

    try {
      uni.setStorageSync(keys[0], obj)
    } catch (error) {
      console.error('Failed to set storage synchronously:', error)
    }
  }

  const remove = (key: string): void => {
    uni.removeStorage({ key })
  }

  const removeSync = (key: string): void => {
    uni.removeStorageSync(key)
  }

  const clear = (): void => {
    uni.clearStorage()
  }

  const clearSync = (): void => {
    uni.clearStorageSync()
  }

  return {
    get,
    getSync,
    set,
    setSync,
    remove,
    removeSync,
    clear,
    clearSync
  }
}
