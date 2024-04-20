<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>09-计算属性</title>
</head>
<body>
  <div id="app">

  </div>

  <script src="../day01/js/vue.js"></script>
  <script src="../day01/js/axios.js"></script>
  <script>
    const app = new Vue({
      el: '#app',
      data: {},     // 存数据
      methods: {},  // 存方法
      computed: {}, // 放计算属性
      watch: {},    // 放侦听器
      create() {},  // 勾子函数，最先执行的函数，自动执行
      mounted() {},   // 可以进行 DOM 操作

    })
  </script>
</body>
</html>