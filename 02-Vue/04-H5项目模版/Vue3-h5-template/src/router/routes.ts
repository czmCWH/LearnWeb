import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    name: 'home',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'demo',
    component: () => import('@/views/home.vue'),
    meta: { title: '首页' }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/about.vue')
  }
]

export default routes
