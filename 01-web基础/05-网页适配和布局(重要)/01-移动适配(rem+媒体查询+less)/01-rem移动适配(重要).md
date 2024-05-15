# rem 在移动端适配布局

在适配网页时，我们遇到的问题：

1、通常我们在写网页的时候，页面中的字体不会随着屏幕的大小而变化；

2、在流式布局或者flex布局中我们主要是针对屏幕宽度布局，即把宽度划分几等份进行分配，高度都是固定的。这样页面中元素的size不会随着屏幕的变化而等比例缩放。

为了解决网页在多屏上的适配问题，可以使用 rem。

## 一、em单位 和 rem单位

`rem(root em)`是一个相对单位，类似于`em`，`em`是**父元素字体大小**。

```html
<style>
    .father {
			font-size: 20px;
		}
		.son {
			width: 10em;
			height: 10em;
			background-color: pink;
		}
		.min {
			width: 5em;
			height: 5em;
			background-color: purple;
		}
</style>
<div class="father">
	<div class="son">
		<div class="min"></div>
	</div>
</div>
```

而`rem`的基准是相对于 `html` **元素的字体大小**。比如：`根元素(html)` 设置`font-size=12px;`；非根元素设置`width:2rem`，则换成`px`表示的就是 `24px`。

因此，可以通过修改 html根元素 的`font-size`来整体控制页面中元素的大小。

```html
<style>
    html {
			font-size: 10px;
		}	
		.son {
			width: 10rem;
			height: 10rem;
			background-color: pink;
		}
		.min {
			width: 5rem;
			height: 5rem;
			background-color: purple;
		}
</style>
<div class="father">
	<div class="son">   <!-- 将显示100x100 -->
		<div class="min"></div>   <!-- 将显示50x50 -->
	</div>
</div>
```

## 二、媒体查询 Media Query

媒体查询(Media Query)是CSS3新语法。

* 使用 `@media` 查询，可以针对不同的媒体类型定义不同的样式；
* `@media`**可以针对不同的屏幕尺寸设置不同的样式**；
* 当重制浏览器大小的过程中，页面也会根据浏览器的宽度和高度重新渲染页面；
* 在iphone、android、平板等设备上都用得到媒体查询；

媒体查询(Media Query)使用的语法规范：

```css
@media mediatype and|not|only (media feature) {
	// ...css-Code;
}
```

* `@media` 关键字

* `mediatype` 媒体类型，将不同终端设备划分成不同的类型。有如下3个值：

> `all` 表示所有设备
> `print` 用于打印机和打印预览
> `screen` 用于电脑屏幕、平板、手机等


* `and|not|only` 关键字，它将媒体类型或多个媒体特性连接到一起做为媒体查询的条件。

> `and` 可以将多个媒体特性连接到一起，相当于`且`，使用较多；
> `not` 排除某个媒体类型，相当于 `非`；
> `only` 指定某个特定的媒体类型；


* `media feature` 媒体特性，必须有小括号。每种媒体类型都有自己不同的特性，根据不同的媒体类型的媒体特性设置不同的展示风格，先了解如下三个：

> `width` 定义输出设备中页面可见区域的宽度；
> `min-width` 定义输出设备中页面最小可见区域宽度；
> `max-width`定义输出设备中页面最大可见区域宽度；

栗子1：根据宽度改变样式

```css
<style>
    /* 当屏幕最大宽度为 800px，设置成我们需要的样式 */
	@media screen and (max-width: 800px) {
		body {
			background-color: pink;
		}
	}
    
    /* 当屏幕最大宽度为 500px，设置成我们需要的样式 */
	@media screen and (max-width: 500px) {
		body {
			background-color: purple;
		}
	}
</style>
```

栗子2：根据不同宽度范围改变样式

```css
<style>
    /* 1. 媒体查询一般按照从大到小或者 从小到大的顺序来 */
    /* 2. 小于540px 页面的背景颜色变为蓝色 */
    @media screen and (max-width: 539px) {
        body {
            background-color: blue;
        }
    }
    /* 3. 540 ~ 970 我们的页面颜色改为 绿色 */
    /* @media screen and (min-width: 540px) and (max-width: 969px) {
        body {
            background-color: green;
        }
    } */
    /* 利用CSS层叠性来简写 */
    @media screen and (min-width: 540px) {
        body {
            background-color: green;
        }
    }
    /* 4. 大于等于970 我们页面的颜色改为 红色 */
    @media screen and (min-width: 970px) {
        body {
            background-color: red;
        }
    }
    /* 5. screen 还有 and 必须带上不能省略的 */
    /* 6. 我们的数字后面必须跟单位  970px   这个 px 不能省略的 */
</style>
```


## 三、媒体查询+rem实现元素动态大小变化

`rem`单位是跟着`html`来走的，有了`rem`页面元素可以设置不同大小尺寸。媒体查询可以根据不同设备宽度来修改样式。

媒体查询+rem 就可以实现根据不同设备宽度，实现元素大小的动态变化。

```css
 <style>
   
    /* 从小到大的顺序 */ 
    @media screen and (min-width: 320px) {
        html {
            font-size: 10px;
        }
    }
    
    @media screen and (min-width: 640px) {
        html {
            font-size: 20px;
        }
    }
</style>
```

### 媒体查询文件引入

如下 Link标签 利用媒体查询 实现按需引入CSS样式文件：

```html
<head>
    <link rel="stylesheet" href="style320.css" media="screen and (min-width: 320px)">
    <link rel="stylesheet" href="style640.css" media="screen and (min-width: 640px)">
</head>

```