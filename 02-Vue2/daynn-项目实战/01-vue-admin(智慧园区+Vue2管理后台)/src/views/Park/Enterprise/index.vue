
<template>
  <div class="building-container">
    <!-- 搜索区域 -->
    <div class="search-container">
      <div class="search-label">企业名称：</div>
      <el-input clearable placeholder="请输入内容" class="search-main" v-model="params.name" @clear="clear"/>
      <el-button type="primary" @click="search">查询</el-button>
    </div>
    <div class="create-container">
      <el-button type="primary" v-if="permission.includes('park:enterprise:edit')" @click="$router.push('/addEnterprise')">添加企业</el-button>
    </div>
    <!-- 表格区域 -->
    <div class="table">
      <el-table style="width: 100%" :data="list" @expand-change="expandChange">
        <!-- 每一行展开组件 -->
        <el-table-column type="expand">
          <!-- #default="scope"中scope拿到 el-table中list的每一行数据 -->
          <template #default="scope">
            <el-table :data="scope.row.rentList">
              <el-table-column label="租赁楼宇" width="320" prop="buildingName" />
              <el-table-column label="租赁起始时间" prop="startTime">
                <template #default="rentObj">
                  {{rentObj.row.startTime}}至{{rentObj.row.endTime}}
                </template>
              </el-table-column>
              <el-table-column label="合同状态" prop="status">
                <template #default="rentObj">
                  <el-tag :type="formatInfoType(rentObj.row.status)">
                    {{ formateStatus(rentObj.row.status) }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="180">
                <template #default="rentObj">
                  <!-- <el-button v-if="permission.includes('park:rent:add_surrender')" size="mini" type="text" :disabled="rentObj.row.status === 3" @click="rentingOut(rentObj.row.id)">退租</el-button> -->
                  <el-button v-permission="'park:rent:add_surrender'" size="mini" type="text" :disabled="rentObj.row.status === 3" @click="rentingOut(rentObj.row.id)">退租</el-button>
                  <!-- <el-button v-if="permission.includes('park:rent:remove')" size="mini" type="text" :disabled="rentObj.row.status !== 3">删除</el-button> -->
                  <el-button v-permission="'park:rent:remove'" size="mini" type="text" :disabled="rentObj.row.status !== 3">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <!-- 默认序号使用 type="index"；自定义序号，通过方法动态获取序号 -->
        <el-table-column type="index" :index="indexMethod" label="序号" />
        <el-table-column label="企业名称" width="320" prop="name" />
        <el-table-column label="联系人" prop="contact" />
        <el-table-column
          label="联系电话"
          prop="contactNumber"
        />
        <el-table-column label="操作">
          <template #default="scope">
            <!-- <el-button v-if="permission.includes('park:rent:add_surrender')" size="mini" type="text" @click="addRent(scope.row.id)">添加合同</el-button> -->
            <el-button size="mini" type="text" @click="addRent(scope.row.id)">添加合同</el-button>
            <!-- <el-button v-if="permission.includes('park:enterprise:query')" size="mini" type="text" @click="$router.push(`/enterpriseDetail/${scope.row.id}`)">查看</el-button> -->
            <el-button v-permission="'park:enterprise:query'" size="mini" type="text" @click="$router.push(`/enterpriseDetail/${scope.row.id}`)">查看</el-button>
            <!-- <el-button v-if="permission.includes('park:enterprise:add_edit')" size="mini" type="text" @click="toEditPage(scope.row.id)">编辑</el-button> -->
            <el-button v-permission="'park:enterprise:add_edit'" size="mini" type="text" @click="toEditPage(scope.row.id)">编辑</el-button>
            <!-- <el-button v-if="permission.includes('park:enterprise:remove')" size="mini" type="text" @click="delEnterprise(scope.row.id)">删除</el-button> -->
            <el-button v-permission="'park:enterprise:remove'" size="mini" type="text" @click="delEnterprise(scope.row.id)">删除</el-button>
            
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-container">
      <el-pagination
        layout="total, prev, pager, next"
        :total="total"
        :page-size="params.pageSize"
        @current-change="handlePageChange"
      />
    </div>
    <!-- el-dialog 添加合同弹窗
      title 左上角文本
      visible 控制弹窗是否显示
      close 点击关闭弹窗执行的函数
      close-on-click-modal 点击弹窗以外区域是否关闭弹窗
     -->
    <el-dialog
      title="添加合同"
      :visible="rentDialogVisible"
      :close-on-click-modal="false"
      width="580px"
      @close="closeDialog"
      
      >
      <!-- 表单区域 -->
      <div class="form-container">
        <el-form ref="addForm" :model="rentForm" :rules="rentRules" label-position="top">
          <el-form-item label="租赁楼宇" prop="buildingId">
            <el-select v-model="rentForm.buildingId" placeholder="请选择">
              <el-option
                v-for="item in rentBuildingList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="租赁起止日期" prop="rentTime">
            <el-date-picker
              v-model="rentForm.rentTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
          <el-form-item label="租赁合同" prop="contractId">
            <!-- el-upload 上传文件组件
              action 默认的上传地址，如果不配置则使用#
              http-request 覆盖默认上传函数
              before-upload 上传文件前的一个钩子，用于进行文件格式校验
              limit 限制上传文件的个数
              on-exceed 超出文件上传个数时，执行的函数
              on-remove 文件删除时执行的函数
             -->
            <el-upload
              ref="upload"
              action="#"
              :http-request="httpRequest"
              :before-upload="beforeUpload"
              :limit="1"
              :on-exceed="onExceed"
              :on-remove="onRemove"
            >
              <el-button size="small" type="primary" plain>上传合同文件</el-button>
              <div slot="tip" class="el-upload__tip">支持扩展名：.doc .docx .pdf, 文件大小不超过5M</div>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <el-button size="mini" @click="closeDialog">取 消</el-button>
        <el-button size="mini" type="primary" @click="confirmAdd">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getEnterpriseListAPI, deleteEnterpriseAPI, getRentBuildingAPI, addRentAPI, getEnterpriseRentBuildingAPI, rentingOutAPI } from '@/api/enterprise'
import { uploadFileAPI } from '@/utils/common'
import { mapState } from 'vuex'
export default {
  name: 'Enterprise',
  // 定义局部指令
  // directives: {

  // },
  data() {
    return {
      params: {
        name: '',
        page: 1,
        pageSize: 2
      }, 
      list: [],
      total: 0,
      rentDialogVisible: false,
      rentForm: {
        buildingId: null,
        startTime: '',
        endTime: '',
        contractUrl: '',
        contractId: null,
        type: 0,
        enterpriseId: '',
        rentTime: []    // 收集的时间
      }, 
      rentRules: {
        buildingId: [
          { required: true, message: '请选择楼宇', trigger: 'change' }
        ],
        rentTime: [
          { required: true, message: '请选择租赁时间', trigger: 'change' }
        ],
        contractId: [
          { required: true, message: '请上传租赁合同', trigger: 'change' }
        ],
      },
      rentBuildingList: []
    }
  },
  computed: {
    ...mapState('menu', ['permission'])
  },
  created() {
    console.log('获取 Vuex 中的 permission 权限属性: ', this.permission)
    this.getEnterpriseList()
  },
  methods: {
    // 点击合同退租
    rentingOut(id) {
      console.log(id)
      this.$confirm('您确定要退租吗？', '温馨提示').then(async () => {
        const res = await rentingOutAPI(id)
        this.$message.success(res.msg)
        this.getEnterpriseList()
      }).catch(() => {

      })
    },
    // 格式化tag类型
    formatInfoType(status) {
      const MAP = {
        0: 'warning', 
        1: 'success',
        1: 'info',
        1: 'danger',
      }
      return MAP[status]
    },
    //可视化状态
    formateStatus(status) {
      const MAP = {
        0: '待生效',
        1: '生效中',
        2: '已到期',
        3: '已退租'
      }
      return MAP[status]
    },
    /** 点击展开、关闭触发的事件
     * row：当前展开或关闭的行数据
     * expandedRows：所有展开行的数据
    */
    async expandChange(row, expandedRows) {
      // isInclude 为true 表示展开；false 关闭
      const isInclude = expandedRows.find(item => item.id === row.id)
      if (!isInclude) return
      const res = await getEnterpriseRentBuildingAPI(row.id)
      console.log(res)
      // 存储合同信息，合同和企业信息是相关联的
      row.rentList = res.data
    },
    // 添加租赁合同
    confirmAdd() {
      this.$refs.addForm.validate( async (flag) => {
        if (!flag) return
        // this.rentForm.startTime = this.rentForm.rentForm[0]
        const [startTime, endTime] = this.rentForm.rentTime
        this.rentForm.startTime = startTime
        this.rentForm.endTime = endTime
        delete this.rentForm.rentTime
        const res = await addRentAPI(this.rentForm)
        console.log(res)
        this.rentDialogVisible = false
        this.$message.success(res.msg)
        this.getEnterpriseList()
      })
    },
    // 上传文件个数限制
    onExceed() {
      this.$message.warning('文件超出最大个数')
    },
    // 上传文件前校验格式
    beforeUpload(file) {
      const typeList = [
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'application/pdf']
      
      const result = typeList.includes(file.type)
      const limit = file.size/1024/1024 < 5
      if (result && limit) {
        return true
      } else {
        this.$message.warning('上传文件错误，请重新选择文件！')
        return false
      }
    },
    // 移除文件，进行校验 
    onRemove() {
      this.rentForm.contractId = null
      this.rentForm.contractUrl = null
      this.$refs.addForm.validateField('contractId')
    },
    // 上传合同
    async httpRequest({ file }) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', 2)
       const res = await uploadFileAPI(formData)
       console.log(res)
       this.rentForm.contractId = res.data.id
       this.rentForm.contractUrl = res.data.url

       // 校验合同
       this.$refs.addForm.validateField('contractId')
    },
    // 关闭添加合同弹窗
    closeDialog() {
      this.rentDialogVisible = false

      // resetFields 只能清空 prop 绑定的表单域的校验提示语
      this.$refs.addForm.resetFields()
      // 清空表单数据
      this.rentForm = {
        buildingId: null,
        startTime: '',
        endTime: '',
        contractUrl: '',
        contractId: null,
        type: 0,
        enterpriseId: '',
        rentTime: []    // 收集的时间
      }
      // 清空上传文件
      this.$refs.upload.clearFiles()
    },
    // 点击添加合同
    async addRent(id) {
      this.rentDialogVisible = true
      this.rentForm.enterpriseId = id
      const res = await getRentBuildingAPI()
      this.rentBuildingList = res.data
    },
    // 点击删除
    delEnterprise(id) {
      this.$confirm('您确定删除该企业吗？', '温馨提示').then( async () => {
        const res = await deleteEnterpriseAPI(id)
        this.$message.success('删除成功！')
        if (this.list.length === 1 && this.params.page > 1) {
          this.params.page--
        }
        this.getEnterpriseList()
      }).catch(() => {})
    },
    // 点击编辑
    toEditPage(id) {
      this.$router.push({
        path: '/addEnterprise',
        query: {
          id
        }
      })
    },
    // 点击清除搜索框
    clear() {
      this.search()
    },
    // 点击查询按钮
    search() {
      this.params.page = 1
      this.getEnterpriseList();
    },
    // 计算序号
    indexMethod(index) {
      return (this.params.page-1)*this.params.pageSize+index+1
    },
    // 点击切换当前页
    handlePageChange(val) {
      this.params.page = val
      this.getEnterpriseList()
    },
    // 获取企业列表
    async getEnterpriseList() {
      const res = await getEnterpriseListAPI(this.params)
      console.log(res);
      // 给列表数组中的每个元素添加额外的属性 rentList，用于存放展开数据
      this.list = res.data.rows.map(item => {
        return {
          ...item,
          rentList: []
        }
      })
      this.total = res.data.total
    }
  }
}
</script>

<style lang="scss" scoped>
.department-container {
  padding: 10px;
}

.search-container {
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(237, 237, 237, .9);
  ;
  padding-bottom: 20px;

  .search-label {
    width: 100px;
  }

  .search-main {
    width: 220px;
    margin-right: 10px;
  }
}
.create-container{
  margin: 10px 0px;
}
.page-container{
  padding:4px 0px;
  text-align: right;
}
.form-container{
  padding:0px 80px;
}
</style>
