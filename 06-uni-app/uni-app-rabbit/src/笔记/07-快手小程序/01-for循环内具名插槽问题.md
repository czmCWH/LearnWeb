# 一、for循环内定义具名插槽，快手小程序渲染不正确。
<https://ask.dcloud.net.cn/question/197861>

uni-app开发定一个 KSTabs 组件，如下代码所示：
```js
<template>
   <view class="main">
      <view class="item" v-for="(item, index) in tabs" :key="index">
          <view style="font-size:24rpx">标题</view>
          <slot name="content" :item="item" :index="index" :id="item.id"></slot>
          <slot name="right"></slot>
      </view>
    </view>
</template>
```

然后使用 KSTabs 组件，如下所示：
```js
<script type="text/javascript">
	const list = ref([{ name: '关注', id: 1}, {name: '美食', id: 6}])
</script>

<KSTabs :tabs="list">
  <template #content="scope">
    <text>{{ scope.item.name + scope.id }}</text>
  </template>
  <template #right>
    <text>左边</text>
  </template>
  </KSTabs>
```
但是运行到快手小程序时，渲染的内容却不正常，为 “关注1美食6  关注1美食6”，而不是正常的 “关注1  美食6”，这该如何解决

> 原因：
> 因为编译成快手小程序后，slot 的 name 都是一个导致的。

### 解决办法：
1、使用一个插槽把列表数据抛出来在自己需要的页面循环。
2、

