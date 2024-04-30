# 为什么使用 Vue 3

## 框架层面发生了变化

- 1、响应式底层发生了变化
  Vue 2 响应式实现依赖于 ES5 中的 `Object.defineProperties()`，此方式存在效率问题，`Object.defineProperties()`只能劫持对象一个属性，存在多个属性时则需要通过遍历实现。

Vue 3 响应式实现依赖于 ES6 中的 `Proxy`，Proxy 对象用于创建一个对象的代理，从而实现对整个对象的基本操作的拦截和自定义。

所以 Vue 3 相对于 Vue 2 响应式效率更高。

- 2、Vue 3 增强了对 TS 的支持
  Vue 2 底层实现是 js; Vue 3 底层实现是 ts。

- 3、Vue 3 增加了对于组合式 API，增强了对于逻辑组合的能力
  Vue 2 使用 选项式 API，比如 `data() {}、computed: {}、created() {}、methods: {}` 等这些配置项都是可选的。

Vue 3 也支持 选项式 API，但不推荐。因为在 选项式API 中书写代码时，代码逻辑不集中，需要从好几个配置项中操作，导致很混乱。
Vue 3 组合式 API，去除了代码中的配置项，使得代码逻辑更集中。

- 4、Vue 3 工程化工具使用 Vite 效率更高，状态管理工具使用 pinia 更精简
  Vue 2 工程化工具使用 webpack，状态管理工具使用 Vuex。

## 市场层面

Vue 2 （2014～2021） 更新到 2.7 截止。

Vue 3 （2021～）需要 Node.js 版本 18+

## Vue 3 优势

> 更容易维护
> 组合式API、更好的 TypeScript 支持

> 更快的速度
> 重写 diff 算法；模版编译优化；更高效的组件初始化

> 更小的体积
> 良好的 TreeShaking （即打包时会自动剔除无效的代码）；按需引入

> 更优的数据响应式
> proxy 对象

# Vue 3 关于 VSCode 配置

> Vue 3 使用 `Volar 插件`，Vue 2 使用`Vetur 插件`

# Vue3 采用 SFC 单文件组件 script-template-style

相对于 Vue2 的变化：
脚本script 和 模版template 顺序调整；
模版template 不再要求唯一根元素；
脚本script添加 setup 标识来支持组合式API；
