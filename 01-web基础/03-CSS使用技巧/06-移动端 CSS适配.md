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