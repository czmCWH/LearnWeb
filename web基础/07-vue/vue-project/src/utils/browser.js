// 获取浏览器相关信息
// 可参考：https://www.ruanyifeng.com/blog/2021/09/detecting-mobile-browser.html
// 推荐：https://www.npmjs.com/package/react-device-detect

export default function getBrowserInfo () {
  const u = navigator.userAgent
  console.log('----设备机型：', u);
  const browser = {
    versions: {
      trident: u.indexOf('Trident') > -1, // IE内核
      presto: u.indexOf('Presto') > -1, // opera内核
      webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || u.indexOf('iOS') > -1, // ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或uc浏览器
      iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, // 是否iPad
      safari: u.indexOf('Safari') > -1, // 是否Safari
      webApp: u.indexOf('Safari') === -1, // 是否web应用程序，没有头部与底部
    },
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
  }
  return browser
}
