# 一、pnpm 包管理器

pnpm 是一个包管理工具，和npm/yarn没有区别，主要优势在于：
* 包安装速度极快
* 磁盘空间利用效率高

pnpm 官网 <https://www.pnpm.cn/>


# 二、创建 Vue3 项目

Vue3 官网 <https://cn.vuejs.org/guide/quick-start.html>

根据 Vue3 官网快速创建项目命令如下：

```shell
$ npm create vue@latest

# 依次选择安装依赖包：TypeScript、Router、Pinia、ESLint、Prettier

# 切换到项目目录
$ cd <your-project-name>
# 安装项目依赖
$ npm install
# 运行项目
$ npm run dev
```

# Vscode 插件


# 三、使用 eslint 配置代码风格

这些配置都可以在 prettier 风格配置：<https://prettier.io/> 中找到。

进入项目的 `.eslintrc.cjs` 中添加：

```js
rules: {
  'prettier/prettier': [
    'warn',
    {
      singleQuote: true,    // 单引号
      semi: false,          // 不使用分号
      printWidth: 100,      // 一行宽度为 100 个字符
      trailingComma: 'none', // 不在数组|对象最后加逗号 
      endOfLine: 'auto'     // 由系统自动决定换行(win mac 不一致)
    }
  ],
  'vue/multi-word-component-names': [   // 允许组件名称为 index.vue，默认vue 组件需要大驼峰命名
    'warn',
    {
      ignores: ['index']
    }
  ],
  'vue/no-setup-props-destructure': ['off']   // 关闭props解构，默认prop 解构会丢失响应式
}
```

> 注意：如果 `vscode` 安装了 `Prettier` 插件的可以先 禁用，或者关闭保存自动格式化功能，避免和项目的 `Eslint` 风格冲突。


# 四、开启 TS 托管模式

1、`Volar` 语法高亮，代码提示，支持 `Vue3` 新特性

2、TypeScript Vue Plugin (Volar)让TS服务知道.vue文件

3、Take Over Mode 托管模式，`TS` 服务性能更好。开启 TS 托管模式步骤如下：
  3.1、关闭 vscode 内置的TS服务

  > 打开项目，搜索输入 `@builtin ty` 搜索 `JavaScript 和 TypeScript ...` > 点击搜索列表右下角设置 > 【禁用工作区】> 重启扩展

  3.2、使用 Volar 提供的TS服务

# 五、项目结构调整

```js
./src
├── assets        `静态资源，图片`
├── components    `通用组件`
├── composables   `新增组合功能通用函数 类似于Vue2的mixins`
├── icons         `新增svg图标`
├── router        `修改路由`
│   └── index.ts
├── services      `新增后台接口API`
├── stores        `全局状态仓库`
├── styles        `新增全局样式`
│   └── main.scss
├── types         `新增TS类型`
├── utils         `新增工具函数`
├── views         `页面`
├── main.ts       `修改入口文件`
└──App.vue        `修改根组件`
```

# 六、移动端适配


# 七、主题定制
之前主题定制采用 `sass`| `less` 变量来定制的，目前大多数库采用 css 变量来进行主题维护。