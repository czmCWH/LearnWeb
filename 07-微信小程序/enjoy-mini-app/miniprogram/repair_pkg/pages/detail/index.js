// map.js
import qqmapsdk from '../../../utils/qqmapsdk';

Page({
  data: {
    latitude: 40.060539,  // 地图中心点
    longitude: 116.343847,
    scale: 16,  // 地图缩放大小
    markers: [    // 地图标记点
      {
        id: 1,
        latitude: 40.060539,
        longitude: 116.343847,
        width: 25,
        height: 40
      }
    ],
    // 规划路径线
    polyline: [],
  },
  onLoad() {
    this.getPolyLine();
  },
  // 路线规划
  getPolyLine() {
    console.log('---使用【腾讯位置服务】路线规划');
    qqmapsdk.direction({
      mode: 'bicycling',
      from: { latitude: 40.060539, longitude: 116.343847 },
      to: { latitude: 41.060539, longitude: 116.343847 },
      success: (res, data) => {
        // console.log('--- success = ', res);
        var coors = res.result.routes[0].polyline;
        //坐标解压（返回的点串坐标，通过前向差分进行压缩）
        for (var i = 2; i < coors.length; i++) {
          coors[i] = coors[i - 2] + coors[i] / 1000000
        }
        const points = []
        //将解压后的坐标放入点串数组pl中
        for (var i = 0; i < coors.length; i += 2) {
          points.push({ latitude: coors[i], longitude: coors[i + 1] })
        }

        this.setData({
          polyline: [
            {
              points,
              color: '#00d26a',
              width: 4,
            }
          ]
        })
      },
      fail: (res) => {
        console.log('--- fail = ', res);
      },
    })
  },
})
