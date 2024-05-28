import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'

const service = axios.create({
  // baseURL 基地址，每个请求都有的地址，封装的请求接口地址会拼接到 baseURL 后面
  baseURL: 'https://api-hmzs.itheima.net/v1',
  // 请求超时时间，毫秒
  timeout: 5000 // request timeout
})

// 请求拦截器
// 发送请求的时候执行
service.interceptors.request.use(
  config => {
    // config 携带请求信息，通常配置请求头，携带token

    const token = store.state.user.token
    if (token) {
      config.headers.Authorization = token
    }

    return config
  },
  error => {
    // 请求错误时执行
    return Promise.reject(error)
  }
)

// 响应拦截器
// 当服务器返回数据时，数据流转第一站。
service.interceptors.response.use(
  response => {
    // 请求响应成功时执行，状态码2xx
    if (response.data.code !== 10000) {
      Message.error(response.data.msg)
      // 传入 response.data 是为了在实际请求处进行 catch 拦截信息，不传也没关系
      return Promise.reject(response.data)
    } else {
      return response.data
    }
    
  },
  error => {
    // 请求响应失败时执行，状态码4xx-5xx
    // 可以统一处理 error 错误信息
    Message.error(error.response.data.msg)
    if (error.response.status === 401) {    // token 过期了
      // 清除token
      store.commit('user/removeToken')
      // 回到登录页
      router.push('/login')
    }
    return Promise.reject(error)
  }
)

export default service
