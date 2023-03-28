import Request, { RequestConfig } from './axios'
import { AxiosResponse } from 'axios'

export interface YResponse<T> {
  code: number
  msg: string
  data: T
}

// 重写返回类型
interface YRequestConfig<T, R> extends RequestConfig<YResponse<R>> {
  data?: T
}

const request = new Request({
  baseURL: '',
  timeout: 1000 * 10,
  interceptors: {
    // 请求拦截器
    requestInterceptors: (config) => config,
    // 响应拦截器
    responseInterceptors: (result: AxiosResponse) => {
      // 登陆状态已过期
      if (result.data && result.data.code === 401) {
        const { protocol, host } = window.location
        const url = `${protocol}//${host}/login`
        window.location.replace(url)
      }

      return result
    },
  },
})

/**
 * @description: 函数的描述
 * @generic D 请求参数
 * @generic T 响应结构
 * @param {YRequestConfig} config 不管是GET还是POST请求都使用data
 * @returns {Promise}
 */
const yRequest = <D = any, T = any>(config: YRequestConfig<D, T>) => {
  const { method = 'GET' } = config
  if (method === 'get' || method === 'GET') {
    config.params = config.data
  }
  return request.request<YResponse<T>>(config)
}
// 取消请求
export const cancelRequest = (url: string | string[]) => {
  return request.cancelRequest(url)
}
// 取消全部请求
export const cancelAllRequest = () => {
  return request.cancelAllRequest()
}

export default yRequest
