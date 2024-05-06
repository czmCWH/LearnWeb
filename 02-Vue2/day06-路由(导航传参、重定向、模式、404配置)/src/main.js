import Vue from 'vue'
import App from './App.vue'
// import './styles/index.css'
// 1、导入 router 组件对象
import router from '@/router' // 导入的是某个文件夹中的index文件，index可以不写

Vue.config.productionTip = false


// 4、注入，将路由对象注入到new Vue实例中，建立关联
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
