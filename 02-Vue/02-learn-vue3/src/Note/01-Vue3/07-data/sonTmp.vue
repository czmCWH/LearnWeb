<!-- 
子传父数据基本思想：
  1、父组件中给子组件标签通过@绑定事件
  2、子组件内部通过 $emit 方法触发事件

-->
<script setup>
// 通过 defineProps 编译器宏 接收父组件传递的数据
defineProps({
  message: String,
  count: Number
})

// 通过 defineEmits 编译器宏生成emit方法 -> emit(this.$emit)，声明父组件传递给子组件的事件
const emit = defineEmits(['get-msg'])
const sendMsg = () => {
  // TODO: 触发自定义事件，给父组件传递值
  emit('get-msg', '子组件传递的值')
}
</script>
<template>
  <h2>我是子组件</h2>
  <div>{{ message }} - {{ count }}</div>
  <button @click="sendMsg">给父组件传递值</button>
</template>
<style lang="scss" scoped></style>
