import { ref, shallowRef } from 'vue'
import { until } from '@vueuse/core'
import { usePlatform } from '@/common/hooks'
import type { UseUploadFileOptions, UseUploadFileReturn, UploadFileOptions } from '../type'

const { isMpWeixin } = usePlatform()

export function useUploadFile<T = any>(
  url?: string,
  defaultConfig: Partial<UniApp.UploadFileOption> = {},
  options: UseUploadFileOptions<T> = {}
): UseUploadFileReturn<T> &
  PromiseLike<UseUploadFileReturn<T>> & {
    uploadFile: (options: UploadFileOptions) => Promise<{
      filePath?: string
      filePaths?: string[]
      fileType: 'image' | 'video' | 'file'
    }>
  } {
  // 解构配置
  const { initialData, shallow = true, immediate = !!url, resetOnExecute = false, onSuccess = () => {}, onError = () => {}, onFinish = () => {} } = options

  // 状态管理
  const task = shallowRef<UniApp.UploadTask>()
  const response = shallowRef<UniApp.UploadFileSuccessCallbackResult>()
  const data = shallow ? shallowRef<T>() : ref<T>()
  const error = shallowRef<UniApp.GeneralCallbackResult>()
  const progress = ref(0)
  const filePath = ref<string | undefined>()
  const filePaths = ref<string[]>([])
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
    filePaths,
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
    return new Promise<{ filePath?: string; filePaths?: string[]; fileType: 'image' | 'video' | 'file' }>((resolve, reject) => {
      const { type = 'image', count = 1, success, fail, complete, fileLimit, ...rest } = options
      console.log('开始选择文件，类型:', type)

      const chooseMethod = computed(() => {
        switch (type) {
          case 'image':
            return uni.chooseImage
          case 'video':
            return uni.chooseVideo
          case 'file':
            return isMpWeixin ? wx.chooseMessageFile : uni.chooseFile
          default:
            throw new Error('不支持的文件类型')
        }
      })
      console.log('使用的选择方法:', chooseMethod)

      // 检查文件大小和类型的函数
      const checkFile = (filePath: string): Promise<void> => {
        return new Promise((resolve, reject) => {
          uni.getFileInfo({
            filePath,
            success: (res) => {
              // 检查文件大小
              if (fileLimit?.maxSize && res.size > fileLimit.maxSize) {
                reject(new Error(`文件大小不能超过${fileLimit.maxSize / (1024 * 1024)}MB`))
                return
              }

              // 检查文件类型
              if (fileLimit?.allowedExtensions?.length) {
                const fileExt = filePath.substring(filePath.lastIndexOf('.')).toLowerCase()
                if (!fileLimit.allowedExtensions.includes(fileExt)) {
                  reject(new Error(`只支持${fileLimit.allowedExtensions.join('、')}格式的文件`))
                  return
                }
              }

              resolve()
            },
            fail: (err) => {
              reject(err)
            }
          })
        })
      }

      chooseMethod.value({
        count,
        ...rest,
        success: async (
          res: UniApp.ChooseImageSuccessCallbackResult | UniApp.ChooseVideoSuccess | UniApp.ChooseFileSuccessCallbackResult | WechatMiniprogram.ChooseMessageFileSuccessCallbackResult
        ) => {
          console.log('文件选择成功:', res)
          success?.(res)

          // 处理文件路径
          let filePaths: string[] = []
          if (type === 'image') {
            const tempPaths = (res as UniApp.ChooseImageSuccessCallbackResult).tempFilePaths
            if (tempPaths && Array.isArray(tempPaths)) filePaths = tempPaths
          } else if (type === 'video') {
            const videoPath = (res as UniApp.ChooseVideoSuccess).tempFilePath
            if (videoPath) filePaths = [videoPath]
          } else {
            const tempPaths = isMpWeixin
              ? (res as WechatMiniprogram.ChooseMessageFileSuccessCallbackResult).tempFiles.map((file: any) => file.path)
              : (res as UniApp.ChooseFileSuccessCallbackResult).tempFilePaths
            if (tempPaths && Array.isArray(tempPaths)) filePaths = tempPaths
          }

          if (filePaths.length === 0) {
            console.warn('未获取到有效文件路径')
            const error = { errMsg: '未获取到有效文件路径' }
            fail?.(error)
            reject(error)
            return
          }
          try {
            // 检查每个文件
            for (const filePath of filePaths) {
              await checkFile(filePath)
            }
          } catch (error) {
            console.error('文件检查失败:', error)
            fail?.(error)
            reject(error)
            return
          }

          console.log('选择的文件路径:', filePaths)
          result.filePath.value = count === 1 ? filePaths[0] : undefined
          result.filePaths.value = filePaths
          result.fileType.value = type

          // 根据count返回单个或多个文件路径
          const resultData = {
            filePath: count === 1 ? filePaths[0] : undefined,
            filePaths: count > 1 ? filePaths : undefined,
            fileType: type
          }

          // 立即解析 Promise，返回文件信息
          resolve(resultData)

          // 继续执行上传
          execute({
            filePath: count === 1 ? filePaths[0] : undefined,
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
          reject(err)
        }
      })
    })
  }

  return {
    ...result,
    ...promise,
    uploadFile
  }
}
