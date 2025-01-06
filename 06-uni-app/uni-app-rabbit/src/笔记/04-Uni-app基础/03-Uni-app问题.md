# 一、uni-app 里怎么调用引入的微信小程序自定义组件里的方法

## 1、问题：
最近在接入【微信视频播放器插件】时，遇到了 selectComponent 无法获取到组件的问题，因为vue3+组合式语法无法使用 this 获取组件实例。如下所示：
<https://weixin.xiaoaikeji.net/guide/2>

```ts
<m-video id="mVideo" ref="refVideo"></m-video>

//获取实例 写法1 (仅支持Vue2)
//this.$refs.refVideo.方法(参数);
this.$refs.refVideo.playbackRate(1.5);

//获取实例 写法2 (支持Vue2和Vue3)
let video = this.selectComponent("#mVideo");
video.playbackRate(1.5);
```

## 2、解决办法

### 解决办法1：引出新问题：

ref 无法获取到组件解决办法

问题如下，小程序中接入 `m-video` 插件时，想通过 ref 获取到组件实例，但一直获取到的是 null。

```ts
import { ref } from 'vue'

const myVideoRef = ref<any>();

const player = () => {
  console.log('----ref =', myVideoRef)    // 打印为： null
  myVideoRef.value?.play();
}

<m-video ref="myVideoRef" />
```

### 解决办法2：完美解决

参考博客：<https://www.itcan.cn/2022/06/22/uniapp-vue3-script-setup-component/>

```ts
import { getCurrentInstance } from 'vue'
const instance = getCurrentInstance()

const video = (instance?.proxy as any)?.selectComponent("#myVideo")
if (video) video.pause();

<m-video id="myVideo" />
```

# 二、
