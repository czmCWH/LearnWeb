// pages/day03/data/data.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: '',
    isLogin: true,
    isRefresh: false,
    students: [
      { id: 1, name: '贺洋', age:20, gender:'男', level:'菜鸟'},
      { id: 2, name: '唐果', age:19, gender:'男', level:'菜鸟'},
      { id: 3, name: '张龙', age:22, gender:'男', level:'老鸟'},
    ],
    fruits: ['苹果', '香蕉', '石榴', '水蜜桃', '哈密瓜']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})