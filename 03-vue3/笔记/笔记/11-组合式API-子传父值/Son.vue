<script setup>
/** 子组件向父组件传值的步骤：
 * 1、使用宏函数 defineEmits 来生成 emit 函数
 * 2、使用 emit 函数来触发自定义事件
 * 3、父组件中监听 emit 中触发的自定义事件
 */

// 注意defineEmits中需定义好方法名，以便父组件中使用
const emit = defineEmits(['send-msg'])

const sendValue = () => {
  emit('send-msg', '子给父传值')
}
</script>

<template>
  <div class="son">
    <h2>子组件</h2>
    <button @click="sendValue">向父组件传值</button>
  </div>
</template>

<style scoped>
.son {
  width: 100px;
  height: 100px;
  border: 1px solid lightcyan;
}
</style>
