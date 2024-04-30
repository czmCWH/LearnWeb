<script setup>
import { ref, watch } from 'vue'

const count = ref(0)
const addCount = () => {
  count.value++
}

watch(
  count,
  (newVal, oldVal) => {
    console.log(newVal, oldVal)
  },
  {
    // immediate 在创建侦听器时，立即执行一遍回调
    immediate: true
  }
)
</script>

<template>
  <div>
    <div>count: {{ count }}</div>
    <button @click="addCount">增加count</button>
  </div>
</template>

<style lang="scss" scoped></style>
