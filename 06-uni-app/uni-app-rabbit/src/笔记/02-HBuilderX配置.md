# 一、HBuilderX 插件配置

## 1.1、注册 Dcloud 账号

点击 HBuilderX 底部状态栏【未登录】> 注册完账号 > 回到 HBuilderX 点击登录账号。这样才能去市场安装插件。

## 1.2、安装插件

进入 HBuilderX 顶部工具栏【工具】> 点击【插件安装】> 选择【安装新插件】
常用插件如下：

* uni-app(Vue 3)编译器：uni-app (Vue 3)编译vue3到各端的编译器。
* Prettier：格式化less、sass、vue、stylus(vue内嵌)、ts、yaml代码。
* dart-sass编译：编译 scss 为 css。uni-app 编译 vue3 使用。
* uni-helpers：uni-app的编译器辅助工具。

## 1.3、配置插件

方式一：
进入 HBuilderX 顶部工具栏【工具】> 点击【插件安装】>【已安装插件】> 选择需要配置的插件后面的【配置】
方式二：
进入 HBuilderX 顶部工具栏【工具】> 点击【设置】>【插件设置】

例如，添加对 `Prettier插件` 的配置：

```
Prettier Formator
勾选 启用Prettier
在自定义Prettier的生效文件范围中添加：,**/*.ts
```

在项目根目录下的 `.prettierrc.json` 文件中配置代码格式化：
```json
{
  "printWidth": 100,
  "tabWidth": 2,    // 缩进为2个空格
  "useTabs": false, // 缩进使用空格
  "semi": false,    // js行尾去掉分号
  "singleQuote": true,    // js中统一使用单引号
  "vueIndentScriptAndStyle": true,  // 让Vue中<Script>标签里的内容前面缩进
  "trailingComma": "all",
  "endOfLine": "auto"
}
```

# 二、配置 HBuilderX 

进入 HBuilderX 顶部工具栏【工具】> 点击【设置】>【常用配置】
修改如下几项：

* 【常用配置】
  项目管理器字体大小、编辑器字体大小 等；
  制表符长度，一个制表符(tab)等于的空格数；

* 【编辑器配置】
  勾选 `保存时自动格式化`；
  勾选 `代码折叠时显示最后一行(重新打开文档生效)`;
