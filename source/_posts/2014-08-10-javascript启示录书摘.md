---
layout: post
title: javascript启示录书摘
tags: javascript
---

## JavaScript 对象

### JavaScript 构造函数
如果使用 new 调用某函数，该函数则担任一个特殊的角色，将函数的 this 值设置为正在构建的新对象。并且构造函数还默认返回这个新构建的对象（即 this）。这个返回的新对象认为是构建该对象的构造函数的实例。

### typeof 操作符
typeof 操作符用于返回正在使用值的类型。
```javascript
var myNull = null;         // typeof myNull : object
var myUndefined = null;    // undefined
var str = 'str';           // string
var str = String('str');   // string, 没有 new，不会返回对象
var num = 1;               // number
var num = Number('1');     // number
var bol = true;            // boolean

var num = new Number('1'); // object, new
var str = new String('a'); // object, new
```
### contructor属性
碰到用 new 操作符实例化出来的对象，typeof 就无能为力了。这时，可以用 constructor 属性。

|  obj| obj.constructor |
|--------|--------|
|  obj = new Number('21'); | Number|
|obj = 1;|Number|
|obj = new String('abc');|String|
|obj = 'abc'|String|
|obj = true;|Boolean|
|obj = new Object();|Object|
|obj = {};|Object|
|obj = new Array();|Array|
|obj = new Function();|Function|
|obj = function(){ }; //字面量方式|Function|

### instanceof 操作符
instanceof 操作符可以验证指定对象是否是某个构造函数的实例。
```javascript
instanceObj instanceof ConstructorFunction
```
任何对象 instanceof Object 总是返回 true。

`instanceof 只适用于 new 构造函数创建返回的复杂对象和实例`

## 对象与属性

### 删除对象属性
```javascript
var foo = { bar: 'bar' };
delete foo.bar;
console.log('bar' in foo); // false,in 操作符不仅不仅能检查对象自身的属性而且能检查通过原型链继承过来的属性
```
##head 对象
### 什么是 head 对象
JavaScript 代码本身必须包含在对象内部。比如，在 Web 浏览器环境中编写 JavaScript 代码时，JavaScript 被包含在 window 对象内，并在其内部执行。这个 window 对象被认为实 “head” 对象。

head 对象是由 JavaScript 在幕后创建，用于封装用户自定义代码，并容纳 JavaScript 预定义的原生代码。在编写 Javascript 代码时，它将被编写在 head 对象的上下文中。
### head 对象内的全局函数
- decodeURL()
- decodeURLComponent()
- encodeURI()
- encodeURIComponent()
- eval()
- isFinite()
- isNaN()
- parseFloat()
- parseInt()
