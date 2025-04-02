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
