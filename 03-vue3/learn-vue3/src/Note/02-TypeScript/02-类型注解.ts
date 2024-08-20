/*
👉 1、TS类型注解是什么

概念：类型注解指的是给 变量 添加类型约束，使变量 `只能被赋值为约定好的类型`, 同时拥有 `相关的类型提示`(如：类型的属性、方法等)。

👉 2、TS支持的常用类型注解
1、JS已有类型：
  * 简单类型：number  string  boolean  null  undefined
  * 复杂类型：数组、函数

2、TS新增类型
  * 联合类型、类型别名、接口（interface）、字面量类型、泛型、枚举、void、any等

*/
export {}

const name: String = '哈哈'
const age: Number = 18
const isLoading: Boolean = false
const nullValue: null = null
const unValue: undefined = undefined

/**
 * 数组使用ts类型注解的好处：
 *   不仅可以限制变量类型为数组而且可以限制数组成员的类型；
 *   编码时不仅可以提示数组的属性和方法而且可以提示成员的属性和方法；
 */

// 语法一（推荐）：
const arr1: number[] = [1, 2, 3]
// 语法二（泛型写法）：
const arr2: Array<number> = [1, 2, 3]

function uniTsType() {
  /**
   * 1、联合类型：将多个类型合并为一个类型对变量进行注解
   *
   */

  // string | number 表示arr3中的成员既可以是string类型也可以是number类型
  const arr1: (string | number)[] = [1, 'a', 3, 2, 'b']

  /**
   * 👉 3、类型别名，通过 type关键词 给写起来较复杂的类型起一个其它的名字，用来简化和复用类型
   *
   * type 类型别名 = 具体类型  其中类型别名的命名采用规范的大驼峰格式
   */

  type arrType = (string | number)[]

  const arr2: arrType = [1, 'a', 3, 2, 'b']
}
