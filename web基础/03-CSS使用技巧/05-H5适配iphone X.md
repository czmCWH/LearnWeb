# H5适配iphone X

参考博客：https://bbs.huaweicloud.com/blogs/357504

<meta name=“viewport” content=“width=device-width, viewport-fit=cover”>

除了设置这个以外，还需要考虑 ios 如下属性的影响：

```swift
webView.scrollView.contentInsetAdjustmentBehavior = .never
```


```swift

```