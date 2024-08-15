Page({
  data: {
    dialogVisible: false,
    isFirstLoad: true,    // true：页面首次加载
    list: []
  },
  onShow() {
    this.getList()
  },
  // 获取列表
  async getList() {
    const res = await wx.http({
      method: 'GET',
      url: '/room'
    });
    this.setData({
      list: res.data,
      isFirstLoad: false
    })
  },
  // 侧滑删除条目
  swipeClose(ev) {
    // instance 是单元格实例
    const { position, instance } = ev.detail

    // 记录房屋的 id 和索引，在调用接口的时使用
    this.cellId = ev.mark.id

    if (position === 'right') {
      // 显示 Dialog 对话框
      this.setData({
        dialogVisible: true,
      })
      // 关闭 swiper-cell 滑块
      instance.close()

      // 也可以使用 微信原生对话框
      // wx.showModal({})
    }
  },
  // 关闭
  dialogClose(ev) {
    // 当用户点了确认按钮时调用方法删除数据
    if (ev.detail === 'confirm') this.deleteHouse()
  },
  // 删除房屋信息
  async deleteHouse() {
    console.log('--- 点击删除')
    // if (!this.cellId) return wx.utils.toast('参数有误!')

    // const res = await wx.http({
    //   method: 'DELETE',
    //   url: '/room/' + this.cellId
    // });

    this.setData({
      list: this.data.list.filter((v) => v.id !== this.cellId)
    })

  },
  // 进入详情页面
  goDetail(ev) {
    wx.navigateTo({
      url: '/house_pkg/pages/detail/index?id=' + ev.mark.id,
    })
  },

  addHouse() {
    wx.navigateTo({
      url: '/house_pkg/pages/locate/index',
    })
  },
})
