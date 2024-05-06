<template>
  <div class="goods">
    <h2>{{ obj.name }}</h2>
    <p>商品单价：{{ obj.price }}</p>
    <p>商品描述：{{ obj.info }}</p>
    <!-- 子组件调用父组件的方法，并传值 -->
    <button @click="$emit('kanyidao', obj.id)">砍一刀</button>
  </div>
</template>

<script>
export default {
  // 子组件，通过 props 接收传递过来的数据。注意：props 中定义属性名必须和 子组件在父组件中定义属性名相同。
  props: ['obj']
}
</script>

<style lang="scss" scoped>
.goods {
  margin: 10px;
  padding: 10px;
  border: solid 2px black;
  border-radius: 5px;
}
</style>
