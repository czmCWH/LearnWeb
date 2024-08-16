<script setup>
import { inject } from 'vue'

const msg = inject('msg-key')
const count = inject('count-key')
const addCount = inject('addCount-key')
</script>

<template>
  <div>
    <h3>baseTmp盒子</h3>
    <h4>父级普通数据, msg: {{ msg }}</h4>
    <h4>父级的响应式数据, count: {{ count }}</h4>
    <button @click="addCount">修改顶层组件数据</button>
  </div>
</template>

<style lang="scss" scoped></style>
