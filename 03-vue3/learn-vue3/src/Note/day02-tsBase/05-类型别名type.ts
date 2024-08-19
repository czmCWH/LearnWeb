/**
 *  👉 1、type(类型别名) 注解对象类型
 * 概念：在TS中对于对象数据的类型注解，除了使用 interface 之外还可以使用 type(类型别名) 来进行注解，作用相似
 * 
 */
export {}

// 使用定义对象类型的类型别名
type Animal = {
  name: string, 
  age: number,
  sex?: boolean
}

const ani: Animal = {
  name: 'jack',
  age: 18
}

/**
 * 👉 2、type + 交叉类型模拟继承
 * type(类型别名) 配合交叉类型（&）可以模拟继承，同样可以实现类型复用。
 */

type Dog = Animal & {
  say: string
}

const dog: Dog = {
  name: '汪汪',
  age: 2,
  say: 'doudou'
}

/**
 * 👉 3、interface 对比 type
 * 
 * 相同点：
 *  1. 都能描述对象类型；
 *  2. 都能实现继承，interface使用extends, type配合交叉类型；
 * 
 * 不同点：
 *  1. type除了能描述对象还可以用来自定义其他类型(类型别名)。
 *  2. 同名的interface会合并（属性取并集，不能出现类型冲突），同名type会报错。
 * 
 * 在注解对象类型的场景下非常相似，推荐一律使用type。
 * 
 */