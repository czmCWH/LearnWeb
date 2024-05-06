<template>
  <div>
    <h2>随便一个组件-2</h2>
  </div>
</template>

<script>
import bus from '../bus'
export default {
  created () {
    
    // 2. A 组件(接收方)，监听 Bus 实例的事件
    bus.$on('abc', val => {
      console.log('接收到了数据：', val) // val就是接收到的数据
    })
  }
}
</script>

<style lang="less" scoped></style>
