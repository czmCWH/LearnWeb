<script setup>
import { provide, ref } from 'vue'
import ChildBox from './ChildBox.vue'

// provide 向子组件传递简单数据
let str = '顶级组件的数据AAA'
provide('str_key', str)

// provide 向子组件传递响应式数据
let activityStr = ref('顶级组件的响应式数据')
provide('activityStr_key', activityStr)

const activityStrChange = () => {
  activityStr.value = '更新了'
}

// provide 向子组件传递方法
provide('activityStrChange', activityStrChange)
</script>

<template>
  <div class="box">
    <h1>顶级组件</h1>
    <button @click="activityStrChange">更新</button>
    <ChildBox></ChildBox>
  </div>
</template>

<style scoped>
.box {
  padding: 30px;
  border: 1px solid lightblue;
}
</style>
