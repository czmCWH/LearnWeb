# Node.js软件包安装

Node.js® 是一个基于 Chrome V8 引擎 的 JavaScript 运行时。

Node 还是一个后端开发语言。

安装 node.js 直接从官网下载安装即可，[NodeJS中文网](https://nodejs.cn/) 或 [nodejs.org](https://nodejs.org/en/download)。

安装 node 后，会自动安装 `npm`:

```shell
$ node -v
v18.14.2
$ npm -v
9.5.0
```

# 使用 n模块，对 Node 环境升降级。

根据 [n模块](https://www.npmjs.com/package/n) 官方安装指南可以很顺利的安装n，需要注意的是给 n模块 授权本地目录访问权限，即可对 node.js 进行容易的升降级：

```shell
# 降级 Node
$ n 10.16.0
$ node -v
v10.16.0
$ npm -v
6.9.0

# 升级 Node
$ n 18.14.2
$ node -v
v18.14.2
$ npm -v
9.5.0

# 直接输入 n，可以上下切换 node
$ n
```

`n模块` 管理 node 的版本是为了解决本地 node 环境和 服务器端 node 环境一致，防止项目部署报错。如下是 `n模块` 其它命令：

```shell
# 查看服务器上可用的 node 版本
$ n ls-remote --all

# 安装最新版本
$ n latest

# 查看已安装过的 node 版本
$ n ls

# 删除不需要的版本
$ n rm 9.5.0
```
