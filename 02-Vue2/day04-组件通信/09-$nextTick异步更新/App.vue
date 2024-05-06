<template>
  <div>
    <!-- 需求：输入框和确认按钮默认隐藏；点击编辑显示；显示后立即获取焦点 -->
    <div v-show="!isShowEdit" class="title">
      <h2>大标题</h2>
      <button @click="clickBtn">编辑</button>
    </div>
    <div v-show="isShowEdit" class="form">
      <input ref="inp" type="text" />
      <button>确认</button>
    </div>
  </div>
</template>
<!-- 
  1. 点击编辑，显示编辑框
  2. 让编辑框，立刻获取焦点
    this.isShowEdit = true // 显示输入框
    this.$refs.inp.focus() // 获取焦点
  问题："input 标签显示之后"，立刻获取焦点是不能成功的！
  原因：Vue 是 异步更新 DOM (提升性能)


  Vue异步更新、$nextTick
  $nextTick：等 DOM 更新后, 才会触发执行此方法里的函数体


  
  1. Vue是异步更新 DOM 的
  2. 想要在 DOM 更新完成之后做某件事，可以使用 $nextTick
  this.$nextTick(() => {
    // 业务逻辑
  })
 -->
<script>
export default {
  data() {
    return {
      isShowEdit: false,
    }
  },
  created() {
    
  },
  methods: {
    clickBtn() {
      this.isShowEdit = true

      this.$nextTick(() => {
        // 在数据变化之后等待 Vue 完成更新 DOM 后被调用。
        this.$refs.inp.focus()
      })
    },
  }
}
</script>

<style lang="less" scoped>
.title {
  width: 300px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  button {
    margin-left: 5px;
  }
}
</style>
