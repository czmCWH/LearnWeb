# 常用CSS样式(文本、复制、textarea居中、图片加载失败、隐藏)

## 1、文本溢出省略

```css
/* 单行文本溢出省略号 */
.line {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 多行文本溢出省略号 */
.line {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
```

## 2、复制到粘贴板

```css
const clipboardWriteText = (copyText: string) => {
  // 判断是否存在clipboard并且是安全的协议
  if (navigator.clipboard && window.isSecureContext) {
    return new Promise<void>((resolve, reject) => {
      navigator.clipboard
        .writeText(copyText)
        .then(() => {
          resolve();
        })
        .catch(() => {
          reject(new Error('复制失败'));
        });
    });
  }
  // 否则用被废弃的execCommand
  const textArea = document.createElement('textarea');
  textArea.value = copyText;
  // 使text area不在viewport，同时设置不可见
  textArea.style.position = 'absolute';
  textArea.style.opacity = '0';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.append(textArea);
  textArea.focus();
  textArea.select();
  return new Promise<void>((resolve, reject) => {
    // 执行复制命令并移除文本框
    if (document.execCommand('copy')) {
      document.execCommand('copy');
      resolve();
    } else {
      reject(new Error('复制失败'));
    }
    textArea.remove();
  });
};

/* 使用 */
clipboardWriteText('balabalabala')
  .then(() => {
    console.log('复制成功');
  })
  .catch(() => {
    console.log('复制失败');
  });
```

## 3、垂直居中 textarea

* 难点
根本就他妈的不能通过 css 来实现输入的垂直居中

网上的那些傻逼就会复制答案，操他妈的 flex 都来了，什么傻卵玩意儿 🥲

只能用 js 来实现


* 思路
通过动态调整 paddingTop 来偏移文本内容。

需要注意的是，多行的时候，需要计算行数

可以通过 set Height 0，然后滚动高度就是输入文字的总高度，算完之后把高度复原

行数 = 文字总高度 / 行高

所以，设置行高很重要，默认是 normal，normal 是字符串，没办法计算的，所以自己手动设一个 lineheight 吧


```css
<textarea id="text"></textarea>

textarea {
  width: 200px;
  height: 200px;
  padding: 0;
  margin: 0;
  line-height: 1.2;
  text-align: center;
  border: 1px solid black;
  box-sizing: border-box;
  word-break: break-all;
  resize: none;
}
```

```js
// 获取行数，注意需要先把paddingtop置0，不然scrollHeight会把padding算进去
function getLinesCount(textEle, lineHeight) {
  textEle.style.paddingTop = 0;
  const h0 = textEle.style.height;
  textEle.style.height = 0;
  const h1 = textEle.scrollHeight;
  textEle.style.height = h0;
  return Math.floor(h1 / lineHeight);
}

function update() {
  const textArea = document.querySelector('#text');
  const lineHeight = Number(window.getComputedStyle(textArea).lineHeight.slice(0, -2));
  const h = textArea.getBoundingClientRect().height;
  const lines = getLinesCount(textArea, lineHeight);
  const top = h / 2 - (lineHeight * lines) / 2;
  textArea.style.paddingTop = `${top}px`;
}

window.onload = update;
```


## 4、图片加载失败处理方式

```css
<img src={imgSrc || defaultSrc} />

/*
图片加载失败，使用图片自带的 error 事件处理即可：
*/
<img
  src={imgSrc}
  onError={event => {
    event.currentTarget.src = defaultSrc;
  }}
/>

/*
注意有些加载 404 的图片不会走error 事件，而是走了load事件，那么我们可以通过直接添加一个占位底图来实现，这样如果能加载就会覆盖占位图，如果不能加载那就会显示底下的底图
*/
<div>
  <img src={imgSrc} />
  <img src={defaultSrc} />
</div>
```

## 5、元素隐藏
相同点：都能控制元素在视图中的可见性

不同点：直接看图


|  | display: none | visibility: hidden | opacity: 0 |
|---|---|---|---|
| 是否生成盒子 | 否 | 是 | 是 |
| 是否占据空间 | 否 | 是 | 是 |
| 是否可以交互 | 否 | 否 | 是 |
| 是否参与回流 | 否 | 是 | 是 |
| 是否参与重绘 | 否 | 否 | 是 |

















