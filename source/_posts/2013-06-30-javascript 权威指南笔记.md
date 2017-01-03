---
layout: post
date: 2013-06-30  22:11:07 +0800
title: javascript 权威指南笔记
tag: javascript
---


## 第1章 概述
	
## 第2章 词法结构
所谓直接量(literal) .就是程序中直接使用的数据值

## 第3章 类型、值和变量
Javascript 是一种面向对象的语言。
这意味着不再需要定义全局的函数去操作不同类型的值——数据类型本身可以定义方法来使用值。

数字、布尔值、null和undefined属于不可变类型

JavaScript变量是无类型的(untyped)，变量可以被赋予任何类型的值

JavaScript采用词法作用域(lexical scoping)。
不在任何函数内声明的变量称做全局变量(global variable) ，它在JavaScript程序中的任何地方都是可见的.

JavaScript中的所有数字均用浮点数值表示。

```javascript
	Math.pow(2 , 53) => 90199254740992: 2 的53次
    Math.round(.6) => 四舍五入 
	Math.ceil(.6) => 向上求整 
	Math.f1oor(. 6) => 向下取整
	Math.abs(-5) => 求绝对值
	Math.max(x,y,z,e,f) => 所有参数中的最大值
    Math.min(x,y,z) => 所有参数中的最小值
	Math.random() => 生成一个大于等于0 小于1. 0的伪随机数
	Math.PI
	Math.E
	Math.sqrt(3)
	Math.pow(3 ， 1/3)
```
JavaScript中的非数字(NaN)值有一点特殊:它和任何值都不相等，包括自身 NaN != NaN

```javascript
var now = new Date(); //当前日期和时间
var elapsed = now - then; //日期减法 计算时间间隔的毫秒数
```
字符串(string) 是一组由16位值组成的不可变的有序序列，每个字符通常来自于 Unicode字符集,比如cant,Reillys 。因为撇号和单引号是同一个字符，所以必须使用反斜线来转义

```javascript
var s = "hello， world"
s.charAt(o);
s.charAt(s.length-1)
s.substring(startIndex,endIndex) 
s.substr(startIndex,length)
s.slice(1,4)
s.slice(-3)
s.indexOf("l")
s.lastlndexOf("l")
s.indexOf("l", 3)
s.split(", ") 字符串分割成数组,相对于 Array.join()

//下面这些值可以被转换成 false
undefined
null
0
-0
NaN
"" // 空字符串
```

## 第4章 表达式和运算符

```javascript
var a,b = 0;
(a = b) == 0  // => true
先执行括号内的赋值语句, 后进行相等判断

赋值操作的结合性是从右到左
所以,可以
i = j = k = 0;

`data[i++] = data[i++] *2 `
```

由于所有 对象和数组 的typeof运算结果是"object" 而不是"function"，因此它对于
区分对象和其他原始值来说是很有帮助的, function 的 typeof 才是 "function"。

如果想区分对象的类，则需要使用其他的手段，如使用instanceof运算符

```javascript
var a = [1,2,3,4];
delete a[3];  =>  [1, 2, 3, undefined × 1]
a.length => 4;
// 只是在原位置抹去了，但空位置还留着,长度不变
```
通过 var 声明的变量是不能删除的，所以 没 var 生成的变量是可删除的。


## 第5章 语句

```javascript
//适用空语句，初始化一个数组a
for(i = 0; i < a.length; a[i++] = 0) ;
```
变量声明语句会被 "提前"(hoisting) 至脚本或者函数的顶部。但是初始化的操作则还在原来var语句的位置执行，在声明语句之前变量的值是undefined 。

注意，多次声明同一个变量是无所谓的。
先声明且赋值后，再次声明时值不会被 undefined 定义。

```javascript
var a = 1;
var a;  // => a == 1
```

函数定义不能出现在if语句、while循环或其他任何语句中.

```javascript
for(initialize ; test ; increment)
```

## 第6章 对象
对象直接量是一个表达式，这个表达式的每次运算都创建井初始化一个新的对象。
如果在一个重复调用的函数中的循环体内使用了对象直接量，它将创建很多新对象，井且每次创建的对象 的属性值也有可能不同。


```javascript
var o  = Object.create(null);  // => 会创建一个完全的空对象，没有从 Object 继承来的方法
var o1 = {};	// => 存在原型链，带有继承的方法

// 下面这两个效果一样
var o2 = Object.create({});
var o3 = Object.create(Object.prototype); 
```

### Object() 
Object() 函数将各种值，转化为对应的对象

```javascript
Object(1)
Number {[[PrimitiveValue]]: 1}

Object("a")
String {0: "a", length: 1, [[PrimitiveValue]]: "a"}

```

### Object.keys,Object.getOwnPropertyNames() 区别
```javascript
	var o = {
		p1: 12,
		p5: "ok",
		p6: "ok"
    }		
	Object.keys(o)
	// ["p1","p5","p6"]

	Object.getOwnPropertyNames(o);
	// ["p1","p5","p6"]

// 对于一般对象来说，这两个方法返回的结果是一样的，只有涉及枚举，不可枚举的属性时才会有不同结果。

var a = ["hello","world"];

Object.keys(a);

// ["0","1"]

Object.getOwnPropertyNames(a)
// ["0","1","length"]

// lenght 是不可枚举属性，所以只出现在 getOwnPropertyNames 下.

```

那么，问题来了，Object(对象呢？)

```javascript
Object({"a":1})
// => 传对象反对象
Object {a: 1}	

// 用处：
function isObject(target) {
	// 只有对象被返回原对象时还是自身
	return target === Object(target);
}

```


## 第7章 数组

```javascript
a = [1,2,3,4,5,6]
a.length = 0;  // 删除其余元素
a => [] 
```

如果想跳过"不存在"的元素而仍然要处理存在的 undefined（元素存在，只是没有赋值） 的元素，则

```javascript
for (var i = 0, i < a.length; i++ ) {
	if(!(i in a)) continue; // 跳过不存在的元素
}
```

即，判断属性存在不存在用‘'in'


```javascript
a.join() // 方法将数组中所有元素都转化为字符串井连接在一起，返回最后生成的字 符串。可以指定一个可选的字符串在生成的字符串中来分隔数组的各个元素

Array.reverse();  // 逆向

// 假设第一个参数应该在前，则比较函数应该 return 一个小于0的数.
Array.sort(function(a,b){
		return true/false;
	});

Array.concat // 方法创建井返回一个新数组，它的元素包括调用concat() 的原始数组的 元素和concat() 的每个参数。

var a = [1,2,3]
a.concat(5,6); => [1,2,3,5,6];

var b = [2,5];
b.concat[6,[8,[9]]] => 创建并返回一个新数组 [2,5,6,8,[9]]; 元素组不变.

Array.slice(startIndex,endIndex) // 返回指定数组的一个片段或子数组。
	
Array.splice 删除或插入数组

// 在尾部插入删除
Array.push(); // 数组末尾添加，返回最新长度 return length
Array.pop(); // 删掉并返回末尾值

// 在头部插入删除
Array.unshift(); // 在头部插入，并返回新长度
Array.shift();  // 在头部删除并返回头部值

forEach

map // 老值对新值 即为 map

a = [1,2,3];                              ==> [1,2,3]

b = a.map( function (x) { return x*x; }); ==> [1,4,9]
==> map


fliter() 方法返回的数组元素是调用的数组的一个子集。
a = [1,2,3,4,5,6];
a.filter(function(){ return x < 3;}); =>  [1,2]

every() 和some()方法是数组的逻辑判定:它们对数组元素应用指定的函数进行判定，返
回true或false 。
a = [1, 2, 3, 4, 5];
a.every(function(x) { return x < 10; }) // =>true: 所有的值<10
a.every(function(x) { return x % 2 === 0; }) // => false: 不是所有的值都是偶数 一旦everyO 和someO 确认该返回什么值它们就会停止遍历数组元素


// 检测是否数组
Array.isArray([])
```

使用instanceof的问题是在Web浏览器中有可能有多个窗口或窗体(frame) 存在。每个
窗口都有自己的JavaScript环境，有自己的全局对象。
因此一个窗体中的对象将不可能是另外窗体中的构造函数的实例.
跨窗体的问题。

```javascript
Object.prototype.toString.call([]);  => "[object Array]"
Object.prototype.toString.call({});  => "[object Object]"
Object.prototype.toString.call('');  => "[object String]"
Object.prototype.toString.call(new Date) => "[object Date]"
Object.prototype.toString.call(null) =>  "[object Null]"
Object.prototype.toString.call(undefined) => "[object Undefined]"
Object.prototype.toString.call(alert) => "[object Function]"
```

一种常常完全合理的看法把拥有一个数值length属性和对应非负整数属性的对象看
做一种类型的数组。

虽然不能在它们之上直接调用数组方能或者期望length属性有什么特殊的行为，但是仍然可以用针对真正数组遍历的代码来遍历它们。
既然类数组对象没有继承自Array.prototype ，那就不能在它们上面接调用数组方法。尽管如此，可以间接地使用Function.call方单调用:

```javascript
var str = "abc";
str.charAt(0); => "a"
str[0];        => "a"
```
字符串的行为类似于数组的事实使得通用的数组方撞可以应用到字符串上。

```javascript
var s = "javascript"
Array.prototype.join.call(s,'-'); => "j-a-v-a-s-c-r-i-p-t" //NB!
```

// 字符串是不可变值,把它们当做数组看时,它们是只读的,更改无效



## 第8章 函数
## 第9章 类和模块
## 第10章 正则
## 第11章 
## 第12章
## 第13章
## 第14章
一个Web浏览器窗口可能在桌面上包含多个标签页。每一个标签页都是独立的"浏览上下文" (browsing context) ，每一个上下文都有独立的Window对象，而且相互之间互不干扰。

一个窗口或标签页中的脚本可以打开新的窗口或标签页，当一个脚本这样做时，这样多个窗口或窗口与另一个窗口的文档之间就可 以互操作.

<iframe>所创建的嵌套浏览上下文是用它自己的Window对象所表示的。

对于客户端 JavaScript来说，窗口、标签页、iframe和框架都是浏览上下文, 对于JavaScript来说，它
们都是Window对象。和相互独立的标签页不同，嵌套的浏览上下文之间井不是相互独 立的。在一个窗体中运行的JavaScript程序总是可以看到它的祖先和子孙窗体，尽管脚本 查看这些窗体中的文档受到同据策略的限制。

因为Window是客户端JavaScript的全局对象，每个窗口或窗体都包含独立的JavaScript执行上下文。

open() 的第一个参数是要在新窗口中显示的文档的URL。
open() 的第二个参数是新打开的窗口的名字。如果指定的是一个已经存在的窗口的名字
(井且脚本允许跳转到那个窗口) ，会直接使用已存在的窗口

在 iframe 中，可以使用保留的名字"_top" (顶级祖先窗口)和"_parent" (直接父级窗口)来获取彼此的浏览上下文。

窗口的名字是非常重要的，因为它允许openO 方法引用已存在的窗口，并同时可以
作为<a>和dorm> 元素上HTML target属性的佳，用来表示引用的文档(或表羊提
交结果)应该显示在命名的窗口中。这个target属性的值可以设直为"_blank" 、
"_parent" 或"_top" ，从而使引用的文档显示在新的空白窗口、父窗口/窗体或
顶层窗口中。

open() 的第三个可选参数是一个以逗号分隔的列表，包含大小和各种属a性

Window对象的方法 open() 返回代表新创建的窗口的Window对象。而且
这个新窗口具有opener属性，该属性可以打开它的原始窗口

top属性是一个通用的快捷方式，无论一个窗体被嵌套了几层，它的top属性引用的都是指向包含它的顶级窗口

窗体是通过<iframe>元素创建的.

<iframe>元素有contentWindow属性，引用该窗体的Window对象，所以此窗体的Window 对象就是:
var childFrame = document.getElementById("fl").contentWindow;

每个Window对象都有一个frames属性，它引用自身包含的窗口或窗体的子
窗体。frames属a性引用的是类数组对象，井可以通过数字或窗体名进行索引。

每个Window都有自己的原型对象，这意味着instanceof操作符不能跨窗口
工作。

我们称为"Window对象"的对象实际上不是全局对象，而
是全局对象的一个代理。


前段时间我还给人讲过一句话：
为了玩刀而上战场的人大都死于刀下，临死时怪自己的刀没有选好。
为了杀人而上战场的人大都成了将军，临死时放下屠刀立地成佛了。
所以，程序员要想成佛，不但要追求编程境界，还要学会在残酷的现实中拼杀，解决具体的问题才行。



## 第15章
## 第16章
## 第17章
## 第18章
## 第19章
## 第20章
## 第21章
## 第22章

既然类数组对象没有继承自Array.prototype ，那就不能在它们上面直

