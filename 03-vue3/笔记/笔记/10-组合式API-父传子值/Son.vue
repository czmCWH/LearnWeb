<script setup>
/** 子组件中接收父组件中的值
 * 使用 defineProps 宏函数，不用导入，直接使用即可
 * 直接接收父组件中的数据：defineProps(['msg'])，如下对父组件传递的值进行校验
 */
const props = defineProps({
  msg: {
    type: String,
    required: true
  }
})
// 通过 props 变量在 js 逻辑中使用 父组件传递过来的值
console.log(props.msg)
</script>

<template>
  <div class="son">
    <h2>子组件</h2>
    <p>接收父组件的值：{{ msg }}</p>
  </div>
</template>

<style scoped>
.son {
  width: 100px;
  height: 100px;
  border: 1px solid lightcyan;
}
</style>
