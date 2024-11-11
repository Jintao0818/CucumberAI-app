import axios from "axios"
import baseUrl from "./baseUrl"

const httpInstance = axios.create({
  baseURL: 'http://47.100.80.240:9568/',
  timeout: 1800 * 1000
})

httpInstance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

httpInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default httpInstance