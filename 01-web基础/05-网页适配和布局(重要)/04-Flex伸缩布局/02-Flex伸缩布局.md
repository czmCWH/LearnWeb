# Flex伸缩布局

## 一、flex布局的概念

### 1.1 传统布局 和 flex布局对比

* 传统布局：兼容性好；布局繁琐；局限性，不能在移动端很好的布局。

* flex布局：
    - 操作方便，布局极其简单，移动端使用比较广泛
    - pc端浏览器支持情况比较差
    - IE11或更低版本不支持flex或仅支持部分

> 建议
> 如果是pc端页面布局，还是采用传统方式
> 如果是移动端或者是不考虑兼容的pc则采用flex

### 1.2 flex布局

`flex布局` 又叫伸缩布局、弹性布局、伸缩盒布局、弹性盒布局。

`flex` 是 `flexible Box` 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性，任何一个容器都可以指定为 `flex` 布局。

* 当我们为父盒子设为 `flex` 布局以后，子元素的 `float`、`clear` 和 `vertical-align` 属性将失效。

* 采用 `Flex` 布局的元素，称为 `Flex` 容器（`flex container`），简称"容器"。它的所有子元素自动成为容器成员，称为 `Flex` 项目（`flex item`），简称"项目"。

> **flex布局的原理：通过给父盒子添加flex属性【display: flex;】，来控制子盒子的位置和排列方式**

```html
<style type="text/css">
	div {
		/*设置父盒子的显示模式为flex布局*/
		display: flex;
		width: 80%;
		height: 30%;
		background-color: pink;
	}
	/*span是行内元素无法设置宽高，由于父盒子是flex，所以可以设置宽高*/
	div span {
		width: 150px;
		height: 100px;
		background-color: red;
		margin-left: 5px;
	}
</style>

<div>
	<span>1</span>
	<span>2</span>
	<span>3</span>
</div>
```

## 二、flex布局的常用属性

### 2.1 flex容器（父项）的属性

flex布局的主要任务是在父项上，其常用属性有如下几个：

* **flex-direction**：设置主轴的方向，元素跟着主轴方向来排列的；默认值 `row`；
    - `flex-direction: [row] | [column] | [row-reverse] | [column-reverse];`

* **justify-content**：设置主轴方向上的子元素排列方式；默认值 `flex-start`；
    - `justify-content: [flex-start] | [flex-end] | [center] | [space-between] |  [space-around] | [space-evenly];`

* **flex-wrap**：设置主轴方向上子元素是否换行；默认值：`nowrap`
    - `flex-wrap: [nowrap] | [wrap];`

* **align-items**：设置侧轴方向上的子元素排列方式（单行）；默认值：`flex-start`
    - `align-items: [flex-start] | [flex-end] | [center] | [stretch];`

* **align-content**：设置侧轴方向上的子元素的排列方式（多行）；默认值：`flex-startd`
    - `align-content: [flex-startd] | [flex-end] | [center] | [space-around] | [space-between] | [stretch];`

* **flex-flow**：复合属性，相当于同时设置了 `flex-direction` 和 `flex-wrap`；
    -  例如：`flex-flow: column wrap;`

#### flex-direction 主轴方向

`flex-direction` 值的变化，决定着侧轴。

```
flex-direction: [row] | [column] | [row-reverse] | [column-reverse];
```

- `row`：表示主轴方向为 行（或者x轴），子元素从左到右排列。此时的侧轴为 `y` 轴方向，水平向下。默认方向。

- `column`：表示主轴方向为 列（或者y轴），子元素从上到下排列。

```html
<style type="text/css">
	div {
		display: flex;
		width: 600px;
		height: 300px;
		background-color: pink;
		/*默认值为row*/
		flex-direction: column;
	}
	div span {
		width: 150px;
		height: 100px;
		background-color: purple;
	}
</style>

<div>
	<span>1</span>
	<span>2</span>
	<span>3</span>
</div>
```
#### justify-content 子元素排列方式

```html
<style type="text/css">
	div {
		display: flex;
		
		/*....*/
		flex-direction: row;
		
		/* 
		flex-start：从主轴方向的头部开始排列子元素
		flex-end：从主轴方向的尾部开始排列子元素
		center：子元素在主轴上居中排列
		space-between：子元素在主轴上贴边排列，平分剩余空间作为间隙
		space-around：子元素在主轴上使用间隙一半作为靠边间隙排列
		space-evenly：平分剩余空间作为靠边间隙和元素间隙，均匀排列
		 */ 
		justify-content: space-evenly;
	}
	/*....*/
</style>
```

#### flex-wrap

flex布局中，默认的子元素是不换行的，如果装不开，会缩小子元素的宽度，放到父元素里面。

```html
<style type="text/css">
	div {
		display: flex;
		width: 300px;
		height: 300px;
		background-color: pink;
		flex-wrap: nowrap;	
	}
	div span {
		width: 100px;
		height: 100px;
		background-color: purple;
	}
</style>
	
<div>
	<span>1</span>
	<span>2</span>
	<span>3</span>
	<span>4</span>
	<span>5</span>
</div>
```

#### align-content 针对换行时，侧轴的排列方式

当主轴上的元素出现换行时 `flex-wrap: wrap;`，调整子元素在侧轴上的排列方式；在单行下是没有效果的。

```html
<style type="text/css">
	div {
		display: flex;
		width: 300px;
		height: 300px;
		background-color: pink;
		
		/*允许子项换行排列*/
		flex-wrap: wrap;

		/* 主轴上出现换行时，子元素在侧轴上的排列方式
		flex-start：在侧轴方向上从头开始排列；
		flex-end：在侧轴方向上贴尾排列；
		center：在侧轴方向上居中排列
		space-around：平分侧轴方向剩余空间作为靠边间隙、元素间隙排列
		space-between：平分侧轴方向剩余空间作为元素间隙排列，贴边排列
		stretch：子项元素高度平分
		*/
		align-content: stretch;
	}
	div span {
		width: 100px;
		height: 100px;
		background-color: purple;
	}
</style>

<div>
	<span>1</span>
	<span>2</span>
	<span>3</span>
	<span>4</span>
	<span>5</span>
</div>
```

#### flex-flow 
 
 `flex-flow` 属性是 `flex-direction` 和 `flex-wrap` 属性的复合属性。
 
```html
<style type="text/css">
	div {
		display: flex;
		width: 300px;
		height: 300px;
		background-color: pink;
		
		flex-flow: column wrap;

		/*同上 flex-flow 简写等价*/
		/*flex-direction: column;
		flex-wrap: wrap;*/
	}
</style>
```

### 2.2 flex布局子项常见属性

* **flex** 定义子项目分配剩余空间，用flex来表示占多少份数。默认值 0 。

* **align-self** 控制子项自己在侧轴方向上的排列方式，可覆盖 `align-items` 属性。
    - 默认值为 `auto`，表示继承父元素的 `align-items` 属性，如果没有父元素，则等同于 `stretch`。
    - `align-self: [flex-start] | [flex-end] | [center] | [stretch];`

* **order** 属性定义子项在主轴方向上的前后排列顺序，数值越小，排列越靠前，默认为0。

* **flex-grow** 控制元素放大比例，默认0，不变，把剩余空间按比例给相应的组件。

* **flex-shrink** 控制元素缩小比例，默认为1，设置为0表示不进行缩放。

* **flex-basis** 设置元素固定或自动空间的占比，不需要吃掉剩余空间。

如下示例：通过 `flex` 完全占用剩余空间。

```html
<style type="text/css">
	section {
		display: flex;
		width: 60%;
		height: 150px;
		background-color: pink;
		margin: 0 auto;
	}
	section div:nth-child(1) {
		width: 100px;
		height: 150px;
		background-color: red;
	}
	section div:nth-child(2) {
		flex: 1;
		background-color: blue;
	}
	section div:nth-child(3) {
		width: 100px;
		height: 150px;
		background-color: green;
	}
</style>

<section>
	<div></div>
	<div></div>
	<div></div>
</section>
```

如下示例：修改flex布局中，子元素自己的在侧轴方向上的排列方式，以及在主轴方向上的排列顺序

```html
<style type="text/css">
  .box {
		display: flex;
		width: 300px;
		height: 300px;
		background-color: orange;
		align-items: center;
	}
	.box span {
		flex: 1;
		background-color: skyblue;
		margin: 5px;
		height: 50px;
	}
	.box span:nth-child(2) {
		/*设置子元素自己在侧轴方向上的排列方式*/
		align-self: flex-end;
	}
	.box span:nth-child(3) {
		/*order默认值为0，值越小越靠前，把第三个子元素排列在最前面*/
		order: -1;
	}

</style>

<div class="box">
	<span>1</span>
	<span>2</span>
	<span>3</span>
</div>
```

## 三、flex 布局一些特殊情况处理

### 1、当两个元素并排显示时（一个fixed-size-box 和 一个text-box），当 text-box元素 的宽度挤满整个宽度时，flex会压缩 fixed-size-box 的宽度

此时只要设置 fixed-size-box 的：`flex-shrink: 0;`

`flex-shrink` 属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。

如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。


## 参考博客

[阮一峰 * Flex 布局教程：语法篇](https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

[阮一峰 * Flex 布局教程：实例篇](https://www.ruanyifeng.com/blog/2015/07/flex-examples.html)