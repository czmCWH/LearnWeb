<!-- 
👉 Vue3 定义响应式数据

1、reactive 函数
作用：接收 对象类型 数据的参数传入并返回一个响应式的对象

2、ref 函数
作用：接收 简单类型 或者 对象类型 的数据传入并返回一个响应式的对象

* reactive 和 ref 函数的共同作用是，用函数调用的方式生成响应式数据;
* ref 函数 的内部实现依赖于 reactive 函数;
* ref 必须通过 .value 做访问修改;
* ref 参数类型支持更好，在实际工作中推荐使用ref函数，更加灵活;
-->
<script setup>
import { ref, reactive } from 'vue'

const state = reactive({
  name: 'reactive',
  count: 0
})

const setState = () => {
  state.count++
}

const count = ref(0)
const setCount = () => {
  count.value++
}
</script>
<template>
  <div>
    <span>reactive 函数：{{ state.count }}</span>
    <button @click="setState">增加</button>
  </div>
  <div>
    <span>ref 函数：{{ count }}</span>
    <button @click="setCount">增加</button>
  </div>
</template>
<style lang="scss" scoped></style>
