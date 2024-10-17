<script setup lang="ts">
import { onMounted } from 'vue'
import { useCounterStore } from './store/counterStore'
import { useChannelStore } from './store/channelStore'

// 执行方法得到 store 实例对象
const counterStore = useCounterStore()
const channelStore = useChannelStore()

onMounted(() => {
  // 触发异步action
  channelStore.getList()
})
</script>

<template>
  <div>
    <span>getter: {{ counterStore.doubleCount }}</span>
    <button @click="counterStore.increment">点击{{ counterStore.count }}</button>
    <ul>
      <li v-for="item in channelStore.list" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>

<style scoped></style>
