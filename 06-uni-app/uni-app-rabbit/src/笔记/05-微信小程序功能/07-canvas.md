# canvas
<https://developers.weixin.qq.com/miniprogram/dev/component/canvas.html>


## 参考博客
小程序 — canvas图片合成：<https://mp.weixin.qq.com/s/Fdv-0D5ybR3T3PIhr6gBJA>

开源小程序，练手必备，仿“美图秀秀”处理图片：<https://mp.weixin.qq.com/s/xhLC0mwAEMO8k4lHD8bztQ>
四、拼长图
拼长图界面由image组件构成。用户从系统相册选择图片时，将图片的临时路径保存到数组中，而image组件使用列表渲染（wx:for）将数组中的图片全部载入界面，实现拼接的演示效果。在image上绑定longtap事件，长按一张图片后，弹出删除该图片的确认框，确认后在数组中删除该图片的路径，实现删除的演示效果。
保存时，将数组中的图片依次画在隐藏canvas上，所有图片宽度保持一致，高度按图片比例缩放，每张图片的定位由图片的宽高、缩放比计算得到。这样就实现的拼长图的功能。


小程序canvas实现图片缩放合并
