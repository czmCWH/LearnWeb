import { createApp } from 'vue'
import pinia from './stores'

import App from './App.vue'
import router from './router'
// vant css 在 main.scss 之前引入，后续需要覆盖 vant 的样式
import 'vant/lib/index.css'
import './styles/main.scss'

// 1、以 App 作为参数创建一个 Vue 应用实例
const app = createApp(App)

app.use(pinia)
app.use(router)

// 2、把 Vue 实例挂载到index.html文件中 id 为 app 的节点上
app.mount('#app')
