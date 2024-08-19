<script setup lang="ts">
import { ref, onMounted } from 'vue';

/**
 * 👉 1、给模板引用标注类型
 * 
 * 给模版引用标注类型，本质上是给ref对象的value属性添加了类型约束，
 * 约定value属性中存放的是特定类型的DOM对象，从而在使用的时候获得相应的代码提示。
 * 
 */ 

// 使用带 null 的联合类型，是因为 inputRef 的初始值为 null
const inputRef = ref<HTMLInputElement | null>(null)

onMounted(() => {
  // 模版挂在完毕后，才能使用模版元素
  inputRef.value?.focus()
})

const aRef = ref<HTMLAnchorElement | null>(null)
onMounted(() => {
  console.log(aRef.value?.href)
})


/**
 * 👉 2、对象的非空值处理
 * 当对象的属性可能是 null 或 undefined 的时候，称之为“空值”，尝试访问空值身上的属性或者方法会发生类型错误
 * 
 * 对象的非空值处理方案：
 * 1、可选链方案
 * 2、逻辑判断方案
 * 3、非空断言方案
 */
onMounted(() => {

  // 1、可选链 ?. 是一种访问嵌套对象属性的安全的方式, 可选链前面的值为 undefined 或者 null时，它会停止运算
  console.log(aRef.value?.href)

  // 2、通过逻辑判断，只有有值的时候才继续执行后面的属性访问语句
  if (aRef.value) {
    console.log(aRef.value.href)
  }

  // 3、非空断言（!）是指我们开发者明确知道当前的值一定不是null或者undefined，让TS通过类型校验
  // 非空断言（!) 没有实际的JS判断逻辑，只是通过了TS的类型校验。如果对象为空值会报错
  console.log(aRef.value!.href)

})


</script>

<template>
  <div>
    <input type="text" ref="inputRef"/>
    <a href="#" ref="aRef">点击跳转</a>
  </div>
</template>

<style scoped>

</style>