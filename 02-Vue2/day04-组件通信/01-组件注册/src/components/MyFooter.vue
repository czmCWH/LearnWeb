<template>
  <div class="footer">
    <!-- 使用导入的全局组件 -->
    <MyButton></MyButton>
    <MyButton />
    <my-button />
  </div>
</template>

<script>
export default {
  name: 'my-footer',    

}
</script>

<style lang="less" scoped>
.footer {
  height: 200px;
  background-color: #4f81bd;
}
</style>