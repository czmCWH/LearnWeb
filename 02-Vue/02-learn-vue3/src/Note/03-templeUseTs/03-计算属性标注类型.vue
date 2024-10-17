<script setup lang="ts">
import { ref, computed } from 'vue'

/**
 * 👉 1、computed计算属性 标注类型
 *
 * 计算属性通常由已知的响应式数据计算得到，所以依赖的数据类型一旦确定，通过自动推导就可以知道计算属性的类型。
 * 另外根据最佳实践，计算属性多数情况下是只读的，不做修改，所以配合TS一般只做代码提示
 *
 *
 */

const count = ref(100)
const doubleCount = computed(() => count.value * 2)
console.log('---计算属性', doubleCount.value)

type Item = {
  id: string
  name: string
  price: number
}
const list = ref<Item[]>([])

const filterList = computed(() => list.value.filter((item) => item.price > 10))
</script>
<template>
  <div>
    <ul>
      <li v-for="item in filterList" :key="item.id">{{ item.name + item.price }}</li>
    </ul>
  </div>
</template>

<style scoped></style>
