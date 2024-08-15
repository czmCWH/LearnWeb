// pages/day03/events/events.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeIndex: 0,
    triggered: false
  },
  // 事件传参
  onChangeTab(e) {
    console.log('--- data-index 自定义属性方式：', e.target.dataset.index);
    console.log('---小程序推荐使用 mark:index 方式：', e.mark.index);
    const { index } = e.mark;
    this.setData({
      activeIndex: index
    })
  },

  onScrolltolower() {
    console.log('--- onScrolltolower 滚动到了底部');

  },
  onRefresherrefresh() {
    console.log('--- onRefresherrefresh 下拉刷新');
    setTimeout(() => {
      this.setData({
        triggered: false
      })
    }, 1000);
  },

  // form 表单
  onSubmit(e) {
    console.log('---', e.detail.value);
  }


})