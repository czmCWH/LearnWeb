# JS 冷知识

## 1、isNaN() 和 Number.isNaN() 的区别

Number.isNaN() 方法确定传递的值是否为 NaN，并且检查其类型是否为 Number。它是 isNaN() 的更稳妥的版本。

和 isNaN()  相比，Number.isNaN() 不会自行将参数转换成数字，只有在参数是值为 NaN  的数字时，才会返回 true，否则返回 false。


```js
Number.isNaN(NaN); // true
Number.isNaN(Number.NaN); // true
Number.isNaN(0 / 0); // true

Number.isNaN({}); // false
Number.isNaN('NaN'); // false
Number.isNaN('blabla'); // false
Number.isNaN(undefined); // false

isNaN({}); // true
isNaN('NaN'); // true
isNaN('blabla'); // true
isNaN(undefined); // true
```

## 2、高性能向下取整

核心是利用了位运算：

```js
// 不推荐
const num = parseFloat(1.2);
const num = parseFloat('1.2');

// 推荐
const num = 1.2 >>> 0;
const num = '1.2' >>> 0;
```

## 3、高性能判断奇偶

跟上条一样，也是利用位运算：

```js
// 不推荐
if (num % 2) {
  console.log(`${num}是奇数`);
} else {
  console.log(`${num}是偶数`);
}

// 推荐
if (num & 1) {
  console.log(`${num}是奇数`);
} else {
  console.log(`${num}是偶数`);
}
```

## 4、setTimeout/setInterval

> 最大延迟时间 24.8 天

大多数浏览器都是以 32 个 bit 来存储延时值的，32bit 最大只能存放的数字是 2147483647，换算一下相当于 24.8 天。那么这就意味着 setTimeout 设置的延迟值大于做个数字就会溢出。

```js
setTimeout(() => {
  console.log('123');
}, 2147483647);

```

> setTimeout/setInterval 的第一个参数不一定是函数，也可以是字符串类型

```js
setTimeout(`console.log('balabala');`, 0);
```

> clearTimeout 和 clearInterval 可以互换。

setTimeout 和 setInterval 共用一个编号池，技术上，clearTimeout 和 clearInterval 可以互换（也就是说，可以用 clearTimeout 取消 setInterval 定时器，也可以用 clearInterval 取消 setTimeout 定时器）。但是，为了避免混淆，不要混用取消定时函数。关于这一点 MDN 中有相关的解释。


## 5、Math.min 和 Math.max

执行 Math.min 而不传参数的时候，得到的结果是 Infinity，执行 Math.max 而不传参数的时候，得到的结果是-Infinity：


```js
Math.min(); // Infinity
Math.max(); // -Infinity
```

## 6、节流与防抖

> 1、函数节流

```js
// 方法一：定时器
const throttle = function (fn: Function, delay: number) {
  let timer: NodeJS.Timer | null = null;
  return function () {
    const context = this;
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(context, arguments);
        if (timer) {
          clearTimeout(timer);
        }
      }, delay);
    }
  };
};

// 方法二：时间戳
const throttle2 = function (fn: Function, delay: number) {
  let preTime = Date.now();
  return function () {
    const context = this;
    let doTime = Date.now();
    if (doTime - preTime >= delay) {
      fn.apply(context, arguments);
      preTime = Date.now();
    }
  };
};

```

> 2、函数防抖

```js
function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timer | null = null;
  return function () {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func.apply(this, arguments);
    }, wait);
  };
}
```

## 7、判断一个对象是普通对象还是通过类创建的

```js
const isPlainObject = (obj: any): boolean => {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  let proto = Object.getPrototypeOf(obj);
  if (proto === null) {
    return true;
  }

  let baseProto = proto;
  while (Object.getPrototypeOf(baseProto) !== null) {
    baseProto = Object.getPrototypeOf(baseProto);
  }

  return proto === baseProto;
};
```


## 8、判断是否在浏览器环境

```js
const isBrowser = () => {
  return (
    typeof window !== 'undefined' &&
    typeof window.document !== 'undefined' &&
    typeof window.document.createElement !== 'undefined'
  );
};
```

## 9、判断是否为移动端

```js
const userAgent = () => {
  const u = navigator.userAgent;
  return {
    trident: u.includes('Trident'),
    presto: u.includes('Presto'),
    webKit: u.includes('AppleWebKit'),
    gecko: u.includes('Gecko') && !u.includes('KHTML'),
    mobile: !!u.match(/AppleWebKit.*Mobile.*/),
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
    android: u.includes('Android') || u.includes('Adr'),
    iPhone: u.includes('iPhone'),
    iPad: u.includes('iPad'),
    webApp: !u.includes('Safari'),
    weixin: u.includes('MicroMessenger'),
    qq: !!u.match(/\sQQ/i),
  };
};

const isMobile = () => {
  if (!isBrowser()) {
    return false;
  }
  const { mobile, android, ios } = userAgent();
  return mobile || android || ios || document.body.clientWidth < 750;
};
```

## 10、判断页面是否在 iframe 框架里

```js
const isInIframe = (): boolean => {
  try {
    return (
      self !== top ||
      self.frameElement?.tagName === 'IFRAME' ||
      window.frames.length !== parent.frames.length
    );
  } catch {
    return true;
  }
};
```


## 11、处理数字精度问题

```js
// 加
function add(arg1, arg2) {
  let digits1, digits2, maxDigits;
  try {
    digits1 = arg1.toString().split('.')[1].length || 0;
  } catch {
    digits1 = 0;
  }
  try {
    digits2 = arg2.toString().split('.')[1].length || 0;
  } catch {
    digits2 = 0;
  }
  maxDigits = 10 ** Math.max(digits1, digits2);
  return (mul(arg1, maxDigits) + mul(arg2, maxDigits)) / maxDigits;
}

// 减
function sub(arg1, arg2) {
  let digits1, digits2, maxDigits;
  try {
    digits1 = arg1.toString().split('.')[1].length || 0;
  } catch {
    digits1 = 0;
  }
  try {
    digits2 = arg2.toString().split('.')[1].length || 0;
  } catch {
    digits2 = 0;
  }
  maxDigits = 10 ** Math.max(digits1, digits2);
  return (mul(arg1, maxDigits) - mul(arg2, maxDigits)) / maxDigits;
}

// 乘
function mul(arg1, arg2) {
  let digits = 0;
  const s1 = arg1.toString();
  const s2 = arg2.toString();
  try {
    digits += s1.split('.')[1].length;
  } catch {}
  try {
    digits += s2.split('.')[1].length;
  } catch {}
  return (Number(s1.replace(/\./, '')) * Number(s2.replace(/\./, ''))) / 10 ** digits;
}

function div(arg1, arg2) {
  let int1 = 0;
  let int2 = 0;
  let digits1;
  let digits2;
  try {
    digits1 = arg1.toString().split('.')[1].length || 0;
  } catch (e) {
    digits1 = 0;
  }
  try {
    digits2 = arg2.toString().split('.')[1].length || 0;
  } catch (e) {
    digits2 = 0;
  }
  int1 = Number(arg1.toString().replace(/\./, ''));
  int2 = Number(arg2.toString().replace(/\./, ''));
  return ((int1 / int2) * 10) ** (digits2 - digits1 || 1);
}
```


顺便说一下，关于处理精度问题的解决方案，目前市面上已经有了很多较为成熟的库，比如 bignumber.js、decimal.js、以及 big.js 等，这些库不仅解决了浮点数的运算精度问题，还支持了大数运算，并且修复了原生 toFixed 结果不准确的问题。我们可以根据自己的需求来选择对应的工具。

最后提醒一下：这玩意儿也就面试的时候写一下，强烈建议业务中还是用现成的库，出了问题不负责



## 12、手写 Array.flat(Infinity)

```js
const isArray = Array.isArray;

const flatDeep = arr => {
  return arr.reduce((acc, val) => acc.concat(isArray(val) ? flatDeep(val) : val), []);
};

flatDeep([1, 2, [3, [4, [5, 6]]]]);
// [1, 2, 3, 4, 5, 6]
```


## 13、判断对象中是否存在某个属性的三种方法


1. hasOwnProperty()
hasOwnProperty方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性（不包含原型上的属性）：

```js
({ a: 1 }).hasOwnProperty('a'); // true
({ a: 1 }).hasOwnProperty('toString'); // false
```

2. in 操作符
in 操作符会返回一个布尔值，指示对象自身属性中是否具有指定的属性（包含原型上的属性）：

```js
'a' in { a: 1 }; // true
'toString' in { a: 1 }; // true
```

3. Reflect.has()
Reflect.has作用与in 操作符相同：

```js
Reflect.has({ a: 1 }, 'a'); // true
Reflect.has({ a: 1 }, 'toString'); // true
```

## 14、实现深拷贝

> 1、简易版
这个方法有些缺点，懂的都懂，不再废话了

```js
const newData = JSON.parse(JSON.stringify(data));
```

> 2、加强版

```js
const deepClone = obj => {
  const ans = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      ans[key] = obj[key] && typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key];
    }
  }
  return ans;
};

const newData = deepClone(data);
```

> 3、非主流版
structuredClone：原生 js 的深拷贝，因为是新出的，所以兼容差的要死，不建议使用

```js
const newData = structuredClone(data);
```

目前只有浏览器可以用，node 环境还不支持，并且只有最新几个版本的浏览器才能用

对了，而且这个方法不能拷贝函数，遇到函数会直接报错

> 4、终极版

```js
import { cloneDeep } from 'lodash';

const newData = cloneDeep(data);
```


## 15、让指定方法最多只能被调用 1 次

```js
/**
 * @param n 最多调用次数
 * @param func 回调函数
 */
function before(n, func) {
  if (typeof n !== 'number') {
    throw new TypeError('Expected a number');
  }
  if (typeof func !== 'function') {
    throw new TypeError('Expected a function');
  }
  let result;
  return function (...args) {
    if (--n >= 0) {
      result = func.apply(this, args);
    }
    if (n < 0) {
      func = null;
    }
    return result;
  };
}

function once(func) {
  return before(1, func);
}

// 使用：

const initialize = once(doSomething);

initialize(); // 只有第一次有效
initialize(); // 无效
initialize(); // 无效
```


## 16、判断是否为原生函数

> lodash 源码中是这样实现的：

```js
const reIsNative = RegExp(
  `^${Function.prototype.toString
    .call(Object.prototype.hasOwnProperty)
    .replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
    .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?')}$`
);

const isObject = value => {
  return value && ['object', 'function'].includes(typeof value);
};

const isNative = value => {
  return isObject(value) && reIsNative.test(value);
};

// 使用：
isNative([].push); // true
isNative(myFunction); // false
```

> vue 源码中是这样实现的：

```js
const reIsNative = /native code/;

const isObject = value => {
  return value && ['object', 'function'].includes(typeof value);
};

const isNative = value => {
  return isObject(value) && reIsNative.test(value.toString());
};

// 使用：
isNative([].push); // true
isNative(myFunction); // false

```
不知道 lodash 为啥实现的如此复杂，可能是因为 lodash 太老了吧，都多少年了……

## 17、不创建新变量的前提下，交换两个变量

方法一：四则运算
注意：由于 IEEE 754 标准的存在，第一种方法并不是一定安全的，可能会出现精度问题。

```js
let [a, b] = [1, 2];

a = a + b;
b = a - b;
a = a - b;

console.log(a, b); // 2 1
```

方法二：位运算


```js
let [a, b] = [1, 2];

a = a ^ b;
b = a ^ b;
a = a ^ b;

console.log(a, b); // 2 1
```

方法三：解构


```js
let [a, b] = [1, 2];

[a, b] = [b, a];

console.log(a, b); // 2 1
```

## 18、猜打印顺序

猜一猜下面代码的打印顺序：


```js
const object = { a2: '', 2: '', 1: '', a1: '' };

for (const key in object) {
  console.log(key);
}

```

先说答案：顺序是 1、2、a2、a1

解释：js 在对对象的 key 进行遍历的时候，会先判断 key 的类型，如果是 number 类型，则会放在前面，并且进行排序，如果是 string 类型，则放在后面，不进行排序（对 number 排序是为了方便内存寻址，string 不能进行四则运算，所以排序没有意义）。


## 19、猜打印结果

```
console.log(11);
```
结果：11

解释：普通的十进制数字，没啥好解释的

```
console.log(0.11); // .11 前面本来没有0 保存的时候编辑器自动格式化了，淦
```
结果：0.11

解释：如果数值前面的整数部分为 0，那么 js 允许我们省略

```
console.log(11); // 11. 后面有个. 保存的时候编辑器自动格式化了，淦
```
结果：11

解释：如果小数点后面的小数部分为 0，那么 js 允许省略

```
console.log(011);
```
结果：9

解释：如果数值前面以 0 开头，那么 js 会把它当成八进制，逢八进一

```
console.log(080);
```
结果：80

解释：因为八进制的数值里面不可能出现数字 8，所以这种情况下是无效的八进制，js 会当成十进制进行处理

```
console.log(0o11);
```
结果：9

解释：0o 开头的数值也会被当成八进制处理

```
console.log(0o80);
```
结果：报错

解释：0o 开头的数值会被当成八进制处理，但是八进制的数值里面不可能出现数字 8，所以直接报错了

```
console.log(0b11);
```
结果：3

解释：0b 开头的数值会被当成二进制处理

```
console.log(0x11);
```
结果：17

解释：0x 开头的数值会被当成十六进制处理

```
console.log(11e2);
```
结果：1100

解释：科学计数法，表示 11 * (10 ** 2)

```
console.log(11.toString());
```
结果：报错

解释：在数字转字符串的过程中，toString 方法被当成小数点后面的小数部分了，所以报错了，正确写法如下：

```js
// 方法一，小数点后面加空格
11. toString();

// 方法二，小数点后面再次调用toString
11..toString();

// 方法三，使用括号运算符提升优先级
(11).toString();

// 方法四，提前申明变量
const num = 11;
const string = num.toString();
```


## 参考博客

[li-jia-nan/Learning-notes](https://github.com/li-jia-nan/Learning-notes)





