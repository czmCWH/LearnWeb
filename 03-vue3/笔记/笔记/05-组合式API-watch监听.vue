<script setup>
import { watch, ref } from 'vue'

const count = ref(0)
const addCount = () => {
  count.value++
}
// watch 监听响应式数据的变化
watch(count, (newVal, oldVal) => {
  console.log('newVal: ', newVal)
  console.log('oldVal: ', oldVal)
})
</script>

<template>
  <div>
    <div>count: {{ count }}</div>
    <button @click="addCount">增加Count</button>
  </div>
</template>

<style lang="scss" scoped></style>
