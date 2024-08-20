Page({
  data: {
    userInfo: {}
  },
  // 每次页面显示
  onShow() {
    const token = wx.getStorageSync('token');
    if (token) {
      this.getUserInfo();
    }
  },

  goLogin() {
    wx.navigateTo({
      url: '/pages/login/index',
    })
  },
  // 获取用户信息
  async getUserInfo() {
    const res = await wx.http({
      method: 'GET',
      url: '/userInfo'
    });
    console.log('--- 用户信息 = ', res);
    this.setData({
      userInfo: res.data
    })
  }
})
