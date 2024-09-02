<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const info = ref('')

const doSomething = (text: string) => {
  info.value = text
  return 'Vue中接收到了: ' + text
}

onMounted(() => {
  // 在 window 上挂在一个函数供iOS调用
  window.doSomething = doSomething
})

onUnmounted(() => {
  // 清理 window 上挂载的方法
  delete window.doSomething
})

// JS调用移动端的方法
const onNativeAction = () => {
  if (window.webkit) {
    window.webkit.messageHandlers.nativeFuncHandler.postMessage('我是Vue中的参数')
  } else {
    window.JSBridge.nativeFuncHandler('我是Vue的参数')
  }
}
</script>

<template>
  <main>
    <!-- <TheWelcome /> -->
    <h2>Vue中接收到了: {{ info }}</h2>
    <button class="btn" @click="onNativeAction">JS调用iOS的方法</button>
  </main>
</template>

<style scoped>
.btn {
  margin-top: 200px;
  height: 44px;
  font-size: 15px;
}
</style>
