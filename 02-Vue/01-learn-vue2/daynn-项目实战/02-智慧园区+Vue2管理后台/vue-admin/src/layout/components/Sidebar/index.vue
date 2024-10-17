<template>
  <div class="has-logo">
    <logo />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <!-- 左侧菜单组件 -->
      <el-menu
        :default-active="activeMenu"
        mode="vertical"
        :collapse-transition="false"
        :unique-opened="true"
      >
        <!-- 菜单中的每一项 -->
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import Logo from './Logo'
import SidebarItem from './SidebarItem'
export default {
  components: { SidebarItem, Logo },
  computed: {
    routes() {
      // 获取创建路由对象时传入的路由规则
      // 左侧菜单栏是根据 this.$router.options.routes 进行渲染的
      // 权限标识，只需要与 this.$router.options.routes 进行对比
      // this.$router.options.routes 是创建路由对象的路由规则
      // 权限标识根路由规则进行对比
      // this.$router.options.routes 是直接获取当前的值，不是响应式的，后续通过 addRoute 改变 router 的路由配置不会更新。
      // return this.$router.options.routes
      
      // 从 Vuex 中获取路由中获取路由配置，Vuex 是响应式的
      return this.$store.state.menu.menuList
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    }
  }
}
</script>

