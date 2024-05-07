<template>
  <div class="add-card">
    <header class="add-header">
      <el-page-header :content="id ? '编辑月卡' : '增加月卡'" @back="$router.back()" />
    </header>
    <main class="add-main">
      <div class="form-container">
        <div class="title">车辆信息</div>
        <div class="form">
          <el-form label-width="100px" :model="carInfoForm" :rules="carInfoRules" ref="carInfoForm">
            <el-form-item label="车主姓名" prop="personName">
              <el-input v-model="carInfoForm.personName"/>
            </el-form-item>
            <el-form-item label="联系方式" prop="phoneNumber">
              <el-input v-model="carInfoForm.phoneNumber" />
            </el-form-item>
            <el-form-item label="车辆号码" prop="carNumber">
              <el-input v-model="carInfoForm.carNumber"/>
            </el-form-item>
            <el-form-item label="车辆品牌" prop="carBrand">
              <el-input v-model="carInfoForm.carBrand"/>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="form-container">
        <div class="title">最新一次月卡缴费信息</div>
        <div class="form">
          <el-form label-width="100px" :model="feeInfoForm" :rules="feeInfoRules" ref="feeInfoForm">
            <el-form-item label="有效日期" prop="payTime">
              <el-date-picker
                v-model="feeInfoForm.payTime"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy/MM/dd"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
            <el-form-item label="支付金额" prop="paymentAmount">
              <el-input v-model="feeInfoForm.paymentAmount"  />
            </el-form-item>
            <el-form-item label="支付方式" prop="paymentMethod">
              <el-select v-model="feeInfoForm.paymentMethod">
                <el-option
                  v-for="item in payMethodList"
                  :key="item.id"
                  :value="item.id"
                  :label="item.name"
                />
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div>

    </main>
    <footer class="add-footer">
      <div class="btn-container">
        <el-button @click="resetForm">重置</el-button>
        <el-button type="primary" @click="confirmAdd">确定</el-button>
      </div>
    </footer>
  </div>
</template>

<script>
import { addCardAPI, getCardDetailAPI, editCardAPI } from '@/api/card'
export default {
  name: 'AddMonthCard',
  data() {
    return {
      carInfoForm: {
        personName: '',
        phoneNumber: '',
        carNumber: '',
        carBrand: ''
      },
      carInfoRules: {
        personName: [
          { required: true, message: '车主姓名不能为空', trigger: 'blur' }
        ],
        phoneNumber: [
          { required: true, message: '联系方式不能为空', trigger: 'blur' },
          // 正则校验手机号码，如果不会写可安装 Vscode 插件：any-rule
          { pattern: /^1[3-9]\d{9}$/, message:'手机号格式不正确', trigger: 'blur' }
        ],
        carNumber: [
          { required: true, message: '车牌号码不能为空', trigger: 'blur' },
          // 自定义校验，通常用于复杂的校验
          { validator: this.validatorCarNumber, trigger: 'blur' }
        ],
        carBrand: [
          { required: true, message: '车辆品牌不能为空', trigger: 'blur' }
        ]
      },
      feeInfoForm: {
        payTime: '',
        paymentAmount: null,
        paymentMethod: ''
      }, 
      feeInfoRules: {
        payTime: [
          { required: true, message: '有效日期不能为空' }
        ],
        paymentAmount: [
          { required: true, message: '支付金额不可为空', trigger: 'blur' }
        ],
        paymentMethod: [
          { required: true, message: '支付方式不可为空', trigger: 'change' }
        ]
      },
      payMethodList: [ 
        { id: 'Alipay', name: '支付宝' }, 
        { id: 'WeChat', name: '微信' }, 
        { id: 'Cash', name: '线下' }, 
      ]
    }
  },
  // 计算属性
  computed: {
    id() {
      return this.$route.query.id
    }
  },
  created() {
    if (this.id) {
      this.getCardDetail();
    }
  },
  methods: {
    // 获取月卡详情
    async getCardDetail() {
      const { data } = await getCardDetailAPI(this.id)
      console.log(data);
      // 把 carInfoId 存储到 carInfoForm
      const { personName, phoneNumber, carNumber, carBrand, carInfoId } = data;
      this.carInfoForm = { personName, phoneNumber, carNumber, carBrand, carInfoId }
      // 把 rechargeId 存储到 feeInfoForm
      const { cardStartDate, cardEndDate, paymentAmount, paymentMethod, rechargeId } = data;
      this.feeInfoForm = {
        payTime: [cardStartDate, cardEndDate],
        paymentAmount,
        paymentMethod,
        rechargeId
      }
    },
    // 重置表单
    resetForm() {
      // resetFields 只能清空加了 prop 表单域(el-form-item)的内容
      this.$refs.carInfoForm.resetFields()
      this.$refs.feeInfoForm.resetFields()
    },
    // 点击确定按钮
    confirmAdd() {
      // 校验表单
      this.$refs.carInfoForm.validate((flag) => {
        if (!flag) return
        // 校验表单
        this.$refs.feeInfoForm.validate(async(flag) => {
          if (!flag) return
          
          const requestData = {
            ...this.carInfoForm,
            ...this.feeInfoForm,
            cardStartDate: this.feeInfoForm.payTime[0],
            cardEndDate: this.feeInfoForm.payTime[1]
          }
          // 删除多余的属性
          delete requestData.payTime
          console.log('---调用接口'+JSON.stringify(requestData));
          if (this.id) {
            const res = await editCardAPI(requestData);
            // this.$message.success(res.msg);
          } else {
            const res = await addCardAPI(requestData);
            this.$message.success(res.msg);
          }
          this.$router.back();
        })
      })
    },

    // 自定义校验车牌号码
    // 参数：rule 用不到；value：输入数据；callback：校验成功 callback()，校验失败 callback(new Error('错误信息'))
    validatorCarNumber(rule, value, callback) {
      const plateNumberRegex = /^[\u4E00-\u9FA5][\da-zA-Z]{6}$/
      if (plateNumberRegex.test(value)) {
        callback();
      } else {
        callback(new Error('车牌号码格式不正确'));
      }
    }
  }
}
</script>

<style scoped lang="scss">
.add-card {
  background-color: #f4f6f8;
  height: 100vh;

  .add-header {
    display: flex;
    align-items: center;
    padding: 0 20px;
    height: 64px;
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
        padding-left: 20px;
      }

      .form {
        margin-bottom: 20px;
        padding: 20px 65px 24px;

        .el-form {
          display: flex;
          flex-wrap: wrap;

          .el-form-item {
            width: 50%;
          }
        }
      }
    }
    .preview{
      img{
        width: 100px;
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