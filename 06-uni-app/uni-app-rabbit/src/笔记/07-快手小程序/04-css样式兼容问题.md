# 一、使用 css 的 mask、mask-composite 实现圆角渐变边框无效

## 1、问题：

```
1、SyntaxMatchError: Invalid value for `mask` property
2、SyntaxMatchError: Invalid value for `mask-composite` property
```
问题代码如下：

```vue
<view>圆角渐变边框</view>

<style lang="scss">
.face-border-box {
  width: 200rpx;
  height: 200rpx;
  box-sizing: border-box;
  border-radius: 50%;
  background: linear-gradient(90deg, #FF7566, #FF599E, #F56DD5, #D393FF);
  /*  #ifdef MP-WEIXIN */
  padding: 4rpx;
  /*  #endif  */
  /*  #ifdef MP-KUAISHOU  */
  padding: 3rpx;
  /*  #endif  */
  mask: linear-gradient(#fff 0 100%) content-box, linear-gradient(#fff 0 100%);
  mask-composite: xor;
}
</style>
```
## 2、解决办法

参考博客：<https://juejin.cn/post/7288568920051056697#heading-4>

```vue
<style lang="scss">
.face-border-box {
  width: 200rpx;
  height: 200rpx;
  box-sizing: border-box;
  border-radius: 50%;
  border: 4rpx solid transparent;
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  background-image: linear-gradient(to right, #fff, #fff),
    linear-gradient(90deg, #FF7566, #FF599E, #F56DD5, #D393FF);
}
</style>
```
