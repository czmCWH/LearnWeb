# CSS高级技巧

## 一、元素的显示与隐藏

### 1、display 显示隐藏（重点）

display 设置或检索对象是否及如何显示。

* `display: none;` 隐藏对象

* `display：block;` 除了转换为块级元素之外，同时还有显示元素的意思。

**特点： 隐藏之后，不再保留位置。**

```html
<style type="text/css">
	.one,
	.two {
		width: 100px;
		height: 100px;
		background-color: hotpink;
	}
	.one {
		/*隐藏盒子*/
		/*display: none;*/
		/*除了把盒子转换为块级元素外，还可以显示元素*/
		display: block;
	}
	.two {
		background-color: skyblue;
	}
</style>
	
<div class="one"></div>
<div class="two"></div>
```

> 配合后面js做特效，比如下拉菜单，原先没有，鼠标经过，显示下拉菜单， 应用极为广泛

### 2、visibility 可见性 (了解)

如下：设置或检索是否显示对象。

```html
<style type="text/css">
  .one {
		/*隐藏元素*/
		visibility: hidden;
		/*显示元素*/
		visibility: visible;
	}
</style>
```

* 特点：**隐藏之后，继续保留原有位置。**

### 3、overflow 溢出(重点)

`overflow` 用于检索或设置当对象的内容超过其指定高度及宽度时如何管理内容。

`overflow` 常用属性值为 `overflow: hidden;`。其它基本不用。

| 属性值      | 描述                                       |
| ----------- | ------------------------------------------ |
| **visible** | 不剪切内容也不添加滚动条                   |
| **hidden**  | 不显示超过对象尺寸的内容，超出的部分隐藏掉 |
| **scroll**  | 不管超出内容否，总是显示滚动条             |
| **auto**    | 超出自动显示滚动条，不超出不显示滚动条     |

```html
<style type="text/css">
  .subText {
		width: 100px;
		height: 50px;
		border: 1px solid #ccc;
		/*超出部分隐藏掉*/
		overflow: hidden;
	}
</style>

<div class="subText">
	海上生明月，天涯共此时。
	但愿人长久，千里共婵娟。
</div>
```

**实际开发场景：**

1. 清除浮动
3. 隐藏超出内容，隐藏掉,  不允许内容超过父盒子。

## 二、CSS用户界面样式

### 2.1 设置鼠标样式 `cursor`

 设置或检索在对象上移动的鼠标指针采用何种系统预定义的光标形状。

| 属性值          | 描述       |
| --------------- | ---------- |
| **default**     | 小白  默认 |
| **pointer**     | 小手       |
| **move**        | 移动       |
| **text**        | 文本       |
| **not-allowed** | 禁止       |

鼠标放我身上查看效果哦：

```html
<ul>
  <li style="cursor:default">我是小白</li>
  <li style="cursor:pointer">我是小手</li>
  <li style="cursor:move">我是移动</li>
  <li style="cursor:text">我是文本</li>
  <li style="cursor:not-allowed">我是文本</li>
</ul>
```

### 2.2 轮廓线 `outline`

```
outline : outline-color ||outline-style || outline-width 
```

轮廓线 `outline` 是绘制于元素周围的一条线，位于边框边缘的外围，可起到突出元素的作用。

最常见的是 `input` 标签输入框，当输入的时候，会自动显示 `outline`。

```
<style type="text/css">
 input {
		outline: none;
	}
</style>
<input type="text" name="">
```

最直接的写法是 ： outline: 0; 或者 outline: none;

```html
<input  type="text"  style="outline: 0;"/>
```

### 2.3 防止拖拽文本域resize

实际开发中，我们文本域右下角是不可以拖拽：

```html
<textarea style="resize: none;"></textarea>
```

**CSS初始化总结：**

```html
<style type="text/css">
	/*清除元素默认的内外边距*/
	* {
		margin: 0;
		padding: 0;
	}
	/*清除列表样式，前面有小圆点*/
	li {
		list-style: none;
	}
	/*取消表单的轮廓线*/
	input {
		outline: none;
	}
	/*去掉buttom默认自带边框*/
	button {
		border: none;
	}
</style>
```

## 三、vertical-align 垂直对齐

前面我们设置盒子里内容，水平垂直居中对齐，需经过以下方式：

```html
<style type="text/css">
	.box {
		width: 100px;
		height: 50px;
		font-size: 15px;
		background-color: pink;
		margin: 0 auto;
		text-align: center;
		line-height: 50px;
	}
</style>

<div class="box">好好学习</div>
```

* `margin: 0 auto;` 让有宽度的块级元素居中对齐。
* `text-align: center;` 可以使盒子内的文字、行内元素、行内块元素水平居中对齐。
* `line-height: 50px;` 通过设置行高为盒子的高度，使得文字垂直居中。

`vertical-align` 垂直对齐，但它**只针对于行内元素或者行内块元素**。

```
vertical-align : baseline |top |middle |bottom 
```

* `vertical-align` 不影响块级元素中的内容对齐，它只针对于行内元素或者行内块元素，

* 特别是行内块元素， **通常用来控制图片/表单与文字的对齐。**

```html
<style type="text/css">
	.box {
		width: 200px;
		font-size: 15px;
		background-color: pink;
		margin: 0 auto;
	}
	.al-img {
		width: 50px;
      /*
      middle：图片和文字垂直居中对齐
      */
		vertical-align: middle;
	}
</style>

<div class="box">
	<img src="img/flower.webp" class="al-img">开心的像一朵花儿
</div>
```

## 四、溢出的文字省略号显示

* `white-space` 设置或检索对象内文本显示方式。通常我们使用于强制一行显示内容

~~~
white-space:normal ；默认处理方式

white-space:nowrap ；　强制在同一行内显示所有文本，直到文本结束或者遭遇br标签对象才换行。
~~~

* `text-overflow` 设置或检索是否使用一个省略标记（...）标示对象内文本的溢出

~~~
text-overflow : clip ；不显示省略标记（...），而是简单的裁切 

text-overflow：ellipsis ； 当对象内文本溢出时显示省略标记（...）
~~~

文字溢出设置步骤：

```html
/*1. 先强制一行内显示文本*/
  white-space: nowrap;
/*2. 超出的部分隐藏*/
  overflow: hidden;
/*3. 文字用省略号替代超出的部分*/
  text-overflow: ellipsis;
```

## 五、CSS 精灵技术

一个网页中往往会应用很多小的背景图像作为修饰，当网页中的图像过多时，服务器就会频繁地接受和发送请求，这将大大降低页面的加载速度。

> 为了有效地减少服务器接受和发送请求的次数，提高页面的加载速度。
> 
> 出现了CSS精灵技术（也称CSS Sprites、CSS雪碧）。

CSS 精灵其实是将网页中的一些背景图像整合到一张大图中（精灵图），然而，各个网页元素通常只需要精灵图中不同位置的某个小图，要想精确定位到精灵图中的某个小图，需要使用CSS的如下属性：

`background-image`、
`background-repeat`
`background-position` 属性进行背景定位，

其中最关键的是使用 `background-position` 属性精确地定位。

css精灵技术主要针对于背景图片，而插入的图片元素 `<img />` 是不需要这个技术的。

**设置精灵图的步骤：**

* 精确测量，每个小背景图片的大小和 位置。
* 给盒子指定小背景图片时， **背景定位基本都是 负值**。

```html
<style>
	.icon1 {
		width: 23px;
		height: 23px;
		background: url(images/index.png) no-repeat  0 -107px;
		/*background-position: 0 -107px;*/
	}
	.icon2 {
		width: 23px;
		height: 23px;
		background: url(images/index.png) no-repeat -157px -107px;
		margin: 100px;
	}
</style>

<div class="icon1"></div>
<div class="icon2"></div>
```

## 六、CSS 扩展

### 6.1 margin 负值实现一些效果

#### 负边距+定位：水平垂直居中

一个绝对定位的盒子， 利用 父级盒子的 50%， 然后 往左(上) 走 自己宽度的一半 ，可以实现盒子水平垂直居中。

```html
<style type="text/css">
	.father {
		position: relative;
		width: 200px;
		height: 200px;
		background-color: pink;
		margin: 0 auto;
	}
	.son {
		width: 80px;
		height: 50px;
		background-color: red;
		position: absolute;
		left: 50%;
		margin-left: -40px;
		top: 50%;
		margin-top: -25px;
	}
</style>
	
<div class="father">
	<div class="son"></div>
</div>
```

#### 解决浮动盒子相邻边框并列的问题

通过调整 `margin-【left】` 实现相邻盒子边框并列时，压在一起，避免相邻边框变厚。如下示例所示：

```html
<style>
	div {
		/*浮动的盒子是紧贴在一起的*/
		float: left;
		width: 200px;
		height: 300px;
		border: 1px solid #ccc;
		/*
			1.第一个盒子左浮动
			2.第n个盒子左浮动，先紧贴第n-1个盒子的右边，然后向左移动-1px，所以其边框刚好压住第n-1个盒子。
			*/
		margin-left: -1px;
		/*顶部边框重叠*/
		margin-top: -1px;
	}
</style>

<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
```

如下示例，给盒子设置边框，当鼠标移动到盒子上时，让盒子突出显示：

```html
<style>
	div {
		position: relative;
		/*浮动的盒子是紧贴在一起的*/
		float: left;
		width: 200px;
		height: 300px;
		border: 1px solid #ccc;
		margin-left: -1px;
		margin-top: -1px;
	}
	/*鼠标经过div 的意思  p:hover */
	div:hover {
		/*我要让当前鼠标经过的这个div 升到最高处来就好了*/
		/*定位的盒子是最高层的  */
		border: 1px solid #f40;
		/*都是定位的盒子，我们通过z-index 来实现层级关系*/
		z-index: 1;

	}
</style>
```

### 6.2 border 实现小三角形箭头

如下示例，可以观测到 `arr`盒子的宽高都是0，其大小通过边框来撑开，因此产生了4个三角形组成的盒子。

```html
<style type="text/css">
	.box {
		width: 200px;
		height: 200px;
		margin: 100px auto;
		background-color: pink;
	}
	.arr {
		width: 0;
		height: 0;
		line-height:0;
		font-size: 0;

		/*通过边框向四周撑开盒子的大小*/
		border-top: 20px solid red;

		border-right: 20px solid green;

		border-bottom: 20px solid blue;

		border-left: 20px solid yellow; 
	}
</style>

<div class="box">
	<div class="arr"></div>
</div>
```

当需要实现某个方向的箭头时，只需要把其它边框设置为透明颜色即可，如下设置为左箭头：

```html
<style type="text/css">
    .arr {
		width: 0;
		height: 0;
		line-height:0;
		font-size: 0;

		border-top: 20px solid transparent;
		border-right: 20px solid transparent;
		border-bottom: 20px solid transparent;
		border-left: 20px solid yellow; 
	}
</style>
```

当然也可以实现一个带箭头下拉框盒子，如下所示：

```html
<style>
	div {
		position: relative;
		width: 200px;
		height: 100px;
		background-color: pink;
		margin: 100px auto;
	}
	p {
	   /*实现箭头定位到上方*/
		position: absolute;
		top: -40px;
		left: 50%;
		margin-left: -20px;
		
		/*实现箭头*/
		width: 0;
		height: 0;
		border-style: solid;
		border-width: 20px;
		border-color: transparent transparent pink transparent;
		font-size: 0;
		line-height: 0;
	}
</style>

<div>
	<p></p>
</div>
```