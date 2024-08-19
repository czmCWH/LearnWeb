<!-- 
👉 跨组件通信
顶层组件向任意的底层组件传递数据和方法，实现跨层组件通信

跨层传递普通数据
  1.顶层组件通过 provide函数 提供数据
  2.底层组件通过 inject函数 获取数据

-->
<script setup>
import { provide, ref } from 'vue'
import middleTmp from './middleTmp.vue'

// TODO: 传递普通数据
provide('msg-key', 'topTmp的普通数据')

// TODO: 传递响应式数据
const count = ref(0)
provide('count-key', count)

setTimeout(() => {
  count.value = 999
}, 3000)

// TODO: 传递方法修改数据，谁的数据谁负责修改
const addCount = () => {
  count.value++
}
provide('addCount-key', addCount)
</script>

<template>
  <div>
    <h1>topTmp盒子</h1>
    <middleTmp></middleTmp>
  </div>
</template>

<style lang="scss" scoped></style>
