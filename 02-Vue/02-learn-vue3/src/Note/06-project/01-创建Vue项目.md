# 一、pnpm 包管理器

pnpm 是一个包管理工具，和npm/yarn没有区别，主要优势在于：
* 包安装速度极快，比同类工具快2倍左右；
* 磁盘空间利用效率高；

pnpm 官网 <https://www.pnpm.cn/>

```shell
$ npm install -g pnpm
$ which pnpm
```

# 二、创建 Vue3 项目

Vue3 官网 <https://cn.vuejs.org/guide/quick-start.html>

根据 Vue3 官网快速创建项目命令如下：

```shell
$ npm create vue@latest

# 依次选择安装依赖包：TypeScript、Router、Pinia、ESLint、Prettier
✔ 请输入项目名称：h5-template
✔ 是否使用 TypeScript 语法？否 / `是`
✔ 是否启用 JSX 支持？否 / 是
✔ 是否引入 Vue Router 进行单页面应用开发？否 / `是`
✔ 是否引入 Pinia 用于状态管理？否 / `是`
✔ 是否引入 Vitest 用于单元测试？否 / 是
✔ 是否要引入一款端到端（End to End）测试工具？ › 不需要
✔ 是否引入 ESLint 用于代码质量检测？否 / `是`
✔ 是否引入 Prettier 用于代码格式化？否 / `是`
✔ 是否引入 Vue DevTools 7 扩展用于调试? (试验阶段)否 / `是`

项目初始化完成，可执行以下命令：

  cd vue-project
  npm install
  npm run format
  npm run dev

# 切换到项目目录
$ cd <your-project-name>
# 安装项目依赖
$ npm install
# 运行项目
$ npm run dev
```

# 三、安装 VS Code 插件

1. `Vue - Official`，之前是 Volar。提供了Vue 单文件组件中的 TypeScript 支持；智能感知；错误检查等
2. `TypeScript Vue Plugin`，用于支持在 TS 文件中 import *.vue 文件
3. 


### 开启 TS 托管模式（目前使用了Vue - Official，此配置用不着）

1、`Volar` 语法高亮，代码提示，支持 `Vue3` 新特性

2、TypeScript Vue Plugin (Volar)让TS服务知道.vue文件

3、Take Over Mode 托管模式，`TS` 服务性能更好。开启 TS 托管模式步骤如下：
  3.1、关闭 vscode 内置的TS服务

  > 打开项目，搜索输入 `@builtin ty` 搜索 `JavaScript 和 TypeScript ...` > 点击搜索列表右下角设置 > 【禁用工作区】> 重启扩展

  3.2、使用 Volar 提供的TS服务


# 四、项目插件配置

## 4.1、使用 eslint 配置代码风格

这些配置都可以在 prettier 风格配置：<https://prettier.io/docs/en/options.html> 中找到。

### 进入项目的 `.eslintrc.cjs` 中添加项目自己的代码风格：

用来覆盖 prettier 的默认代码风格。

```js
rules: {
  'prettier/prettier': [
    'warn',
    {
      singleQuote: true,    // 单引号
      semi: false,          // 不使用分号
      printWidth: 80,      // 一行宽度为 80 个字符
      trailingComma: 'none', // 不在【数组|对象】最后加逗号 
      endOfLine: 'auto'     // 由系统自动决定换行(win mac 不一致)
    }
  ],
  'vue/multi-word-component-names': [   // 允许组件名称为 index.vue，默认vue 组件需要大驼峰命名
    'warn',
    {
      ignores: ['index']
    }
  ],
  'vue/no-setup-props-destructure': ['off']   // 由于props解构默认会丢失响应式，所以当进行props解构时会有错误提示，此时关闭props解构，就可以避免错误提示，再再后面开启【props解构语法糖】
}
```

> 要实现保存之后自动修复功能？
> 安装 Eslint 且配置保存修复，不要开启默认的自动保存格式化，这样会冲突。

`npm lint`：使用 Eslint 修复所有文件代码风格。

### 使用 eslint 命令分析代码

根据项目 `package.json` 中配置的 eslint 命令，如下切换到项目目录对项目所有文件进行静态地分析：

```shell
$ npm run lint
```

> 注意：如果 `vscode` 安装了 `Prettier` 插件的可以先 禁用，或者关闭保存自动格式化功能，避免和项目的 `Eslint` 风格冲突。

eslint 其它配置可参考微信公众号【前端工匠】 <https://mp.weixin.qq.com/s/k2ComniGiMmFXD-3yk746g>

* 打开 VS Code 的 JSON 格式的配置文件 开启 eslint  自动修复

```shell
"editor.codeActionsOnSave": {
    "source.fixAll": true,
},
```

## 4.2、其它插件

* 哈士奇 husky：用于在 git 提交代码前，检查代码是否存在错误，并阻止git提交到仓库。

https://typicode.github.io/husky/

* lint-staged：husky 是对所有的代码就行检查，安装 lint-staged 插件只对修改的文件做代码检查。


## 4.3、配置 vite.config.ts

* 允许对父传子 props 进行解构，我们会开启解构保持响应式的语法糖

<https://vuejs.org/guide/extras/reactivity-transform.html#explicit-opt-in>

```json
export default {
  plugins: [
    vue({
      reactivityTransform: true
    })
  ]
}
```

# 五、项目结构调整

```js
./src
├── assets        `静态资源，图片`
├── components    `通用组件`
├── composables   `新增组合功能通用函数（数据和逻辑组合在一起） 类似于Vue2的mixins`
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

# 六、安装其它插件适配移动端


# 七、主题定制

之前主题定制采用 `sass`| `less` 变量来定制的，目前大多数库采用 css 变量来进行主题维护。

创建 `styles/main.scss` 文件，定义项目的颜色风格：

```css
:root {
  // 问诊患者：色板
  --cp-primary: #16C2A3;
  --cp-plain: #EAF8F6;
  --cp-orange: #FCA21C;
  --cp-text1: #121826;
  --cp-text2: #3C3E42;
  --cp-text3: #6F6F6F;
  --cp-tag: #848484;
  --cp-dark: #979797;
  --cp-tip: #C3C3C5;
  --cp-disable: #D9DBDE;
  --cp-line: #EDEDED;
  --cp-bg: #F6F7F9;
  --cp-price: #EB5757;
  // 覆盖vant主体色
  --van-primary-color: var(--cp-primary);
}
```

## 解决波浪号



https://github.com/zeorcpt/vue3-vant-mobile