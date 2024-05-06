<template>
  <div></div>
</template>
<!-- 

  1、内置指令如：v-html、v-model、v-for...，指令的作用是为了功能复用
  自定义指令可以封装一些 DOM 操作，扩展额外的功能，如页面显示时输入框获取焦点。

  2、自定义全局指令语法【写在 main.js 中】：

  // 注意，如果不是指令钩子函数中的参数，需要省略。
  Vue.directive('指令名称', {
    bind(el, binding) {
      // 只执行一次，DOM渲染之前执行，里面可以进行样式操作。
    },

    //【重点】通常在此钩子函数中，配置指令 DOM 逻辑。
    inserted(el, binding) {
      // 只执行一次，DOM渲染之后执行，里面可以进行行为操作。
    },
    //【重点】
    update(el, binding) {
      // 数据更新后执行
    },

    componentUpdated(el, binding) {
      // 父子组件都更新后执行
    },
    unbind(el, binding) {
      // 指令解绑的时候执行
    }
  })

  使用指令
  <my-test v-指令名称="指令接收的值" />

 -->
<script>
export default {
  name: 'my-page',
  data() {
    return {

    }
  },
  /** 2、在组件中定义局部组件
   * 
   */
  directive: {('指令名称', {
    bind(el, obj) {
      // 只执行一次，DOM渲染之前执行，里面可以进行样式操作。
    },

    //【重点】
    inserted(el, obj) {
      // 只执行一次，DOM渲染之后执行，里面可以进行行为操作。
    },
    //【重点】
    update(el, obj) {
      // 数据更新后执行
    },

    componentUpdated(el, obj) {
      // 父子组件都更新后执行
    },
    unbind(el, obj) {
      // 指令解绑的时候执行
    }
  })
  }
}
</script>

<style lang="scss" scoped></style>
