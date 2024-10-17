// pages/day01/base/base.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

// Page 构造器注册页面
Page({ 
  // data 选项，初始化页面数据
  data: {
    msg: 'hello, world!'
  },
  // 添加事件处理函数
  changeMsg() {
    console.log('点击了按钮');
    // this.setData 方法，更新页面数据
    this.setData({
      msg: '完美世界',
    })
  },
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  setAppData() {
    // getApp 函数获取 App 实例
    const app = getApp()
    app.globalData.userInfo = "小红的 mini-app";
  },
  
})
