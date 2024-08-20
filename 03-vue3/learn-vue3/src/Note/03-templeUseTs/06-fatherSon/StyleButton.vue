<script setup lang="ts">

/**
 * 👉 1、为组件的 props 标注类型
 * 作用：
 *  1. 确保传递的prop是类型安全的
 *  2. 在组件内部使用的时候也会有类型提示
 */

// 1、首先使用 类型别名或接口 定义Props类型
type BtnType = 'success' | 'danger' | 'warning'
type PropsType = {
  color: string,
  size?: string,
  btnType?: BtnType
}

// 2、通过 defineProps 宏函数对组件 props 进行类型标注
// const props = defineProps<PropsType>() 


/**
 * 👉 2、Props默认值设置
 * Prop s中的可选参数通常除了指定类型之外还需要提供默认值，可以使用 withDefaults 宏函数来进行设置
 */

 const props = withDefaults(defineProps<PropsType>(), {
  size: 'middle',
  btnType: 'success'
 })

/**
 * 👉 3、为组件的emits标注类型
 * 
 * 语法：通过 defineEmits 宏函数进行类型标注
 * 
 * 作用：可以约束事件名称并给出自动提示，确保不会拼写错误，同时约束传参类型，不会发生参数类型错误
 */

type ListItem = {
  name: string, 
  age: number
}

// 1、定义Emits类型
type ClickEmits = {
  (e: 'get-msg', msg: string): void,
  (e: 'get-list', list: ListItem[]): void
}
// 2、给defineEmits传递泛型参数
const emit = defineEmits<ClickEmits>()

const clickHandler = () => {
  emit('get-msg', '我是子组件')
  emit('get-list', [{name: 'jack', age: 18}])
}


</script>

<template>
  <div>
    <button @click="clickHandler">按钮组件</button>
  </div>
</template>

<style scoped>

</style>