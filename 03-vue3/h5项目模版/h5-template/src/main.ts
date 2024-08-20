import { createApp } from 'vue'
import pinia from './stores'

import App from './App.vue'
import router from './router'
import 'vant/lib/index.css'
import './styles/main.scss'
// i18n 国际化
import i18n from './locales'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(i18n)

app.mount('#app')
