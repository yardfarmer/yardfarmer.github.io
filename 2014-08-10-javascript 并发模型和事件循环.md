---
layout: post
title: javascript并发模型和事件循环(Event Loop)
tags: javascript
---

JavaScript的"并发模型"是基于事件循环的.这个并发模型有别与Java的多线程,javascript的并发是单线程的.
Javascript 中有个重要一块，Event Loop，能把单线程的 JavaScript 使出 多线程的感觉。

>"Event Loop是一个程序结构，用于等待和发送消息和事件。（a programming construct that waits for and dispatches events or messages in a program.）"
 
简单的说，就是在程序中（不一定是浏览器）中跑两个线程，一个负责程序本身的运行，作为主线程； 另一个负责主线程与其他线程的的通信，被称为“Event Loop 线程" 。  每当遇到异步的 setTimeOut ，setInterval 这些异步任务，交给 EventLoop 线程，然后自己往后运行，等到主线程运行完后，再去 Event Loop 线程拿结果。

这种模型人称 "asynchronous" 或 "non-blocking" 模行。 

我简单的画了一个 javascript 的执行图,我们通过图,逐步分析.
[原图见我的博客](http://www.cnblogs.com/yakun/p/3802725.html)
## 栈
函数调用时所用的执行环境栈
当js方法被调用时,会进入一个执行环境(execution context),如果有另外一个方法被调用了(或者自身递归调用),会新建一个新的执行环境,并且代码的执行会进入到这个新的执行环境.函数调用返回的时候重新回到原来的执行环境. 由此,代码执行的过程便形成了一个执行环境栈,江湖人称 "stack";

## 执行环境(上下文)
execution context 是一个由ECMA定义的抽象的概念,所有的javascript代码都是在 execution context 执行环境中执行的.执行环境即执行上下文是一种对象，代码在执行上下文环境中执行。可以通过 this 关键字访问执行上下文，this 是对当前执行环境对象的引用。 一般情况下，

> 如果代码不存在一个用户自定义的对象或函数中， 那么它将处于全局上下文环境。

全局执行环境是最外层的一个执行环境.在Web浏览器中,全局执行环境认为是window对象.因此所有全局变量和函数都是作为window对象的属性和方法创建的.

全局的代码(inline中执行的代码,通常包括js文件,html页面,加载的)在全局执行环境中执行.每个方法调用都有一个与之关联的执行环境.

某个执行环境中的所有代码执行完毕后,该执行环境被销毁,保存在其中的所有变量和函数定义也随之销毁. 全局执行环境直到页面关闭时才被销毁.

每个函数都有自己的执行环境,当执行流进入一个函数时,Javascript 创建一个新的执行上下文，并进入该函的执行上下文。函数的执行环境就会被推入环境栈中. 而在函数执行之后,栈将其环境栈弹出,把控制权返回给之前的执行环境.Javascript 中的执行流正是由这个方便的机制的控制着.

当代码在一个执行环境中执行时,会创建变量对象的一个作用域链(scope chain).
作用域链的用途,确保当前执行环境能有序(不明白就接着看)的访问所能获取的变量和函数.

作用域链的前端,始终都是当前执行的代码所在的执行环境的变量对象.

即当前作用域没有,外层作用域兜着.

执行环境被创建时会有次序的进行一些工作.

1. 首先,在方法的执行环境中,Activation 活动对象被创建.活动对象另有一套实现机制.可以认为是对象,但又很特殊,没有prototype,不能在代码中直接引用到.

2. 下一步,在方法调用创建执行环境的时候,会创建 argument 对象(类数组对象,含有传进来的参数,length,callee),活动对象中会有一个"argument"同名属性来引用这个argument对象.

3. 再下一步,执行环境会被指定一个作用域.作用域由承载对象的列表(或链)组成.当代码在一个执行环境中执行,会创建变量对象的一个作用域链(scope chain).作用域链的前端,始终都是当前执行的代码所在执行环境的变量对象(和上面提到的 Activation 活动对象是一个对象). 如果这个环境是函数(javascript 环境只有函数和全局环境这两种), 则将其活动对象作为变量对象使用,活动对象在最开始时只包含一个arguments对象.

作用域链中下一个变量对象来自当前代码的外层环境.以此类推,直到到达最外层的全局执行环境,这样便构成了一条从底到上的作用域链.全局执行环境的变量对象始终都是作用域链的最后一个对象.
标示符解析是沿着作用域链一级一级的搜索标示符的过程.搜索过程始终都是从作用域链的最前端开始,然后主逐级向后回溯. 
 
#### 当进入执行环境
当进入执行环境(代码即将但仍未执行时),变量对象也就是活动对象已经包含了以下这些属性:
 1. 函数的所有形参,由名称和对应值组成变量对象的属性.
 2. 执行环境所在函数内部的所有子函数声明,由名称和对应值(函数对象 function object)组成变量对象的属性.如果变量对象内已存在同名属性,那么会被替换所有的变量声明.
 3. 由名称和对应值(undefined)组成变量对象的属性,如果变量名称跟已经声明的形式参数或函数相同，则变量声明不会干扰已经存在的这类属性.
	 
	  
需要说明的是,每个执行环境都有this,this的值取决于调用者和所执行代码的类型,this值是在进入执行环境时就已经确定的. 取值与执行环境相关联,并且在执行环境运行期间是不能被修改的.

> this 执行上下文中的一个属性. 

 在全局代码中,this始终是全局对象本身.

在通常的函数调用中,this是由函数的调用者提供的,即被调用函数的父执行环境提供的.this值取决于函数调用的方式.


## 堆

堆是一个对象互联的网络。用数学术语说就是“图”。图由节点及其之间的边构成。节点和边都是可被标记的：节点（对象）用对象构造器的名称标记，边则由属性名称标记。
从一个对象到另一个的边序列被叫做路径（path）。通常我们只对那些不重复经过同一节点两次的简单路径（simple path）感兴趣。
我们把垃圾收集器根节点到某个指定对象的路径叫做retaining path。如果不存在这样的路径，则该对象被称作无法达到的（unreachable），应在垃圾收集过程中被处置。


## 队列
在web浏览器中,当事件发生时如果该事件有相应的监听器,则该消息会被及时的加进消息队列,如果没有监听器,该事件会被丢失.
javascript运行时伴随一个待处理的消息(也就是任务)队列,每个消息都关联了相关的处理函数,当函数的执行栈为空时,即当前没有正在执行的函数,那么,队列会从中挑出一个去处理.处理过程包括调用相关的函数(不用担心处理函数的作用域问题,因为在javascript中,作用域是词法化作用域,是方法在定义的时候已经确定的,与调用无关.作用域链创建早于方法调用,得益于此,我们方能使用闭包),处理完成后,如果栈为空,则再次尝试从队列中挑选可处理的事件或任务. 从中可以很容易窥探到 setInterval,setTimeout 是怎么进行异步执行的了.
这,就是事件循环,event loop.

## 总结
通过上面的分析,javascript是不存在并发的,单线程何谈并发? 这只是说说了*非阻塞*.


