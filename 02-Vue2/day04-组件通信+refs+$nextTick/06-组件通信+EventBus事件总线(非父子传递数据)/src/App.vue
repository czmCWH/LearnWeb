<template>
  <div>
    <AnyOne></AnyOne>
    <hr />
    <AnyTwo></AnyTwo>
  </div>
</template>
<!-- 

非父子通信 (拓展) - event bus 事件总线

作用：非父子组件之间，进行简易消息传递。(复杂场景 → Vuex)

 -->
<script>
import AnyOne from './components/AnyOne.vue'
import AnyTwo from './components/AnyTwo.vue'
export default {
  data () {
    return {}
  },
  components: {
    AnyOne,
    AnyTwo
  }
}
</script>

<style lang="scss" scoped>

</style>
