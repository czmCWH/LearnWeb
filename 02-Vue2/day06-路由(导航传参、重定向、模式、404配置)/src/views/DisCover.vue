<template>
  <div class="box">
    <!-- 发现音乐 -->
    <div class="link">
      <!-- <a href="#">推荐</a>
      <a href="#">排行榜</a>
      <a href="#">歌手</a> -->
      <router-link to="/discover/tuijian">推荐</router-link>
      <router-link to="/discover/toplist">排行榜</router-link>
      <router-link to="/discover/artlist">歌手</router-link>
    </div>
    <div class="content">
      <!-- 
        嵌套路由
        下面的router-view，用于展示 推荐、排行榜、歌手 组件 
      -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FoundMusic'
}
</script>

<style lang="less" scoped>
.box {
  padding: 15px;
}

.link {
  a {
    padding-right: 10px;
    text-decoration: none;
    color: #424242;
  }
}

.content {
  padding: 10px;
}
.router-link-active {
  color: red !important;
}

</style>
