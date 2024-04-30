# vue-router

## 1、vue 的 第三方组件，都需要通过Vue.use( . . . )的方式去 install 组件。

router 组件 install 的时候，会注册两个全局组件
* router-link : 跳转
* router-view : 在什么地方显示内容

## 2、`export default new VueRouter ({ })` 里面有各种属性和路由的映射表

mode: hash: 默认值，/#/
mode: history: /
routes 路由映射，什么路由显示什么vue组件


## 3、 router 和 route 的区别

* $router : 包含所有的方法

```
$router.push({path:'home'})
$router.replace({path:'home'})//替换路由，没有历史记录
```


* $route : 包含所有的属性


## 4、router 中参数如何传递与获取

* 方式一：路由里面传参数：`路由:/detail/1`

```
vue代码如下:

<router-link to="/user/detail/1">用户1</router-link>
-----

routes代码如下:

{   
    // 路径里面传递参数是通过斜线传递的：比如/user/detail/1
    path: 'detail/:id',
    name: 'userDetail',
    component: () => import('../view/UserDetail.vue')
}
----

这种参数在组件里面如何获取呢？

this.$route.params.id

```

* 方式二：路径里面问号形式传参数 `路径：/detail?id=1`

```
<router-link to="/user/detail?id=1">用户1</router-link>

这种传递方式如何在组件里面获取参数呢？

this.$route.query.id
```





# 参考博客

海明月|稀土掘金 <https://juejin.cn/post/6844903834670596109>













