// pages/profile/index.ts
Page({
  data: {
    userInfo: {}
  },
  onLoad() {
    this.getUserInfo();
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
  },
  // 修改昵称
  async updateNickName(e) {
    console.log('---修改昵称 = ', e.detail.value);
    const res = await wx.http({
      method: 'PUT',
      url: '/userInfo',
      data: {
        nickName: e.detail.value
      }
    });
  },
  // 修改头像
  async updateChooseavatar(e) {
    console.log('--- 头像路径 =', e.detail.avatarUrl);

    // 1、小程序原生方式，更新头像
    wx.uploadFile({
      url: wx.http.baseURL + '/upload',
      header: {
        Authorization: 'Bearer ' + wx.getStorageSync('token'),
      },
      filePath: e.detail.avatarUrl,
      name: 'file',
      formData: {
        type: 'avatar'
      },
      success: (res) => {
        res.data = JSON.parse(res.data);
        console.log('更新头像 = ', res.data);
        this.setData({
          'userInfo.avatar': res.data.data.url    // 更新对象中的某个属性
        });
      }
    })

    // 2、封装库
    // const res = await wx.http({
    //   method: 'UPLOAD',
    //   url: '/upload',
    //   data: {
    //     name: 'file',
    //     filePath: e.detail.avatarUrl,
    //     formData: {
    //       type: 'avatar'
    //     }
    //   }
    // });
    // this.setData({
    //   'userInfo.avatar': res.data.url
    // });
  }

})