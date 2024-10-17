import axios, { AxiosError } from 'axios'
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
    // const userstore = useUserStore()
    // if (userstore.user?.token && config.headers) {
    //   config.headers.Authorization = `Bearer ${userstore.user!.token}`
    // }

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
      console.log('---401')
    }
    return Promise.reject(err)
  }
)

export default instance
