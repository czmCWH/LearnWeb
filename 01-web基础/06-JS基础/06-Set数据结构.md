# Set数据结构

**ES6** 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。

## 一、Set 初始化

```javaScript
// 1、构造函数初始化Set
const s = new Set();

// 2、用数组初始化
const s1 = new Set([22, 33, 22, 2, 33, 1]);
console.log(s1.size, s1); // 4 {22, 33, 2, 1}
```

* Set 常用于数组去重

```javaScript
let arr = [22, 33, 22, 2, 33, 1];
const s2 = new Set(arr);
arr = [...s2];
console.log(arr); // [22, 33, 2, 1]
```

### 1.1、Set的基本API

```javaScript
const set = new Set();
		
// 1、add 为Set结构中添加值
set.add(1).add(2).add('a');
console.log(set); // {1, 2, 'a'}
	
// 2、Set结构中删除值
const res = set.delete('a');
console.log(res, set); // true {1, 2}

// 3、判断某个值是Set里面的成员
const isHave = set.has(2);
console.log(isHave); // true

// 4、清空Set里面的成员
set.clear();
console.log(set.size); // 0
```