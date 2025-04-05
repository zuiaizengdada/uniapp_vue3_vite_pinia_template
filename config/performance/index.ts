interface PerformanceOptions {
  hints: boolean
}

export const createPerformance = (): PerformanceOptions => {
  return {
    // 禁用性能提示
    hints: false
  }
}
