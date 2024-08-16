<!-- 
👉 watch 函数
作用：侦听一个或者多个数据的变化，数据变化时执行回调函数；
它有2个额外参数:1.immediate(立即执行)2.deep(深度侦听)

immediate
说明:在侦听器创建时立即触发回调, 响应式数据变化之后继续执行回调

deep
默认机制: 通过watch监听的ref对象默认是浅层侦听的，直接修改嵌套的对象属性不会触发回调执行，需要开启deep选项监听整个对象的变化。
watch 默认支持对 reactive对象 进行深度监听。

-->
<script setup>
import { ref, watch } from 'vue'
const count = ref(0)
const addCount = () => {
  count.value++
}

// TODO: 可以直接侦听一个 ref
watch(
  count,
  (newVal, oldVal) => {
    console.log(newVal, oldVal)
  },
  {
    immediate: true
  }
)

const name = ref('空')
const changeName = () => {
  name.value = name.value === '空' ? '色' : '空'
}

// TODO: 侦听多个 ref
watch([count, name], ([newCount, newName], [oldCount, oldName]) => {
  console.log(newCount, oldCount)
  console.log(newName, oldName)
})

// TODO: deep 深度侦听
const person = ref({ name: '小米', age: 18 })

const changePersonName = () => {
  person.value.name = person.value.name === '小米' ? '小红' : '小米'
}
const changePersonAge = () => {
  person.value.age++
}

watch(
  person,
  (newVal, oldVal) => {
    // newVal 和 oldVal 中的值是一样的，都是存放对象的地址，所以监听到 count 的值相同，都是改编后的值
    console.log(newVal, oldVal)
  },
  {
    deep: true // deep 性能损耗，尽量不开启deep
  }
)

// TODO: 精确侦听对象的某个属性
watch(
  () => person.value.name,
  (newVal, oldVal) => {
    console.log('精确侦听：', newVal, oldVal)
  }
)
</script>
<template>
  <button @click="addCount">增加+</button>
  {{ count }}
  <button @click="count--">减少-</button>
  <div>
    <button @click="changeName">更名</button>
    {{ name }}
  </div>
  <div>
    <p>姓名：{{ person.name }}, 年龄：{{ person.age }}</p>
    <button @click="changePersonName">修改名字</button>
    <button @click="changePersonAge">增加年龄</button>
  </div>
</template>

<style lang="scss" scoped></style>
