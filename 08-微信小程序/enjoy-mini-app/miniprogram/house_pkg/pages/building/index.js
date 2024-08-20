// house_pkg/pages/building/index.ts
// 模拟数据
Page({
  data: {
    size: 0,
    point: '',
    type: ''
  },
  // 获取地址参数
  onLoad(query) {
    console.log('--- 页面参数 1= ', query);
    // 生成假数据
    this.fake(query.point);

  },
  fake(point) {
    // 生成几号楼
    const size = Math.floor(Math.random() * 4) + 3
    const type = size > 4 ? '号楼' : '栋'
    this.setData({
      size,
      type,
      point
    })
  }
})  