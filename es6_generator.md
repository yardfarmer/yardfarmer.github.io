---
layout: post
date: 2016-04-23  15:12:36 +0800
title: es6 generator
tags:
  - es6
categories:
  - js
description: 
toc: true
feature: http://7i7gr4.com1.z0.glb.clouddn.com/2017-04-23-14929312889535.jpg
---

#es6 generator
> 当调用 generator 函数的时候， 该函数并不会执行，而是返回一个遍历器(可以理解成暂停执行)

以后， 每次调用这个遍历器的 next 方法，就从函数体的**头部或者上一次停下来的地方**开始执行（恢复).

generator 函数使用 iterator 接口，每次调用 next 方法的返回值就是一个标准的 iterator 返回值: `{value: xxx, done: boolean}`


##典型应用

###1.ajax
```
function* main() {
  var result = yield request("http://some.url");
  var resp = JSON.parse(result);
    console.log(resp.value);
}

function request(url) {
  makeAjaxCall(url, function(response){
    it.next(response); // 把值带回去
  });
}

var it = main();
it.next();
```

注意，makeAjaxCall函数中的next方法，必须加上response参数，因为yield语句构成的表达式，本身是没有值的，总是等于undefined。

###2.流程控制

```
step1(function (value1) {
  step2(value1, function(value2) {
    step3(value2, function(value3) {
      step4(value3, function(value4) {
        // Do something with value4
      });
    });
  });
});
```

使用 promise

```
Q.fcall(step1)
.then(step2)
.then(step3)
.then(step4)
.then(function (value4) {
    // Do something with value4
}, function (error) {
    // Handle any error from step1 through step4
})
.done();
```







