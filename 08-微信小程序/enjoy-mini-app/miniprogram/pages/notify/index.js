// pages/notify/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   * query 获取的是路由参数
   */
  onLoad(query) {
    console.log('--- 页面参数 query = ', query);
    this.getDetail(query.id);
  },
  // 获取公告详情
  async getDetail(id) {
    const res = await wx.http({
      method: "GET",
      url: `/announcement/${id}`
    })
    console.log('--- res = ', res);
    this.setData({
      detail: res.data
    })
  }
})