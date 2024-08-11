declare module 'tob-use' {
  export function useCounter(initialValue?: number): {
    count: any
    inc: (delta?: number) => any
    dec: (delta?: number) => number
    get: () => any
    set: (val: any) => any
    reset: (val?: number) => any
  }

  export function useCycleList(list: any, options: any): {
    state: any
    index: any
    next: (n?: number) => any
    prev: (n?: number) => any
  }

  export function useEventBus(key: any): {
    on: (listener: any) => () => void
    once: (listener: any) => () => void
    off: (listener: any) => void
    emit: (event: any) => any
    reset: () => any
  }

  export function useLastChanged(source: any, options?: Record<string, any>): any

  export function useMemoize(resolver: any, options: any): {
    (...args: any[]): any
    load: (...args: any[]) => any
    delete: (...args: any[]) => void
    clear: () => any
    generateKey: (...args: any[]) => any
    cache: any
  }

  export function useOffsetPagination(options?: Record<string, any>): {
    currentPage: any
    currentPageSize: any
    pageCount: any
    isFirstPage: any
    isLastPage: any
    prev: () => number
    next: () => number
  }

  export function useToggle(initialValue?: boolean): any[] | ((value: any) => any)

  export function useDebounce(value: any, ms?: number, options?: Record<string, any>): any

  export function useDebounceFn(fn: any, ms?: number, options?: Record<string, any>): (...args: any[]) => void

  export function useThrottle(value: any, delay?: number, trailing?: boolean, leading?: boolean): any

  export function useThrottleFn(fn: any, ms?: number, trailing?: boolean, leading?: boolean): (...args: any[]) => void

  export function useAudio(list?: any[], options?: Record<string, any>): {
    play: (newSrc: any) => void
    stop: () => any
    seek: (position: any, changing?: boolean) => void
    audio: any
    error: any
    pause: () => any
    index: any
    toggle: (status: boolean, newSrc: any) => void
    replay: () => void
    destroy: () => void
    buffered: any
    duration: any
    isActive: any
    isWaiting: any
    currentTime: any
    normalizedDuration: any
    normalizedCurrentTime: any
    src: any
    next: (n: any) => void
    prev: (n: any) => void
  }

  export function createAudio(options?: Record<string, any>): {
    play: (newSrc: any) => void
    stop: () => any
    seek: (position: any, changing?: boolean) => void
    reset: () => void
    audio: any
    pause: () => any
    replay: () => void
    toggle: (status: boolean, newSrc: any) => void
    destroy: () => void
    buffered: any
    isActive: any
    duration: any
    isWaiting: any
    currentTime: any
  }

  export function asyncComputed(evaluationCallback: any, initialState: any, optionsOrRef: any): any

  export function autoResetRef(defaultValue: any, afterMs?: number): any

  export function biSyncRef(l: any, r: any): () => void

  export function controlledComputed(source: any, fn: any): any

  export function controlledRef(initial: any, options?: Record<string, any>): any

  export function createEventHook(): {
    on: (fn: any) => {
      off: () => void
    }
    off: (fn: any) => void
    trigger: (param: any) => void
  }

  export function createReactiveFn(fn: any): (...args: any[]) => any

  export function createUnrefFn(fn: any): (...args: any[]) => any

  export function debouncedRef(value: any, ms?: number, options?: Record<string, any>): any

  export function eagerComputed(fn: any): any

  export function extendRef(ref: any, extend: any, options?: Record<string, any>): any

  export function get(obj: any, key: any): any

  export function isDefined(v: any): boolean

  export function makeDestructurable(obj: any, arr: any): any

  export function not(v: any): any

  export function or(...args: any[]): any

  export function reactify(fn: any): (...args: any[]) => any

  export function reactifyObject(obj: any, optionsOrKeys?: Record<string, any>): any

  export function reactivePick(obj: any, ...keys: any[]): any

  export function refDefault(source: any, defaultValue: any): any

  export function set(...args: any[]): void

  export function syncRef(source: any, targets: any, options?: Record<string, any>): any

  export function throttledRef(value: any, delay?: number, trailing?: boolean, leading?: boolean): any

  export function toReactive(objectRef: any): any

  export function toRefs(objectRef: any): any

  export function useAsyncQueue(tasks: any, options?: Record<string, any>): {
    activeIndex: any
    result: any
  }

  export function useClamp(value: any, min: any, max: any): any

  export function useConfirmDialog(revealed?: any): {
    reveal: (data: any) => any
    cancel: (data: any) => void
    confirm: (data: any) => void
    onReveal: (fn: any) => {
      off: () => void
    }
    onCancel: (fn: any) => {
      off: () => void
    }
    onConfirm: (fn: any) => {
      off: () => void
    }
    isRevealed: any
  }

  export function useCounter(initialValue?: number): {
    count: any
    inc: (delta?: number) => any
    dec: (delta?: number) => number
    get: () => any
    set: (val: any) => any
    reset: (val?: number) => any
  }

  export function useCycleList(list: any, options: any): {
    state: any
    index: any
    next: (n?: number) => any
    prev: (n?: number) => any
  }

  export function useEventBus(key: any): {
    on: (listener: any) => () => void
    once: (listener: any) => () => void
    off: (listener: any) => void
    emit: (event: any) => any
    reset: () => any
  }

  export function useLastChanged(source: any, options?: Record<string, any>): any

  export function useMemoize(resolver: any, options: any): {
    (...args: any[]): any
    load: (...args: any[]) => any
    delete: (...args: any[]) => void
    clear: () => any
    generateKey: (...args: any[]) => any
    cache: any
  }

  export function useOffsetPagination(options?: Record<string, any>): {
    currentPage: any
    currentPageSize: any
    pageCount: any
    isFirstPage: any
    isLastPage: any
    prev: () => number
    next: () => number
  }

  export function useToggle(initialValue?: boolean): any[] | ((value: any) => any)

  export function useDebounce(value: any, ms?: number, options?: Record<string, any>): any

  export function useDebounceFn(fn: any, ms?: number, options?: Record<string, any>): (...args: any[]) => void

  export function useThrottle(value: any, delay?: number, trailing?: boolean, leading?: boolean): any

  export function useThrottleFn(fn: any, ms?: number, trailing?: boolean, leading?: boolean): (...args: any[]) => void

  export function useAudio(list?: any[], options?: Record<string, any>): {
    play: (newSrc: any) => void
    stop: () => any
    seek: (position: any, changing?: boolean) => void
    audio: any
    error: any
    pause: () => any
    index: any
    toggle: (status: boolean, newSrc: any) => void
    replay: () => void
    destroy: () => void
    buffered: any
    duration: any
    isActive: any
    isWaiting: any
    currentTime: any
    normalizedDuration: any
    normalizedCurrentTime: any
    src: any
    next: (n: any) => void
    prev: (n: any) => void
  }

  export function createAudio(options?: Record<string, any>): {
    play: (newSrc: any) => void
    stop: () => any
    seek: (position: any, changing?: boolean) => void
    reset: () => void
    audio: any
    pause: () => any
    replay: () => void
    toggle: (status: boolean, newSrc: any) => void
    destroy: () => void
    buffered: any
    isActive: any
    duration: any
    isWaiting: any
    currentTime: any
  }

  export function asyncComputed(evaluationCallback: any, initialState: any, optionsOrRef: any): any

  export function autoResetRef(defaultValue: any, afterMs?: number): any

  export function biSyncRef(l: any, r: any): () => void

  export function controlledComputed(source: any, fn: any): any

  export function controlledRef(initial: any, options?: Record<string, any>): any

  export function createEventHook(): {
    on: (fn: any) => {
      off: () => void
    }
    off: (fn: any) => void
    trigger: (param: any) => void
  }

  export function createReactiveFn(fn: any): (...args: any[]) => any

  export function createUnrefFn(fn: any): (...args: any[]) => any

  export function debouncedRef(value: any, ms?: number, options?: Record<string, any>): any

  export function eagerComputed(fn: any): any

  export function extendRef(ref: any, extend: any, options?: Record<string, any>): any

  export function get(obj: any, key: any): any

  export function isDefined(v: any): boolean

  export function makeDestructurable(obj: any, arr: any): any

  export function not(v: any): any

  export function or(...args: any[]): any

  export function reactify(fn: any): (...args: any[]) => any

  export function reactifyObject(obj: any, optionsOrKeys?: Record<string, any>): any

  export function reactivePick(obj: any, ...keys: any[]): any

  export function refDefault(source: any, defaultValue: any): any

  export function set(...args: any[]): void

  export function syncRef(source: any, targets: any, options?: Record<string, any>): any

  export function throttledRef(value: any, delay?: number, trailing?: boolean, leading?: boolean): any

  export function toReactive(objectRef: any): any

  export function toRefs(objectRef: any): any

  export function useAsyncQueue(tasks: any, options?: Record<string, any>): {
    activeIndex: any
    result: any
  }

  export function useClamp(value: any, min: any, max: any): any

  export function useConfirmDialog(revealed?: any): {
    reveal: (data: any) => any
    cancel: (data: any) => void
    confirm: (data: any) => void
    onReveal: (fn: any) => {
      off: () => void
    }
    onCancel: (fn: any) => {
      off: () => void
    }
    onConfirm: (fn: any) => {
      off: () => void
    }
    isRevealed: any
  }
}
