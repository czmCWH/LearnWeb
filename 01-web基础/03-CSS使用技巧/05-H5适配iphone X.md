# H5适配iphone X


## 1、适配安全距离不生效

参考博客：https://bbs.huaweicloud.com/blogs/357504

<meta name=“viewport” content=“width=device-width, viewport-fit=cover”>

除了设置这个以外，还需要考虑 ios 如下属性的影响：

```swift
webView.scrollView.contentInsetAdjustmentBehavior = .never
```

```swift
height: calc(9.7rem + constant(safe-area-inset-bottom));
height: calc(9.7rem + env(safe-area-inset-bottom));
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