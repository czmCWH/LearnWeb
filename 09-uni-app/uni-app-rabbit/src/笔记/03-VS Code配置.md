
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

<https://uniapp.dcloud.net.cn/component/uniui/uni-ui.html>

* 配置组件自动导入


* 安装 `@uni-helper/uni-ui-types` 插件让鼠标在 VS Code 中能识别 uni-ui 组件

```shell
$ pnpm i @uni-helper/uni-ui-types -D
```






# 环境配置问题

<https://blog.csdn.net/qq_45937792/article/details/139303144>







# 日常使用插件

```shell
# 如果您的根目录没有package.json文件的话，请先执行如下命令：
$ npm init -y
```

* uview不支持vue3+ts，使用uview-plus

1、Tabs 标签；tab 选项卡；
<https://ext.dcloud.net.cn/plugin?id=1971>



# 配置 easycom

配置easycom组件模式

需要在项目src目录的pages.json中进行 

温馨提示：

uni-app为了调试性能的原因，修改easycom规则不会实时生效，配置完后，您需要重启HX或者重新编译项目才能正常使用uview-plus的功能。

请确保您的pages.json中只有一个easycom字段，否则请自行合并多个引入规则。
————————————————

                            版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。
                        
原文链接：https://blog.csdn.net/weixin_43743175/article/details/133711188


# Vetur 暂不支持 ts
因此在 import 组件时，组件名下面会有红色波浪下划线。
