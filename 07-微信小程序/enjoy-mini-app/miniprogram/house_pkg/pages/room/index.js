// house_pkg/pages/room/index.ts
Page({

  data: {
    point: '',
    building: '',
    rooms: []
  },
  onLoad(query) {
    console.log('---页面参数 =', query);
    const { point, building } = query;
    this.fake(point, building)
  },
  fake(point, building) {
    // 生成多少个房间
    const size = Math.floor(Math.random() * 5) + 4
    const rooms = [];

    for (let i = 0; i < size; i++) {
      const floor = Math.floor(Math.random() * 19) + 1
      // 具体的房间号生成 1 ~ 3
      const No = Math.floor(Math.random() * 2) + 1
      // 202 201
      const room = [floor, 0, No].join('')
      // 检测是否有重复的房间号
      if (rooms.includes(room)) return
      // 记录生成完整的房间号
      rooms.push(room)
    }
    // 渲染数据
    this.setData({ rooms, point, building })
  }

})