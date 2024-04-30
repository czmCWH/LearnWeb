<script setup>
import { ref, computed } from 'vue'

// 声明响应式简单数据 count
const count = ref(0)

// 声明计算属性doubleCount，该属性依赖于响应式数据count
const doubleCount = computed(() => {
  return count.value * 2
})

const addCount = () => {
  count.value++
}
</script>

<template>
  <div>
    <div>计算属性 doubleCount ：{{ doubleCount }}</div>
    <button @click="addCount">增加 count，doubleCount计算属性的值也跟着改变</button>
  </div>
</template>

<style lang="scss" scoped></style>
