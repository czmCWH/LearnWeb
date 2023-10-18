<template>
  <div class="main">
    home
</div>
</template>

<script>
export default {

  data() {
    return {
      count: 0,
      // 访问地址时携带的参数
      name: this.$route.query.name,
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
    console.log('-----czm---', this.$route.params.username);
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
  display: flex;
  flex-direction: column;
}

</style>