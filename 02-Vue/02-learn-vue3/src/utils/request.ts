import axios, { AxiosError, type Method } from 'axios'
import { useUserStore } from '@/stores'
import { showToast } from 'vant'
import router from '@/router'

const instance = axios.create({
  // 1. 基础地址，超时时间
  baseURL: 'https://consult-api.itheima.net/',
  timeout: 10000
})

instance.interceptors.request.use(
  (config) => {
    // 2. 携带token
    const userstore = useUserStore()
    if (userstore.user?.token && config.headers) {
      config.headers.Authorization = `Bearer ${userstore.user!.token}`
    }

    return config
  },
  (err) => Promise.reject(err)
)

instance.interceptors.response.use(
  (res) => {
    // 3. 处理业务失败
    if (res.data.code != 10000) {
      // 提示错误信息
      showToast(res.data.message || '业务失败')
      // 返回错误的 promis
      return Promise.reject(res.data)
      // 传入 code 将来 catch 的时候可用
    }
    // 4. 摘取核心响应数据
    return res.data
  },
  (err: AxiosError) => {
    // 5. 处理401错误 token 失效
    if (err.response?.status === 401) {
      // 清除本地信息
      const store = useUserStore()
      store.delUser()
      // 跳转到登录
      router.push({ path: '/login', query: { returnUrl: router.currentRoute.value.fullPath } })
    }
    return Promise.reject(err)
  }
)

export default instance

// 封装 request 函数发送请求
// export const request = (url: string, method: Method = 'GET', submitData?: object) => {
//   return instance.request({
//     url,
//     method,
//     [method.toUpperCase() === 'GET' ? 'params' : 'data']: submitData
//   })
// }
// 封装 request 函数发送请求，并设置响应数据类型
export const request = <T>(url: string, method: Method = 'GET', submitData?: object) => {
  return instance.request<any, Data<T>>({
    url,
    method,
    [method.toUpperCase() === 'GET' ? 'params' : 'data']: submitData
  })
}

type Data<T> = {
  code: number
  message: string
  data: T
}
