<!-- *************** 选项式 API 语法 ***************** -->

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

<!-- *************** 组合式 API 语法 ***************** -->
<!-- 
  安装 VScode 插件【Vue VSCode Snippets 或者 Vue - Official】，可快速敲除 vue3 语法模版 ：vbase-3
 -->
<script>
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
</script>

<template>
  <div class="box">
    <button @click="addCount">+{{ count }}</button>
  </div>
</template>

<style scoped></style>
