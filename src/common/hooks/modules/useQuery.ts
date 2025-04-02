import { useInfiniteQuery, useQuery, useQueryClient, useMutation } from '@tanstack/vue-query'
import type { MutationOptions, ItemQueryOptions, ListQueryOptions, PaginationQueryOptions } from '@/common/hooks/type'

/**
 * 通用列表查询 Hook
 * @param options 查询选项
 */
export function useListQuery<T, P extends { page?: number; pageSize?: number }>({ queryFn, queryKey, defaultParams, enabled = true }: ListQueryOptions<T, P>) {
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
export function useItemQuery<T, P>({ queryFn, queryKey, params, enabled = true }: ItemQueryOptions<T, P>) {
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
export function usePaginationQuery<T, P extends { page?: number; pageSize?: number }>({ queryFn, queryKey, defaultParams, enabled = true }: PaginationQueryOptions<T, P>) {
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

/**
 * 轮询查询 Hook - 定时自动刷新数据
 * @param options 查询选项
 */
export function usePollingQuery<T, P>({
  queryFn,
  queryKey,
  params,
  enabled = true,
  pollingInterval = 5000, // 轮询间隔，默认5秒
  maxPolls = undefined // 最大轮询次数，默认无限
}: ItemQueryOptions<T, P> & { pollingInterval?: number; maxPolls?: number }) {
  const pollCount = ref(0)
  const shouldPoll = computed(() => {
    if (!enabled) return false
    if (maxPolls !== undefined && pollCount.value >= maxPolls) return false
    return true
  })

  // 轮询次数监听器
  const incrementPollCount = () => {
    pollCount.value++
  }

  const query = useQuery({
    queryKey,
    queryFn: () => queryFn(params),
    select: (data) => data.data,
    enabled,
    refetchInterval: shouldPoll.value ? pollingInterval : 0
  })

  // 添加数据更新成功后的计数
  watch(
    () => query.data.value,
    (newData) => {
      if (newData) {
        incrementPollCount()
      }
    }
  )

  // 手动重置轮询计数
  function resetPollCount() {
    pollCount.value = 0
  }

  return {
    ...query,
    pollCount,
    resetPollCount
  }
}

/**
 * 懒加载查询 Hook - 手动触发查询
 * @param options 查询选项
 */
export function useLazyQuery<T, P>({ queryFn, queryKey }: Omit<ItemQueryOptions<T, P>, 'params' | 'enabled'>) {
  const enabled = ref(false)
  const params = ref<P | null>(null)

  const query = useQuery({
    queryKey: [...queryKey, params],
    queryFn: () => {
      if (!params.value) {
        throw new Error('必须提供参数才能执行查询')
      }
      return queryFn(params.value)
    },
    select: (data) => data.data,
    enabled: computed(() => enabled.value && params.value !== null)
  })

  // 执行查询
  function execute(queryParams: P) {
    params.value = queryParams
    enabled.value = true
    return query.refetch()
  }

  return {
    ...query,
    execute
  }
}

/**
 * 防抖查询 Hook - 适用于搜索框等需要防抖的场景
 * @param options 查询选项
 */
export function useDebouncedQuery<T, P>({
  queryFn,
  queryKey,
  defaultParams,
  enabled = true,
  debounceTime = 500 // 防抖时间，默认500ms
}: ListQueryOptions<T, P> & { debounceTime?: number }) {
  const debouncedParams = ref(defaultParams)
  const inputParams = ref(defaultParams)

  let debounceTimer: ReturnType<typeof setTimeout> | null = null

  // 监听输入参数变化，防抖处理
  watch(
    inputParams,
    (newParams) => {
      debounceTimer && clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => {
        debouncedParams.value = newParams
      }, debounceTime)
    },
    { deep: true }
  )

  const query = useQuery({
    queryKey: [...queryKey, debouncedParams],
    queryFn: () => queryFn(debouncedParams.value),
    enabled: computed(() => enabled)
  })

  // 清除防抖定时器
  onUnmounted(() => {
    debounceTimer && clearTimeout(debounceTimer)
  })

  return {
    ...query,
    setParams: (newParams: Partial<P>) => {
      inputParams.value = { ...inputParams.value, ...newParams }
    },
    inputParams
  }
}

/**
 * 缓存查询 Hook - 将查询结果缓存到本地存储
 * @param options 查询选项
 */
export function useCachedQuery<T, P>({
  queryFn,
  queryKey,
  params,
  enabled = true,
  cacheKey, // 缓存键名
  cacheDuration = 24 * 60 * 60 * 1000 // 缓存时间，默认1天
}: ItemQueryOptions<T, P> & { cacheKey: string; cacheDuration?: number }) {
  const queryClient = useQueryClient()
  const cacheTimestamp = ref<number | null>(null)

  // 初始化时从本地存储加载缓存
  onMounted(() => {
    try {
      const cachedData = uni.getStorageSync(cacheKey)
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData)
        // 检查缓存是否过期
        if (Date.now() - timestamp < cacheDuration) {
          queryClient.setQueryData(queryKey, data)
          cacheTimestamp.value = timestamp
        } else {
          // 删除过期缓存
          uni.removeStorageSync(cacheKey)
        }
      }
    } catch (error) {
      console.error('从缓存加载数据失败', error)
      uni.removeStorageSync(cacheKey)
    }
  })

  const query = useQuery({
    queryKey,
    queryFn: () => queryFn(params),
    enabled
  })

  // 监听查询数据变化，保存到缓存
  watch(
    () => query.data.value,
    (newData) => {
      if (newData) {
        const timestamp = Date.now()
        cacheTimestamp.value = timestamp
        uni.setStorageSync(
          cacheKey,
          JSON.stringify({
            data: newData,
            timestamp
          })
        )
      }
    }
  )

  // 清除缓存
  function clearCache() {
    uni.removeStorageSync(cacheKey)
    cacheTimestamp.value = null
    return queryClient.invalidateQueries({ queryKey })
  }

  return {
    ...query,
    cacheTimestamp,
    clearCache
  }
}

/**
 * 乐观更新 Hook - 在请求完成前就先更新UI，提高用户体验
 * @param options 操作配置
 */
export function useOptimisticMutation<P>({
  mutationFn,
  queryKey,
  onMutate,
  onError,
  onSuccess
}: {
  mutationFn: (data: P) => Promise<any>
  queryKey: unknown[]
  onMutate?: (data: P) => any
  onError?: (error: any, data: P, context: any) => void
  onSuccess?: (data: any, variables: P, context: any) => void
}) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn,
    onMutate: async (data) => {
      // 取消正在进行的查询
      await queryClient.cancelQueries({ queryKey })

      // 保存之前的数据状态
      const previousData = queryClient.getQueryData(queryKey)

      // 执行自定义乐观更新逻辑
      if (onMutate) {
        const optimisticData = onMutate(data)
        // 更新查询数据为乐观状态
        queryClient.setQueryData(queryKey, optimisticData)
      }

      return { previousData }
    },
    onError: (error, data, context: any) => {
      // 发生错误时，回滚到之前的状态
      queryClient.setQueryData(queryKey, context.previousData)
      onError?.(error, data, context)
    },
    onSuccess: (result, variables, context) => {
      // 查询成功，刷新数据确保与服务器同步
      queryClient.invalidateQueries({ queryKey })
      onSuccess?.(result, variables, context)
    }
  })
}
