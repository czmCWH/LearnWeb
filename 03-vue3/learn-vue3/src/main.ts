import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 1、以 App 作为参数创建一个 Vue 应用实例
const app = createApp(App)

app.use(createPinia())
app.use(router)

// 2、把 Vue 实例挂载到index.html文件中 id 为 app 的节点上
app.mount('#app')
