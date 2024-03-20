import ApiService from './request'
import { BASE_URL } from './request/config'

const apiService = new ApiService({ baseURL: BASE_URL })

export default apiService
