<template>
  
  <!-- 作用域插槽联系语法 -->

  <table class="my-table">
    <thead>
      <tr>
        <th>序号</th>
        <th>姓名</th>
        <th>年纪</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in data" :key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.age }}</td>
        <td>
          <!-- 表格的最后一列，放什么按钮，不能写死 -->
          <slot :id="item.id" age="20"> 
            <!-- slot中间可以写默认值，如果不给插槽传递值，则使用该值显示 -->
            默认值 
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ['data']
}
</script>

<style scoped>
.my-table {
  width: 450px;
  text-align: center;
  border: 1px solid #ccc;
  font-size: 24px;
  margin: 30px auto;
}

.my-table thead {
  background-color: #1f74ff;
  color: #fff;
}

.my-table thead th {
  font-weight: normal;
}

.my-table thead tr {
  line-height: 40px;
}

.my-table th,
.my-table td {
  border-bottom: 1px solid #ccc;
  border-right: 1px solid #ccc;
}

.my-table td:last-child {
  border-right: none;
}

.my-table tr:last-child td {
  border-bottom: none;
}

.my-table button {
  width: 65px;
  height: 35px;
  font-size: 18px;
  border: 1px solid #ccc;
  outline: none;
  border-radius: 3px;
  cursor: pointer;
  background-color: #ffffff;
  margin-left: 5px;
}
</style>
