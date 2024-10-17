# H5适配iphone X


## 1、适配安全距离不生效

参考博客：https://bbs.huaweicloud.com/blogs/357504

```html
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover" />
```
* 必须设置 `viewport-fit=cover`，网页内容才会完全覆盖可视窗口。
* `user-scalable=no`禁止用户手指缩放网页


如下通过 css 给盒子设置安全边距
```css
.box {
  padding-bottom: calc(15px + constant(safe-area-inset-bottom)); /* 兼容 iOS < 11.2 */
  padding-bottom: calc(15px + env(safe-area-inset-bottom)); /* 兼容 iOS >= 11.2 */
}
```

有时还需要考虑 ios 如下属性的影响：

```swift
webView.scrollView.contentInsetAdjustmentBehavior = .never
```

## 2、iOS隐藏导航栏，重复 reload wkwebView 时，h5页面会自动向上偏移

主要原因是和 iOS 安全距离布局有关系，处理方式如下：

```swift
// 问题代码：
webView.snp.makeConstraints {
    $0.edges.equalToSuperview()
}

// 解决方式：让 webview 从状态栏以下开始布局即可。
webView.snp.makeConstraints {
    $0.top.equalTo(self.view.safeAreaLayoutGuide.snp.top)
    $0.leading.trailing.bottom.equalToSuperview()
}
```