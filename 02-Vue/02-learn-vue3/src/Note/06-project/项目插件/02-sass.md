# 安装 sass 预处理器：

```shell
$ npm i sass -D
```

[github * wangtunan/blog](https://wangtunan.github.io/blog/cssPrecompiler/sass/#%E5%AE%89%E8%A3%85)，关于 Sass 预解析指示器讲解非常好。

SASS支持两种不同的语法，分别是文件后缀为.scss和.sass，这两种语法功能一样，只是风格不同：
```css
/* .scss语法：有括号，有分号 */
.box {
  button {
    outline: none;
    border: 1px solid #ccc;
  }
}

/* .sass缩进语法：无括号，无分号，只有缩进和换行 */
.box
  button
    outline: none
    border: 1px solid #ccc
```

