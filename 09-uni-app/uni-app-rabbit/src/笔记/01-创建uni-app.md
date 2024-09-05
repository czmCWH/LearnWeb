
uni-app官网： <https://uniapp.dcloud.net.cn/>

> `uni-app === Vue + 原生小程序`

# 一、创建项目
<https://uniapp.dcloud.net.cn/quickstart-hx.html>

## 1.1、通过 HBuilderX 可视化界面

1、打开 HBuilderX 新建项目

* 【菜单栏】 =>【文件】=>【新建】=>【项目】

* 选择以下信息并创建：
	填写项目名 uni-app-project；
  默认模版；Vue3；

2、配置微信小程序 app id

打开项目 >【manifest.json】文件 >【微信小程序配置】

3、打开【微信开发者工具】开启服务端口

【微信开发者工具】> 【设置】> 【安全设置】> 开启【服务端口】

> 注意：只有开启【服务端口】，uni-app才能运行到小程序模拟器

4、运行项目到 【微信开发者工具】步骤：

	运行｜停止：进入【HBuilderX】>【运行、运行到小程序模拟器】> 选择【微信开发者工具】

5、新建页面

进入项目【pages目录】下的存放目录 > 右键【新建页面】> 填写页面名称、勾选在 `pages.json` 中注册


## 1.2、通过 vue-cli 创建 uni-app 项目

* 注意：此方式必须安装 NodeJS 环境

我选用 Vue3/Vite版，创建以 typescript 开发的工程，目前只支持创建默认模板。运行如下命令，具体可参考官网：

```shell
# 速度太慢，可直接在官网下载模版
$ npx degit dcloudio/uni-preset-vue#vite-ts my-vue3-project

# 安装依赖包
$ pnpm i
```

然后在 `src/manifest.json` 中添加 微信小程序 appid。根据 `package.json` 中的命令编译微信小程序，如下命令

```shell
# 编译运行小程序
$ pnpm run dev:mp-weixin
```
根据 VS Code 控制台提示将 `dist/dev/mp-weixin` 的编译文件，用【微信开发者工具】打开运行。

### 命令行方式创建 uni-app 项目的特点

* 通过命令行创建项目，不必依赖 HBuilderX。
* `HbuilderX` 对 `TS 类型` 支持暂不完善
* `VS Code` 对 `TS 类型` 支持友好，熟悉的编辑器
