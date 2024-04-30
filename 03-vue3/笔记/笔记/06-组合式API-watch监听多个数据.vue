<script setup>
import { watch, ref } from 'vue'

const count = ref(0)
const age = ref(0)
const addCount = () => {
  count.value++
}
const addAge = () => {
  age.value++
}

// watch 同时监听两个响应式值的改变，把两个数据作为数组参数传入进行监听
// 两个数据只要有一个改变，就会被监听到
watch([count, age], (newVal, oldVal) => {
  // newVal 和 oldVal 是数组类型，对应传入的监听数组
  console.log('newVal: ', newVal)
  console.log('oldVal: ', oldVal)
})
</script>

<template>
  <div>
    <div>count: {{ count }}</div>
    <button @click="addCount">增加Count</button>
    <div>age: {{ age }}</div>
    <button @click="addAge">增加age</button>
  </div>
</template>

<style lang="scss" scoped></style>
