<!-- 

👉 Computed 计算属性函数
表示根据一个数据计算得到一个新的数据。

计算属性基本思想和Vue2的完全一致，Vue3组合式API下的计算属性只是修改了写法。步骤如下：
  1、导入computed函数
  2、执行函数 在回调参数中return基于响应式数据做计算的值，用变量接收

注意：
  计算属性中不应有副作用，比如：异步请求、修改DOM;
  避免直接修改计算属性的值；

-->
<script setup>
import { ref, computed } from 'vue'

const list = ref([1, 2, 3, 4, 5, 6, 7, 8])

// 声明计算属性
const computedList = computed(() => {
  return list.value.filter((item) => item > 2)
})
// 2秒后修改
setTimeout(() => {
  list.value.push(9, 10)
}, 2000)
</script>
<template>
  <span>{{ computedList }}</span>
</template>
<style lang="scss" scoped></style>
