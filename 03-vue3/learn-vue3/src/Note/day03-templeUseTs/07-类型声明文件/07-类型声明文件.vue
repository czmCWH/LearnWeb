<script setup lang="ts">
import axios from 'axios';

/**
 * 👉 1、类型声明文件
 * 概念：在TS中以 d.ts 为后缀的文件就是 类型声明文件。主要作用是为 js模块 提供类型信息支持，从而获得类型提示。
 * 
 * 1. d.ts是如何生效的？
 * 在使用js某些模块的时候，TS会自动导入模块对应的d.ts文件，以提供类型提示
 * 
 * 2. d.ts是怎么来的？
 * 库如果本身是使用TS编写的，在打包的时候经过配置自动生成对应的 .d.ts文件（比如：axios本身就是TS编写的）
 * 
 * .ts 文件的特点：
 * 1. 既可以包含类型信息也可以写逻辑代码
 * 2. 可以被编译为js文件
 * 
 * .d.ts 文件的特点：
 * 1. 只能包含类型信息不可以写逻辑代码
 * 2. 不会被编译为js文件，仅做类型校验检查
 * 
 * 
 */

/**
 * 👉 2、使用 DefinitelyTyped 提供类型声明文件
 * 
 * 有些库本身并不是采用TS编写的(如：jquery)，无法直接生成配套的 .d.ts文件，但是也想获得类型提示，此时需要 Definitely Typed 提供类型声明文件。
 * DefinitelyTyped是一个TS类型定义的仓库，专门为JS编写的库可以提供类型声明。
 * 
 * 在 ts 中使用 jquery 库时，可以安装 @types/jquery 为jquery提供类型提示。
 * 
 */  

/**
 * 👉 3、自定义类型声明文件
 * .d.ts文件 在项目中是可以进行自。定义创建的，通常有俩种作用，一是共享TS类型（重要）；二是给js文件提供类型（了解）。
 */ 

// 加上type关键词，来区分普通模块
import type { Goods, Order } from './type.js'

const good: Goods = {
  name: '蛋糕',
  price: 109.00
}
const order: Order = {
  id: '12389768',
  time: '20224-08-018'
}


</script>

<template>
  <div>

  </div>
</template>

<style scoped>

</style>