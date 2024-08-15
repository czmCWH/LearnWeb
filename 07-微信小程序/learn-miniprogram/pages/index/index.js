// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

/**
 * 页面第一个执行的文件是 js，再到 wxml。
 * 
 * 小程序基本逻辑处理
 * 1、Page 函数：用于注册页面
 *    数据处理
 *      data 选项，初始化页面数据
 *      this.setData 方法，更新页面数据
 * 2、数据绑定
 *  渲染层 WXML 中 属性 or 内容 都使用  {{ }} 对 js 中的数据进行绑定
 * 
 * 3、事件处理
 *  在渲染层 WXML 中，使用 bind:事件名称=js中的处理函数
 * 
 */
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
