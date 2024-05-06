<template>
  <div>
    <h3>孙子组件 - {{ user.name }}</h3>
  </div>
</template>

<script>
export default {
  name: 'grand-son',
  inject: ['user']
}
</script>

<style scoped>

</style>