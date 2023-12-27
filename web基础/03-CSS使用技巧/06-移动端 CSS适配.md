# 移动端 CSS适配

## 一、backdrop-filter 毛玻璃在iOS上不生效

```
.blur::before {
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);
    /* other styles */
}

.blur {
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);
    /* other styles */
}
```