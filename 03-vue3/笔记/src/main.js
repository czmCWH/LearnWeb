// 初始化样式
import './assets/main.css'

// createApp 表示创建 Vue 应用的函数
import { createApp } from 'vue'
import App from './App.vue'

// 基于 App 组件创建 Vue 应用，mount 挂载到 #app 节点上
createApp(App).mount('#app')
