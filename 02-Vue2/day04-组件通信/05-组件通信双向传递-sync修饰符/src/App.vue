<template>
  <div>
    <button @click="visible = true">删除</button>
    <!-- <MyDialog :visible="visible" @update:visible="closeAction"></MyDialog> -->
    <!-- .sync 的方式简写 -->
    <MyDialog :visible.sync="visible"></MyDialog>
    <!-- 
      1、子组件中修改父组件传递的值
      :属性.sync="变量"
      等同于 :属性="变量"  +  @update:属性="xxx"
    -->
  </div>
</template>
<!-- 
  总结：子组件修改父组件传递值
  方式1、<MyTest :属性名="变量" @changeValue=""/>，需要子组件调用父组件的方法来修改。
  方式2、<MyTest v-model="变量" />，需要子组件配合，且子组件接收的变量名必须是 value。
  方式3、<MyTest :属性.sync="变量" />，可以随意修改接收的变量名。

-->
<script>
import MyDialog from './components/MyDialog.vue'
export default {
  data () {
    return {
      visible: false // 控制弹出框是否显示
    }
  },
  components: {
    MyDialog
  },
  methods: {
    closeAction(val) {
      this.visible = val
    }
  },

}
</script>

<style lang="scss" scoped>
body {
  background-color: #b3b3b3;
}
</style>
