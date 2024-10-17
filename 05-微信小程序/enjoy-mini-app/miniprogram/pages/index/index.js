// 导入封装好的工具方法库
// import utils from "../../utils/utils"

Page({
  data: {
    list: []
  },
  async onLoad() {
    // 模块方式调用
    // utils.toast('页面加载完成了...')
    // 全局对象方式调用
    // wx.utils.toast('页面加载完成了...')

    // 请求接口数据（全局方式调用）
    // const res = await wx.http.get('/announcement')
    // console.log(res)

    this.getList();

  },
  async getList() {
    const res = await wx.http({
      method: 'GET',
      url: '/announcement'
    });
    console.log('---res = ', res);
    this.setData({
      list: res.data
    })
  }
})
