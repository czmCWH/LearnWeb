import { getUserProfileAPI } from '@/api/user'
import { routes, resetRouter } from '@/router/index'

export default {
  namespaced: true,
  // 1、存放状态
  state: {
    // 存储接口返回的 权限标识
    permission: [],
    // 存储登录用户对应的路由配置
    menuList: [] 
  },
  // 2、修改状态
  mutations: {
    // 修改权限标识
    setPermission(state, newPermission) {
      state.permission = newPermission
    },
    // 修改路由配置
    setMenuList(state, asyncRoutes) {
      state.menuList = [...routes, ...asyncRoutes]
    },
    // 清空路由配置
    clearMenuList(state) {
      state.menuList = []
      resetRouter()
    }
  },
  // 3、调用异步方法
  getters: {},
  // 4、用于给外部调用的异步方法
  actions: {
    // 存储权限信息，控制页面某些按钮是否显示
    async getUserPermission(store) {
      const res = await getUserProfileAPI()
      console.log(res)
      store.commit('setPermission', res.data.permissions)
      return res.data.permissions
    }
  }
}