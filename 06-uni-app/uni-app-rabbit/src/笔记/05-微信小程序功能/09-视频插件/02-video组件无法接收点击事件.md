# video 不响应点击事件

uni-app开发微信小程序，view组件内嵌套video视频组件，给view组件绑定 onSelect 方法，点击view时 onSelect 不响应，该如何解决此问题：

```vue
<view class="item" @click="onSelect">
  <video  
    class="media-item"
    :src="item.url"
  />
</view>
```

## 方法一

通过CSS设置video为不可点击：

```css
.media-item {
  pointer-events: none;
}
```

## 方法二

给video组件添加@click.stop阻止事件冒泡（uni-app方案）：

```vue
<view class="item" @click="onSelect">
  <video  
    class="media-item"
    :src="item.url"
    @click.stop
  />
</view>
```

## 方法三
使用catchtouchstart替代@click：

```vue
<view class="item" @touchstart="onSelect">
  <video class="media-item" :src="item.url" />
</view>
```

## 方法四

给video组件添加disable-default-tap属性（推荐方案）：

```vue
<view class="item" @click="onSelect">
  <video  
    class="media-item"
    :src="item.url"
    disable-default-tap
  />
</view>
```
