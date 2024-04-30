<script setup>
import { ref, onMounted } from 'vue'

/** ref 模版引用的步骤：
 * 1、定义 ref(null) 响应式变量，并且该变量名必须和 DOM 元素ref属性值相同
 * 2、直接使用 响应式变量名即可访问 DOM 元素
 */

const h1Ref = ref(null)

onMounted(() => {
  console.log('模版引用，获取DOM元素=', h1Ref.value)
})
</script>

<template>
  <div>
    <h1 ref="h1Ref">这是一个标题1</h1>
  </div>
</template>

<style scoped></style>
