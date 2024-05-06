<template>
  <div class="app">
    <!-- 3、使用导入的组件的3种写法 -->
    <MyHeader></MyHeader>
    <MyMain />
    <my-footer></my-footer>
  </div>
</template>

<script>
// 1、导入组件
import MyHeader from './components/MyHeader.vue';
import MyMain from './components/MyMain.vue';
import MyFooter from './components/MyFooter.vue';

export default {
  name: 'App',
  // 2、在 components 中注册组件，格式为：标签名: 导入的变量
  components: {
    MyHeader: MyHeader,
    MyMain: MyMain,
    MyFooter: MyFooter,
  }
}
</script>

<style lang="less" scoped>
.app {
  padding: 10px;
  background-color: #87cccb;
}
</style>
