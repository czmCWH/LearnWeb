/**
 * 👉 1、字面量类型
 * 概念：使用 js字面量 作为类型对变量进行类型注解，这种类型就是字面量类型, 字面量类型比普通的类型更加精确
 * 
 */
export {}


// 普通 number 类型，可以赋值给任意数值
let num1: number
num1 = 100
num1 = 200

// 字面量类型100，只能赋值100
let num2: 100
// num2 = 100
// num2 = 200 赋值非100会报错


/**
 * 👉 2、字面量类型的实际应用
 * 字面量类型在实际应用中通常和 联合类型结合起来使用，提供一个精确的可选范围。
 * 
 */

// 定义字面量类型 Grender
type Grender = '男' | '女'

const sex: Grender = '女'


/**
 * 👉 3、字面量类型与const
 * 说明：const声明的变量称之为常量，常量是不可以进行重新赋值的，所以str2推断出来的是字面量类型而不是string类型
 */

// str1 为 string 类型
let str1 = 'aaa'
str1 = 'bbb'
// str2 是 bbb 字面量类型
const str2 = 'bbb'
