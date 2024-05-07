import { loginAPI } from "@/api/user"
import { setToken, getToken, removeToken } from '@/utils/auth'
export default {
  // 1、存放数据
  // 模块内的 state 写法，推荐是个函数写法，但写对象也可以
  state: {
    token: getToken() || ''
  },
  // 2、修改 state 中的数据的唯一入口
  // mutations 中的方法，只有一种调用方式 store.commite('mutations中的方法名')。
  mutations: {
    setToken(state, newToken) {
      // 1、把数据存储到 Vuex
      state.token = newToken;
      // 2、把数据存储到cookie，进行数据持久化
      setToken(newToken);
    },
    removeToken(state) {
      // 清除 Vuex 中的 token
      state.token = '';
      // 清除 cookie 中的 token
      removeToken();
    }
  },
  // 3、调用异步方法
  actions: {
    async loginAction(store, data) {
      const res = await loginAPI(data);
      console.log('---vuex='+res);
      store.commit('setToken', res.data.token)
    }
  },
  // 4、类似计算属性，依赖state中的数据，进行计算新的数据。
  getters: {

  },
  namespaced: true
}

/* 

1、为什么使用 Vuex + Cookies 方式存储
Vuex 是基于内存，存取快，但是页面刷新就清除
Window.localStorage/Cookie 基于磁盘，存取稍慢，刷新数据不丢失（持久化）

2、Window.localStorage 和 Cookie 的区别
> 存储空间大小不同
ls 5M cookie 4kb
> 是否允许后端操作
ls 纯前端操作；cookie前端可操作，后端操作占多数
> 是否可以跟随接口发送
ls 不可以，cookie可以每次跟随请求发送到后端
 
 */