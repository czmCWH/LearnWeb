<script setup>
import { provide, ref } from 'vue'

const clickChange = () => {}
</script>

<template>
  <div class="box">
    <h1>顶级组件</h1>
    <button @click="clickChange">更新</button>
  </div>
</template>

<style scoped>
.box {
  padding: 30px;
  border: 1px solid lightblue;
}
</style>
