import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import menu from './modules/menu'
// 注册 Vuex
Vue.use(Vuex)

// 创建 Vuex 实例
const store = new Vuex.Store({
  // // 1、存放数据
  // state: {},
  // // 2、修改 state 中的数据的唯一入口
  // mutations: {},
  // // 3、调用异步方法
  // actions: {},
  // // 4、类似计算属性，依赖state中的数据，进行计算新的数据。
  // getters: {},
  // 组合模块的配置项
  modules: {
    user,
    menu
  }
})

export default store
