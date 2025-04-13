import type { UseMutationOptions, UseInfiniteQueryOptions, UseQueryOptions } from '@tanstack/vue-query'
import type { Data } from '@/apis/request/type'
import type { PageData } from '@/apis/modules/type'
import type { InfiniteData } from '@tanstack/vue-query'
import type { ShallowRef, Ref } from 'vue'
type MutationFunction<T, P> = (params: P) => Promise<Data<T>>

export interface MutationOptions<T, C, U, D = number> {
  createFn?: MutationFunction<T, C>
  updateFn?: MutationFunction<T, U>
  deleteFn?: MutationFunction<T, D>
  createSuccess?: () => void
  updateSuccess?: () => void
  deleteSuccess?: () => void
  createError?: () => void
  updateError?: () => void
  deleteError?: () => void
  createPending?: () => void
  updatePending?: () => void
  deletePending?: () => void
  invalidateQueryKeys?: unknown[][]
}

/**
 * 数据操作选项
 */
export interface UseMutationsOptions<T, C, U, D = number, TError = Error> extends Omit<UseMutationOptions<Data<T>, TError, C, unknown>, 'mutationFn'> {
  createFn?: (data: C) => Promise<Data<T>>
  updateFn?: (data: U) => Promise<Data<T>>
  deleteFn?: (id: D) => Promise<Data<T>>
  invalidateQueryKeys?: unknown[][]
  createSuccess?: () => void
  createError?: (error: TError) => void
  updateSuccess?: () => void
  updateError?: (error: TError) => void
  deleteSuccess?: () => void
  deleteError?: (error: TError) => void
}

/**
 * 无限滚动列表查询选项
 */
export interface UseListQueryOptions<T, P, TError = Error>
  extends Omit<
    UseInfiniteQueryOptions<Data<PageData<T>>, TError, InfiniteData<Data<PageData<T>>, number>, Data<PageData<T>>, unknown[], number>,
    'queryKey' | 'queryFn' | 'getNextPageParam' | 'initialPageParam'
  > {
  queryKey: unknown[]
  queryFn: (params: P) => Promise<Data<PageData<T>>>
  defaultParams: P
}

/**
 * 单项查询选项
 */
export interface UseItemQueryOptions<T, P, TError = Error> extends Omit<UseQueryOptions<Data<T>, TError, Data<T>, unknown[]>, 'queryKey' | 'queryFn'> {
  queryKey: unknown[]
  queryFn: (params: P) => Promise<Data<T>>
  params: P
}

export interface QueryOptions<T, P> {
  queryFn: (params: P) => Promise<Data<T>>
  queryKey: unknown[]
  enabled?: boolean
}

export type PaginationQueryOptions<T, P> = {
  queryKey: unknown[]
  queryFn: (params: P) => Promise<Data<PageData<T>>>
  defaultParams: P
  enabled?: boolean
}

export type ItemQueryOptions<T, P> = {
  queryKey: unknown[]
  queryFn: (params: P) => Promise<Data<T>>
  params: P
  enabled?: boolean
}

export type ListQueryOptions<T, P> = {
  queryKey: unknown[]
  queryFn: (params: P) => Promise<Data<PageData<T>>>
  defaultParams: P
  enabled?: boolean
}

/**
 * 乐观更新选项接口
 */
export interface OptimisticMutationOptions<P> {
  mutationFn: (data: P) => Promise<any>
  queryKey: unknown[]
  onMutate?: (data: P) => any
  onError?: (error: any, data: P, context: any) => void
  onSuccess?: (data: any, variables: P, context: any) => void
}

export interface UseUploadFileReturn<T> {
  task: ShallowRef<UniApp.UploadTask | undefined>
  response: ShallowRef<UniApp.UploadFileSuccessCallbackResult | undefined>
  data: Ref<T | undefined> | ShallowRef<T | undefined>
  error: ShallowRef<UniApp.GeneralCallbackResult | undefined>
  progress: Ref<number>
  filePath: Ref<string | undefined>
  filePaths: Ref<string[]>
  fileType: Ref<'image' | 'video' | 'file'>
  isFinished: Ref<boolean>
  isLoading: Ref<boolean>
  isAborted: Ref<boolean>
  isCanceled: Ref<boolean>
  isPaused: Ref<boolean>
  execute: (config?: Partial<UniApp.UploadFileOption>) => PromiseLike<UseUploadFileReturn<T>>
  pause: () => void
  resume: () => void
  cancel: (message?: string) => void
  abort: (message?: string) => void
}

export interface UploadFileOptions extends Partial<UniApp.ChooseImageOptions & UniApp.ChooseVideoOptions & UniApp.ChooseFileOptions> {
  type?: 'image' | 'video' | 'file'
  success?: (res: any) => void
  fail?: (err: any) => void
  complete?: (res: any) => void
  fileLimit?: {
    allowedExtensions?: string[]
    maxSize?: number
  }
}

export interface UseUploadFileOptions<T = any> {
  initialData?: T
  shallow?: boolean
  immediate?: boolean
  resetOnExecute?: boolean
  onSuccess?: (data: T) => void
  onError?: (err: UniApp.GeneralCallbackResult) => void
  onFinish?: (res: any) => void
}

export interface UniStorageMethods {
  get: (key: string) => any
  getSync: (key: string) => any
  set: (params: { key: string; data: any; success?: () => void; fail?: (error: Error) => void }) => void
  setSync: (key: string, data: any) => void
  remove: (key: string) => void
  removeSync: (key: string) => void
  clear: () => void
  clearSync: () => void
}
