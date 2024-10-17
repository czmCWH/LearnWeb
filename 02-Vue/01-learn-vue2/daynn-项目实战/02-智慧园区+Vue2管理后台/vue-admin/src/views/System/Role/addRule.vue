<template>
  <div class="add-role">
    <header class="add-header">
      <div class="left">
        <span class="arrow" @click="$router.back()"><i class="el-icon-arrow-left" />返回</span>
        <span>|</span>
        <span>{{ id ? "编辑角色" : "添加角色" }}</span>
      </div>
      <div class="right">
        黑马程序员
      </div>
    </header>
    <main class="add-main">
      <div class="step-container">
        <el-steps direction="vertical" :active="activeStep">
          <el-step title="角色信息" />
          <el-step title="权限信息" />
          <el-step title="检查并完成" />
        </el-steps>
      </div>
      <!-- 1、角色信息 -->
      <div v-show="activeStep === 1" class="form-container">
        <div class="title">角色信息</div>
        <div class="form">
          <el-form ref="roleForm" class="form-box" :model="roleForm" :rules="roleRules">
            <el-form-item label="角色名称" prop="roleName">
              <el-input v-model="roleForm.roleName" />
            </el-form-item>
            <el-form-item label="角色描述" prop="remark">
              <el-input v-model="roleForm.remark" />
            </el-form-item>
          </el-form>
        </div>
      </div>
      <!-- 2、权限配置信息 -->
      <div v-show="activeStep === 2" class="form-container">
        <div class="title">权限配置</div>
        <div class="tree-wrapper">
          <div class="tree-item" v-for="item in treeList" :key="item.id">
            <div class="tree-title">{{ item.title }}</div>
            <!-- 
              show-checkbox 显示复选框
              default-expand-all 默认展开所有节点
              check-strictly 解除父子选中时的关联
              props 指定数据映射到节点的值
             -->
            <el-tree
              ref="tree"
              :data="item.children"
              show-checkbox
              check-strictly
              default-expand-all
              node-key="id"
              :props="defaultProps"
            />
          </div>
        </div>
      </div>
      <!-- 3、提交确认检查 -->
      <div v-show="activeStep === 3" class="form-container">
        <div class="title">检查并完成</div>
        <div class="form">
          <div class="info">
            <div class="form-item">角色名称：{{ roleForm.roleName }}</div>
            <div class="form-item">角色描述：{{ roleForm.remark }}</div>
            <div class="form-item">角色权限：</div>
            <div class="tree-wrapper">
              <div v-for="item in treeList" :key="item.id" class="tree-item">
                <div class="tree-title">{{ item.title }}</div>
                <el-tree
                  ref="diabledTree"
                  :data="item.children"
                  show-checkbox
                  check-strictly	
                  default-expand-all
                  node-key="id"
                  :props="{ label: 'title', disabled: () => true}"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <footer class="add-footer">
      <div class="btn-container">
        <el-button v-show="activeStep !== 1" @click="prev">上一步</el-button>
        <el-button  v-show="activeStep !== 3" type="primary" @click="next">下一步</el-button>
        <el-button v-show="activeStep === 3" type="primary" @click="confirmAdd">{{ this.id ? '确认编辑' : '确认添加' }}</el-button>
      </div>
    </footer>
  </div>
</template>

<script>
import { getPermisionTreeListAPI, addRoleUserAPI, getRoleDetailAPI, updateRoleUserAPI  } from '@/api/system'

export default {
  name: 'AddRule',
  data() {
    return {
      activeStep: 1,
      roleForm: {
        roleName: '',
        remark: '',
        perms: []
      },
      roleRules: {
        roleName: [
          { required: true, message: '请输入角色名称', triger: 'blur' }
        ],
        remark: [
          { required: true, message: '请输入角色描述', triger: 'blur' }
        ]
      },
      treeList: [],
      defaultProps: {
        'label': 'title'
      }
    }
  },
  computed: {
    id() {
      return this.$route.query.id
    }
  },
  created() {
    this.getPermisionTreeList()
    if (this.id) {
      this.getRoleDetail()
    }
    
  },
  methods: {
    async getRoleDetail() {
      const res = await getRoleDetailAPI(this.id)
      console.log(res)
      this.roleForm = res.data
      // 回显第2步数据
      this.$refs.tree.forEach((item, index) => {
        item.setCheckedKeys(this.roleForm.perms[index])
      })
    },
    // 确认添加 or 编辑
    async confirmAdd() {
      if (this.id) {
        delete this.roleForm.userTotal
        const res = await updateRoleUserAPI(this.roleForm)
        this.$message.success(res.msg)
      } else {
        const res = await addRoleUserAPI(this.roleForm)
        this.$message.success(res.msg)
      } 
      this.$router.back()
    },
    // 获取所有的权限列表
    async getPermisionTreeList() {
      const res = await getPermisionTreeListAPI()
      console.log(res)
      this.treeList = res.data
     },
    prev() { 
      if (this.activeStep === 1) { return }
      this.activeStep--
    },
    next() {
      if (this.activeStep === 3) { return }
      if (this.activeStep === 1) { 
        this.$refs.roleForm.validate(flag => {
          if (!flag) return
          this.activeStep++
        })
       } else if (this.activeStep === 2) { 
        // 判断用户是否勾选了权限信息
        const treeComponentList = this.$refs.tree
        this.roleForm.perms = []
        treeComponentList.forEach(tree => {
          // 获取所有勾选节点的绑定的模型
          // console.log(tree.getCheckedNodes())
          // 获取所有勾选节点绑定的 key
          // console.log(tree.getCheckedKeys())
          this.roleForm.perms.push(tree.getCheckedKeys())
        }) 
        console.log(this.roleForm.perms.flat())
        if (this.roleForm.perms.flat().length <= 0) {
          this.$message.warning('请至少勾选一个权限点')
          return
        }
        // 回显 步骤3 中的数据，在第2步中处理避免页面闪烁
        // v-show 底层使用 display: block，所以 ref 依然可以获取到 DOM 节点
        // 如果使用 v-if 控制隐藏显示，则无法通过 ref 获取到 DOM 节点
        const disabledTreeList = this.$refs.diabledTree
        disabledTreeList.forEach((tree, index) => {
          tree.setCheckedKeys(this.roleForm.perms[index])
        })
        this.activeStep++
       } 
    }
  }

}
</script>
<style scoped lang="scss">
.add-role {
  background-color: #f4f6f8;
  height: 100vh;

  .add-header {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    height: 64px;
    line-height: 64px;
    font-size: 16px;
    font-weight: bold;
    background-color: #fff;

    .left {
      span {
        margin-right: 4px;
      }

      .arrow {
        cursor: pointer;
      }
    }

    .right {
      text-align: right;
    }
  }

  .add-main {
    position: fixed;
    top: 64px;
    bottom: 88px;
    width: 100%;
    overflow-y: auto;
    background: #f4f6f8;
    padding: 20px 230px;
    display: flex;
    .step-container {
      height: 400px;
      width: 200px;
    }
    .form-container {
      flex:1;
      background-color: #fff;
      overflow-y: auto;
      .title {
        height: 60px;
        line-height: 60px;
        padding-left: 20px;
      }
      .form {
        margin-bottom: 20px;
        padding: 20px 65px 24px;
        .el-form {
          display: flex;
          flex-wrap: wrap;
        }
        .info{
          font-size:14px;
          color:#666;
          .form-item{
            margin-bottom:20px;
          }
        }
      }
      .form-box{
        width: 600px;
        display: flex;
        flex-direction: column;
      }
    }
  }

  .add-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 24px 50px;
    color: #000000d9;
    font-size: 14px;
    background: #fff;
    text-align: center;
    z-index: 10001;
  }
  .tree-wrapper {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .tree-item {
        flex: 1;
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
}
</style>