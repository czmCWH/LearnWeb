<template>
  <div>
    <h3>孙子组件 - {{ user.name }}</h3>
  </div>
</template>

<script>
export default {
  name: 'grand-son',

  // 2. 子/孙组件 inject 取值使用
  inject: ['user']
}
</script>

<style scoped>

</style>