<script setup>
import { ref } from 'vue'
// 导入子组件
import SomBox from './Son.vue'

const getMsg = (val) => {
  console.log('父组件中获取值：', val)
}
</script>

<template>
  <div class="box">
    <h1>父组件</h1>
    <SomBox @send-msg="getMsg"></SomBox>
  </div>
</template>

<style scoped>
.box {
  width: 200px;
  height: 200px;
  border: 1px solid lightcoral;
}
</style>
