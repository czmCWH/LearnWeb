# h5奇怪的bug

# 1、overflow-x: scroll 的子盒子在其它元素改变时突然消失了。

如下 `list-container` 的 `list-item` 盒子，会在页面中其它盒子进行 `v-show` 显示隐藏时而消失了。原因是 `filter` 属性的影响，直接注释该段代码即可解决bug。

```css
.list-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow-x: scroll;
  overflow-y: visible;
  margin: 20px 20px 16px;
  padding-top: 9px;
  box-sizing: border-box;
  background-color: #f8f8f8;
  .list-item {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 6px;
    border-radius: 12px;
    width: 120px;
    height: 148px;
    box-sizing: border-box;
    background-color: #fff;
    /*filter: drop-shadow(0px 6px 13.1px rgba(0, 0, 0, 0.04))
      drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.1));*/
  }
}
```
