// app.js
/**
 * 1、小程序的生命周期
 *  onLaunch：
 *    小程序启动时会执行1次；
 *    常用于小程序更新，获取启动参数，获取场景值
 *  onShow：
 *    小程序进入前台时执行；
 *  onHide：
 *    小程序进入后台运行时执行；
 *    
 * 
 */
// App 方法注册小程序实例
App({
  onLaunch(options) {
    console.log('onLaunch，小程序启动了，options = ', options);

    // 2、管理小程序版本更新API
    const updateManager = wx.getUpdateManager()

    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
    })

    updateManager.onUpdateReady(function () {
      // 更新版本包下载完成准备就绪，模态弹窗提示
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })

    updateManager.onUpdateFailed(function () {
      // 新版本下载失败
    })

    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  onShow(options) {
    console.log('onShow，options = ', options);
  },
  onHide(options) {
    console.log('onHide，options = ', options);
  },
  globalData: {
    userInfo: null
  }
})
