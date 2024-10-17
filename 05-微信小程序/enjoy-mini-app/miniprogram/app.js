// app.js
// 执行 utils.js
import './utils/utils.js'
// 执行 http.js
import './utils/http.js'

App({
  // 全局数据
  token: wx.getStorageSync("token"),  // 每次使用都获取一次
  refreshToken: wx.getStorageSync("refreshToken"),
  globalData: {},
  onLaunch() {
    // 获取token
    // this.token = wx.getStorageSync("token");


  },
  // 存储 token
  setToken(key, value) {
    // 保存到全局 App 实例中
    this[key] = value;
    // 保存到本地缓存中
    wx.setStorageSync(key, value);
  }
})
