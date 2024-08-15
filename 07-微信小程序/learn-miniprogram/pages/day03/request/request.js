// pages/day03/other/other.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    avatar: '',
    keyword: '',
    keywords: []
  },
  onLoad() {
    const arr = wx.getStorageSync('list');
    this.setData({
      books: arr
    })
  },
  onGetList() {
    wx.showLoading({ title: '加载中', mask: true });
    wx.request({
      url: 'https://hmajax.itheima.net/api/books',
      method: 'GET',
      data: {   // 请求参数
        creator: '曹雪芹'
      },
      success: (res) => {
        console.log(res);
        this.setData({
          books: res.data.data
        })
        // 本地存储
        wx.setStorageSync('list', res.data.data);
        // showLoading 和 showToast 同时只能显示一个
        wx.showToast({ title: '获取成功', mask: false, duration: 2000, icon: 'none' })
      },
      fail: () => {
        wx.hideLoading()
      }
    })
    
  },
  // 存储数据
  onSave() {
    wx.setStorageSync('list', this.data.books);
    wx.showToast({
      title: '存储成功',
    })
  },
  onGet() {
    const list = wx.getStorageSync('list');
    console.log('---', list);
  },
  onRemove() {
    wx.removeStorageSync('logs')
  },
  onClear() {
    wx.clearStorageSync();
  },
  
  // promise 风格 API，选择图片
  async onChoose() {
    try {
      const res = await wx.chooseMedia({
        mediaType: ['image'],
        count: 1
      })
      console.log(res.tempFiles[0].tempFilePath);
      this.setData({
        avatar: res.tempFiles[0].tempFilePath
      })
    } catch (error) {
      console.log('---error = ', error);
    }
  },

  // 点击搜索
  onSearch() {
    const keyword = this.data.keyword.trim();
    if (keyword == '') {
      return wx.showToast({ title: '请输入搜索内容', mask: false, duration: 2000, icon: 'none' })
    }
    console.log('---点击搜索 = ', keyword);

    // 存储历史
    const arr = [keyword, ...this.data.keywords]
    this.setData({
      keywords: Array.from(new Set(arr)),
      keyword: ''
    })
  },
  onClear() {
    this.setData({
      keywords: []
    })
  },
  emptyFn() {
    // 给 input 标签添加 空函数，避免 console 控制台一直打印
  }

})