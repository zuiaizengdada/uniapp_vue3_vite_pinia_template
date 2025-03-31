import { useInfiniteQuery, useQuery, useQueryClient, useMutation } from '@tanstack/vue-query'
import type { MutationOptions, ItemQueryOptions, ListQueryOptions, PaginationQueryOptions } from '@/common/hooks/type'

/**
 * 通用列表查询 Hook
 * @param options 查询选项
 */
export function useListQuery<T, P extends { page?: number; pageSize?: number }>({ queryFn, queryKey, defaultParams, enabled = ref(true) }: ListQueryOptions<T, P>) {
  const queryClient = useQueryClient()

  // 无限滚动列表查询
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteQuery({
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

  // 是否正在加载
  const loading = computed(() => isLoading.value || isFetchingNextPage.value)

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
    loading,
    loadMore: handleLoadMore,
    refresh: handleRefresh,
    hasNextPage,
    fetchNextPage,
    originalData: data
  }
}

/**
 * 通用单项查询 Hook
 * @param options 查询选项
 */
export function useItemQuery<T, P>({ queryFn, queryKey, params, enabled = ref(true) }: ItemQueryOptions<T, P>) {
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
export function useMutations<T, C, U, D = number>(options: MutationOptions<T, C, U, D>) {
  const queryClient = useQueryClient()
  const { createFn, updateFn, deleteFn, invalidateQueryKeys = [] } = options

  // 刷新指定查询
  const invalidateQueries = () => {
    invalidateQueryKeys.forEach((key) => {
      // 使用exact: false选项确保能匹配具有相同前缀的查询键
      queryClient.invalidateQueries({ queryKey: key, exact: false })
    })
  }

  // 创建
  const create = createFn
    ? useMutation({
        mutationFn: (data: C) => createFn(data),
        onSuccess: () => {
          invalidateQueries()
          options.createSuccess?.()
        },
        onError: options.createError
      })
    : {
        mutate: () => {},
        mutateAsync: () => Promise.resolve({} as any),
        isPending: ref(false),
        isSuccess: ref(false),
        isError: ref(false),
        data: ref(undefined),
        error: ref(null),
        reset: () => {}
      }

  // 更新
  const update = updateFn
    ? useMutation({
        mutationFn: (data: U) => updateFn(data),
        onSuccess: () => {
          invalidateQueries()
          options.updateSuccess?.()
        },
        onError: options.updateError
      })
    : {
        mutate: () => {},
        mutateAsync: () => Promise.resolve({} as any),
        isPending: ref(false),
        isSuccess: ref(false),
        isError: ref(false),
        data: ref(undefined),
        error: ref(null),
        reset: () => {}
      }

  // 删除
  const remove = deleteFn
    ? useMutation({
        mutationFn: (id: D) => deleteFn(id),
        onSuccess: () => {
          invalidateQueries()
          options.deleteSuccess?.()
        },
        onError: options.deleteError
      })
    : {
        mutate: () => {},
        mutateAsync: () => Promise.resolve({} as any),
        isPending: ref(false),
        isSuccess: ref(false),
        isError: ref(false),
        data: ref(undefined),
        error: ref(null),
        reset: () => {}
      }

  return {
    create,
    update,
    remove
  }
}

/**
 * 传统分页查询 Hook
 * @param options 查询选项
 */
export function usePaginationQuery<T, P extends { page?: number; pageSize?: number }>({ queryFn, queryKey, defaultParams, enabled = ref(true) }: PaginationQueryOptions<T, P>) {
  const page = ref(defaultParams.page || 1)
  const pageSize = ref(defaultParams.pageSize || 10)

  const queryParams = computed(() => {
    return {
      ...defaultParams,
      page: page.value,
      pageSize: pageSize.value
    } as P
  })

  // 使用标准查询
  const { data, isLoading, isRefetching, refetch } = useQuery({
    queryKey: [...queryKey, queryParams],
    queryFn: () => queryFn(queryParams.value),
    enabled
  })

  const list = computed<T[]>(() => data.value?.data?.list || [])
  const total = computed<number>(() => data.value?.data?.total || 0)
  const totalPages = computed<number>(() => Math.ceil(total.value / pageSize.value))

  // 是否有下一页
  const hasNextPage = computed(() => page.value < totalPages.value)
  // 是否有上一页
  const hasPreviousPage = computed(() => page.value > 1)

  // 跳转到指定页
  function goToPage(pageNumber: number) {
    if (pageNumber < 1 || pageNumber > totalPages.value) return
    page.value = pageNumber
  }

  // 下一页
  function nextPage() {
    if (hasNextPage.value) {
      page.value++
    }
  }

  // 上一页
  function previousPage() {
    if (hasPreviousPage.value) {
      page.value--
    }
  }

  // 修改每页数量
  function changePageSize(size: number) {
    pageSize.value = size
    page.value = 1 // 重置到第一页
  }

  return {
    list,
    page,
    pageSize,
    total,
    totalPages,
    loading: computed(() => isLoading.value || isRefetching.value),
    hasNextPage,
    hasPreviousPage,
    goToPage,
    nextPage,
    previousPage,
    changePageSize,
    refresh: refetch,
    originalData: data
  }
}
