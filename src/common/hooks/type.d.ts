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

export interface PaginationQueryOptions<T, P> extends QueryOptions<T, P> {
  defaultParams: P
  pageSize?: number
  page?: number
}

export interface ItemQueryOptions<T, P> {
  queryFn: (params: P) => Promise<Data<T>>
  queryKey: unknown[]
  params: P
  enabled?: boolean
}

export interface ListQueryOptions<T, P> {
  queryFn: (params: P) => Promise<Data<PageData<T>>>
  queryKey: unknown[]
  defaultParams: P
  enabled?: boolean
}
