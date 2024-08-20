/**
 * 👉 1、as 类型断言 
 * 
 * 作用：有些时候开发者比TS本身更清楚当前的类型是什么，可以使用 `断言（as）让类型更加精确和具体`。
 * 
 * 类型断言as 只能够「欺骗」TypeScript 编译器，无法避免运行时的错误，滥用类型断言可能会导致运行时错误。
 * 
 * 
 */
export {}

const link1 = document.getElementById('link')
// 此时得出 link1 的类型为  HTMLElement | null

// 如果开发者很清楚变量类型，使用 as 类型断言
const link2 = document.getElementById('link') as HTMLAnchorElement
link2.href

