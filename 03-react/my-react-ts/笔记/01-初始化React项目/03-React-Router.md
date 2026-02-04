# React-Router

React-Router 是 React 最流行的路由库，可以与 Vite 结合创建一个全栈 React 框架。

<https://zh-hans.react.dev/learn/creating-a-react-app#react-router-v7>
<https://reactrouter.com/start/framework/installation>

```shell
// 使用 npm 安装 react-ruoter
$ npm i react-router
```

# 1、声明式导航
声明式导航是指通过 `<Link to={"/xxx"}>` 组件描述要跳转到哪里去，组件会被渲染为浏览器支持的a链接。
后台管理系统的左侧菜单栏常用这种方式。

语法说明:
	- to属性，指定要跳转到路由path，如果需要传参直接通过字符串拼接的方式拼接参数即可。


# 2、编程式导航
编程式导航是指通过 `useNavigate` 钩子得到导航方法，然后通过调用方法以 命令式 的形式进行路由跳转。
使用这种方式更灵活。

语法说明：通过调用navigate方法传入地址path实现跳转

导航参数传递的几种方式

## 2.1、URL查询传参 - useSearchParams 传参

```ts
// 页面跳转，传递参数：
const navigate = useNavigate();
const onNavigation2 = () => {
  navigate("/article?name=张三&age=18");
}

// 接收参数：
import { useSearchParams } from "react-router"

const [ params ] = useSearchParams();

const name = params.get('name');
const age = params.get('age');
```

## 2.2、URL路径传参 - Params传参 

```ts
// 路由配置中配置路径参数：
{
  path: "/article/:id?/:name?",
  element: <Article />
},

// 获取URL路径参数
const paramsObj = useParams();
const id = paramsObj.id;
const name2 = paramsObj.name;
```

