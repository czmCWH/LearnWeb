<script setup lang="ts">
import {ref, reactive} from 'vue'

/**
 * 👉 1、为Ref标注类型
 * 为ref标注类型之后，既可以在给ref对象的value赋值时校验数据类型，同时在使用value的时候可以获得代码提示
 * 
 * 为Ref标注类型，本质上是给ref对象的value属性添加类型约束。
 */

// 1、简单数据类型，使用类型推导
let count = ref(0)
count.value = 100
count.value = 200

// 2、复杂类型，使用范型标注
let year = ref<string | number>('2028')
year.value = 2022

type Item = {
  id: string,
  name: string,
  price: number
}
const list = ref<Item[]>([])
list.value.push({
  id: '1',
  name: '鞋子',
  price: 235.0
})


/**
 * 👉 2、为reactive标注类型
 */

// 1、如果根据默认参数对象推导的类型符合要求，推荐使用类型推导
const form = reactive({
  userName: 'jack',
  password: '123'
})
form.userName = '张三'

// 2、如果根据默认对象推导不出相应的类型，推荐使用类型别名给变量显式注解 对应类型
type User = {
  userName: string,
  password: string,
  isAgree?: boolean
}
const p: User = reactive({
  userName: 'jack',
  password: '123'
})
p.isAgree = true

</script>
<template>
  <div>
    <ul>
      <li v-for="item in list" :key="item.id">{{ item.name + item.price }}</li>
    </ul>
  </div>
</template>


<style scoped>

</style>