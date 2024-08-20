import { createRouter, createWebHistory } from 'vue-router'

/**
 * history 路由模式
 *    history模式 createWebHistory()，如：http://xxx/user
 *    hash模式 createWebHashHistory()，如：http://xxx/#/user
 *
 * createWebHistory() 参数有个默认值 '/'，表示路由的基础路由前缀，访问地址都会默认带上此路径。
 *                    参数作用是，部署项目时有基础路径时需要在此配置。
 *
 * import.meta.env.BASE_URL
 *   import.meta 是 JavaScript 模块默认暴露的描述模块的信息对象，用于描述模块信息。
 *   env.BASE_URL 是Vite 环境变量:https://cn.vite.dev。由 vite.config.ts 中的 base 选项的值确定的。
 * 作用：
 *    打包 => dist目录
 *    把dist代码放到服务器根目录（root）=> import.meta.env.BASE_URL 不需要设置
 *    没有把dist代码放到服务器根目录（root），例如：放到root/consult-h5 => vite.config.ts  添加配置=>base: /consult-h5/
 */

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'list',
      component: () => import('../Note/04-example/List.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login/index.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/test/test.vue')
    }
  ]
})

console.log('-- import.meta = ', import.meta)

export default router
