<template>
  <footer class="footer">
    <!-- 统计 -->
    <span class="todo-count"
      >合 计:<strong> {{ list.length }} </strong></span
    >
    <!-- 清空 -->
    <button @click="$emit('clear')" class="clear-completed">清空任务</button>
  </footer>
</template>

<script>
export default {
  props: ['list']
}
</script>

<style lang="scss" scoped>
</style>
