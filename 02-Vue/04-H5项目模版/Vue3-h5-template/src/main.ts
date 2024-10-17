import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'
// 样式全局使用
import 'vant/lib/index.css'
import './styles/main.scss'
// i18n 国际化
import i18n from './locales'

const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(i18n)

app.mount('#app')
