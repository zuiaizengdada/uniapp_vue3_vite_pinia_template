import { ref, shallowRef } from 'vue'
import { until } from '@vueuse/core'
import type { UseUploadFileOptions, UseUploadFileReturn, UploadFileOptions } from '../type'

export function useUploadFile<T = any>(
  url?: string,
  defaultConfig: Partial<UniApp.UploadFileOption> = {},
  options: UseUploadFileOptions<T> = {}
): UseUploadFileReturn<T> & PromiseLike<UseUploadFileReturn<T>> & { uploadFile: (options: UploadFileOptions) => void } {
  // 解构配置
  const { initialData, shallow = true, immediate = !!url, resetOnExecute = false, onSuccess = () => {}, onError = () => {}, onFinish = () => {} } = options

  // 状态管理
  const task = shallowRef<UniApp.UploadTask>()
  const response = shallowRef<UniApp.UploadFileSuccessCallbackResult>()
  const data = shallow ? shallowRef<T>() : ref<T>()
  const error = shallowRef<UniApp.GeneralCallbackResult>()
  const progress = ref(0)
  const filePath = ref<string | undefined>()
  const fileType = ref<'image' | 'video' | 'file'>()

  // 状态标志
  const isFinished = ref(false)
  const isLoading = ref(false)
  const isAborted = ref(false)
  const isPaused = ref(false)

  // 配置缓存
  let lastConfig: Partial<UniApp.UploadFileOption> | undefined = undefined
  let executeCounter = 0

  // 状态更新函数
  const setLoading = (loading: boolean) => {
    isLoading.value = loading
    isFinished.value = !loading
  }

  const resetData = () => {
    if (resetOnExecute) {
      data.value = initialData
    }
  }

  // 操作方法
  const pause = () => {
    if (!isLoading.value || isFinished.value) return
    task.value?.abort()
    isPaused.value = true
    isLoading.value = false
  }

  const resume = () => {
    if (!isPaused.value) return
    isPaused.value = false
    execute(lastConfig)
  }

  const abort = () => {
    if (isFinished.value || !isLoading.value) return
    task.value?.abort()
    isAborted.value = true
    isLoading.value = false
    isFinished.value = false
  }

  // 执行上传
  const execute: UseUploadFileReturn<T>['execute'] = (config: Partial<UniApp.UploadFileOption> = {}) => {
    // 重置状态
    error.value = undefined
    if (!url) {
      error.value = { errMsg: 'Invalid URL provided for uni.uploadFile.' }
      isFinished.value = true
      return promise
    }

    // 更新配置
    lastConfig = config
    resetData()
    abort()
    setLoading(true)
    progress.value = 0
    isAborted.value = false

    // 执行上传
    executeCounter += 1
    const currentExecuteCounter = executeCounter

    const uploadConfig = {
      ...defaultConfig,
      ...config,
      url
    }

    task.value = uni.uploadFile({
      ...uploadConfig,
      success: (r) => {
        if (isAborted.value) return
        uploadConfig.success?.(r)
        response.value = r
        const result = r.data as unknown as T
        data.value = result
        onSuccess(result)
      },
      fail: (e) => {
        uploadConfig.fail?.(e)
        error.value = e
        onError(e)
      },
      complete: (r) => {
        uploadConfig.complete?.(r)
        onFinish(r)
        if (currentExecuteCounter === executeCounter) {
          setLoading(false)
        }
      }
    })

    // 监听进度
    task.value?.onProgressUpdate?.((res) => {
      progress.value = res.progress
    })

    return promise
  }

  // Promise 支持
  function waitUntilFinished() {
    return new Promise<UseUploadFileReturn<T>>((resolve, reject) => {
      until(isFinished)
        .toBe(true)
        .then(() => (error.value ? reject(error.value) : resolve(result)))
    })
  }

  const promise = {
    then: (...args) => waitUntilFinished().then(...args),
    catch: (...args) => waitUntilFinished().catch(...args)
  } as Promise<UseUploadFileReturn<T>>

  // 返回结果
  const result = {
    task,
    response,
    data,
    error,
    progress,
    filePath,
    fileType,
    isFinished,
    isLoading,
    isAborted,
    isCanceled: isAborted,
    isPaused,
    execute,
    pause,
    resume,
    cancel: abort,
    abort
  } as UseUploadFileReturn<T>

  // 立即执行
  if (immediate && url) {
    execute()
  }

  const uploadFile = (options: UploadFileOptions) => {
    const { type = 'image', count = 1, success, fail, complete, ...rest } = options
    console.log('开始选择文件，类型:', type)

    const chooseMethod = type === 'image' ? uni.chooseImage : type === 'video' ? uni.chooseVideo : uni.chooseFile
    console.log('使用的选择方法:', chooseMethod)

    chooseMethod({
      count,
      ...rest,
      success: (res: UniApp.ChooseImageSuccessCallbackResult | UniApp.ChooseVideoSuccess | UniApp.ChooseFileSuccessCallbackResult) => {
        console.log('文件选择成功:', res)
        success?.(res)
        const filePath = (res as UniApp.ChooseImageSuccessCallbackResult).tempFilePaths?.[0] || (res as UniApp.ChooseVideoSuccess).tempFilePath
        if (!filePath) {
          console.warn('未获取到有效文件路径')
          fail?.({ errMsg: '未获取到有效文件路径' })
          return
        }
        console.log('选择的文件路径:', filePath)
        result.filePath.value = filePath
        result.fileType.value = type
        execute({
          filePath,
          success: () => {},
          fail: (e) => {
            console.error('上传失败:', e)
            fail?.(e)
          },
          complete: (r) => {
            console.log('上传完成:', r)
            complete?.(r)
          }
        })
      },
      fail: (err) => {
        console.error('文件选择失败:', err)
        fail?.(err)
      }
    })
  }

  return {
    ...result,
    ...promise,
    uploadFile
  }
}
