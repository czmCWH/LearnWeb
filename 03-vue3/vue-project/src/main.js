import './assets/main.css'
import { createApp } from 'vue'
import router from './router';
import App from './App.vue'
import Vconsole from 'vconsole'
import { Toast, Loading } from 'vant';

// 根据 根组件(App) 创建 Vue 实例对象
const app = createApp(App)

app.use(router);

if (import.meta.env.DEV) {
  let vConsole = new Vconsole()
  app.use(vConsole)
}

app.use(Toast);
app.use(Loading);

// 挂载应用，Vue 实例对象必须调用了 mount() 方法后才能被渲染出来，该方法接收一个容器参数。
app.mount('#app')