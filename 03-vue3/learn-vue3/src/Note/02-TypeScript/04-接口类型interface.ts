/**
 * 👉 1、interface接口 类型
 * 作用: 在 TS 中使用 interface接口 来 `描述对象数据的类型`（常用于给对象的属性和方法添加类型约束）
 * 
 * 场景：在常规业务开发中比较典型的就是前后端数据通信的场景
 *   1. 前端向后端发送数据：收集表单对象数据时的类型校验
 *   2. 前端使用后端数据：渲染后端对象数组列表时的智能提示
 * 
 * 注意：一旦注解接口类型之后对象的 属性和方法类型都需要满足要求，属性不能多也不能少
 * 
 */
export {}

// 定义接口类型
interface Person {
  name: String,
  age: number
}

// 给变量添加接口类型注解
const p: Person = {
  name: 'jack',
  age : 19
}

/**
 * 👉 2、interface接口 的可选设置
 * 概念: 通过？对属性进行可选标注，赋值的时候 `该属性可以缺失`，如果有值必须保证类型满足要求。
 * 
 */

interface Good {
  id: number, 
  title: string,
  desc?: string
}

const goodList: Good[] = [
  { id: 1, title: '宝宝奶粉', desc: '喝了好聪明' },
  { id: 1, title: '宝宝奶粉' },
]

/**
 * 👉 3、interface接口 的继承
 * 概念：接口的很多属性是可以进行 `类型复用的`，使用 extends 实现接口继承，实现类型复用
 * 
 */

// 子接口继承
interface DiscountGood extends Good {
  price: number,
  disPrice: number
}

const disSoll: DiscountGood = {
  id: 1,
  title: '打折商品',
  price: 88,
  disPrice: 58
}
