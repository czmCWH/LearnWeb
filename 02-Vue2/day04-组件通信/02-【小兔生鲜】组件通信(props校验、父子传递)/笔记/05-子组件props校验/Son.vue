<template>
  <div>
    <p>{{ str }}</p>
    <p>{{ age }}</p>
  </div>
</template>

<script>
export default {
  name: 'SonPage',
  created () {
    this.say() // 调用接收到的方法
  },
  // 方式1：props 写成数组格式
  // props: ['str', 'age', 'visible', 'list', 'user', 'say']

  /**  方式2：props 写成对象格式（可以对接收的变量进行校验）
   *  1、required: true -------- 表示父组件，必须传递这个值
   *  2、type: String | Number | Object | Array | Boolean | Function，表示可以接收某一种类型。
   *    2.1、type: [String, Number]，表示可以接收多种类型。
   *  3、default: ''
   *    默认值如果是对象或数组，要写成函数格式，函数中返回对象或数组
   */
  props: {
    // str: { /* 在这里对接收的数据，进行校验 */ },
    str: {
      required: true // 表示父组件，必须传递str这项数据
    },
    age: {
      default: 100, // 如果父组件，没有传递age。则让age等于100
      // type: Number // Number 不要加引号
      type: [Number, String] // 传递过来的数据，可以是数字或字符串
    },
    visible: {},
    list: Array, // 表示只校验类型，类型是数组即可
    user: {
      default: () => {
        return {} // 对于默认值是数组或对象的情况，默认值要写一个函数，函数中返回默认值
      }
    },
    say: Function // 表示只校验类型，类型是函数即可
  }
}
</script>

<style lang="less" scoped></style>
