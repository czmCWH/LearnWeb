import validate from 'wechat-validate'

Page({
  data: {
    countDownVisible: false,
    mobile: '',
    code: ''
  },
  // 通过 behaviors 注入 validate 方法
  behaviors: [validate],
  // 定义表单数据的验证规则
  rules: {
    mobile: [
      { required: true, message: '请填写手机号码!' },
      { pattern: /^1[3-8]\d{9}$/, message: '请检查手机号码是否正确!' },
    ],
    code: [
      { required: true, message: '请填写短信验证码!' },
      { pattern: /^\d{6}$/, message: '请检查短信验证码是否正确!' }
    ]
  },
  // query 是路由参数
  onLoad(query) {
    this.query = query;
  },

  // 倒计时执行函数
  countDownChange(ev) {
    this.setData({
      // 倒计时秒数据
      timeData: ev.detail,
      // 是否显示倒计时
      countDownVisible: ev.detail.minutes === 1 || ev.detail.seconds > 0,
    })
  },

  // 点击获取短信验证码
  async getSMSCode() {
    console.log('--- 点击获取短信验证码');
    const { valid, message } = this.validate('mobile');
    if (valid) {
      this.setData({
        countDownVisible: true
      });
      // 测试账号：13123456789
      const res = await wx.http({
        method: 'GET',
        url: '/code',
        data: {
          mobile: this.data.mobile
        }
      });
    } else {
      wx.showToast({ title: message, icon: 'none' })
    }
  },

  // 点击登录
  async onSubmit() {

    const isValid = this.validate();
    if (isValid) {
      const { mobile, code } = this.data

      const res = await wx.http({
        method: 'POST',
        url: '/login',
        data: {
          mobile,
          code
        }
      })
      // console.log('---登录=', res)
      // if (res.code != 10000) {
      //   return wx.utils.toast(res.message);
      // }
      // 1、存储数据
      const app = getApp();
      app.setToken('token', res.data.token);
      app.setToken('refreshToken', res.data.refreshToken);

      // 2、页面重定向回跳
      wx.redirectTo({
        url: this.query.redirectUrl || 'pages/index/index',
      })
    }

  }
})
