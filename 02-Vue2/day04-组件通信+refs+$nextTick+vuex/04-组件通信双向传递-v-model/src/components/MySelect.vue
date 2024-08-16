<template>
  <select :value="value" @change="$emit('input', $event.target.value)">
    <option value="北京">北京市</option>
    <option value="上海">上海市</option>
    <option value="广州">广州市</option>
    <option value="深圳">深圳市</option>
  </select>
</template>

<script>
export default {
  name: 'MySelect',
  // 定义父组件传递过来的数据
  props: ['value']
}
</script>

<style lang="scss" scoped>

</style>