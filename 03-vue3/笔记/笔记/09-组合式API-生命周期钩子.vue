<script setup>
// 导入对应的生命周期钩子
import { ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onUnmounted } from 'vue'

console.log('setup')

onBeforeMount(() => {
  console.log('onBeforeMount')
})

// 声明周期函数可以多次被执行，便于修改老代码，保证老代码逻辑不变
onMounted(() => {
  console.log('onMounted---1')
})

onMounted(() => {
  console.log('onMounted---2')
})

onBeforeUpdate(() => {
  console.log('onBeforeUpdate 页面中开始更新执行')
})

onUpdated(() => {
  console.log('onUpdated 页面更新了执行')
})

onUnmounted(() => {
  console.log('onUnmounted 页面销毁时执行')
})

const count = ref(0)
</script>

<template>
  <div>
    <div>count = {{ count }}</div>
    <button @click="count++">增加count</button>
  </div>
</template>

<style lang="scss" scoped></style>
