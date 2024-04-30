<template>
  <div class="main">
    <div class="box">
      chat
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'chat',
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  },
  mounted() {
    // 在其他方法或是生命周期中也可以调用方法
    this.increment()
  }
}
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  min-height: 100vh;
  position: relative;
  background-size: 100% 100%;
  background-attachment: fixed;
  background-color: #ffffff;
  color: black;
}
.box {
  background-color: pink;
  width: 100px;
  height: 100px;
}
</style>