import router from '@/router'
import store from '@/store'
import asyncRoutes from '@/router/asyncRoutes'
// 路由白名单
const whiteList = ['/login', '/404']

// 获取一级权限标识
function getFirstRoutePermission(permision) {
  const firstArray = permision.map(item => {
    return item.split(':')[0]
  })
  // 通过 Set 去重
  return Array.from(new Set(firstArray))
}

// 获取二级权限标识
function getSecondRoutePermission(permision) {
  const secondArray = permision.map(item => {
    const arr = item.split(':')
    return `${arr[0]}:${arr[1]}`
  })
  return Array.from(new Set(secondArray))
}

// 获取筛选后的动态路由
function getAvaibleRoutes(firstPermission, secondPermission, asyncRoutes) {
  // 如果是管理员，返回所有动态路由
  if (firstPermission.includes('*')) {
    return asyncRoutes
  }
  // 先筛选一级导航
  const firstRoutes = asyncRoutes.filter(item => firstPermission.includes(item.permission))
  // 在一级导航中筛选二级导航
  const resultRoutes = firstRoutes.map(item => {
    return {
      ...item,  // 先展开 item，再处理children
      children: item.children.filter(child => secondPermission.includes(child.permission))
    }
  })
  return resultRoutes
}

// 路由守卫：在路由跳转、页面刷新前都会执行
router.beforeEach( async (to, from, next) => {
  // to：跳转的路由对象
  // from：从哪里来
  // next：放行 next() 重定向 next(路径)

  const token = store.state.user.token
  if (token) {
    // 有 token 
    if (to.path === '/login') {   // 访问登录页
      next('/')   // 回到首页
    } else {
      next()    // 放行
      // 1、获取用户权限标识信息，并存储到 Vuex
      const permissions = await store.dispatch('menu/getUserPermission')
      // console.log(permissions)
      // 2、根据权限标识，筛选出对应的一级路由标识
      const firstPermission = getFirstRoutePermission(permissions)
      // console.log('筛选出用户对应的一级路由标识', firstPermission)
      // 3、根据权限标识，筛选出对应的二级路由标识
      const secondPermission = getSecondRoutePermission(permissions)
      // console.log('筛选出用户对应的二级路由标识: ', secondPermission)
      // 4、根据一级、二级权限标识筛选动态路由
      // console.log('配置的所有动态路由: ', asyncRoutes)
      const routes = getAvaibleRoutes(firstPermission, secondPermission, asyncRoutes)
      // console.log('筛选之后的动态路由：', routes)
      // 5、筛选后的路由，展示在左侧
      // 5.1、先把筛选之后的路由添加到路由对象中【！！！用于点击时跳转！！！】
      routes.forEach(item => router.addRoute(item))
      // 5.2、再把筛选之后的路由添加到 Vuex 中 【！！！用于渲染对应的路由！！！】
      store.commit('menu/setMenuList', routes)
    }
  } else {
    // 没有token
    if (whiteList.includes(to.path)) {  // 在白名单，直接放行
      next()
    } else {  // 否则进登录页
      next('/login')
    }
  }
})