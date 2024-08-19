<!-- 
👉 模版引用
  通过 ref标识 获取真实的 dom对象 或者 组件实例对象

模版引用步骤：
  1.调用ref函数生成一个ref对象
  2.通过ref标识绑定ref对象到标签

  -->
<script setup>
import { ref, onMounted } from 'vue'
import testTmp from './testTmp.vue'
const h1Ref = ref(null)
const comRef = ref(null)

// 组件挂在完毕，才能获取DOM对象
onMounted(() => {
  // 访问 DOM 元素
  console.log('---h1 实例=', h1Ref.value)
  console.log('---testTmp 实例=', comRef.value)
})
</script>

<template>
  <div>
    <h1 ref="h1Ref">我是dom标签h1</h1>
  </div>
  <testTmp ref="comRef"></testTmp>
</template>

<style lang="scss" scoped></style>
