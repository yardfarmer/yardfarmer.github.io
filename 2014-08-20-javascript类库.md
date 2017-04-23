---
layout : post 
title : javascript 中的类
date: 2014-08-18
tags : regexp
---

## 理论
对于静态的类来说，JavaScript 对象直接量就已经够用了，但使用继承和实例来创建经典的类往往更有帮助。
>JavaScript 是基于原型的编程语言，并没有包含内置类的实现。

但通过JavaScript 可以轻易地模拟出经典的类。


JavaScript 中有构造函数和 new 运算符。**构造函数用来给实例对象初始化属性和值**。任何JavaScript 函数都可以用做构造函数，构造函数必须使用 new 运算符作为前缀来创建新的实例。

new 运算符改变了函数的执行上下文，同时改变了return 语句的行为。


当使用 new 关键字来调用构造函数时，执行上下文从全局对象（window）变成一个空的上下文`{}`，这个上下文代表了新生成的实例。因此，this 关键字指向当前创建的实例。如果构造函数没有返回值，那么这个新生成的实例就作为默认的返回值。如果指定了返回值，这个新实例就白白浪费了。


```javascript
var Person = function(name) {
this.name = name;
};
// 实例化一个Person
var alice = new Person('zhang'); 

if .. 这样

Person('ben dan'); //=> undefined

```
上面这个例子说明了 new 与不 new 的区别。这个函数只会返回undefined，并且执行上下文是window（全局）对象，无意间创建了一个全局变量name。


## 实战

```javascript
/**
 * Class build my Own class
 * Created by cyk on 14-8-19.
 */

var Class = function() {
    "use strict";

    // in current line, 'this' is : Class {} 对象实例
    // in the finally, as we have a return value ,so the Class {} is unused.

    // 这样的做法每次都会产生一个'新的' klass 字面量方法
    var klass = function() {
        // this 均是上下文中新生成的实例
        this.init.apply(this, arguments);
    };

    klass.prototype.init = function() {};

    // 定义 prototype 的别名
    klass.fn = klass.prototype;

    // 定义类的别名
    klass.fn.parent = klass;


    // 给类添加属性
    klass.extend  = function ( obj ) {
        // 可选的回调方法 extended
        var extended = obj.extended;

        for( var i in obj ) {
            klass[i] = obj[i];
        }
        if (extended) extended(klass);
    };

    // 给实例添加属性
    klass.include = function ( obj ) {
        // 可选的回调方法
        var included = obj.included;
        for( var i in obj ){
            klass.fn[i] = obj[i];
        }
        if (included) included(klass);
    };

    /*
     * 这里的实现支持extended 和included 回调。
     * 将属性传入对象后就会触发这两回调函数
     */

    return klass;
};

var ORMModule = {

   save: function () {
       "use strict";
       // 共享的函数
   }
};

var Person = new Class();

// 虽然和上一行代码一样,但是获得的值却是新 new 出来的,
// 所有 Asset 和 Person 指向的都是 Class 的不同变量,只是变量内容相似罢了
var Asset  = new Class();

// 所以 Person 和 Asset 现在指向的并非同一个变量

Person.include(ORMModule);

Asset.include(ORMModule);

Person.include({
    find: function() {
       console.log(this);
    }
});

// person is : Class instance,
// klass {init: function, parent: function, save: function, find: function}
var person = new Person();

var asset = new Asset();


person.find(); // klass

asset.find();  // undefined is not a function
```

-----

先到这里，下集不见不看。
