---
layout: post
date: 2015-03-16  23:52:42 +0800
title: requirejs 与 seajs 的不同
tag: module
---

## require

脚本加载顺序与下面的引用声明顺序有关，与 factory 函数里的 require 次序无关, 与 seajs 不同的是, 虽然使用了 require, 但是下面不声明引用，requier 无效, 感觉这样好鸡肋

requirejs 中 require 的用法

```javascript
define(["require","./values","./functionOnly"], function(require) {


    // 报错，脚本不再执行, 说明脚本加载了, 但是还没被执行
    //console.log(1,nameModue.color);

    var nameModue = require("./functionOnly");

    // 脚本的最终加载顺序与 require 顺序无关
    var mod = require("./values");

    console.log(2,nameModue,mod);
    //console.log(mod);
});

```

seajs 中用法

```javascript
define(function (require, exports, module) {
    'use strict';
    var mod1 = require('./mod1'),
        mod2 = require('./mod2');

    mod1.hello();
    mod2.hello();

    return {
        hello: function () {
            console.log('hello main');
        }
    }
});
```
