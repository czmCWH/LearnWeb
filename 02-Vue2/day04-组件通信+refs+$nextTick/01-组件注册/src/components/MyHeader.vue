<template>
  <div class="header">
    <MyButton></MyButton>
    <MyButton />
    <my-button />
  </div>
</template>

<script>
export default {
  name: 'my-header',    
}
</script>

<style lang="less" scoped>
.header {
  height: 200px;
  background-color: #8064a2;
}
</style>