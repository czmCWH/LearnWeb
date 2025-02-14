# 一、video 标签没有元数据加载回调

1、video 标签通过 url 加载视频时，无法获取视频的 width、height 等元数据信息。

2、video 在快手小程序中是原生组件实现的，所以层级高，设置蒙层 z-index 无法覆盖在它的上面。
帖子：video 层级高，设置蒙层没效果 <https://developers.kuaishou.com/topic?tid=22914&bizType=miniprogram>
具体原因可详细查看，原生组件渲染与限制：<https://open.kuaishou.com/docs/develop/components/native-components/native-components.html>

3、swiper-item 内的 video 组件不响应滑动手势

问题相关帖子：
  <https://developers.kuaishou.com/topic?tid=24012&bizType=miniprogram>，swiper组件套用video组件，视频黑屏
  <https://developers.kuaishou.com/topic?tid=22102&bizType=miniprogram>，swiper中嵌套video swiper滑动有问题


## playlet 短剧组件
playlet ：<https://open.kuaishou.com/docs/develop/components/open/playlet.html>
