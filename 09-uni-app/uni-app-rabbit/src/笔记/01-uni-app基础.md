https://uniapp.dcloud.net.cn/component/


# HBuilderX 创建项目步骤

1、新建项目时，选择以下信息并创建：
	项目名 uni-app-project；默认模版；Vue3；

2、运行项目到微信小程序模拟器步骤：

	进入【HBuilderX】>【工具】>【插件安装】>【uni-app(Vue 3)】

	打开【微信小程序】>【设置】>【安全设置】> 开启服务端口

	运行｜停止：进入【HBuilderX】>【运行、运行到小程序模拟器】> 选择【微信开发者工具】

3、新建页面
进入项目【pages目录】下的存放目录 > 右键【新建页面】> 填写页面名称、勾选在pages.json中注册

# HBuilderX 微信小程序配置
打开项目 >【manifest.json】文件 >【微信小程序配置】




# 通过命令行创建（需安装 NodeJS 环境）

通过命令行创建项目，不必依赖 HBuilderX。
HbuilderX对 TS 类型支持暂不完善
VS Code 对 TS 类型支持友好，熟悉的编辑器


具体命令可参考官网：<https://uniapp.dcloud.net.cn/quickstart-cli.html>

创建以 typescript 开发的工程

```shell
# 速度太慢，可直接在官网下载模版
$ npx degit dcloudio/uni-preset-vue#vite-ts my-vue3-project

# 安装依赖包
$ pnpm i
```

* 在 src/manifest.json 中添加 微信小程序 appid
* 根据 package.json 中的命令编译微信小程序，如下命令

```shell
$ pnpm run dev:mp-weixin
```

* 打开 微信开发者工具, 导入 dist/dev/mp-weixin 运行


## VS Code 中安装 uni-app 插件

* uni-create-view
在 VS Code 右键目录文件夹快速创建页面与组建，创建视图页面时将自动添加 pages.json 中

* uni-helper
提供 uni-app 基本能力代码片段

* uniapp小程序扩展
鼠标悬浮在api上面会提示文档


## 为项目配置 TS 类型校验

安装 类型声明文件：

```shell
$ pnpm i -D @types/wechat-miniprogram @uni-helper/uni-app-types
```



然后配置 tsconfig.json：

```json
// tsconfig.json
{
  "extends": "@vue/tsconfig/tsconfig.json",
  "compilerOptions": {
    "sourceMap": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "lib": ["esnext", "dom"],
    // 类型声明文件
    "types": [
      "@dcloudio/types", // uni-app API 类型
      "miniprogram-api-typings", // 原生微信小程序类型
      "@uni-helper/uni-app-types" // uni-app 组件类型
    ]
  },
  // vue 编译器类型，校验标签类型
  "vueCompilerOptions": {
    // 原配置 `experimentalRuntimeMode` 现调整为 `nativeTags`
    "nativeTags": ["block", "component", "template", "slot"], 
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"]
}
```

* vscode默认走严格的json模式，即不允许 JSON 注释问题。

1、打开 VS Code > 设置 > 搜索[文件关联] > 配置与语言的文件关联的 glob patterns > 添加 【项：manifest.json 和 pages.json】【值：jsonc】

2、uni-app 项目中只能添加 manifest.json 和 pages.json 文件。



# 代码仓库

<https://git.itcast.cn/heimaqianduan/erabbit-uni-app-vue3-ts>


# uni-ui 组件库

<https://uniapp.dcloud.net.cn/component/uniui/quickstart.html>

* 配置组件自动导入


* 安装 `@uni-helper/uni-ui-types` 插件让鼠标在 VS Code 中能识别 uni-ui 组件

```shell
$ pnpm i @uni-helper/uni-ui-types -D
```






# 环境配置问题

<https://blog.csdn.net/qq_45937792/article/details/139303144>











