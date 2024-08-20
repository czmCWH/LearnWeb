// pages/day01/form/form.js
import utils from '../../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    endDate: utils.formatTime(new Date()),
    regionText: '',
    dateText: ''
  },
  onLoad() {
    console.log('--- end date = ', utils.formatTime(new Date()));
  }, 
  sexChange(ev) {
    console.log('--- 性别：', ev.detail.value);
  },
  hobbyChange(ev) {
    console.log('--- 爱好：', ev.detail.value);
  },
  regionChange(ev) {
    console.log('--- 籍贯：', ev.detail);
    this.setData({
      regionText: ev.detail.value
    })
  },
  dateChange(ev) {
    console.log('--- 生日：', ev.detail);
    this.setData({
      dateText: ev.detail.value
    })
  }
})