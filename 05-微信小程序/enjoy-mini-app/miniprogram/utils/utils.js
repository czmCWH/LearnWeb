
const utils = {
  /**
   * 消息反馈（轻提示）
   * @param {string} title 文字提示内容
   */
  toast(title = "数据加载失败...") {
    wx.showToast({
      title,
      mask: true,
      icon: 'none'
    })
  },
  formatDate(date) {
    date = new Date(date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    // return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    // 数组映射方式返回
    return [year, month, day].map((v) => (v < 10 ? '0' + v : v)).join('-');
  }
}

// 正常的模块导出
export default utils
// 也可以放在全局对象 wx 上
wx.utils = utils