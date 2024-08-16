<template>
  <input
    type="text"
    :value="value"
    @input="$emit('input', $event.target.value)"
  />
</template>

<script>
export default {
  name: 'MyInput',
  // 定义父组件传递过来的数据
  props: ['value'],
  methods: {
   
  }
}
</script>

<style lang="scss" scoped>

</style>