// 声明给 Window 添加的属性，避免ts报错

declare global {
  interface Window {
    doSomething?: (text: string) => string // 参数名称和类型
    webkit: any
    JSBridge: any
  }
}

export {}
