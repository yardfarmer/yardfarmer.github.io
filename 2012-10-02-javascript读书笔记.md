---
layout: post
date: 2012-10-02  22:58:28 +0800
title: javascript读书笔记
tag: javascript
---

##typeof
typeof null => "object"

null 是一个特殊的对象值，含义是"非对象"。实际上，通常认为 null 是它自有类型的唯一一个成员。
undefined 用未定义标识更深层次的“空值”,它是变量的一种取值，标识变量没有初始化。
undefined 是预定义的全局变量， 它和 null 不一样，null是关键字。

```
typeof undefined =》 undefined 标识这个值是这个类型的唯一成员。
undefined == null =》 true
```

或许认为undefined是表示系统级的、出乎意料的或类似错误的值的空缺，而null是表示程序级的、正常的或在意料之中的值的空缺


##全局对象是window

对象的比较并非值的比较，对象值都是引用，对象的比较均是引用的比较。

```javascript

var s = String('abc');
s.a = 1;  // 临时对象,随机销毁
s = > "abc" 

var S = new String('abc');
S.a = 3;
S = > {a: 3}

```


表达式(expression) JavaScript 中的一个短语， JavaScript解释器会将其计算(evaluate) 出一个结果。程序中的常量是最简单的一类表达式。
变量名也是一种简单的表达式，它的值就是赋值给变量的值。


##数组初始化

会为空缺的位置赋值undefined

```
var a = [1,,3];  // a.lengh = 3; 
```

留下单个逗号，这时并不会创建一个新的值为undefined的元素。

```javascript
var a = [1,,3,]; // a.length = 3;

a[100] = 1; // a.length = 101;
```

函数定义表达式可以称为“函数直接量”，对象初始化表达式也可以称为“对象直接量”

在"."和"["之前的表达式总是会首先计算。如果计算结果是null或者undefined ，表达式会抛出一个类型错误异常。


当对调用表达式进行求值的时候，首先计算函数表达式，然后计算参数表达式，得到一组参数值。
如果函数表达式的值不是一个可调用的对象，则抛出一个类型错误异常。

传入函数的对象实参，在函数内部是可以修改的。
实参与形参 === true


对象创建表达式(object creation expression) 创建一个对象井调用一个函数(这个函数称做构造函数)初始化新对象的属性。

对象创建表达式和函数调用表达式非常类似，只是对象创建表达式之前多了一个关键字new:

```
new Object()
new Point(2 ,3)
```

如果一个对象创建表达式不需要传入任何参数给构造函数的话，那么这对空圆括号是可以省略掉的:
```
new Object
new Date
```

lval是left-value的简写，意思是"左值"  在左边被赋给值的


逗号表达式
```
var a  = (1,2,3); // => a = 3; 返回最后一个值
```



## iframe 跨域自动调整高度
获得父页面的地址栏的绝对地址。然后，就是改变父页面的地址：

```javascript
var hostUrl = window.location.hash.slice(1);
hostUrl += "#height=" + 1294;
window.top.location = hostUrl;


var l= document.body.scrollLeft > 0 ?
	   document.body.scrollLeft : 
	   document.documentElement.scrollLeft;//获取鼠标所在地的左偏移

```


Request Headers:
Provisional(暂时的，临时的) headers are shown

出现在这个语句是因为去获取该资源的请求其实还没有真的发生，所以 Header 里显示的是临时的伪信息，直到服务器真的有响应返回，这里的 Header 信息才会被更新为真实的。

网络工具：
chrome://net-internals/

## offset
抵消，补偿

```javascript
offsetHeight = 2*border+content+scrollbar; 

offset 位置相对于文档，positon 相对于父元素。

jQ:
stringObject.replace(regexp/sbustr,replacement);

contents()/contentDocument

```


## 关于距离

```javascript
x = e.pageX;
y = e.pageY;
$("span").text("pageX:"+x+", pageY:"+y+", clientX:"+e.clientX+", clientY:"+e.clientY+", screenX:"+e.screenX+", screenY"+e.screenY);
```


```javascript
pageX/pageY:      相对于视口，出现了滚动条，滚上去的部分也计算。
clientX/clientY： 可看到的部分的距离，滚上去的部分不算，只算到浏览器窗口的上檐。
screenX/screenY:  相对于显示器屏幕的左上角计算

```
### Element.clientHeight

> The Element.clientHeight read-only property returns the inner height
> of an element in pixels,包括padding，但是没有水平的滚动条，没有 border，没有 margin。

element.innerHeight 兼容性考虑，ie9开始支持。



## box-sizing

box-sizing: border-box;  添加border 不会往外涨

```javascript
$( window ).height();  // returns height of browser viewport, 即使有滚动部分，也不算上
$( document).height(); // returns height of HMTL document height,带滚动部分的高度
```

```
'use strict';   // 由于 js 执行环境的不确定，可能是 es3/es5, 可能支持标准特性的 js 引擎也可能不支持标准特性的 js 引擎。所以适用
"use strict" 可以禁用一些容易受限或出问题的特性。
```


事实上. JavaScript 中所有的数字都是双精度浮点数。64位的。

位算术运算符比较特殊，隐式地转换为32 位整数后进行运算。

(8).toString(8);  // => "10" 转8进制
(8).toString(2);  // => "1000" 转2进制

只有整数数字才能比相等。

在对象字面量和数组字面量的基础上，JSON格式的语法具有很强的表达能力，但对其中的值也有一定的限制。例如，JSON规定所有对象键以及所有字符串值，都必须包含在双引号中。而且，函数也不是有效的JSON值。

```javascript
// 通过 xmlhttprequest 获得 header 响应。
var client = new XMLHttpRequest();
client.open("GET",'xx.txt',true); // (method, url [, async = true]) 默认采用异步
client.send();
client.onreadystatechange = function() {
	if(this.readyState == 2) {
		var contentType = client.getResponseHeader("Content-Type");
	}
}
```


事件处理中 return false 意味着同时调用event.preventDefault()和event.stopPropagation()。因此要想停止事件冒泡，我们还得再调用后者。

位运算符要求它的操作数是整数，这些整数表示为32位整型而不是64位浮点型。必要时，位运算符首先将操作数转换为数字，井将数字强制表示为32位整型。

当一个 Ajax 请示被发送，所有的请求都会附带主域的cookie 信息一起发送。，对于远程服务来讲，请求如果是来自于登录后的用户，若没有同源策略的限制，攻击者就有可能获取你的数据。


同源：域名，子域名，端口。


HttpRequest

Refer: 请求从哪哪来

CORS

在跨域中，Ajax 提出了 CORS( cross-origin resource sharing ), CORS 打破同源策略的限制，赋予了前端代码访问可信的远程服务的权限。加上这个可以跨域，但是发送请求时不会带上 cookie。


HTML5 本地存储的规范源自HTML5 Web Storage specification（http://www.w3.org/TR/webstorage），其中包含两类：local storage 和session storage。浏览器关闭后localstorage 数据也能够保持，而session storage 数据则不存在了。浏览器端所存储的数据是以域名分隔开的，某个域中的脚本存储的数据只能被这个域读取。
如果你存储的数据超出了上限（通常是每个域名5MB）。

如果传入一个函数，则在document 上绑定一个ready 事件监听函数，当DOM 结构加载完成时执行。
ready 触发要早于load 事件。ready 事件是 DOMContentLoaded 事件、onreadystatechange 事件和函数doScrollCheck() 的统称.

如果传入一个 jQuery 对象，则创建一个 jQ 对象副本，副本与源对象引用相同的 dom 元素。




一旦单一的事件有着多重的后果，这种“一事一处理”的方式将迫使处理器规模急剧膨胀。




topic = id && topics[ id ];


Deferred 就是Promise！更准确地说，Deferred 是Promise 的超集，它比Promise 多了一项关键特性：可以直接触发。纯 Promise 实例只允许添加多个调用，而且必须由其他什么东西来触发这些调用。
它们的底层是 Callbacks.

Promise 对象会一直保持挂起状态，直到被执行或拒绝。

简单总结一下，Promise 对象接受 3 种回调形式：done、fail 和 progress。
执行(resolve) Promise 对象时，运行的是done 回调；拒绝(reject) Promise 对象时，运行的是fail 回调;
对处于挂起状态的Deferred 对象调用 notify 时，运行的是progress 回调.


获得jQuery 中的Promise 对象：或者生成一个$.Deferred 实例，或者进行一次可返回 Promise 对象的 API 调用。



"请针对这个 Promise(getPromise) 对象给我一个回调，我会归还一个 Promise (postPromise) 对象以表示回调运行的结果"

```javascript
var getPromise = $.get('/query');
var postPromise = getPromise.pipe(function(data) {	return $.post('/search', data);});
```

// deep: 是否克隆子节点，true 克隆子节点，false 只克隆指定节点。
var dupNode = node.cloneNode(deep);


// Returns an object reference to the window object.
// 真的有这个属性
window.self

```
XMLHttpRequest cannot load http://localhost:8080/nodeA/Here. No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'null' is therefore not allowed access. 
```

## viewport width=device-width;
android 360px;

所以，一个完全缩小的网站将会仍然以(iphone)320个CSS像素的形式进行展示，一个CSS像素等于多少个设备像素对于我们来说不重要。 起源于 iphone3gs，像素玻璃的宽认定为320px，然而浏览器冒称960px。所以针对 css 的像素，安卓就是360，ip 为320，对应多少个实际的设备像素就忽略了。

## 虚拟像素
在移动设备的屏幕上看到的像素与桌面设备上不同。这意味着，在iPhone 上，无法拿出显微镜来验证一个元素是否是300px 宽。
在一个没有viewport 元信息的页面上，视图会默认设定宽度为980px，则宽度为300px 的元素表示的宽度为300 虚拟像素宽.


如果声明 `<meta name="viewport" content="width=600">`那么一个在CSS 中被定义宽度为600px 的元素在页面加载初始化时将会横向充满屏.

在安卓上 width=device-width; 又因为 Android 的 device-width 设为了 360px； 所以窗口的虚拟像素的 360px 宽。

为了让Web 开发者的思维保持清晰，苹果公司决定继续在iPhone 4 上返回320 的设备宽度，尽管屏幕物理像素为640。

安卓上的Chrome 有一个不是很有用的target-density dpi 的viewport 属性来支持它


第一次加载速度是用“首字节的时间”测量的，即从用户请求该页面到第一个字节从服务器下载下来的这段时间.

第一次加载缓慢的真正原因。真正的原因通常在于前端。PageSpeed 、YSlow 和其他无数的工具和服务可以用来解决这些问题。


window.innerHeiht 就是页面部分，不包括收藏栏，标题栏，菜单栏(包括这些的叫window.outerHeight).

json2.js 补充JSON.parse JSON.stringify 两个json序列化反序列化方法.
respond.js可以让IE6-8支持 css的media query 响应式方案。


