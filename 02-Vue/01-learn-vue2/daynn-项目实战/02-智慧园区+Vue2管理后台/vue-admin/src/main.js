// 导入 Vue 构造函数
import Vue from 'vue'
// 类似于 reset.css，清除浏览器的默认样式
import 'normalize.css/normalize.css'
// 引入 element-UI 组件
import ElementUI from 'element-ui'
// 引入 element-UI 的样式文件
import 'element-ui/lib/theme-chalk/index.css'

// 引入 src 下面的样式文件
import '@/styles/index.scss' // global css
// 引入 App 根组件
import App from './App'
// 引入Vuex
import store from './store'
// 引入Vue-Router
import router from './router'

// 注册svg
import '@/icons'

// 导入 permission.js
// import 除了导入成员，还可以执行导入的文件
import './permission'

// 导入自定义指令，该文件的代码会自动执行
import '@/directive'

// 把 ElementUI 中导出的所有组件注册成全局组件
Vue.use(ElementUI)

// 上线之后如果有警告，要不要展示
Vue.config.productionTip = false

// vue实例化
// 注入 router 和 store 实例，方便在项目中使用 this.$router this.$store
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)   // 根据 App 根组件渲染样式
})
