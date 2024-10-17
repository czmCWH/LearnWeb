<template>
  <div>
    <h2>随便一个组件-1</h2>
    <button @click="send">发送数据</button>
  </div>
</template>

<script>
import bus from '@/bus' // @ 代表src文件夹
export default {
  methods: {
    send () {
      // 3. B 组件(发送方)，触发 Bus 实例的事件
      bus.$emit('abc', 123123123)
    }
  }
}
</script>

<style scoped>

</style>