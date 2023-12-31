# 标签的显示模式

标签的显示模式是指标签以什么方式进行显示，比如 `div` 自己占一行， 比如 `span` 一行可以放很多个。

- 作用： 

  我们网页的标签非常多，再不同地方会用到不同类型的标签，以便更好的完成我们的网页。

- 标签的类型(分类)

  `HTML`标签一般分为块标签和行内标签两种类型，它们也称块元素和行内元素。

## 块级元素(block-level)

```
常见的块元素有<h1>~<h6>、<p>、<div>、<ul>、<ol>、<li>等，其中<div>标签是最典型的块元素。
```

**块级元素的特点:**

（1）比较霸道，自己独占一行

（2）高度，宽度、外边距以及内边距都可以控制。

（3）宽度默认是容器（父级宽度）的100%

（4）是一个容器及盒子，里面可以放行内或者块级元素

**注意：**

> 只有 文字才 能组成段落  因此 `p` 里面不能放块级元素，特别是 `p` 不能放 `div`。 
> 
> 同理还有这些标签h1,h2,h3,h4,h5,h6,dt，他们都是文字类块级标签，里面不能放其他块级元素。


## 行内元素(inline-level)

```
常见的行内元素有<a>、<strong>、<b>、<em>、<i>、<del>、<s>、<ins>、<u>、<span>等，

其中<span>标签最典型的行内元素。有的地方也成内联元素
```
**行内元素的特点：**

（1）相邻行内元素在一行上，一行可以显示多个。

（2）**高、宽直接设置是无效的。**

（3）默认宽度就是它本身内容的宽度。

（4）**行内元素只能容纳文本或则其他行内元素。**

**注意：**

> 链接里面不能再放链接。
> 
> 特殊情况`a`里面可以放块级元素，但是给`a`转换一下块级模式最安全。

## 行内块元素（inline-block）

```
在行内元素中有几个特殊的标签——<img />、<input />、<td>，

可以对它们设置宽高和对齐属性，有些资料可能会称它们为行内块元素。
```

**行内块元素的特点：**

（1）和相邻行内元素（行内块）在一行上,但是之间会有空白缝隙。一行可以显示多个

（2）默认宽度就是它本身内容的宽度。

（3）高度，行高、外边距以及内边距都可以控制。
  

## 三种模式总结


| 元素模式   | 元素排列               | 设置样式               | 默认宽度         | 包含                     |
| ---------- | ---------------------- | ---------------------- | ---------------- | ------------------------ |
| 块级元素   | 一行只能放一个块级元素 | 可以设置宽度高度       | 容器的100%       | 容器级可以包含任何标签   |
| 行内元素   | 一行可以放多个行内元素 | 不可以直接设置宽度高度 | 它本身内容的宽度 | 容纳文本或则其他行内元素 |
| 行内块元素 | 一行放多个行内块元素   | 可以设置宽度和高度     | 它本身内容的宽度 |                          |



# 标签显示模式转换 display

- 块转行内：`display:inline`;

- 行内转块：`display:block`;

- 块、行内元素转换为行内块： `display: inline-block`;

此阶段，我们只需关心这三个，其他的是我们后面的工作。

> 为什么把标签的显示模式放到css里面来讲，因为它涉及到样式调试。

```
<style>
		div {
			/*把块级元素转换为行内元素*/
			display: inline;
			background-color: red;
		}
		span {
			/*把行内元素转换为块级元素*/
			display: block;
			width: 200px;
			height: 200px;
			background-color: green;
		}
		a {
			/*行内元素，转换成行内块元素*/
			display: inline-block;
			height: 50px;
			background-color: orange;
		}
</style>
```

## display 可取的几种值

```
block	 块类型。默认宽度为父元素宽度，可设置宽高，换行显示。
none	 元素不显示，并从文档流中移除。
inline	行内元素类型。默认宽度为内容宽度，不可设置宽高，同行显示。
inline-block 默认宽度为内容宽度，可以设置宽高，同行显示。
list-item	像块类型元素一样显示，并添加样式列表标记。
table   此元素会作为块级表格来显示。
inherit	规定应该从父元素继承display属性的值。
```