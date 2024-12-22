# 一、禁止 Swiper-item 滚动

* 方法一：
<https://ask.dcloud.net.cn/question/75201>

```js
<swiper-item :catchtouchmove="eventHandler">  

const eventHandler = computed(() => {  
  if (isStop) {
    return 'stop'
  } else {
    returun ''
  }
});
```
