# 移动端 CSS适配

## 一、毛玻璃的使用

```
.blur {
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);
    background-color: rgba(0, 0, 0, 0.5);
    
    /*  opacity: 0.5; ⚠️：使用毛玻璃时不能使用该属性，否则无效。*/
}
```

`filter` 和 `backdrop-filter` 属性接收一下 过滤器函数(滤镜函数)，
<https://mp.weixin.qq.com/s/kYQeHz0fC8xYBbetqv8R_Q>
<https://mp.weixin.qq.com/s/6vHaG7VrOvtIfGyyhJLwtg>

blur()：模糊图像
brightness() ：让图像更明亮或更暗淡
contrast()：增加或减少图像的对比度
drop-shadow()：在图像后方应用投影
grayscale()：将图像转为灰度图
hue-rotate()：改变图像的整体色调
invert()：反转图像颜色
opacity()：改变图像透明度
saturate()：超饱和或去饱和输入的图像
sepia()：将图像转为棕褐色



## 二、移动端1px的方案

[掘金|器张农民 * 6种解决移动端1px的方案](https://juejin.cn/post/7290017749715664936)