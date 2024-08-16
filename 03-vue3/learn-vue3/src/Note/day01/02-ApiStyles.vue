<!-- 
1、Vue2 使用的【选项式API】
 -->
<!-- <script>
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    addCount() {
      this.count++
    }
  }
}
</script> -->

<!-- 2、Vue3 新增的【组合式API】 -->
<script setup>
import { ref } from 'vue'
const count = ref(0)
const addCount = () => count.value++
</script>

<!-- 
<script setup> 是 Vue3 的语法糖。如果不使用该语法糖，则书写如下：
-->
<!-- <script>
import { ref } from 'vue'
export default {
  // setup 表示使用组合式API，它是最早执行的函数
  setup() {
    const count = ref(0)
    const addCount = () => {
      count.value++
    }

    // 如果让模版使用 setup 中的方法和变量，必须return 出去
    return {
      count,
      addCount
    }
  }
}
</script> -->

<!-- 2、模版 -->
<template>
  <button @click="addCount">增加+</button>
  {{ count }}
  <button @click="count--">减少-</button>
</template>
<!-- 3、样式 -->
<style lang="scss" scoped></style>
