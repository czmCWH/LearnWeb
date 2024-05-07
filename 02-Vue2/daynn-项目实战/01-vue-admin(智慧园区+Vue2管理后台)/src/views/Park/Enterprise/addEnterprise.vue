<template>
  <div class="add-enterprise">
    <header class="add-header">
      <div class="left">
        <span class="arrow" @click="$router.back()"><i class="el-icon-arrow-left" />返回</span>
        <span>|</span>
        <span>{{ id ? '编辑企业' : '添加企业' }}</span>
      </div>
      <div class="right">
        黑马程序员
      </div>
    </header>
    <main class="add-main">
      <div class="form-container">
        <div class="title">企业信息</div>
        <div class="form">
          <!-- 表单校验4要素：:model、:rules、prop、v-model -->
          <el-form ref="ruleForm" label-width="100px" :model="addForm" :rules="rules">
            <el-form-item label="企业名称" prop="name">
              <el-input v-model="addForm.name" />
            </el-form-item>
            <el-form-item label="法人" prop="legalPerson">
              <el-input v-model="addForm.legalPerson" />
            </el-form-item>
            <el-form-item label="注册地址" prop="registeredAddress">
              <el-input v-model="addForm.registeredAddress" />
            </el-form-item>
            <el-form-item label="所在行业" prop="industryCode">
              <el-select v-model="addForm.industryCode">
                <el-option 
                  v-for="item in list" 
                  :key="item.industryCode" 
                  :label="item.industryName"
                  :value="item.industryCode"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="企业联系人" prop="contact">
              <el-input v-model="addForm.contact" />
            </el-form-item>
            <el-form-item label="联系电话" prop="contactNumber">
              <el-input v-model="addForm.contactNumber" />
            </el-form-item>
            <el-form-item label="营业执照" prop="businessLicenseUrl">
              <!-- 
                action 表示文件上传地址，是一个必传属性，但是不灵活。一般不用，用#代替 
                http-request 自定义上传函数
                befor-upload 表示上传前执行的钩子
                list-type 上传组件样式控制
                on-preview 预览
                limit 上传的最大文件数
                on-exceed 上传到最大限制时自动执行的钩子函数
                on-remove 删除时，执行的钩子函数
                on-change 文件状态改变：添加文件、上传成功、上传失败 都会执行
              -->
              <el-upload
                class="upload-demo"
                action="#"
                :http-request="uploadImage"
                list-type="picture-card"
                accept=".jpg, .png, .gif, .jpeg, .pdf"
                :file-list="fileList"
                :on-preview="handlePictureCardPreview"
                :limit="3"
                :on-exceed="onExceed"
                :on-remove="onRemove"
                :on-change="onChange"
                :before-upload="beforeUpload"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传.jpg、.png、.jpeg文件，且不超过5M</div>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </main>
    <footer class="add-footer">
      <div class="btn-container">
        <el-button>重置</el-button>
        <el-button type="primary" @click="confirmAdd">确定</el-button>
      </div>
    </footer>
  </div>
</template>

<script>
import { getIndustryListAPI, addEnterpriseAPI, getEnterpriseDetailAPI, updateEnterpriseAPI } from "@/api/enterprise"
import { uploadFileAPI } from "@/utils/common" 
export default {
  name: 'addEnterprise',
  data() {
    return {
      addForm: {
        name: '', // 企业名称
        legalPerson: '', // 法人
        registeredAddress: '', // 注册地址
        industryCode: '', // 所在行业
        contact: '', // 企业联系人
        contactNumber: '', // 联系人电话
        businessLicenseUrl: '', // 营业执照url
        businessLicenseId: '' // 营业执照id
      },
      list: [],
      fileList: [],
      rules: {
        name: [
          { required: true, message: '企业名称为必填', trigger: 'blur' }
        ],
        legalPerson: [
          { required: true, message: '法人为必填', trigger: 'blur' }
        ],
        registeredAddress: [
          { required: true, message: '注册地址为必填', trigger: 'blur' }
        ],
        industryCode: [
          { required: true, message: '所在行业为必填', trigger: 'change' }
        ],
        contact: [
          { required: true, message: '企业联系人为必填', trigger: 'blur' }
        ],
        contactNumber: [
          { required: true, message: '企业联系人电话为必填', trigger: 'blur' }, 
          { pattern: /^1[3-9]\d{9}$/, message: '企业联系人电话格式不正确', trigger: 'blur' }
        ],
        businessLicenseUrl: [
          { required: true, message: '请上传营业执照', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getIndustryList()
    if (this.id) {
      this.getEnterpriseDetail()
    }
  },
  computed: {
    id() {
      return this.$route.query.id
    }
  },
  methods: {
    async getEnterpriseDetail() {
      console.log('查询企业信息')
      const res = await getEnterpriseDetailAPI(this.id)
      this.addForm = res.data
    },
    // 提交表单
    confirmAdd() {
      this.$refs.ruleForm.validate(async (flag) => {
        if (!flag) return 
        if (this.id) {  // 编辑
          
          delete this.addForm.businessLicenseName
          delete this.addForm.industryName
          delete this.addForm.rent
          const res = await updateEnterpriseAPI(this.addForm)
          this.$message.success(res.msg)
        } else {  // 添加

          const res = await addEnterpriseAPI(this.addForm)
          this.$message.success(res.msg)
        }
        // this.$router.go(-1)
        this.$router.back()
      })
    },
    /**
     * 上传文件前执行
     * @param {*} file 表示上传的那个文件
     */
     beforeUpload(file) {
      console.log("---czm - beforUpload")
      const imageType = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/svg+xml', 'image/bmp', 'application/pdf']
      console.log('图片格式不正确=', file)
      if (!imageType.includes(file.type)) {
        this.$message.warning('图片格式不正确！')
        return false
      }
      if (file.size/1024/1024>2) {
        this.$message.warning('文件大小不能大于5M！')
        return false
      }

    },
    // 删除文件
    onRemove() {
      this.addForm.businessLicenseId = ''
      this.addForm.businessLicenseUrl = ''
      this.$refs.ruleForm.validateField('businessLicenseUrl')
    },
    /**
     * 文件状态改变时的钩子
     * @param {*} file 上传的文件
     * @param {*} fileList 页面结构中展示的文件
     */
    onChange(file, fileList) {
      // 把上传之后的文件，同步给data中的fileList
      this.fileList = [...fileList]

    },
    /**
     * 超出限制时，会自动执行这个函数
    */
    onExceed() {

    },
    handlePictureCardPreview() {

    },
    // 上传文件
    async uploadImage({ file }) {
      console.log('--- upload 上传文件')
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', 1)
      const res = await uploadFileAPI(formData)
      console.log('上传成功')
      console.log(res)
      this.addForm.businessLicenseId = res.data.id
      this.addForm.businessLicenseUrl = res.data.url
      
      // 单独校验表单 rules
      this.$refs.ruleForm.validateField('businessLicenseUrl') 
    },
    // 获取行业列表
    async getIndustryList() {
      const res = await getIndustryListAPI()
      console.log(res)
      this.list = res.data
    }
  }
}
</script>

<style scoped lang="scss">
.add-enterprise {
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
      .arrow{
        cursor: pointer;
      }
    }

    .right {
      text-align: right;
    }
  }

  .add-main {
    background: #f4f6f8;
    padding: 20px 130px;

    .form-container {
      background-color: #fff;
      .title {
        height: 60px;
        line-height: 60px;
        padding-left:20px;
      }
      .form {
        margin-bottom: 20px;
        padding: 20px 65px 24px;
        .el-form{
          display: flex;
          flex-wrap: wrap;
          .el-form-item{
            width: 50%;
          }
        }
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
  }
}
</style>