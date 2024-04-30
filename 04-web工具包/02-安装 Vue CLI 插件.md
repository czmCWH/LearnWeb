# 安装 Vue CLI 插件

可直接参考 [Vue CLI](https://cli.vuejs.org/zh/guide/installation.html) 安装即可。

```shell
# 查看安装结果
$ vue --version
@vue/cli 5.0.8

# 查看安装目录 
$ which -a vue
/usr/local/bin/vue

# 卸载  Vue CLI 
$ rm /usr/local/bin/vue
```

## 通过 [Vue CLI 创建一个项目](https://cli.vuejs.org/zh/guide/creating-a-project.html#vue-create)

1、方式一、通过命令行初始化项目
```
$ vue create mall-project

$ cd mall-project
$ npm run serve
```


2、方式二、可视化初始化、配置Vue项目

```
// 通过 vue ui 命令以图形化界面创建和管理项目：
$ vue ui
```

## 生成的前端项目模版

```
my-project
├─ node_modules
├─ public       // 可以把大图片放在此处，webpack 会抽取图片资源，把大图用请求加载，小图片会打包base64
├─ resource
├─ src
│	├─ assets       // 静态图片
│	├─ components   // 组件
│	├─ pages        // 存放页面
│	├─ api          // 接口请求函数
│	├─ util         // 公共方法，比如：格式化转换
│	├─ storage      // 数据存储
│	├─ App.vue      // 根组件    
│	├─ main.js
│	├─ router.js    // 存储路由
├─
└─ ···
```


## 包文件 package.json

插件：内置框架性插件，用于辅助项目开发，不会被编译到项目中。比如：`@vue/cli-service`、`@vue/cli-plugin-babel`、`@vue/cli-plugin-eslint`。

`devDependencies`(开发依赖)：也是辅助性插件，比如：`@babel/core`、`@babel/eslint-parser`、`eslint`、`eslint-plugin-vue`。

`dependencies`(运行依赖)：比如：`core.js`、`vue`。

* `"scripts"`：表示可执行命令，`scripts` 中的 `key` 的值可以随意改，`value` 表示执行的命令。

`dependencies` 和 `devDependencies` 都表示项目依赖，在开发阶段都会被使用。

* `dependencies`：生产依赖，开发和生产环境都生效。

* `devDependencies`：开发依赖，只在生产环境生效。

```json
{
"scripts": {
    "dev": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "report": "vue-cli-service build --report"   // 表示打包报告
  },
  "dependencies": {
    "axios": "^0.18.1",
    "core-js": "^3.30.0",
    "vue": "2.6.10",
    "vue-router": "^3.6.5",
    "vuex": "3.1.0"
    // ...
  },
  "devDependencies": {
    "@vue/cli-plugin-babel": "4.4.4",
    "@vue/cli-plugin-eslint": "4.4.4",
    // ...
  }
}
```


|  | npm下载方式 | 作用 |
|---|---|---|
| dependencies | npm i dayjs | 和业务代码相关，参与打包 |
| devDependencies | npm i sass -D | 提供开发环境下工程化支持，不参与打包 |




# 三、安装 Vue DevTools 浏览器插件

`Vue DevTools` 是用于调试 Vue.js 应用程序的浏览器开发工具扩展。

方式一：直接通过 【谷歌应用商店】搜索 `Vue.js devtools` 安装。

方式二：下载[vuejs/devtools](https://github.com/vuejs/devtools)工程打包安装。
具体使用参考[VUE 配置vue-devtools调试工具](https://www.imooc.com/article/294527)