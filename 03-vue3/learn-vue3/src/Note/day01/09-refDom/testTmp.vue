<script setup>
import { ref } from 'vue'

const name = ref('test 子组件')

const setName = () => {
  name.value = '我要暴露自己给父组件'
}

// 默认情况下在 <script setup>语法糖 下组件内部的属性和方法是不开放给父组件访问的，
// 可以通过 defineExpose编译宏 指定哪些属性 和 方法 允许访问。
defineExpose({
  name,
  setName
})
</script>

<template>
  <h1>我是: {{ name }}</h1>
  <button @click="setName">改变自己</button>
</template>

<style lang="scss" scoped></style>
