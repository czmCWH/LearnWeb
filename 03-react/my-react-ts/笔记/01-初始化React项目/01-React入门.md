# 一、React 学习视频
<https://www.bilibili.com/video/BV1zgBaBJE4u?spm_id_from=333.788.player.switch&vd_source=f97692c2f656607aeb97ee92b4310d9e&p=20>，【完整版52集】React19 + Typescript 基础进阶与实战完全指南。


<https://www.bilibili.com/video/BV1ZB4y1Z7o8?spm_id_from=333.788.videopod.episodes&vd_source=f97692c2f656607aeb97ee92b4310d9e&p=82>，HM程序员前端React18入门到实战视频教程。

<https://www.bilibili.com/video/BV1fpANeVEnS>，【34集已完结】2025年全网最详细的React+vite学习课程。

<https://www.bilibili.com/video/BV1Q1BhBiEqL>，React19+TypeScript 保姆级教程。

<https://coding.imooc.com/class/974.html>，慕课网 - React 19 高薪技术 从入门到进阶，百度网盘已保存。

# 二、React 学习网站

* React 官网：<https://react.dev>、<https://zh-hans.react.dev/>
* 


# 三、构建 React 应用

## 3.1、Create React App (CRA)脚手架（2025年2月14日废弃）

1、安装 create-react-app 脚手架，用于创建 react 项目
```shell
# 安装脚手架
$ npm i create-react-app -g

# 检查安装情况
$ create-react-app --version
```

## 3.2、使用 Vite 构建 React 应用
<https://zh-hans.react.dev/blog/2025/02/14/sunsetting-create-react-app>，逐步淘汰 Create React App。

2025 年 2 月 14 日起正式弃用 Create React App 作为新应用的推荐工具，并建议现有应用迁移至 [框架](https://zh-hans.react.dev/blog/2025/02/14/sunsetting-create-react-app#how-to-migrate-to-a-framework)，或迁移至 [构建工具](https://zh-hans.react.dev/blog/2025/02/14/sunsetting-create-react-app#how-to-migrate-to-a-build-tool)（如 Vite、Parcel 或 RSBuild）。

- 使用“框架”构建 React 应用：<https://zh-hans.react.dev/learn/creating-a-react-app>
- 使用“构建工具”(Vite、Parcel 或 Rsbuild)构建 React 应用 ：<https://zh-hans.react.dev/learn/build-a-react-app-from-scratch>


```shell
# 方式1、基于 Vite 构建一个 react+TypeScript 的应用 
$ npm create vite@latest my-react-ts -- --template react-ts

# 方式2、基于 Vite 构建一个 react+JavaScript 的应用 
$ npm create vite@latest
# 然后按照提示进行选择：
# Project name: 输入你的项目名（如 my-react-app）。
# Select a framework: 选 React。
# Select a variant: 选 JavaScript 或 JavaScript + SWC。
```

## 3.3、React 项目技术栈

* React 企业标准技术栈：React19 + TypeScript + Redux + ReactRouter + AntD