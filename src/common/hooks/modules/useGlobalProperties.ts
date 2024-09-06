import { type ComponentCustomProperties, getCurrentInstance, type ComponentInternalInstance } from 'vue'
export function useGlobalProperties() {
  const { appContext } = getCurrentInstance() as ComponentInternalInstance

  return appContext.config.globalProperties as unknown as ComponentCustomProperties & Record<string, any>
}
