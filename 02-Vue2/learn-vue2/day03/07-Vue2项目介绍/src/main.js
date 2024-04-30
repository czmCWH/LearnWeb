
// main.js 是项目入口文件，打包或运行时，第一个执行的文件。

// 导入 Vue
import Vue from 'vue'
// 导入 App 根组件
import App from './App.vue'

// 关闭浏览器控制台温馨提示
Vue.config.productionTip = false

new Vue({
  render: h => h(App),    // 渲染导入的 App 根组件 到 #app 元素
}).$mount('#app')

// new Vue({
//   el: '#app',   // 等价于 .$mount('#app')
//   render: h => h(App),
// })