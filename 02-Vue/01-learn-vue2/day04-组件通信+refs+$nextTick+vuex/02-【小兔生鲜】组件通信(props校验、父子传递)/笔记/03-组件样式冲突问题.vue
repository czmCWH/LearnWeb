<template>
  <div>

  </div>
</template>
<!-- 
  组件样式冲突 scoped
  默认情况，写在组件中的样式会全局生效 -> 因此很容易造成多个组件之间的样式冲突问题。
  1、全局样式：默认组件中的样式会作用到全局
  2、局部样式：可以给组件加上 scoped 属性，可以让样式只作用于当前组件

  scoped 原理
  1、当前组件内标签都被添加【data-v-hash值】的属性
  2、css选择器都被添加 【data-v-hash值】 的属性选择器
  最终效果：必须是当前组件的元素，才会有这个自定义属性，才会被这个样式作用到。

 -->
<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>

</style>