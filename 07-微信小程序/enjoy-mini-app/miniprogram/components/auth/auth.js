// components/auth/auth.js
Component({

  data: {
    isLogin: false
  },
  lifetimes: {
    created() {
      // 几乎不用，因为无法使用 this.data

    },
    attached() {
      const app = getApp();
      const isLogin = Boolean(app.token);
      this.setData({
        isLogin: isLogin,
      })

      if (isLogin === false) {

        // wx.navigateTo 保留当前页面，跳转到某一个页面。
        // wx.navigateTo({
        //   url: '/pages/login/index',
        // })

        // 获取当前页面栈
        const pages = getCurrentPages();
        const currPage = pages[pages.length - 1];
        console.log('--- pages = ', currPage);
        // auth 组件嵌套某个页面后，只是改变页面的结构，这个页面的生命周期还是会执行，
        // 为了避免用户没有登录，导致该页面的生命周期没有必要的加载，可以在此处通过 page 对象覆盖
        currPage.onLoad = () => {
          console.log('未登录，覆盖onLoad');
        }
        currPage.onShow = () => { }
        currPage.onReady = () => { }

        // wx.redirectTo 重定向，关闭当前页面，跳转到某个页面。
        wx.redirectTo({
          url: '/pages/login/index?redirectUrl=/' + currPage.route,
        })
      }
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})