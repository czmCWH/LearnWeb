Page({
  // 注意注意：小程序的双向绑定，只能是data的一级。
  data: {
    currentDate: new Date().getTime(),  // 获取当前时间戳
    houseLayerVisible: false,
    repairLayerVisible: false,
    dateLayerVisible: false,
    houseList: [],
    houseName: '',
    repairList: [],
    repairName: '',
    fileList: [
      // { url: '/repair_pkg/static/uploads/attachment.jpg' },
      // { url: '/repair_pkg/static/uploads/attachment.jpg' },
    ],
    id: undefined,
    mobile: '',
    description: '',
    houseId: '',
    repairItemId: '',
    appointment: '',
    attachment: [],
  },
  onLoad() {
    this.getHouseList()
    this.getRepairList()
  },
  // 查询审核通过的房屋
  async getHouseList() {
    const res = await wx.http({
      method: 'GET',
      url: '/house'
    });
    this.setData({
      houseList: res.data
    })
  },
  selectHouse(ev) {
    this.setData({
      houseName: ev.detail.name
    })
  },
  openHouseLayer() {
    this.setData({ houseLayerVisible: true })
  },
  closeHouseLayer() {
    this.setData({ houseLayerVisible: false })
  },
  // 查询维修项目
  async getRepairList() {
    const res = await wx.http({
      method: 'GET',
      url: '/repairItem'
    });
    this.setData({
      repairList: res.data
    })
  },
  selectRepair(ev) {
    this.setData({
      repairName: ev.detail.name
    })
  },
  openRepairLayer() {
    this.setData({ repairLayerVisible: true })
  },
  closeRepairLayer() {
    this.setData({
      repairLayerVisible: false,
    })
  },
  // 确认日期选择
  confirmDate(ev) {
    // console.log('---时间 = ', ev.detail);
    const date = new Date(ev.detail);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    // 方式1
    const dateFmt1 = wx.utils.formatDate(ev.detail);
    // 方式2，缺陷：单个数字无法补0
    const dateFmt2 = date.toLocaleDateString('zh-CN').replaceAll('/', '-');
    this.setData({
      appointment: dateFmt2,
      dateLayerVisible: false
    });

  },
  openDateLayer() {
    this.setData({ dateLayerVisible: true })
  },
  closeDateLayer() {
    this.setData({ dateLayerVisible: false })
  },
  // 选择图片后上传
  afterRead(ev) {
    console.log('--url = ', ev.detail);
    const tempFiles = ev.detail.file.url
    // wx 原生上传图片
    wx.uploadFile({
      url: wx.http.baseURL + '/upload',
      header: {
        Authorization: 'Bearer ' + wx.getStorageSync('token'),
      },
      name: 'file',
      filePath: tempFiles,
      success: (res) => {
        const data = JSON.parse(res.data);
        // 判断接口是否调用成功
        if (data.code !== 10000) return wx.utils.toast('上传图片失败!')
        console.log('上传图片成功 = ', data);
        this.setData({
          attachment: [...this.data.attachment, data.data]
        })
      }
    });
  },
  beforeRead(ev) {
    const { size, file, callback } = ev.detail;
    // 图片大小校验拦截
    if (size > 1024 * 1024 * 1) {
      wx.utils.toast('文件大小不能超过 1M')
      return callback(false)
    }
    // 继续走 afterRead 事件
    callback(true)
  },
  uploaderDelete(ev) {
    console.log('---删除附件图片', ev.detail.index);
    this.setData({
      attachment: this.data.attachment.filter((v, index) => index !== ev.detail.index),
    })
  },

  goList() {
    wx.reLaunch({
      url: '/repair_pkg/pages/list/index',
    })
  },
})
