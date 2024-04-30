<!-- setup 语法糖书写方式 -->

<script setup>
import { reactive, ref } from 'vue'

// reactive 只能声明响应式对象，简单类型数据不能使用 reactive 声明为响应式
// ref 可以声明简单类型、对象类型为响应式数据

/** reactive 和 ref 的对比
 * reactive 不能处理简单类型数据
 * ref 参数类型支持更好，但是必须使用 value 用于访问修改
 * ref 函数内部的实现依赖于 reactive 函数
 *
 * 在实际工作中推荐使用 ref，减少记忆
 */

// 1、reactive 把对象声明为响应式
const state = reactive({ count: 0 })
const addCount = () => {
  state.count++
  console.log(state.count)
}

// 2、声明 ref 接收 0 的一个响应式数据
var total = ref(0)
// var total = ref(null)

const addTotal = () => {
  // 在 script 中使用 ref 生成响应式对象，使用.value的方式访问其原始值
  // 但是，在 html 模版中可以直接使用
  total.value++
  console.log('total = ', total.value)
}

// 3、ref 声明对象为响应式对象
const score = ref({ math: 0 })
const changeMath = () => {
  score.value.math++
  console.log('math = ', score.value.math)
}
</script>

<template>
  <div>
    <div>reactive 声明对象为响应式对象 :{{ state.count }}</div>
    <button @click="addCount">增加</button>

    <div>ref 声明简单类型为响应式对象 :{{ total }}</div>
    <button @click="addTotal">增加</button>

    <div>ref 声明对象类型为响应式对象 :{{ score.math }}</div>
    <button @click="changeMath">增加</button>
  </div>
</template>

<style lang="scss" scoped></style>
