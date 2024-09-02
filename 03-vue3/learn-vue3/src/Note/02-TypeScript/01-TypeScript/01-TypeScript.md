# 一、TypeScript

TypeScript 是 `具有类型语法` 的 JavaScript，是一门强类型的编程语言。
TypeScript = JavaScript + Type(类型)

> 强烈推荐 Visual Studio Code (VS Code)，因为它对 TypeScript 有着很好的内置支持。

```js
// JavaScript是弱类型语言，变量可以赋不同类型的值
let count = 100
count = '个数'
```

```ts
// TypeScript是强类型语言，变量不能做随意类型赋值
let count: number = 100
// ts 会报错
// count = '个数'
```

TypeScript 的优点：

- ts 静态类型检查，提前发现代码错误。而 js 需在 运行时 才能发现错误。
- 良好的代码提示，提升开发效率

什么时候使用 ts，如下是社区建议：1.你做的是一个大型的应用吗? 2.是否是团队协作开发模式? 3.是否在编写通用的代码库?(Vue3/ElementPlus...)

> 结论：
> TypeScript不是万能的，技术的选型不能脱离具体的业务和应用场景，TS更加适合用来开发中大型的项目，或者是通用的IS代码库，再或者是团队协作开发的场景。

## TypeScript 编译引擎

TypeScript 编写的代码是 无法直接在js引擎(浏览器/Nodes) 中运行的，最终还需要经过 编译变成js代码 才可以正常
运行。

### 搭建手动编译环境

1、全局安装ts编译引擎(即: typescript 包) > 安装完毕后会自动注册 tsc 命令

```shell
$ npm install typescript  -g
$ tsc -v
Version 5.5.4
```

2、使用 tsc 命令使用一下 ts：

```shell
$ touch hello.ts
# 执行 tsc 命令 会生成对应的 hello.js 文件
$ tsc hello.ts
# 运行js文件
$ node hello.j
```

### 搭建工程化下的自动编译环境

基于工程化的TS开发模式(webpack/vite)，TS的编译环境已经内置了，无需手动安装配置，通过以下命令即可创建一个最基础的自动化的TS编译环境，如下：

```
npm create vite@latest test-ts -- --template vanilla-ts
```

命令说明：

1. npm create vite@latest 使用最新版本的vite创建项目
2. test-ts 项目名称
3. -- --template vanilla-ts 创建项目使用的模板为原生ts模板

# 二、TypeScript 常用核心语法

# 三、Vue3 中组合式API 如何配合 TS 使用


# 学习笔记参考
<https://github.com/sz-hhb/learn-typescript>