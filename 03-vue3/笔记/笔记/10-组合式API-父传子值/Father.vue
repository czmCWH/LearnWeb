<script setup>
import { ref } from 'vue'
// 导入子组件
import SomBox from './Son.vue'

const msg = ref('父组件给子组件传值')
</script>

<template>
  <div class="box">
    <h1>父组件</h1>
    <SomBox :msg="msg"></SomBox>
  </div>
</template>

<style scoped>
.box {
  width: 200px;
  height: 200px;
  border: 1px solid lightcoral;
}
</style>
