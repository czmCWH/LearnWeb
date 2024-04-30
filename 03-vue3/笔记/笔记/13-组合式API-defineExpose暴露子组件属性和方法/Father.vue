<script setup>
import { ref, onMounted } from 'vue'
import SonBox from './SonBox.vue'

const sonBox = ref(null)
onMounted(() => {
  // 父组件中访问子组件的属性 和 方法
  console.log('父组件访问子组件的属性 =', sonBox.value.msg)
  sonBox.value.logMsg()
})
</script>

<template>
  <div>
    <h1>父组件</h1>
    <SonBox ref="sonBox"></SonBox>
  </div>
</template>

<style scoped></style>
