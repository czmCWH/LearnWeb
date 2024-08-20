// pages/day02/usingComponent/usingComponent.js
Page({
  data: {

  },
  onLoad(options) {

  },
  getBarHeightFn(e) {
    console.log('--- 子组件传递父级参数 = ', e.detail);
  }
})