# 一、swiper设置 current 不生效

解决办法来自如下博客：

<https://blog.csdn.net/qq_33240556/article/details/140655256?spm=1001.2101.3001.6650.6&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-6-140655256-blog-126021241.235%5Ev43%5Epc_blog_bottom_relevance_base1&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-6-140655256-blog-126021241.235%5Ev43%5Epc_blog_bottom_relevance_base1&utm_relevant_index=9>

JS 动态数据绑定：如果您的 Swiper 内容是通过 JavaScript 动态生成的，确保数据在 Swiper 渲染时已经准备就绪。可以使用 v-if 控制 Swiper 在数据加载完成后再渲染，或者使用 v-show 隐藏初始化过程。

也就是说，当数据没有时，通过 v-if 控制 swiper 不要显示，等数据回来后再加载 swiper，这时修改 current 才有效。

# 二、可以手动禁止 swiper 滑动吗

<https://developers.kuaishou.com/topic?tid=26168&bizType=miniprogram&tag=1736085271911>

快手官方回复：目前暂无禁止滑动的功能
