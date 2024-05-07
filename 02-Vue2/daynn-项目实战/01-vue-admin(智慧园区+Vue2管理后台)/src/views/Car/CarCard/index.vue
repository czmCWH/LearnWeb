<script>
import { getCardListAPI, deleteCardAPI } from '@/api/card' 

// 需求文档 https://www.yuque.com/zj-risingsun/qcfdtr/rxqevd123gu3cv8y

export default {
  name: 'carcard',
  data() {
    return {
      params: {
        page: 1,
        pageSize: 10,
        carNumber: '',
        personName: '',
        cardStatus: null    // 请求参数为null，axios 会自动忽略
      },
      list: [],
      total: 0,
      statusList: [
        { text: '全部', value: null },
        { text: '可用', value: 0 },
        { text: '已过期', value: 1 }
      ],
      selectioinVal: []
    }
  },
  created() {
    this.getCardList();
  },
  methods: {
    // 点击批量删除月卡
    batchDeleteCard() {
      if (this.selectioinVal.length <= 0) {
        this.$message.warning('请先选择要删除的数据')
        return
      }
      const ids = this.selectioinVal.map(item => {
        return item.id
      })
      this.$confirm('您确定要删除这些数据吗？', '温馨提示').then(async() => {
        await deleteCardAPI(ids.join(','))
        this.$message.success('批量删除成功');
        this.getCardList()
      }).catch(() => {

      })
    },
    // 批量选择
    handleSelectionChange(val) {
      this.selectioinVal = val
      console.log(val)
    },
    // 删除月卡
    deleteCard(id) {
      this.$confirm('您确定要删除此数据吗？', '温馨提示').then(async()=> {
        console.log('点击确定'); 
        await deleteCardAPI(id)
        this.$message.success('删除成功')
        if (this.list.length === 1 && this.params.page > 1) {
          this.params.page--;
        }
        this.getCardList()
      }).catch(() => {
        console.log('点击取消'); 
      })
    },
    //编辑月卡
    editCard(id) {
      console.log('---点击编辑='+id);
      this.$router.push({
        path: '/card/addMonthCard',
        query:{
          id
        }
      })
    },
    // 点击查询
    searchList() {
      // 重置页码
      this.params.page = 1
      this.getCardList()
    },
    async getCardList() {
     const res = await getCardListAPI(this.params)
     this.list = res.data.rows
     this.total = res.data.total
     console.log(res);
    },
    formatStatus(row, column, cellValue, index) {
      const MAP = {
        0: '可用',
        1: '不可用'
      }
      return MAP[cellValue]
    }, 
    handleSizeChange(val) {
      // console.log('页容量发生变化触发的事件')
      this.params.pageSize = val
      this.getCardList();
    }, 
    handleCurrentChange(val) {
      // console.log('当前页码=${val}')
      this.params.page = val;
      this.getCardList();
    },
    indexMethod(index) {
      console.log('计算序号')
      return (this.params.page - 1)*this.params.pageSize + index + 1;
    }
  }
}
</script>

<template>
  <div class="card-container">
    <!-- 搜索区域 -->
    <div class="search-container">
      <span class="search-label">车牌号码：</span>
      <el-input v-model="params.carNumber" clearable placeholder="请输入内容" class="search-main" />
      <span class="search-label">车主姓名：</span>
      <el-input v-model="params.personName" clearable placeholder="请输入内容" class="search-main" />
      <span class="search-label">状态：</span>
      <el-select v-model="params.cardStatus">
        <el-option v-for="item in statusList" :key="item.value" :label="item.text" :value="item.value" />
      </el-select>
      <el-button type="primary" class="search-btn" @click="searchList">查询</el-button>
    </div>
    <!-- 新增删除操作区域 -->
    <div class="create-container">
      <el-button type="primary" @click="$router.push('/card/addMonthCard')">添加月卡</el-button>
      <el-button @click="batchDeleteCard">批量删除</el-button>
    </div>
    <!-- 表格区域 -->
    <div class="table">
      <el-table style="width: 100%" :data="list"  @selection-change="handleSelectionChange">
        <el-table-column
        type="selection"
        width="55" />
        <el-table-column type="index" label="序号" :index="indexMethod" />
        <el-table-column label="车主名称" prop="personName"/>
        <el-table-column label="联系方式" prop="phoneNumber"/>
        <el-table-column label="车牌号码" prop="carNumber"/>
        <el-table-column label="车辆品牌" prop="carBrand"/>
        <el-table-column label="剩余有效天数" prop="totalEffectiveDate"/>
        <el-table-column label="状态" prop="cardStatus" :formatter="formatStatus"/>
        <el-table-column label="操作" fixed="right" width="180">
          <template #default="scope">
            <el-button size="mini" type="text">续费</el-button>
            <el-button size="mini" type="text">查看</el-button>
            <el-button size="mini" type="text" @click="editCard(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="text" @click="deleteCard(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-container">
      <!-- 
        el-pagination 分页功能
        current-page：当前页码
        page-sizes：可选择的每一页的页容量
        page-size：当前页的页容量，page-size 的值通常和 page-sizes 的第一个值一致
        layout：分页样式
        total： 一共多少条
        size-change：页容量发生变化触发的事件
        current-change：页码发生变化触发的事件
       -->
      <el-pagination
        :current-page="params.page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 添加楼宇 -->
    <el-dialog
      title="添加楼宇"
      width="580px"
    >
      <!-- 表单接口 -->
      <div class="form-container">
        <!-- <el-form ref="addForm" :model="addForm" :rules="addFormRules">
          <el-form-item label="楼宇名称" prop="name">
            <el-input v-model="addForm.name" />
          </el-form-item>
          <el-form-item label="楼宇层数" prop="floors">
            <el-input v-model="addForm.floors" />
          </el-form-item>
          <el-form-item label="在管面积" prop="area">
            <el-input v-model="addForm.area" />
          </el-form-item>
          <el-form-item label="物业费" prop="propertyFeePrice">
            <el-input v-model="addForm.propertyFeePrice" />
          </el-form-item>
        </el-form> -->
      </div>
      <template #footer>
        <el-button size="mini">取 消</el-button>
        <el-button size="mini" type="primary">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.card-container {
  padding: 20px;
  background-color: #fff;
}


.search-container {
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(237, 237, 237, .9);
  padding-bottom: 20px;
  .search-main {
    width: 220px;
    margin-right: 10px;
  }
  .search-btn{
    margin-left:20px;
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