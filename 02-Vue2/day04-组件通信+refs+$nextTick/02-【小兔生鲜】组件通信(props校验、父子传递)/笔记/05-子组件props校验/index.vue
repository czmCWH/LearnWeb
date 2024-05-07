<template>
  <div>
    <!-- 父传子，就是给组件标签，添加冒号属性，冒号属性接收变量；没有冒号变量接收值 -->
    <Son
      str="hello"
      :age="age"
      :visible="visible"
      :list="list"
      :user="user"
      :say="say"
    ></Son>
  </div>
</template>

<script>
import Son from './Son.vue'

export default {
  data () {
    return {
      age: 20,
      visible: true,
      list: ['a', 'b', 'c'],
      user: { name: 'zhangsan', sex: '男' },
      say () {
        console.log(123)
      }
    }
  },
  components: {
    Son
  }
}
</script>

<style lang="less" scoped></style>
