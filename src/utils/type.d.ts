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
