---
layout: post
date: 2014-11-09 00:33:53 +0800
category: collection
title: code-skill
---


### 带前缀方法声明

```javascript
	var thisFunc,
			prefixList = ['webkit', 'moz', 'ms'];
		
		//check each method for availability, when one is found,
		//use that
		for (var i=0; i < 2; i++) {
			thisFunc = prefixList[i] + 'RequestAnimationFrame';

			if(window[thisFunc]) {
				return function(callback) {
					window[thisFunc](callback);
				}
			}
		}
```

### Function.prototype.bind 创建函数


```javascript

someFunction() { 
   this.x = 54;	
}

var goOut = {
	x: 722
} 

var newLife = someFunction.bind(goOut);
newLife(); // this.x => 722

// another one 
// 偷梁换柱
["log", "info", "warn", "error"].forEach(function(method) {
    console[method] = console[method].bind(
        console, // used for `this`
        new Date().toISOString()
    );
});

```
### 随机整数
```javascript

// '|' 对它的整型操作数逐位执行布尔或(OR) 操作。
// 如果其中一个操 作数相应的位为1 ，或者两个操作数相应位都是1 ，那么结果中的这一位就为1
Math.random()*10|0 // 按位或()
Math.random()*16|0
```

### 数组转换
```javascript
 // 类数组转数组
 var args = [].slice.call(arguments);

 // 数组转字符串(数组元素连到一块儿)
 var strs = [1,2,3].join(",");

 // 字符串转数组
 var arr = "1,2,3".split(",");
```

### 改写setTimeout
改进setTimeout方法，让其返回一个deferred对象。

```javascript
function doSomethingLater(fn, time) {
  var dfd = $.Deferred();
  setTimeout(function() {
    dfd.resolve(fn());
  }, time || 0);
  return dfd.promise();
}

var promise = doSomethingLater(function (){
  console.log( '已经延迟执行' );
}, 100);
```

### 批量创建函数
```javascript
// 引子,比 typeof运算符 更准的类型判断函数
var type = function (o){
    var s = Object.prototype.toString.call(o);
    return s.match(/\[object (.*?)\]/)[1].toLowerCase();
};

// 主角
['Null',
 'Undefined',
 'Object',
 'Array',
 'String',
 'Number',
 'Boolean',
 'Function',
 'RegExp',
 'Element',
 'NaN',
 'Infinite'
].forEach(function (t) {
    type['is' + t] = function (o) {
        return type(o) === t.toLowerCase();
    };
});

// =>
type({}); // "object"
type([]); // "array"
type(5); // "number"
type(null); // "null"
type(); // "undefined"
type(/abcd/); // "regex"
type(new Date()); // "date"

```
### 判断是否为对象

```javascript
    // 如果 Object 函数的参数是对象，它总是返回原对象
	function isObject(target) {
		return target === Object(target);
	} 
```

#### length === +lenght

```javascript
  if(length === +length) {
	// 强调 length 只能是数字或者 数字字符串
  }

```


## for
```javascript
    arr = some array;
    
    for(var i, max = arr.length; i < max; i++) {
    	// get length only once.	
    }

```

## while 
```javascript

    var arr = some array, 
    length = arr.length;
    
    while( length-- ) {
	        // code 
    }

    var A = {
        a : 1,
        b : 2  
    };
```


### 利用 && 或者 || 替代 if 
```javascript
    Object.prototype.abc = function(){}
    
    for (var i in A) {
    
        A.hasOwnProperty(i) && console.log(A[i],i); 
        // 等同于 
        if(A.hasOwnProperty(i)) {
            console.log(A[i],i); 
        }    
    }

	// 有则用,没有则初始化
	var calls = this._callbacks || (this._callbacks = {});

	(this._callbacks[i] || (this._callbacks[i]) = []).push(someCallback);
```

### switch 
```javascript
switch 和 case 对齐，增加可读性


    var inspect_me = 0,
        result;
    
    switch (inspect_me) {
    case 0: 
        result = 'a'
        break;
    case 1:
        result = 'b'
        break;
    default : 
        result = 'unknown'
	}
	console.log(result); // a
```
### 关于编码规范 空格的使用位置

```javascript

	for (i = 0; i < 10; i += 1) { }

	for (var i = 0; max = 10; i < max; i += 1) {}

	var a = [1, 2, 3];

	var o = {a: 1, b: 2};


	myFunc(a, b, c)

	function myFunc() {}

	var myFunc = function() {}

// 构造函数用大写

	var adam = new Person();
```

## 设计模式

```javascript 
// module 模式
// 1. 模块化
// 2. 封装了变量和function, 和全局的namespace
// 3. 只暴露了public方法,隐藏了私有方法
	var myModule = (function () {
    
		var name = 'module A',
			mou = {};
			
		function privateName () {
			console.log('moudle name is '+ name)
		}

		mou.pubName = name;
		mou.pubFunc = privateName
		
		return mou;
		
	})();

	myModule.pubFunc();
	console.log(myModule,1);  
```


### 支持module扩展
```javascript
	var myModule = (function (my) {
		
		var name = 'module X';
		
		my.Address = function() {
			console.log('moudle name is '+ name);
		}
		
		return my;
	 
	}(myModule || {}));

	//myModule.pubFunc();
	console.log(myModule,2)
```
### 对象克隆时方法的克隆? 

```javascript
// 用闭包保存状态值
	var elems = document.getElementsByTagName('a');

	for (var i = 0; i <　elems.length; i ++) {
		elems[i].addEventListener('click',
		(function(index) {
		   console.log('real index is '+ index);
		})(i)
		,false)
	}
```
## Array.splice 的使用方式
```javascript
// 集删除，取值，插入于一身

// 删除：
	var arr = [1,2,3,4,5,6,7]
	arr.splice(startindex,length);
	arr.splice(0,2) => {
		arr == [3,4,5,6,7]
		return [1,2]
	}

// 截取新子串： 
	var arr = [1,2,3,4,5,6,7,8]
	arr.splice(startindex,cut_length); // 若 startindex 省略默认为0
	arr.splice(1,2) => {
		arr = [1,2,3,4,5,6,7,8];
		return [2,3];
	}

// 插入
	var arr = [1,2,3,5,6,7];
	arr.splice(startindex,0[标识插入],....[插入值,可多个,但不是数组]);
	arr.splice(3,0,7,6,5){
		arr => [1, 2, 3, 7, 6, 5, 5, 6, 7]
		return []
	}

// 覆盖插入

	var arr = [1,2,3,5,6,7];
	arr.splice(startindex,n[覆盖的元素个数],....[插入值,可多个,但不是数组]);
	arr.splice(3,3,4,5,6) {
		arr => [1, 2, 3, 4, 5, 6];
		return [5,6,7]
	}
// return 返回的是受影响的元素
```
## &&

```javascript

// "&&" 的行为有时称做"短路" (short circuiting) ，很多代码利用了这一特性来有条件地执行代码。
// 例如，下面两行JavaScript代码是完全等价的:

	if (a == b) stop(); //只有在a==b的时候才调用stop()
	(a == b) && stop(); 

// 如果 id 为 undefined，则直接给 topic 赋值 undefined，
// 若 id 有值，但 topics 里没有 id 属性，仍返回给 topic undefined，
// 当 id 非空，且 topic 里有 id 时，才取得非空值。
topic = id && topics[ id ];


// 如果max width 已经定义了，直接使用它,否则在preferences对象中查找max_width
// 如果没有定义它，则使用一个写死的常量
	var max = max_width || preferences.max_width || 500;
``` 

Javascript 精粹中出现:
```javascript
	// typeof 结果为 false, 则小括号为 false, 结果为 that.
	// typeof true, return other;
	// 精妙!
	return (typeof other === 'object'  && other) || that;
```

## 父页面调用子页面方法
```javascript
	$('#atParent').contents().find('childElement').trigger('click');
	// native html5
	var iframe = document.getElementsByTagName('iframe')[0];
	var iframeDocument = iframe.contentDocument; // 获得了子页面的文档对象
```

## 取得指定标记下所有子标签
Returns a list of elements with the given tag name. 
```javascript
	function getByClass(tparent,tclass) {

		// getElementsByTagName() = > HTMLCollection => 类数组
		// The special string "*" represents all elements.
		var allclass = tparent.getElementsByTagName('*');

		var result = [];
			for (var i = 0, max = allclass.length; i < max; i++ ) {
			if ( allclass[i].clssName == tclass ) {
				result.push(allcalss[i]);
			}
		}
		return result;
	}
```

## 深拷贝
```javascript
	a = 1;
	b = a++; // b = 1; a = 2;

	function deepCopy() (parent, child) {
		var i,
			toStr = Object.propotype.toString,
			// x: arrName = '[Object Array]';
			arrName = '[object Array]';
		
		// forget check child if null 
		child = child || {};

		for( i in parent ) {
			if( parent.hasOwnProerty[i] ) {
				if(typeof parent[i] === "object") {
					child[i] = (toStr.call(parent[i]) === arrName) ? [] : {};
					deepCopy(parent[i],child[i]);
				} else {
					child[i] = parent[i];
				}
			}
		}
		return child;
	}
```


## 对象继承
```javascript 
	function inherit(p) {
		if(p == null) {
			throw TypeError();
		}
		if(Object.create) {
			return Object.create(p); // 直接使用它
		}
		var t = typeof p;
		if(t !== 'object' && t !== 'function') {
			throw TypeError();
		}
		function f(){}
		f.prototype = p;
		rturn new f();
	}
```

## 灵活常见html元素
```javascript
	$(document.createElement('script'))
		.attr('src', 'http://example.com/example.js')
		.appendTo('head');
```
## split
```javascript
// 计算单词数
// "".split(regExp);
	var a = "a xxx ssd sdf 4rff     dsfs";
	var b = a.split(/\s+/); // => ["a", "xxx", "ssd", "sdf", "4rff", "dsfs"]
	var c = b.length;
```
## 判断对象是否为空
```javascript
// 对象转会为布尔值
var isChromium = !!window.chrome;
// isChromium => true
!!undefined // => false
!!"" // => false
!!"1" // => true
!!null // => false
!!false  // => false
!!"false" // => true (这种奇葩的情况不少)
```

## 批量获取 dom 元素
```javascript
	var elements = {
		  head: null,
		  targetA: null,
		  targetB: null,
		  targetC: null,
		  targetD: null
	}
	for(var i in elements) elements[i] = document.getElementByID(i);
```

## 函数执行时的上下文 
```javascript
// 如果 thisArg 部分为空，则认为 global
	settings.complete.call(null, text); 

	// 同上，forEach 的第二个参数就是用作回调的上下文 
	[1, 2, 3].forEach( function(v) {
		if (this.breakFlag === true) {
		
		// 此处的 false 只是阻止了当前循环的执行，而不会影响后续循环
			return false;  
		}

		if (v === 2) {
			this.breakFlag = true
		}
		console.log(v) //只输出1,2
	}, {});  // '{}' 指定 callback 的上下文
```

## 习惯使用选择器上下文

```javascript
    $('div.foo').click(function(){
        $("span",this).addClass('bar'); // 限定查找范围
    });	
 // 对选择器表达式 “span” 的查找被限制在了 this 的范围内，
 // 即只有被点击元素内的 span 元素才会添加 “bar”。
```


