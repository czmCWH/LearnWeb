import Vue from 'vue'
import Router from 'vue-router'

// 创建 Rounter 实例
Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * 1、静态路由，不要权限就可以访问的页面，比如：登录、404、首页
 * 2、动态路由，需要有权限才能访问的页面叫动态路由
 */

export const routes = [
  {
    path: '/login',
    component: () => import('@/views/Login/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/workbench'
  },
  {
    path: '/workbench',
    component: Layout,
    children: [{
      path: '',
      component: () => import('@/views/Workbench/index'),
      meta: { title: '工作台', icon: 'el-icon-data-board' }
    }]
  },
  // 配置动态路由 / 传参数；静态路由使用 ? 传参
  {
    path: '/enterpriseDetail/:id',
    component: () => import('@/views/Park/Enterprise/enterpriseDetail')
  },
  {
    path: '/addEnterprise',
    component: () => import('@/views/Park/Enterprise/addEnterprise')
  },
  {
    'path': '/card/addMonthCard',
    'component': () => import('@/views/Car/CarCard/addMonthCard.vue')
  },
  {
    path: '/sys/addRole',
    component: () => import('@/views/System/Role/addRule')
  }, 
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  mode: 'history',   // 默认路由模式，hash 模式 ip 和 路由地址通过 # 连接；history 模式通过 / 连接。
  scrollBehavior: () => ({ y: 0 }),   // 保证路由切换后，页面滚动位置重置
  routes: routes  // 路由规则配置项
})

const router = createRouter()

// 重置路由方法
export function resetRouter() {
  // 得到一个全新的router实例对象
  const newRouter = createRouter()
  // 使用新的路由记录覆盖掉老的路由记录
  router.matcher = newRouter.matcher
}

export default router
