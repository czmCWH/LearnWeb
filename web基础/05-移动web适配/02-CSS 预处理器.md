# CSS 预处理器

`CSS` 是一门非程序式语言，没有变量、函数、SCOPE (作用域)等概念。因此我们在书写CSS时会遇到如下问题：

* `CSS` 需要书写大量看似没有逻辑的代码，`CSS` 冗余度是比较高的。
* 不方便维护及扩展，不利于复用。
* `CSS` 没有很好的计算能力。
* 非前端开发工程师来讲，往往会因为缺少 `CSS` 编写经验而很难写出组织良好且易于维护的 `CSS` 代码项目。

## Less 的介绍

`Less`（`LeanerStyle Sheets` 的缩写）是一门 **CSS扩展语言，也称为CSS预处理器**。

作为 CSS 的一种形式的扩展，它并没有减少 CSS 的功能，而是在现有的 CSS 语法上，为 CSS 加入程序式语言的特性。

它在 CSS 的语法基础之上，引入了变量，Mixin（混入），运算以及函数等功能，大大简化了 CSS 的编写，并且降低了 CSS的维护成本，就像它的名称所说的那样，Less可以让我们用更少的代码做更多的事情。

Less中文网址：[lesscss.cn](http://lesscss.cn/)

常见的CSS预处理器：Sass、Less、Stylus

[Sass 英文地址](https://sass-lang.com/guide/) [Sass中文网](https://www.sass.hk/guide/)

> 一句话：`Less` 是一门 `CSS` 预处理语言，**它扩展了CSS的动态特性**。