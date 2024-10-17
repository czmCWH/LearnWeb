Page({
  onShareAppMessage() {
    return {
      title: '查看通行证',
      path: '/visitor_pkg/pages/passport/index',
      imageUrl: 'https://enjoy-plus.oss-cn-beijing.aliyuncs.com/images/share_poster.png',
    }
  },
  // 小程序授权API
  authSetting() {
    wx.getSetting({
      success: ({ authSetting }) => {
        console.log('--- ', authSetting);
        if (authSetting['scope.writePhotosAlbum'] === false) {
          console.log('--- 拒绝了授权');
          wx.showModal({
            title: '温馨提示',
            content: '请允许图片添加到相册',
            showCancel: false,
            complete: (res) => {
              // 打开设置
              if (res.confirm) {
                wx.openSetting({
                  success: ({ authSetting }) => {
                    console.log('--- authSetting 2 = ', authSetting);
                    if (authSetting['scope.writePhotosAlbum']) {
                      this.saveImage();
                    }
                  }
                })
              }
            }
          })
        } else {
          console.log('--- 已授权');
          this.saveImage();
        }
      }
    })
  },
  // 保存图片
  async saveImage() {
    try {
      // 1、下载图片
      const res = await wx.getImageInfo({
        src: 'https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/livimini/visitUrl.png'
      })
      console.log('--- res = ', res);

      // 2、保存图片到相册
      const saveRes = await wx.saveImageToPhotosAlbum({
        filePath: res.path
      })
      console.log('--- save = ', saveRes);
      wx.utils.toast('图片保存成功');
    } catch (err) {
      console.log('--- erro = ', err);
    }
  },
})
