<template>
  <div>
    <MyDialog>
      <!-- template 是个虚拟标签，不会解析成任何标签 -->

      <!-- 为插槽提供需要展示的结构 -->

      <!-- 1、命名插槽 -->
      <!-- <template v-slot:title> -->
      <!--  v-slot: 可以简写为 # -->
      <template #title>
        <h3>温馨提示</h3>
      </template>

      <!-- 2、作用域插槽传递参数，通过 obj 接收作用域插槽传递的值 -->
      <!-- <template v-slot:default="obj"> -->
      <template #default="obj">
        <p>你确定要删除吗？{{ obj }}</p>
      </template>

      <!-- 3、作用域插槽解构赋值获取传递的数据 -->
      <!-- v-slot:btn="{ sex }" 解构赋值接收插槽传递的数据 -->
      <template v-slot:btn="{ sex }">
        <button>确定{{ sex }}</button>
      </template>
    </MyDialog>

    <!-- <MyDialog>
      <p>你确定要退出吗？</p>
    </MyDialog> -->
  </div>
</template>

<script>
import MyDialog from './components/MyDialog.vue'
export default {
  data () {
    return {}
  },
  components: {
    MyDialog
  }
}
</script>

<style>
body {
  background-color: #b3b3b3;
}
</style>