Page({
  data: {
    detail: {}
  },
  onLoad(query) {
    console.log('--- 页面参数 =', query);
    this.id = query.id
    this.getDetail(query.id)
  },
  // 获取房屋详情
  async getDetail(id) {
    const res = await wx.http({
      method: 'GET',
      url: `/room/${id}`,
    });
    console.log('---房屋信息=', res);
    this.setData({ detail: res.data })
  },
  // 进入编辑页面
  editHouse() {
    wx.navigateTo({
      url: '/house_pkg/pages/form/index?id=' + this.id,
    })
  },
})
