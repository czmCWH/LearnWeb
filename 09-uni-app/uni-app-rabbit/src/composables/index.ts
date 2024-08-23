// componsables 文件夹中，用于存放封装组合式函数

import { ref } from 'vue'
import type { XtxGuessInstance } from '@/types/component'

/**
 * 猜你喜欢组件 的组合式函数
 * @returns
 */
export const useGuessList = () => {
  // 猜你喜欢组件
  const guessRef = ref<XtxGuessInstance>()

  // 滚动触底
  const onScrolltolower = () => {
    guessRef.value?.getMore()
  }

  // 返回 ref 和事件处理函数
  return {
    guessRef,
    onScrolltolower
  }
}
