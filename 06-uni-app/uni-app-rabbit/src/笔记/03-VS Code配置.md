通过命令行方式创建 uni-app 项目后，我们还需要对 VS Code 以及项目做一些配置。

# 一、配置 VS Code

## 1.1、为 uni-app 项目安装 VS Code 配套插件

* `uni-create-view`：在 VS Code 右键目录文件夹快速创建页面与组建，创建视图页面时将自动添加 pages.json 中；

* `uni-helper`：提供 uni-app 代码提示；

* `uniapp小程序扩展`：鼠标悬浮在 api 上面会提示文档；

* `cmd + i`：唤起代码提示；

## 1.2、修改 VS Code 的严格的 json 模式

项目中的.json文件，VS Code 默认是走严格的 json 模式，即不允许.json文件中添加注释。

1、打开 `VS Code` > 设置 > 搜索[文件关联] > 配置与语言的文件关联的 `glob patterns` > 添加 【项：manifest.json 和 pages.json】【值：jsonc】

2、✊ uni-app 项目注意只能添加 `manifest.json` 和 `pages.json` 文件书写注释，其它文件是不允许的。


## Vetur 暂不支持 ts

因此在 import 组件时，组件名下面会有红色波浪下划线。


# 二、为 uni-app 项目安装插件

寻找 uni-app 项目所需的插件，可以在 <https://ext.dcloud.net.cn/?cat1=2&cat2=21> DCloud 插件市场搜索。

如果您的根目录没有 `package.json` 文件的话，请先执行如下命令：
```shell
$ npm init -y
```

## 2.1、为项目配置 TS 类型检查与提示

步骤1：安装 类型声明文件：

```shell
$ pnpm i -D @types/wechat-miniprogram @uni-helper/uni-app-types
```

步骤2：更新 `tsconfig.json`，使得安装插件生效：
详细参考：<https://uni-typed.netlify.app/guide/uni-app-types.html>

```json
// tsconfig.json
{
  "extends": "@vue/tsconfig/tsconfig.json",
  // ...
  "compilerOptions": {
    "ignoreDeprecations": "5.0",  // 消除选项 ‘importsNotUsedAsValues’ 已被弃用，并将在 TypeScript 5.5 中停止使用
     // ...
     "moduleResolution": "Bundler",

    // 类型声明文件
    "types": [
      "@dcloudio/types", // uni-app API 类型
      "@types/wechat-miniprogram", // 原生微信小程序类型
      "@uni-helper/uni-app-types" // uni-app 组件类型
    ]
  },
  // ......
  // 校验 uni-app 组件类型
  "vueCompilerOptions": {
    // experimentalRuntimeMode 已废弃，现调整为 nativeTags，请升级 Volar 插件至最新版本
    // "experimentalRuntimeMode": "runtime-uni-app",
    
    // 参考自：<https://blog.csdn.net/qq_45937792/article/details/139303144>
    // 调整 Volar（Vue 语言服务工具）解析行为，用于为 uni-app 组件提供 TypeScript 类型
    "plugins": ["@uni-helper/uni-app-types/volar-plugin"]
  },
}
```

## 2.2、安装 uni-ui 官方组件库

<https://uniapp.dcloud.net.cn/component/uniui/uni-ui.html>

uni-ui组件库是使用 Js 开发的，并且没有提供Ts对应的声明文件，因此需要安装插件，用于识别 uni-ui 组件类型：

* 为项目安装 `@uni-helper/uni-ui-types` 插件让鼠标在 VS Code 中能识别 uni-ui 组件

```shell
$ pnpm i @uni-helper/uni-ui-types -D
```

## 2.3、安装 uView UI 组件库

注意 uView UI 组件库 不支持 `vue3+ts`，可以使用 `uview-plus` 替代。



