<template>
  <div>
    <h2>儿子组件 - {{ user.name }}</h2>
    <hr />
    <GrandSon></GrandSon>
  </div>
</template>

<script>
import GrandSon from './GrandSon.vue'
export default {
  name: 'son-page',
  
  // 2. 子/孙组件 inject 取值使用
  inject: ['user'],

  components: {
    GrandSon
  }
}
</script>

<style lang="sass" scoped></style>
