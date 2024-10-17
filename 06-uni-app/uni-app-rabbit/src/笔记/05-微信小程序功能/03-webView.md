# 微信小程序加载h5

* 微信官方文档 * 小程序 * web-view 组件：<https://developers.weixin.qq.com/miniprogram/dev/component/web-view.html>

* uni-app web-view 组件：<https://uniapp.dcloud.net.cn/component/web-view.html>


## 1、h5 给 uni-app 发送消息需集成 uni 的 SDK

```js
<script type="text/javascript" src="https://gitcode.net/dcloud/uni-app/-/raw/dev/dist/uni.webview.1.5.6.js"></script>
```
在 Vue3+ts的 h5 项目给 uni-app 发送消息的步骤：
1、下载 `uni.webview.1.5.6.js` 文件到 `@/utils/uni.webview.1.5.6.js`
2、避免报错，需在 `uni.webview.1.5.6.js` 中天际如下内容
```js
/* eslint-disable */
// ... uni.webview.1.5.6.js 的内容 ...
export default uni
```
3、使用 uni 的 SDK 给 uni-app 发送消息

```vue
<script setup lang="ts">
import uni from '@/utils/uni.webview.1.5.6.js'

const onClick = (index: number) => {
  // h5 向 uni-app 发送消息
  uni.postMessage({
    data: {
      action: 'sendH5Message',
      data: 200
    }
  })
}
</script>
```


## 2、h5 只给 uni-app 的微信小程序端 发送消息需集成 uni 的 SDK
```js
<script type="text/javascript" src="https://res.wx.qq.com/open/js/jweixin-1.4.0.js"></script>
```

在 Vue3+ts的 h5 项目给 uni-app 开发的小程序发送消息的步骤：
1、下载 `jweixin-1.4.0.js` 文件到 `@/utils/jweixin-1.4.0.js`

2、避免报错，需在 `jweixin-1.4.0.js` 中天际如下内容
```js
/* eslint-disable */
// ... uni.webview.1.5.6.js 的内容 ...
export default wx
```
* 注意需要把 `jweixin-1.4.0.js` 中的 `this`替换为 `window`。<https://ask.dcloud.net.cn/article/id-35083__page-4#reply>

3、使用 uni 的 SDK 给 uni-app 发送消息

```vue
<script setup lang="ts">
import wx from '@/utils/jweixin-1.4.0.js'

const onClick = (index: number) => {
  // h5 向 uni-app 发送消息
  if (/miniProgram/i.test(userAgent) && /micromessenger/i.test(userAgent)) {
    wx.miniProgram.postMessage({
      data: {
        action: 'czmMsg123',
        data: 200
      }
    })
    /* 
      注意对于小程序做了很多限制，必须执行 navigateBack() 小程序中才能接收到消息
      <https://mp.weixin.qq.com/s/IrmuAmO5g6R_kEjMspgqrg>
     */
    wx.miniProgram.navigateBack()
  }
}
</script>
```

# 总结
微信小程序对与h5交互做了诸多限制，因此不建议在小程序中做与h5相关的交互。
