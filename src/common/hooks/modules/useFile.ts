import { usePlatform } from '@/common/hooks'
import { EPlatform } from '@/common/constants'

const { platform, isMpWeixin } = usePlatform()

interface FileTaskOptions {
  url: string
  name?: string
  header?: Record<string, any>
  formData?: Record<string, any>
  filePath?: string // 下载时存储的路径或上传的文件路径
  timeout?: number
  // 文件类型选择器，用于H5和APP平台
  fileType?: 'image' | 'video' | 'all' | '*'
  // 图片压缩选项 (仅对图片有效)
  compress?: boolean
  quality?: number
  // 微信小程序选项
  count?: number // 最多可以选择的文件数，默认100
}

interface FileTask {
  id: string
  status: 'pending' | 'uploading' | 'downloading' | 'paused' | 'completed' | 'failed'
  progress: number
  totalSize?: number
  currentSize?: number
  speed?: number
  errorMessage?: string
  options: FileTaskOptions
  platform?: EPlatform
  task?: UniApp.UploadTask | UniApp.DownloadTask
}

export function useFile() {
  // 文件任务列表
  const fileTasks = reactive<Record<string, FileTask>>({})

  // 生成唯一任务ID
  const generateTaskId = () => `file_task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

  // 获取所有任务列表
  const taskList = computed(() => Object.values(fileTasks))

  // 获取单个任务
  const getTask = (taskId: string) => fileTasks[taskId]

  /**
   * 选择文件（H5、App、微信小程序通用）
   */
  const chooseFile = (options: FileTaskOptions): Promise<string[]> => {
    return new Promise<string[]>((resolve, reject) => {
      // 微信小程序
      if (isMpWeixin) {
        wx.chooseMedia({
          count: options.count || 1,
          mediaType: options.fileType === 'image' ? ['image'] : options.fileType === 'video' ? ['video'] : ['image', 'video'],
          success: (res: any) => {
            const tempFiles = res.tempFiles.map((file: any) => file.tempFilePath)
            resolve(tempFiles)
          },
          fail: (err: any) => {
            reject(new Error(err.errMsg || '选择文件失败'))
          }
        })
        return
      }

      // APP 和 H5
      uni.chooseFile({
        count: options.count || 1,
        type: options.fileType === '*' ? 'all' : ((options.fileType || 'all') as 'all' | 'image' | 'video'),
        extension:
          options.fileType === 'image'
            ? ['jpg', 'jpeg', 'png', 'gif', 'webp']
            : options.fileType === 'video'
              ? ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv']
              : ['jpg', 'jpeg', 'png', 'gif', 'mp4', 'mp3', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt'],
        success: (res) => {
          resolve(res.tempFilePaths as string[])
        },
        fail: (err) => {
          reject(new Error(err.errMsg || '选择文件失败'))
        }
      })
    })
  }

  /**
   * 文件上传hook
   */
  const useFileUpload = () => {
    /**
     * 选择并上传文件
     * @param options 上传选项
     * @returns Promise<string[]> 返回上传任务ID列表
     */
    const chooseAndUploadFile = async (options: FileTaskOptions): Promise<string[]> => {
      try {
        const filePaths = await chooseFile(options)
        const taskIds: string[] = []

        for (const filePath of filePaths) {
          const taskId = startUpload({
            ...options,
            filePath
          })
          taskIds.push(taskId)
        }

        return taskIds
      } catch (error) {
        console.error('选择文件失败:', error)
        throw error
      }
    }

    /**
     * 开始上传文件
     * @param options 上传选项
     * @returns 任务ID
     */
    const startUpload = (options: FileTaskOptions): string => {
      const taskId = generateTaskId()
      const lastUpdateTime = ref(Date.now())
      const lastSize = ref(0)

      // 创建任务
      fileTasks[taskId] = {
        id: taskId,
        status: 'pending',
        progress: 0,
        platform,
        options
      }

      // 创建上传任务
      const uploadTask = uni.uploadFile({
        url: options.url,
        filePath: options.filePath,
        name: options.name || 'file',
        header: options.header,
        formData: options.formData,
        timeout: options.timeout,
        success: (res) => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            fileTasks[taskId].status = 'completed'
            fileTasks[taskId].progress = 100
          } else {
            fileTasks[taskId].status = 'failed'
            fileTasks[taskId].errorMessage = `上传失败，状态码: ${res.statusCode}`
          }
        },
        fail: (err) => {
          fileTasks[taskId].status = 'failed'
          fileTasks[taskId].errorMessage = err.errMsg || '上传失败'
        }
      })

      // 保存任务实例
      fileTasks[taskId].task = uploadTask
      fileTasks[taskId].status = 'uploading'

      // 监听上传进度
      uploadTask.onProgressUpdate((res) => {
        fileTasks[taskId].progress = res.progress
        fileTasks[taskId].totalSize = res.totalBytesExpectedToSend
        fileTasks[taskId].currentSize = res.totalBytesSent

        // 计算上传速度 (bytes/s)
        const now = Date.now()
        const timeDiff = now - lastUpdateTime.value

        if (timeDiff > 1000) {
          // 每秒更新一次速度
          const sizeDiff = res.totalBytesSent - lastSize.value
          fileTasks[taskId].speed = Math.floor((sizeDiff / timeDiff) * 1000)

          lastUpdateTime.value = now
          lastSize.value = res.totalBytesSent
        }
      })

      return taskId
    }

    /**
     * 暂停上传
     * @param taskId 任务ID
     */
    const pauseUpload = (taskId: string) => {
      const task = fileTasks[taskId]
      if (task && task.task && task.status === 'uploading') {
        task.task.abort()
        task.status = 'paused'
      }
    }

    /**
     * 恢复上传
     * @param taskId 任务ID
     */
    const resumeUpload = (taskId: string) => {
      const task = fileTasks[taskId]
      if (task && task.status === 'paused') {
        // 创建新的上传任务
        const newTaskId = startUpload(task.options)

        // 删除旧任务
        delete fileTasks[taskId]

        return newTaskId
      }
      return taskId
    }

    /**
     * 取消上传
     * @param taskId 任务ID
     */
    const cancelUpload = (taskId: string) => {
      const task = fileTasks[taskId]
      if (task && task.task) {
        task.task.abort()
        delete fileTasks[taskId]
      }
    }

    /**
     * 批量取消上传
     * @param taskIds 任务ID数组
     */
    const cancelAllUploads = (taskIds?: string[]) => {
      const ids = taskIds || Object.keys(fileTasks).filter((id) => fileTasks[id].status === 'uploading' || fileTasks[id].status === 'paused')

      ids.forEach((id) => cancelUpload(id))
    }

    return {
      startUpload,
      chooseAndUploadFile,
      pauseUpload,
      resumeUpload,
      cancelUpload,
      cancelAllUploads,
      taskList,
      getTask
    }
  }

  /**
   * 文件下载hook
   */
  const useFileDownload = () => {
    /**
     * 开始下载文件
     * @param options 下载选项
     * @returns 任务ID
     */
    const startDownload = (options: FileTaskOptions): string => {
      const taskId = generateTaskId()
      const lastUpdateTime = ref(Date.now())
      const lastSize = ref(0)

      // 创建任务
      fileTasks[taskId] = {
        id: taskId,
        status: 'pending',
        progress: 0,
        platform,
        options
      }

      // 创建下载任务
      const downloadTask = uni.downloadFile({
        url: options.url,
        header: options.header,
        timeout: options.timeout,
        success: (res) => {
          if (res.statusCode === 200) {
            fileTasks[taskId].status = 'completed'
            fileTasks[taskId].progress = 100

            // 保存文件到指定路径（如果有的话）
            if (options.filePath) {
              uni.saveFile({
                tempFilePath: res.tempFilePath,
                filePath: options.filePath,
                success: () => {
                  console.log('文件已保存到', options.filePath)
                },
                fail: (err) => {
                  console.error('保存文件失败:', err)
                }
              })
            }
          } else {
            fileTasks[taskId].status = 'failed'
            fileTasks[taskId].errorMessage = `下载失败，状态码: ${res.statusCode}`
          }
        },
        fail: (err) => {
          fileTasks[taskId].status = 'failed'
          fileTasks[taskId].errorMessage = err.errMsg || '下载失败'
        }
      })

      // 保存任务实例
      fileTasks[taskId].task = downloadTask
      fileTasks[taskId].status = 'downloading'

      // 监听下载进度
      downloadTask.onProgressUpdate((res) => {
        fileTasks[taskId].progress = res.progress
        fileTasks[taskId].totalSize = res.totalBytesExpectedToWrite
        fileTasks[taskId].currentSize = res.totalBytesWritten

        // 计算下载速度 (bytes/s)
        const now = Date.now()
        const timeDiff = now - lastUpdateTime.value

        if (timeDiff > 1000) {
          // 每秒更新一次速度
          const sizeDiff = res.totalBytesWritten - lastSize.value
          fileTasks[taskId].speed = Math.floor((sizeDiff / timeDiff) * 1000)

          lastUpdateTime.value = now
          lastSize.value = res.totalBytesWritten
        }
      })

      return taskId
    }

    /**
     * 暂停下载
     * @param taskId 任务ID
     */
    const pauseDownload = (taskId: string) => {
      const task = fileTasks[taskId]
      if (task && task.task && task.status === 'downloading') {
        task.task.abort()
        task.status = 'paused'
      }
    }

    /**
     * 恢复下载
     * @param taskId 任务ID
     */
    const resumeDownload = (taskId: string) => {
      const task = fileTasks[taskId]
      if (task && task.status === 'paused') {
        // 创建新的下载任务
        const newTaskId = startDownload(task.options)

        // 删除旧任务
        delete fileTasks[taskId]

        return newTaskId
      }
      return taskId
    }

    /**
     * 取消下载
     * @param taskId 任务ID
     */
    const cancelDownload = (taskId: string) => {
      const task = fileTasks[taskId]
      if (task && task.task) {
        task.task.abort()
        delete fileTasks[taskId]
      }
    }

    /**
     * 批量取消下载
     * @param taskIds 任务ID数组
     */
    const cancelAllDownloads = (taskIds?: string[]) => {
      const ids = taskIds || Object.keys(fileTasks).filter((id) => fileTasks[id].status === 'downloading' || fileTasks[id].status === 'paused')

      ids.forEach((id) => cancelDownload(id))
    }

    /**
     * 打开文件
     * @param filePath 文件路径
     */
    const openFile = (filePath: string) => {
      uni.openDocument({
        filePath,
        success: () => {
          console.log('打开文件成功')
        },
        fail: (err) => {
          console.error('打开文件失败:', err)
        }
      })
    }

    return {
      startDownload,
      pauseDownload,
      resumeDownload,
      cancelDownload,
      cancelAllDownloads,
      openFile,
      taskList,
      getTask
    }
  }

  return {
    useFileUpload,
    useFileDownload,
    taskList,
    platform
  }
}
