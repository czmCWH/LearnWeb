// house_pkg/pages/locate/index.ts
import qqmapsdk from '../../../utils/qqmapsdk';

Page({

  data: {
    address: '',
    list: []
  },
  async onLoad() {
    // 1、使用 wx API 获取当前位置
    const { longitude, latitude } = await wx.getLocation({ type: 'gcj02' });
    // wx.onLocationChange

    this.search({ longitude, latitude });
    this.getPoint({ longitude, latitude });
  },
  // 使用《腾讯位置服务》根据经纬度，搜索关键字
  search({ longitude, latitude }) {
    console.log('---搜索');
    // 调用搜索服务
    qqmapsdk.search({
      keyword: '住宅小区',
      page_size: 5,
      locattion: { longitude, latitude },
      success: (res) => {
        console.log("---res ", res.data);
        this.setData({
          list: res.data
        });
      },
      fail: (res) => {
        console.log('-- fail =', res);
      }
    })
  },
  // 逆地址解析，获取当前地址文本
  getPoint({ longitude, latitude }) {
    qqmapsdk.reverseGeocoder({
      locattion: { longitude, latitude },
      success: (res) => {
        console.log('res = ', res);
        this.setData({
          address: res.result.address
        })
      }
    })
  },
  // 重新定位，选择新的位置
  async chooseLocation() {
    // 打开 微信内置的地图选择位置
    const { name, latitude, longitude } = await wx.chooseLocation();
    this.setData({
      address: name
    });
    this.search({ longitude, latitude });
  }

})