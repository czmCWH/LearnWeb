<template>
  <div>
    <h2>App组件</h2>
    <p ref="abc">这是App组件中的p标签</p>
    <hr />
    <MyTest></MyTest>
    <hr />
    <MyForm ref="myform"></MyForm>
    <!-- 通过 refs 找到子组件，并调用组件中的方法 -->
    <button @click="$refs.myform.resetForm()">重置</button>
  </div>
</template>
<!-- 

  利用 ref 和 $refs 可以用于 获取 dom 元素, 或 组件实例
  refs 只会查找当前组件中的元素，document.querySelector 是在整个页面中找元素。

 -->
<script>
import MyTest from './components/MyTest.vue'
import MyForm from './components/MyForm.vue'

export default {
  components: {
    MyTest,
    MyForm
  },
  data () {
    return {}
  },
  methods: {

  },
}
</script>


<style lang="scss" scoped>

</style>
