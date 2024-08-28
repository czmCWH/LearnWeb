import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/index.vue'),
    meta: { title: '主页' }
  },
  {
    path: '/pay',
    name: 'pay',
    component: () => import('@/views/pay/index.vue'),
    meta: { title: '主页' }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/about/index.vue'),
    meta: { title: '主页' }
  }
]

export default routes
