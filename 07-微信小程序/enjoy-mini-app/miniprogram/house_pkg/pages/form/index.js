import validate from 'wechat-validate'

Page({
  data: {
    id: undefined,   // 编辑时被使用，初始值为 undefined 时网络请求会默认过滤掉
    point: '',
    building: '',
    room: '',
    name: '',
    gender: 1,
    mobile: '',
    idcardFrontUrl: '',   // '/static/images/avatar_1.jpg'
    idcardBackUrl: '',    // '/static/images/avatar_2.jpg'
  },
  // 通过 behaviors 注入 validate 方法
  behaviors: [validate],
  // 定义表单数据的验证规则
  rules: {
    name: [
      { required: true, message: '业主姓名不能为空!' },
      { pattern: /^[\u4e00-\u9fa5]{2,16}$/, message: '业主姓名只能为中文!' },
    ],
    mobile: [
      { required: true, message: '业主手机号不能为空!' },
      { pattern: /^1\d{10}$/, message: '请填写正确的手机号!' },
    ],
    idcardFrontUrl: [{ required: true, message: '请上传身份证国徽面!' }],
    idcardBackUrl: [{ required: true, message: '请上传身份证照片面!' }],
  },
  // query：路由跳转过来的页面参数
  onLoad(query) {
    const { point, building, room, id } = query;
    if (id) {
      // 1、编辑房屋信息
      this.getDetail(id)
      // 修改导航栏title
      wx.setNavigationBarTitle({
        title: '编辑房屋信息',
      })
    } else {
      // 2、新增房屋信息，复现前面页面中的信息
      this.setData({ point, building, room })
    }
  },
  // 获取房屋详情，回现数据
  async getDetail(id) {
    const res = await wx.http({
      method: 'GET',
      url: `/room/${id}`,
    });
    // 把 data 中的数据全部同步到 data 中
    this.setData(res.data)
  },
  // 提交审核
  async onSubmit() {

    console.log('--- 点击提交')
    // 验证数据
    if (!this.validate()) return

    const { point, building, room, name, gender, mobile, idcardFrontUrl, idcardBackUrl } = this.data

    await wx.http({
      method: 'POST',
      url: '/room',
      data: {
        point, building, room, name, gender, mobile, idcardFrontUrl, idcardBackUrl
      }
    })

    // 提交成功，回退到列表页 或者 首页
    // 如果有ID是编辑，后退2页；没有ID是新增，后退4页
    wx.navigateBack({ delta: this.data.id ? 2 : 4 })
    // wx.reLaunch({
    //   url: '/house_pkg/pages/list/index',
    // })

  },
  // 上传身份证图片
  async choosePicture(ev) {
    // 图片正反面类型
    // 注意：?.语法是 ES2020以后才支持，需要修改 .eslintrc.js 文件中的 ecmaVersion 配置
    const type = ev.mark?.type
    console.log('---type = ', type);

    try {
      const { tempFiles } = await wx.chooseMedia({
        count: 1,
        mediaType: ['image'],
        // sizeType: ['compressed']    // 压缩图片
      });
      if (tempFiles[0].size > 2 * 1024 * 1024) {
        return wx.utils.toast('图片大小不能超过2MB!');
      }
      console.log('上传图片 = ', tempFiles);
      // 1、小程序原生方式，更新头像
      wx.uploadFile({
        url: wx.http.baseURL + '/upload',
        header: {
          Authorization: 'Bearer ' + wx.getStorageSync('token'),
        },
        filePath: tempFiles[0].tempFilePath,
        name: 'file',
        formData: {
          type: 'avatar'
        },
        success: (res) => {
          const data = JSON.parse(res.data);
          // 判断接口是否调用成功
          if (data.code !== 10000) return wx.utils.toast('上传图片失败!')
          console.log('上传图片 = ', data);
          this.setData({
            [type]: data.data.url,    // 对象的插值语法：用 [] 来设置对象的属性名
          });
        }
      });
    } catch (err) {
      // 获取图片失败
      console.log(err)
    }
  },
  removePicture(ev) {
    // 移除图片的类型（身份证正面或反面）
    const type = ev.mark?.type
    this.setData({ [type]: '' })
  },
})
