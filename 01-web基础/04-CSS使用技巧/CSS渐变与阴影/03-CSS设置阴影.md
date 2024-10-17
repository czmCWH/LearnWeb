# CSS设置阴影

## box-shadow 给盒子设置阴影

`box-shadow` 会按照矩形盒子设置阴影，而不会对 `img` 标签 或者背景图片按照图片的形状来添加阴影。

```
box-shadow: h-shadow v-shadow blur spread color inset;
```

> `h-shadow`：必需设置的值，定义水平阴影的位置。允许负值。
> `v-shadow`：必需设置的值，定义垂直阴影的位置。允许负值。
> `blur`：可选设置的值，定义模糊距离。
> `spread`：可选设置的值，定义阴影的尺寸。
> `color` ：可选设置的值，定义阴影的颜色。如果没有设置值，颜色值基于浏览器显示，建议设置。
> `inset`：可选设置的值，设置后可将外部阴影 (`outset`) 改为内部阴影。


## filter 给图片设置阴影

```
filter:drop-shadow(h-shadow v-shadow blur spread color);
```

```
filter: drop-shadow(rgb(249, 254, 184) 0px 0px 8px);
```

> `h-shadow`：设置阴影的水平方向偏移量；允许负值，负值会使阴影出现在元素左边。
> `v-shadow`：设置阴影的垂直方向偏移量；允许负值，负值会使阴影出现在元素上方。
> `blur`：设置阴影的模糊度，值越大，越模糊，阴影也就会变得更大更淡；不允许负值，若未设定，默认是0 (阴影的边界很锐利)。
> `spread`：设置阴影的尺寸，正值会使阴影扩张和变大，负值会是阴影缩小；若未设定，默认是0 (阴影会与元素一样大小)。
> 注：在 `Webkit` 以及其他一些浏览器中不支持spread，如果加了也不会渲染。
> color：设置阴影颜色；若未设定，颜色值基于浏览器，建议设置颜色。


## 参考博客

[css给图片加阴影的两种方式](https://www.dczzs.com/articles/2021/08/18/1629266321890.html)

[css给图片添加阴影效果方法](https://blog.csdn.net/guo_qiangqiang/article/details/122366649)

[掘金 * bubuko * box-shadow 设置单边、多边阴影](https://juejin.cn/post/6854573222483099656)