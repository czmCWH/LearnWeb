/**
 * 👉 1、泛型
 * 
 * 泛型（Generics）是指在定义接口、函数等类型的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性, 
 * 使用泛型可以复用类型并且让类型更加灵活。
 * 
 * 👉 2、泛型接口
 * 
 * 语法：在接口类型的名称后面使用即可声明一个泛型参数，接口里的其他成员都能使用该参数的类型
 * 通用思路：
 * 1. 找到可变的部分 通过泛型抽象为泛型参数T（定义参数）
 * 2. 在使用泛型的时候，把具体类型传入到泛型参数位置 （传参）
 * 
 */
export {}

interface ResponseData<T> {
  message: string,
  code: number,
  data: T
}

interface User {
  name: string,
  age: number
}

const userData: ResponseData<User> = {
  code: 200,
  message: '请求成功',
  data: {
    name: 'jack',
    age: 18
  }
}

// 👉 3、泛型别名
// 语法：在类型别名type的后面使用即可声明一个泛型参数，接口里的其他成员都能使用该参数的类型

type ResData<T> = {
  message: string,
  code: number,
  data: T
}

type Good = {
  name: string
}

const good: ResData<Good> = {
  code: 200,
  message: '请求成功',
  data: {
    name: '薯片'
  }
}

