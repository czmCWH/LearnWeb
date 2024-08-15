// components/my-nav/my-nav.js

Component({
  options: {
    addGlobalClass: true,   // 关闭组件样式隔离
    multipleSlots: true,    // 启用多插槽 
  },
  externalClasses: [    // 定义接收外部样式的接收属性名
    "custom-class" 
  ],
  // 组件生命周期
  lifetimes: {
    created() {
      // 注意：此处不能使用 this.data
    },
    attached() {
      const { statusBarHeight } = wx.getSystemInfoSync();
      console.log('--- statusBarHeight = ', statusBarHeight);
      this.setData({
        statusBarHeight
      })
    }
  },
  /**
   * 组件的属性列表，用来接收父传子的属性。即外部数据
   */
  properties: {
    back: Boolean,     // 1、简写
    delta : {              // 2、完整写法
      type: Number,
      value: 1  
    }
  },
  /**
   * 组件的初始数据，即内部数据
   */
  data: {
    statusBarHeight: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    navBack() {
      wx.navigateBack();
    },
    onTapRight() {
      // 子组件给父组件传值
      this.triggerEvent('getBarHeight', this.data.statusBarHeight);
    }
  }
})