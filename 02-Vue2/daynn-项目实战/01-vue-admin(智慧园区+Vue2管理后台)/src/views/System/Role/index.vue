<template>
  <div class="role-container">
    <div class="left-wrapper">
      <div 
       v-for="(item, index) in roleList" 
       :key="item.roleId" 
       class="role-item" 
       :class="{active: activeIndex === index}"
       @click="menuChange(index)"
       >
        <div class="role-info">
          <svg-icon :icon-class="activeIndex === index ? 'user-active' : 'user' " class="icon" />
          {{ item.roleName }}
        </div>
        <div class="more">
          <el-dropdown>
            <span class="el-dropdown-link">
              <svg-icon icon-class="more"/>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="onEditRule(item.roleId)">编辑角色</el-dropdown-item>
              <el-dropdown-item @click.native="onDeleteRule(item.roleId)">删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
       <el-button class="addBtn" size="mini" @click="$router.push('/sys/addRole')">添加角色</el-button>
    </div>
    <div class="right-wrapper">
      <el-tabs v-model="activeName">
        <el-tab-pane label="功能权限" name="permission">
          <div class="tree-wrapper">
            <div v-for="item in treeList" :key="item.id" class="tree-item">
              <div class="tree-title">{{ item.title }}</div>
              <el-tree
                ref="tree"
                :data="item.children"
                :props="defaultProps"
                :default-expand-all="true"
                show-checkbox
                node-key="id"
              />
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="`成员(${total})`" name="employee">
          <div class="user-wrapper">
            <el-table
              :data="userList"
              style="width: 100%"
            >
              <el-table-column
                type="index"
                width="250"
                label="序号"
              />
              <el-table-column
                prop="name"
                label="员工姓名"
              />
              <el-table-column
                prop="userName"
                label="登录账号"
              />
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
     
    </div>
  </div>
</template>

<script>
import { getRoleListAPI, getPermisionTreeListAPI, getRoleDetailAPI, getRoleUserListAPI, delRoleUserAPI } from '@/api/system'
export default {
  name: 'Role',
  data() {
    return {
      roleList: [],
      activeIndex: 0,  // 表示当前点击那个菜单项
      treeList: [],    // 存储所有的权限列表
      defaultProps: {   // 指定树形每一级属性映射值
        label: 'title',
        disabled: function() {  // 方式2，禁用权限树形文本框选中
          return true
        }   
      },
      activeName: 'permission',   // 默认打开权限tree
      params: {
        page: 1,
        pageSize: 10
      },
      total: 0, 
      userList: []
    }
  },
  async created() {
    /**
     * 当在函数A里调用异步函数时，使用 async await 保证了函数A中按顺序执行，但是 函数A 依然是一个异步函数
     * 如下代码所示，添加 async await 保证函数内部代码顺序执行
    */
    await this.getRoleList()
    await this.getPermisionTreeList()
    this.menuChange(0)
  },
  methods: {
    onDeleteRule(roleId) {
      this.$confirm('您确定删除该角色吗？', '温馨提示').then(async() => {
        const res = await delRoleUserAPI(roleId)
        this.$message.success('删除成功')
        this.getRoleList()
      }).catch(() => {})
    },
    // 编辑角色
    onEditRule(roleId) {
      this.$router.push(`/sys/addRole?id=${roleId}`)
    },
    // 获取角色列表
    async getRoleList() {
      const res = await getRoleListAPI()
      this.roleList = res.data
    },     
    // 获取权限列表
    async getPermisionTreeList() { 
      const res = await getPermisionTreeListAPI()
      this.treeList = res.data
      
      // this.addDisableProp(this.treeList)
    },
    // 方式1：递归处理权限列表数据，给每一级对象添加 disable 属性，用于权限文本框不可选择
    addDisableProp(treeList) {
      treeList.forEach(item => {
        item.disabled = true
        if (item.children) {
          this.addDisableProp(item.children)
        }
      })
    },
    
    // 点击角色菜单列表
    menuChange(index) {
      this.activeIndex = index
      const roleId = this.roleList[this.activeIndex].roleId
      this.getRoleDetail(roleId)
      this.getRoleUserList(roleId)
    },
    // 获取角色成员数据
    async getRoleUserList(roleId) {
      const res = await getRoleUserListAPI(roleId, this.params)
      this.total = res.data.total
      this.userList = res.data.rows
      console.log(res)
    },
    // 获取角色权限信息，并配置权限列表状态
    async getRoleDetail(roleId) {
      const res = await getRoleDetailAPI(roleId)
      // perms 是一个二维数组，每个元素对应某个功能模块的权限
      const perms = res.data.perms
      // 由于 $refs.tree 在 v-for 中，所以需要遍历
      const treeComponentList = this.$refs.tree
      treeComponentList.forEach((tree, index) => {
        // 设置勾选的权限
        tree.setCheckedKeys(perms[index])
      })
    }
  }
}
</script>

<style scoped lang="scss">
.role-container {
  display: flex;
  font-size: 14px;
  background-color: #fff;
  padding:20px;
  .left-wrapper {
    width: 200px;
    border-right: 1px solid #e4e7ec;
    padding: 4px;
    text-align: center;

    .role-item {
      position: relative;
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      cursor: pointer;

      &.active {
        background: #edf5ff;
        color: #4770ff;
      }
    }

    .role-info {
      display: flex;
      align-items: center;

      .icon {
        margin-right: 10px;
      }
    }

    .more {
      display: flex;
      align-items: center;
    }
    .addBtn{
      width: 100%;
      margin-top: 20px;
    }
  }

  .right-wrapper {
    flex: 1;

    .tree-wrapper {
      display: flex;
      justify-content: space-between;

      .tree-item {
        flex: 1;
        border-right: 1px solid #e4e7ec;
        padding: 0px 4px;
        text-align: center;
        .tree-title {
          background: #f5f7fa;
          text-align: center;
          padding: 10px 0;
          margin-bottom: 12px;
        }
      }
    }

    ::v-deep .el-tabs__nav-wrap {
      padding-left: 20px;
    }

    .user-wrapper{
      padding:20px;
    }
  }
}
</style>