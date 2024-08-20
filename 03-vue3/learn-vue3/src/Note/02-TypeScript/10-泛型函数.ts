/**
 * 👉 1、泛型函数
 *
 * 语法：在函数名称的后面使用即可声明一个泛型参数，整个函数中（参数、返回值、函数体）的变量都可以使用该参数的类型
 *
 */

export {}

function createArr<T>(lenght: number, value: T) {
  const arr = []
  for (let i = 0; i < lenght; i++) {
    arr[i] = value
  }
  return arr
}

const arr = createArr<string>(6, '哈哈')
arr.length

/**
 * 👉 2、 泛型约束
 *
 * 作用：泛型的特点就是灵活不确定，有些时候泛型函数的内部需要访问一些特定类型的数据才有的属性，此时会有类型错误，需要通过泛型约束解决
 *
 * 泛型约束特点：既可以保留泛型的灵活性，又做了特定的限制
 */
interface LogenObj {
  length: number
}

function logLenght<T extends LogenObj>(obj: T) {
  console.log(obj.length)
}

logLenght({ length: 10 })
logLenght(['a', 'b', 'c', 'd'])
