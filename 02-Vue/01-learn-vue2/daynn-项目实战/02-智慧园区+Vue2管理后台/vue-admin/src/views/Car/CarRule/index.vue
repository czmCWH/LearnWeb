<template>
  <div class="rule-container">
    <div class="create-container">
      <el-button type="primary" @click="addFeeRule">增加停车计费规则</el-button>
      <el-button @click="exportExcel">导出Excel</el-button>
    </div>
    <!-- 表格区域 -->
    <div class="table">
      <el-table :data="ruleList" style="width: 100%">
        <el-table-column  label="序号" type="index" :index="indexMethod" />
        <el-table-column label="计费规则编号" prop="ruleNumber" />
        <el-table-column label="计费规则名称" prop="ruleName" />
        <el-table-column label="免费时长(分钟)" prop="freeDuration" />
        <el-table-column label="收费上限(元)" prop="chargeCeiling" />
        <el-table-column label="计费方式" prop="chargeType"> 
          <!-- formmat处理；或者 使用作用域插槽格式化row中文本显示， -->
          <template #default="{row}">
            {{ formateChargeType(row.chargeType) }}
          </template> 
        </el-table-column>
        <el-table-column label="计费规则" prop="ruleNameView" />
        <el-table-column label="操作" fixed="right" width="120">
          <template #default="scope">
            <el-button size="mini" type="text">编辑</el-button>
            <el-button size="mini" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- el-pagination 底部分页，必须的配置项 total、page-size -->
      <div class="pager" style="margin-top: 10px; float:right">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          :page-size="pageSize" 
          @current-change="handleChange"
        />
      </div>
    </div>
    <AddRule :dialogVisible.sync="dialogVisible" @getList="getRuleList"/>
  </div>
</template>

<script>
import { getPackingRuleListAPI } from '@/api/carrule'
import { utils, writeFileXLSX } from 'xlsx'
import AddRule from './components/AddRuleDialog.vue'

export default {
  name: 'CarRule',
  components: {
    AddRule
  },
  data() {
    return {
      page: 1,
      pageSize: 2,
      ruleList: [],
      total: 0,
      dialogVisible: false
    }
  },
  
  created() {
    this.getRuleList()
  },
  methods: {
    
    // 监听 el-radio-group 中选择值的改变
    // radioChange(val) {
    //   console.log(val)
    // },
    // 添加计费规则
    addFeeRule() {
      this.dialogVisible = true
    },
    
    // 计费方式格式化
    formateChargeType(chargeType) {
      const MAP = {
        duration: '按时长收费',
        turn: '按次收费',
        partition: '分段收费' 
      }
      return MAP[chargeType]
    },
    // 导出Excel数据
    async exportExcel() {
      const res = await getPackingRuleListAPI({page: this.page, pageSize: this.pageSize})
       // 表头英文字段key
      const tableHeaderKeys = ['ruleNumber', 'ruleName', 'freeDuration', 'chargeCeiling', 'chargeType', 'ruleNameView']
      const exportList = res.data.rows.map(item => {
        const obj = {}
        tableHeaderKeys.forEach(key => {
          obj[key] = item[key]
        });
        return obj
      }) 
      // 表头中文字段value
      const tableHeaderValues = ['计费规则编号', '计费规则名称', '免费时长(分钟)', '收费上线(元)', '计费方式', '计费规则']

      // 创建一个新的工作簿
      const workbook = utils.book_new()
      // 创建一个工作表 要求一个对象数组格式
      const worksheet = utils.json_to_sheet(exportList)
      // 把工作表添加到工作簿  Data为工作表名称
      utils.book_append_sheet(workbook, worksheet, 'Data')
      // 改写表头
      utils.sheet_add_aoa(worksheet, [tableHeaderValues], { origin: 'A1' })
      // 导出方法进行导出
      writeFileXLSX(workbook, 'SheetJSVueAoO.xlsx')
    },
    // 分页时给到列表的序号
    indexMethod(row) {
      return (this.page-1)*this.pageSize + row + 1
    },
    // 点击切换不同的页码
    handleChange(val) {
      this.page = val
      this.getRuleList()
    },
    async getRuleList() {
      const res = await getPackingRuleListAPI({page: this.page, pageSize: this.pageSize})
      console.log(res)
      this.ruleList = res.data.rows
      this.total = res.data.total
    }
  }
}
</script>

<style lang="scss" scoped>
.rule-container {
  padding: 20px;
  background-color: #fff;
}

.search-container {
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(237, 237, 237, .9);
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
</style>