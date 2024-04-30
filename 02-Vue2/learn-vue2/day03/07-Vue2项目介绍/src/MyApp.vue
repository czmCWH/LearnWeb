<!-- 
  1、快速创建组件
  使用 Vue VSCode Snippets(vscode插件) 快速命令 vbase 快速创建页面结构

  2、组件命名格式
  组件名必须多词格式，即（驼峰命名法、xxx-xx）来区分词个数，一个词会报错。
  如果文件名不符合多词格式，可以通过 script 中的 name: 'abc-def' 配置多词格式来解决。

  3、组件的3个组成部分
  template 中必须只有一个根元素，否则会报错

 -->
 <template>
  <div>
    页面结构
  </div>
</template>

<script>
// Vue 的代码都必须写在此对象中
export default {
  name: 'abc-def',
  data() {
    return {

    }
  },
  created() {

  },
  mounted() {

  },
  methods: {

  },
  computed: {

  },
  watch: {

  }
}
</script>

<!-- 
  使用 less 的步骤：
  1、安装包 npm i less less-loader -D
  2、<style lang="less" scoped>
 -->
<style lang="scss" scoped>


</style>