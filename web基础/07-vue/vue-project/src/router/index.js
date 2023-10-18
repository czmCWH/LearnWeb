import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { 
    name: '首页',
    path: "/", 
    component: () => import('@/pages/home.vue'),
  }, 
  { 
    name: '在线聊天',
    path: "/chat", 
    component: () => import('@/pages/chat.vue'),
  },
  { 
    name: '支付页面',
    path: "/pay", 
    component: () => import('@/pages/pay.vue'),
  },
 
];

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});

export default router;