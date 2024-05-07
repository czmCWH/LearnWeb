<template>
  <div class="dialog">

    <!-- 使用 <slot></slot> 插槽占位 -->

    <div class="dialog-header">
      
      <!-- 
        1、使用命名插槽。
        
        如果定义插槽没有 name 属性，其实也有名字，叫做 default ，称为默认插槽。
       -->
      <slot name="title"></slot>
      <span class="close">✖️</span>
    </div>
    
    <div class="dialog-content">  
      <!-- 
        2、使用作用域插槽
        子组件在自定义插槽的时候，需要向使用者(父组件)传递一些数据，直接在插槽上定义数据，这样的插槽叫做作用域插槽。
      -->
      <slot username="张三" age="20"></slot>
    </div>
    
    <div class="dialog-footer">
      <!-- 3、使用命名作用域插槽 -->
      <slot name="btn" sex="男"></slot>
    </div>    
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style scoped> 
* {
  margin: 0;
  padding: 0;
}

.dialog {
  width: 470px;
  height: 230px;
  padding: 0 25px;
  background-color: #ffffff;
  margin: 40px;
  border-radius: 5px;
}

.dialog-header {
  height: 70px;
  line-height: 70px;
  font-size: 20px;
  border-bottom: 1px solid #ccc;
  position: relative;
}

.dialog-header .close {
  position: absolute;
  right: 0px;
  top: 0px;
  cursor: pointer;
}

.dialog-content {
  height: 80px;
  font-size: 18px;
  padding: 15px 0;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
}

.dialog-footer button {
  width: 65px;
  height: 35px;
  background-color: #ffffff;
  border: 1px solid #e1e3e9;
  cursor: pointer;
  outline: none;
  margin-left: 10px;
  border-radius: 3px;
}

.dialog-footer button:last-child {
  background-color: #007acc;
  color: #fff;
}
</style>
