<!-- 
👉 父组件给子组件传值
  1.父组件中给子组件绑定属性
  2.子组件内部通过props选项接收

  -->
<script setup>
import { ref } from 'vue'
import sonTmp from './sonTmp.vue'

const count = ref(100)
setTimeout(() => {
  count.value = 200
}, 3000)

const getMsg = (msg) => {
  console.log('---', msg)
}
</script>
<template>
  <h2>我是父组件</h2>
  <sonTmp message="我是你爸爸" :count="count" @get-msg="getMsg"></sonTmp>
</template>
<style lang="scss" scoped></style>
