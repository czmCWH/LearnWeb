# 创建 Vue3 + TypeScript 项目

如下使用 vite 快速创建 Vue + TS 项目：

```
$ npm create vite@latest ts-demo -- --template vue-ts
```

1. npm create vite@latest    基于最新版本的vite进行项目创建
2. ts-demo    项目名称
3. -- --template vue-ts    选择Vue + TS的开发模板


# VScode 插件

1. `Volar 插件` 用于对.vue文件进行实时的类型错误反馈
2. `TypeScript Vue Plugin 插件` 用于支持在 TS 文件中 import *.vue 文件

# package.json 依赖库

```
"prettier": "^3.2.5",
"typescript": "~5.4.0",   // typeScript 包，用于把ts编译为js代码
"vite": "^5.3.1",
"vite-plugin-vue-devtools": "^7.3.1",
"vue-tsc": "^2.0.21"    // 负责打包时最终的类型检查，即打包时进行类型检查
```