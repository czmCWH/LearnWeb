// 创建计数器 store
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  // 1、数据state
  const count = ref(0)

  // getter
  const doubleCount = computed(() => count.value * 2)

  // 2、修改数据的方法 action
  const increment = () => {
    count.value++
  }

  // 3、以对象的方式return 出去供组件使用
  return {
    count,
    doubleCount,
    increment
  }
})