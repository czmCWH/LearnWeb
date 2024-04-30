<script setup>
import { ref } from 'vue'

// 声明 msg 响应式对象
const msg = ref('这是子组件的msg')

const logMsg = () => {
  console.log('子组件的方法：', msg.value)
}

// 使用 defineExpose 宏函数暴露子组件的属性、方法给父组件访问
defineExpose({
  msg,
  logMsg
})
</script>

<template>
  <div class="son">
    <h2>子组件</h2>
  </div>
</template>

<style scoped>
.son {
  width: 100px;
  height: 100px;
  border: 1px solid lightcyan;
}
</style>
