import { useInfiniteQuery, useQuery, useQueryClient, useMutation } from '@tanstack/vue-query'
import type { Data } from '@/apis/request/type'
import type { PageData } from '@/apis/modules/type'

type MutationFunction<T, P> = (params: P) => Promise<Data<T>>

/**
 * 通用列表查询 Hook
 * @param queryFn 查询函数
 * @param queryKey 查询键
 * @param defaultParams 默认参数
 * @param enabled 是否启用查询
 */
export function useListQuery<T, P extends { page?: number; pageSize?: number }>(
  queryFn: (params: P) => Promise<Data<PageData<T>>>,
  queryKey: unknown[],
  defaultParams: P,
  enabled: Ref<boolean> = ref(true)
) {
  const queryClient = useQueryClient()

  // 无限查询
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage, isRefetching } = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = 1 }) => {
      const params = { ...defaultParams, page: pageParam as number } as P
      return queryFn(params)
    },
    getNextPageParam: (lastPage) => {
      const { page, pageSize, total } = lastPage.data
      return page * pageSize < total ? page + 1 : undefined
    },
    initialPageParam: 1,
    enabled
  })

  // 将所有页面数据合并为一个列表
  const list = computed<T[]>(() => {
    if (!data.value) return []
    return data.value.pages.reduce((acc: T[], page) => [...acc, ...(page.data?.list || [])], [])
  })

  // 是否加载完成
  const finished = computed(() => !hasNextPage.value)

  // 加载更多
  function handleLoadMore() {
    if (isFetchingNextPage.value || !hasNextPage.value) return
    fetchNextPage()
  }

  // 下拉刷新
  function handleRefresh() {
    return queryClient.resetQueries({ queryKey })
  }

  return {
    list,
    finished,
    loading: computed(() => isLoading.value || isRefetching.value),
    loadMore: handleLoadMore,
    refresh: handleRefresh,
    hasNextPage,
    fetchNextPage,
    originalData: data
  }
}

/**
 * 通用单项查询 Hook
 * @param queryFn 查询函数
 * @param queryKey 查询键
 * @param params 查询参数
 * @param enabled 是否启用查询
 */
export function useItemQuery<T, P>(queryFn: (params: P) => Promise<Data<T>>, queryKey: unknown[], params: P, enabled: Ref<boolean> = ref(true)) {
  return useQuery({
    queryKey,
    queryFn: () => queryFn(params),
    select: (data) => data.data,
    enabled
  })
}

/**
 * 通用数据操作 Hook
 * @param options 操作配置选项
 */
export function useMutations<T, C, U, D = number>(options: {
  createFn?: MutationFunction<T, C>
  updateFn?: MutationFunction<T, U>
  deleteFn?: MutationFunction<T, D>
  invalidateQueryKeys?: unknown[][]
}) {
  const queryClient = useQueryClient()
  const { createFn, updateFn, deleteFn, invalidateQueryKeys = [] } = options

  // 刷新指定查询
  const invalidateQueries = () => {
    invalidateQueryKeys.forEach((key) => {
      queryClient.invalidateQueries({ queryKey: key })
    })
  }

  // 创建
  const createMutation = createFn
    ? useMutation({
        mutationFn: (data: C) => createFn(data),
        onSuccess: () => invalidateQueries()
      })
    : undefined

  // 更新
  const updateMutation = updateFn
    ? useMutation({
        mutationFn: (data: U) => updateFn(data),
        onSuccess: () => invalidateQueries()
      })
    : undefined

  // 删除
  const deleteMutation = deleteFn
    ? useMutation({
        mutationFn: (id: D) => deleteFn(id),
        onSuccess: () => invalidateQueries()
      })
    : undefined

  return {
    createMutation: createMutation?.mutate,
    updateMutation: updateMutation?.mutate,
    deleteMutation: deleteMutation?.mutate
  }
}
