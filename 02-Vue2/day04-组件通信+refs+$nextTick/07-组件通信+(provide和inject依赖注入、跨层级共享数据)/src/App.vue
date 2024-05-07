<template>
  <div>
    <Son></Son>
  </div>
</template>

<!-- 
  非父子通信 (拓展) - provide & inject

  provide & inject 作用：跨层级共享数据。


 -->

<script>
import Son from './components/Son.vue'
// import { computed } from 'vue'
export default {
  
  // 1. 父组件 provide 提供数据
  provide: {
    // 传递给后代组件的数据，父组件与子组件共享数据
    // 传递的对象是响应式的
    // 传递的其他数据，是非响应式的
    user: { name: '章三', age: 20 }
    // 通过 computed 把非对象属性包装成响应式数据
    // phone: computed('138000122112')
  },
  data () {
    return {}
  },
  components: {
    Son
  }
}
</script>


<style lang="scss" scoped>

</style>
