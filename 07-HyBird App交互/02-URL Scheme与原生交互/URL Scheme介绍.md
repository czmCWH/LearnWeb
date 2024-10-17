
# URL Scheme

`URL Scheme` 和普通的 `URL` 链接和类似，用于 APP 之间相互调用。比如：`weixin://、alipay://`。`URL Scheme` 支持 `iOS 6` 版本。

如果是系统的 `URL Scheme` 则打开系统的设置，如果是某个 `App` 注册的 `URL Scheme`，则打开对应的 `App`。


## 一、通过 iframe 向移动端发送 URL Scheme 请求
缺点：
    * 创建 iframe 请求比较耗时；
    * iframe.src 有 URL 长度限制；

```js
<input class="ios" type="button" value="使用iframe加载url" />

// 通过 iframe 设置 URL 来发送 URL Scheme 请求，目的是让 ios 拦截
function loadUrl(url) {
	// 创建iframe
	const iframe = document.createElement("iframe');
	// 设置url
	iframe.src = url;
	
	// 设置尺寸(不希望他被看到)
	iframe.style.width = 0;
	iframe.style.height = 0;
	
	// 添加到页面上
	document.body.appendChild(iframe);

	// 加载了url之后他就没用了，移除iframe
	iframe.parentNode.removeChild(iframe);
}

document.querySelector('.ios').onclick = function() {
	loadUrl('heima://click');
}
```



# 学习视频

<https://www.bilibili.com/video/BV1Ao4y1m7ut?p=1&vd_source=f97692c2f656607aeb97ee92b4310d9e>