import * as Pinia from 'pinia'
import { createUnistorage } from 'pinia-plugin-unistorage'

const store = Pinia.createPinia()

store.use(createUnistorage())

export { Pinia }

export default store
