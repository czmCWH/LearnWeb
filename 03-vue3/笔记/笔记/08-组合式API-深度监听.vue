<script setup>
import { ref, reactive, watch } from 'vue'

// 1、deep 深度监听 ref 对象的变化

const state = ref({ count: 0 })

const addCount = () => {
  state.value.count++
}

// 使用 deep: true 监听整个对象的变化
watch(
  state,
  (newVal, oldVal) => {
    // newVal 和 oldVal 中的值是一样的，都是存放对象的地址，所以监听到 count 的值相同，都是改编后的值
    console.log(newVal.count, oldVal.count)
  },
  {
    deep: true
  }
)

// 2、watch 默认支持对 reactive 对象进行深度监听
const score = reactive({ math: 0 })
const addMath = () => {
  score.math++
}

watch(score, (newVal, oldVal) => {
  console.log(newVal.math, oldVal.math)
})
</script>

<template>
  <div>
    <div>state.count = {{ state.count }}</div>
    <button @click="addCount">增加state.count</button>

    <div>score.math = {{ score.math }}</div>
    <button @click="addMath">增加score.math</button>
  </div>
</template>

<style lang="scss" scoped></style>
