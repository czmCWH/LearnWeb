<script setup lang="ts">

/**
 * 👉 1、为事件处理函数标注类型 
 * 
 * 原生dom事件处理函数的参数默认会自动标注为any类型，没有任何类型提示，为了获得良好的类型提示，需要手动标注类型
 * 
 * 事件处理函数标注类型主要做2件事：
 * 1、给事件对象形参 e 标注为Event类型
 * 2、如果需要更加精确的DOM类型提示可以使用断言（as）进行操作
 * 
 */ 

const inputChange = (e: Event) => {
  const el = e.target as HTMLInputElement
  console.log(el.value)
}

const clickHandler = (e: Event) => {
  const el = e.target as HTMLButtonElement
  console.log(el.value)
}


</script>

<template>
  <div>
    <input type="text" @change="inputChange"/>
    <button @click="clickHandler">按钮</button>
  </div>
</template>

<style scoped>

</style>