<template>
  <div>
    <h3>关注的榜单</h3>
    <a href="javascript:;" @click="xingebang">新歌榜</a>
    <a href="javascript:;">热歌榜</a>
    <h3>关注的歌手</h3>
    <a href="javascript:;" @click="zhanghuimei">张惠妹</a>
    <a href="javascript:;">薛之谦</a>
  </div>
</template>

<script>
export default {
  name: 'FollowPage',
  methods: {
    xingebang() {
      // 写法一：直接写字符串，写完整的地址
      // this.$router.push(`/discover/toplist/新歌榜`)

      // 写法二：传入对象，使用name进行跳转
      // this.$router.push({
      //   name: 'phb', // 路由规则的name值
      //   params: { // 传递的动态路由参数
      //     name: '新歌榜'
      //   }
      // })

      // 写法三：传入对象，使用path进行跳转 （使用path，并且传递params参数，有问题；参数不会拼接到url后面）
      // this.$router.push({
      //   path: '/discover/toplist',
      //   params: {
      //     name: '新歌榜'
      //   }
      // })
    },
    zhanghuimei() {
      // 写法一：直接传入字符串
      // this.$router.push('/discover/artlist?id=1')

      // 写法二：使用name跳转
      // this.$router.push({
      //   name: 'gs',
      //   query: {
      //     id: 1
      //   }
      // })

      // 写法三：使用path跳转
      this.$router.push({
        path: '/discover/artlist',
        query: {
          id: 1
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
div {
  padding: 15px;
}

h3 {
  margin: 0;
}

a {
  display: inline-block;
  margin: 10px;
  text-decoration: none;
  color: #424242;
}
</style>
