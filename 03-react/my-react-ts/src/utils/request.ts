/*
axios 封装处理：
  1、基础请求地址
  2、超时时间
  3、请求拦截器 / 响应拦截器
 */
import axios from "axios";
import { getToken, removeToken } from "./token";

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
})

// 添加请求拦截器 - 在请求发送之前执行，用于插入一些自定义的配置
request.interceptors.request.use((config) => {
  // 注入 token 数据
  const token = getToken()
  if (token) { 
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}, (error) => {
  return Promise.reject(error)
})

// 添加响应拦截器 - 请求的响应结果回到客户端之前执行，用于处理返回的数据
request.interceptors.response.use((response) => {
  return response.data
}, (error) => {
  // 监控 401，token失效
  // console.dir(error);
  if (error.response.status === 401) {
    removeToken()
    // 跳转到登录
    // router.navigate('/login')
    // window.location.reload()
  }
  return Promise.reject(error);
})
 
export default { request }