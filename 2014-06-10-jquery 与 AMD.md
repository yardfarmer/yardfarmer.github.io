---
layout: post
title: jquery1.11.x 集成了 AMD
tags: jquery
---

  AMD 加入到了 jQuery, jQuery 把源码切分成各个逻辑模块.
1. ready 整合成依赖 Deferred 的模块.
2. 有些模块被切分成一些更加利于维护的片段.
3. var 文件夹指定的模块只包含共享的变量声明.
```javascript
	 (function( global, factory ) {
	
	     if( typeof module === "object" && typeof module.exports === "object" ) {
	
	         // 对于CommonJS的和CommonJs的类似环境中, 如果存在一个适当的window,
	         // 则执行global工厂方法,获取jQuery对象;
	         // 在那些天生不拥有window,document的环境中,比如Node.js,
	         // 弄了个jQuery做的factory伺候module.exports;
	         // 这个突出了建立一个真正window的需求
	         // e.g var jQuery = require("jquery")(window);
	
	         module.exports = global.document ? factory( global, true) : function( w ) {
	             if( !w.document ){
	                 throw new Error(" jQuery requires a window with a document" );
	             }
	             return factory( w );
	         };
	     } else {
	         factory( global );
	     }
	
	 }(typeof window !== "undefined" ? window : this, function( window, noGlobal ){
	     var jQuery = {};
	     return jQuery;
	 }));
```