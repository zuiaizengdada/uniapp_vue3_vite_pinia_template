interface WorkerOptions {
  format: 'es' | 'iife'
}

export const createWorker = (): WorkerOptions => {
  return {
    // Worker打包格式
    format: 'es'
  }
}
