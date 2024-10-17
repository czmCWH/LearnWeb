
// 导入 wechat-http 模块
import http from 'wechat-http'

// 配置接口基础路径
http.baseURL = 'https://live-api.itheima.net'

// 1、配置请求拦截器
http.intercept.request = (config) => {
  // 配置请求头
  config.header = {
    // 添加携带token信息
    Authorization: 'Bearer ' + wx.getStorageSync('token'),
    ...config.header
  }
  return config
}

// 2、配置响应拦截器
http.intercept.response = async function (res) {
  console.log("--- 请求响应2: ", res.data);
  // 统一处理错误码
  if (res.data.code === 10000) {
    wx.hideLoading();
    // 只保留data数据，其它的都过滤掉
    return res.data
  }
  else if (res.data.code === 401) { // token过期，进行无感刷新token
    const app = getApp();

    // 0、refreshToken 过期了
    if (res.config.url.includes('/refreshToken')) {

      console.log('---进入登录页面')
      app.setToken('token', '');
      app.setToken('refreshToken', '');

      // 重定向到登录页面
      const pages = getCurrentPages()
      const currPage = pages[pages.length - 1]

      currPage.onLoad = () => { }
      currPage.onShow = () => { }
      currPage.onReady = () => { }

      return wx.redirectTo({
        url: '/pages/login/index?redirectURL=/' + currPage.route,
      })

    } else {

      // 1、发送刷新 token 请求
      const res2 = await http({
        method: 'POST',
        url: '/refreshToken',
        header: {
          Authorization: 'Bearer ' + wx.getStorageSync('refreshToken'),
        },
      })
      if (res.code !== 10000) return wx.utils.toast('更新token失败!')
      // 存储 Token
      console.log('--存储 Token2 = ', res2);
      app.setToken('token', res2.data.token);
      app.setToken('refreshToken', res2.data.refreshToken);

      // 2、重新发送请求
      res.config.header = {
        Authorization: 'Bearer ' + res2.data.token
      }
      return http(res.config)
    }
  }
  else {
    wx.utils.toast(res.data.message || '业务错误');
    // 响应成功时，await会有返回值；
    // Promise.reject拒绝返回，这样 await 后面不会返回值，await后续代码不会被执行。
    return Promise.reject(res.data);
  }
}

// 以模块方式导出
export default http
// 全局对象方式导出
wx.http = http