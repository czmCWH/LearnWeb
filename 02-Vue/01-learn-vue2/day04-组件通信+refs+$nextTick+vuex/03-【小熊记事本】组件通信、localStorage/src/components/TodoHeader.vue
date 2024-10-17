<template>
  <header class="header">
    <h1>小黑记事本</h1>
    <input placeholder="请输入任务" class="new-todo" v-model="todoname" />
    <button class="add" @click="post">添加任务</button>
  </header>
</template>

<script>
export default {
  data () {
    return {
      todoname: '' // 输入框的值
    }
  },
  methods: {
    post () {
      // $emit 写到JS区， 要用 this.$emit()
      this.$emit('add', this.todoname) // 子传父
      this.todoname = '' // 清空输入框
    }
  }
}
</script>

<style lang="scss" scoped></style>
