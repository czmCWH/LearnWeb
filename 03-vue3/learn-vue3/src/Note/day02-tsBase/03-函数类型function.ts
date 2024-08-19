/**
 * 👉 1、函数类型
 * 
 * 概念：函数类型是指给函数添加类型注解，本质上就是给函数的 `参数和返回值` 添加类型约束
 * 
 * 说明：
 *  1. 函数参数注解类型之后不但限制了参数的类型还限制了参数为 `必填`;
 *  2. 函数返回值注解类型之后限制了该函数内部return出去的值必须满足类型要求;
 * 
 * 好处：
 * 1. 避免因为参数不对导致的函数内部逻辑错误     
 * 2. 对函数起到说明的作用
 * 
 */
export {}

// 1、函数声明方式
function add(a: number, b: number): number {
  return a + b
}

/**
 * 2、函数表达式(即 箭头函数)
 * 函数表达式的类型注解有俩种方式，即：参数和返回值分开注解；函数整体注解。
 */

// 分开注解
const add1 = (a: number, b: number): number => {
  return a + b
}

// 整体注解，通常在库文件中使用
type addFn = (p1: number, p2: number) => number
const add2: addFn = (a, b) => {
  return a + b
}

/**
 * 👉 2、函数的可选参数
 * 概念：可选参数表示当前参数可传可不传，一旦传递实参必须保证参数类型正确
 * 注意：可选参数必须放到必传参数的后面。
 * 
 * 如下示例，lastName参数表示可选参数，可传可不传，一旦传递实参必须保证类型为string类型
 */
function buildName(firstName: string, lastName?: string): string {
  if (lastName) {
    return `${firstName}${lastName}`
  } else {
    return firstName
  }
}

/**
 *  👉 2、函数无返回值 - void
 * 概念：JS中的有些函数只有功能没有返回值，此时使用 void 进行返回值注解，明确表示函数没有函数值
 * 
 * 在 JS 中如何没有返回值，默认返回的是 undefined；
 * 在TS中 void 和 undefined 不是一回事。
 *    undefined 在 TS 中是一种明确的简单类型，如果指定返回值为 undefined，那返回值必须是 undefined 类型。
 * 
 */
function eachArr(arr: number[]): void {
  arr.forEach((item) => {
    console.log(item)
  })
}


