#对象的__proto__ 与 构造器的 prototype

> 所有对象的 `__proto__` 都指向其构造器的 `prototype`

> 所有构造器/函数的__proto__都指向Function.prototype，它是一个空函数（Empty function）

```
Number.__proto__ === Function.prototype  // true
Boolean.__proto__ === Function.prototype // true
String.__proto__ === Function.prototype  // true
Object.__proto__ === Function.prototype  // true
Function.__proto__ === Function.prototype // true
Array.__proto__ === Function.prototype   // true
RegExp.__proto__ === Function.prototype  // true
Error.__proto__ === Function.prototype   // true
Date.__proto__ === Function.prototype    // true
```

```
// 函数声明
function Person() {}
// 函数表达式
var Man = function() {}
console.log(Person.__proto__ === Function.prototype) // true
console.log(Man.__proto__ === Function.prototype)    // true
```



**所有的构造器都来自于** Function.prototype

Function.prototype也是唯一一个typeof XXX.prototype为 “function”的prototype






