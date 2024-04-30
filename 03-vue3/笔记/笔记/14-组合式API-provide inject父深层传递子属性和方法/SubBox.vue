<script setup>
import { inject } from 'vue'

// 获取顶级组件的简单数据
const level_msg = inject('str_key')

const getLevelData = () => {
  // 如下方式会报错，因为 inject 只能在setup（）或函数组件内部使用
  // console.log(inject('str_key'))
  console.log(level_msg)
}

// 获取顶级组件的响应式数据
let activityStr = inject('activityStr_key')

// 获取顶级组件的方法
const activityStrChange = inject('activityStrChange')
const changeTopData = () => {
  activityStrChange()
}
</script>

<template>
  <div class="sub">
    <h3>子组件：{{ activityStr }}</h3>
    <button @click="getLevelData">获取顶级组件中的值</button>
    <button @click="changeTopData">修改父组件的数据</button>
  </div>
</template>

<style scoped>
.sub {
  padding: 30px;
  border: 1px solid lightgreen;
}
</style>
