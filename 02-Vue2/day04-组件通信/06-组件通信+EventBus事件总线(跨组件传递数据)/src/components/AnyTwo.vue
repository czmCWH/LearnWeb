<template>
  <div>
    <h2>随便一个组件-2</h2>
  </div>
</template>

<script>
import bus from '../bus'
export default {
  created () {
    bus.$on('abc', val => {
      console.log('接收到了数据：', val) // val就是接收到的数据
    })
  }
}
</script>

<style lang="less" scoped></style>
