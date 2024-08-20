// pages/day03/life/life.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onLoad() {
    console.log('---页面第一次加载');
  },
  onShow() {
    console.log('---页面显示，添加定时器')
    this.timerId = setInterval(() => {
      console.log('⏰执行定时器');
    }, 1000);
  },
  onHide() {
    console.log('---页面隐藏，清理定时器')
    clearInterval(this.timerId);
  }
  
})