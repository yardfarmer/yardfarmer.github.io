---
layout: post
date: 2015-01-12  20:35:13 +0800
title: Underscore.js
tags: [javascript, framework, library]
---

##简介
[Underscore.js](http://underscorejs.org/)是一个灵巧的工具库。它提供了几十种函数式编程的方法，大大方便了JavaScript的编程。MVC框架Backbone.js就将这个库作为自己的工具库。除了可以在浏览器环境使用，Underscore.js还可以用于Node.js。
Underscore.js定义了一个下划线（_）对象，函数库的所有方法都属于这个对象。这些方法大致上可以分成：集合（collection）、数组（array）、函数（function）、对象（object）和工具（utility）五大类。 

##接口示例

```html
<!DOCTYPE html>
<html >
<head lang="en" >
    <meta charset="UTF-8" >
    <title ></title >
    <script src="../underscore-reading.js" ></script >
</head >
<body >

<button id="underscore_button">test button</button>
<button id="throttle_button">throttle button</button>
<button id="debounce_button">debounce button</button>
<script>

    /**
     *  [].forEach(function(value, key, list) { })
     */
    var testData = [2,4,6,8];

    _.each(testData, function(value, key, list) {
    //  console.log(arguments);
    });


    // map 映射, 返回新的数组

    var eighted = _.map(testData, function(num) {
        console.log(arguments);
      return num * 8;
    });
    console.log('mapped', eighted, testData);

    // 数组拷贝
    var cpData = testData.slice(0);
    cpData.pop();
    console.log('copy', testData, cpData)

    //_.reduce(list, iteratee(memo, value, key, list), [memo], context);

    var rst = _.reduce(testData, function(memo, value, key, list) {
       // console.log(arguments);
        return memo + value;
    });
    console.log('fib',rst);

    // _.find(list, predicate, [context])
    var back  = _.find(testData, function(num){
        return num > 5;
    })

    console.log('back', back);


    var objData = [
        {a: 1, b:2, c:1},
        {a: 1, b:2, c:2},
        {a: 1, b:2, c:3}
    ];

    var t = _.where(objData, {c:1});

    console.log("where", t);

    // 从 `map` 中按名取值, pluck 快而猛的拉，从...中抽拔
    var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50},
                   {name: 'curly', age: 60}];
    console.log("pluck", _.pluck(stooges, 'name'));

    // 返回除去后 n 位的部分
    console.log("initial,", _.initial([5, 4, 3, 2, 1], 2));

    // 与 initial 相对
    console.log("rest", _.rest([5, 4, 3, 2, 1], 2));

    var func = function(greeting) {return greeting + ":" + this.name };
    func = _.bind(func, {name: 'im obj'}, '[this is arguments]');
    // 已经被过河拆桥
    console.log('bind 返回新的 function ', func());


    var buttonView = {
        label  : 'underscore',
        // 通过 e.target  可以得到目标元素， this 真的是意义不到
        // be invoked with a fairly useless this.
        onClick: function(e) { console.log('bindAll', this.label, e.target) },
        onHover: function(){ console.log('hovering: ' + this.label); }
    };
    _.bindAll(buttonView, 'onClick', 'onHover');
    // When the button is clicked, this.label will have the correct value.

    underscore_button.addEventListener('click', buttonView.onClick, false);
    underscore_button.addEventListener('hover', buttonView.onHover, false);


    var add = function(a, b) { console.log("partial" ,a ,b)};

    // 这个 arguments* 这里的参数在包裹的内部函数的最前面
    // _.partial(function, *arguments)
    add5 = _.partial(add, 5, 4); //
    add5(1,2);

    // 在递归中会缓存方法的计算结果，达到类似 map 缓存的效果
    var fibonacci = _.memoize(function(n) {
        return n < 2 ? n: fibonacci( n - 1) + fibonacci(n - 2);
    });

    console.log("memoize", fibonacci(100));

    function fibonacci(n) {
        return n < 2 ? n: fibonacci( n - 1) + fibonacci(n - 2);
    }

    console.log("fibonacci", fibonacci(100));

    var log = _.bind(console.log, console);
    _.delay(log, 1000, 'delay','log latter');


    var throttled = _.throttle(function() {
        log('throttle');
    }, 3000);
    for(var i = 0; i < 10000; i++) {
        throttled();
    }
    // 延时按钮, 处理频繁点击,加上限流阀
    throttle_button.addEventListener('click', throttled, false);


    // 每次执行间隔指定时间, 在间隔时间内对方法调用不再执行，
    // 但是会把间隔时间的起点设置为此次对方法调用的时间
    // 举例来说：下面这个情况， 每个2999 毫秒 单击一次，
    // 不满足每个3000秒的时间间隔, 故回调不执行
    // 即使每隔 2999 毫秒店家1000次，也只会在最后一次单击 3000ms 后，
    // 才能正常执行回调
    // 所以 debounce 适合用于 resize, 在窗口不再改变后执行就好了, 在
    // 移动中执行也没有意义
    // 另外适合输入框取值, 如果输入框一直在 change, 拿到值也没用, 所以在不变化执行就可以了。
    var slowClick = _.debounce(function() {
        log("click", "_debounce");
    }, 3000);

    debounce_button.addEventListener('click', slowClick, false);


    // after:  在已经被掉了 指定次数 后，才执行
    // api 示例说适用于 异步处理, 在所有任务都完成时才执行。
    var render = function() {log('after')};
    var renderJob = _.after(5, render);
    _.each([1,2,3,4,5], function(job) {
        renderJob();
    })


    // wrapper 注入/ AOP 切面编程
    var hello = function(name) { return "hello: " + name; };
    hello = _.wrap(hello, function(func) {
        return "before, " + func("moe") + ", after";
    });
    console.log("wrap", hello());


    // compose, 组合模式/  像极管道 大管子
    var greet    = function(name){ return "hi: " + name; };
    var exclaim  = function(statement){ return statement.toUpperCase() + "!"; };

    /**
     * Caution!
     * _.compose(f, g, h);
     * 数据流为  f() <- g() <- h();
     * f(), g(), and h() produces f(g(h())).
     */
    var welcome = _.compose(log, greet, exclaim);
    var moe = welcome('moe');
    //log('compose:' ,moe);

    // 对象 extend
    var big = _.extend({x: 1}, {y: 2});
    console.log('extend', big);

    // 给对象设置默认参数, 只给设置对象原本不存在的参数
    var iceCream = {flavor: "chocolate"};
    _.defaults(iceCream, {flavor: "vanilla", sprinkles: "lots"});


    var tapData = _.chain(testData)
            .filter(function(num) {
                return num > 5;
            })
            .tap(log)
            // 多中间数据没有改变
            .tap(function(num) { console.log('tapped: ', num); return num * 2; })
            .tap(log)
            .map(function(num) { return num * num; })
            .value();
    log("tapData", tapData);


    // 扩展 underscore
    // underscore 扩展接口, 方便实用
    _.mixin({
        hello: function() {
            console.log("mixin: ", "have a good time!");
        }
    })
    _.hello();
    _("").hello();


    // <%= someThing %>
    // 模板的使用
    var compiled = _.template("hello: <%= name %>");
    log(compiled({ name: "moe" }));

    var lyrics = [
        {line: 1, words: "I'm a lumberjack and I'm okay"},
        {line: 2, words: "I sleep all night and I work all day"},
        {line: 3, words: "He's a lumberjack and he's okay"},
        {line: 4, words: "He sleeps all night and he works all day"}
    ];


    // 我没有任何天分， 我只有梦的天真
    // 输掉目标， 不能输掉人生

    /**
     * _.map([1, 2, 3], function(n){ return n * 2; });
     * _([1, 2, 3]).map(function(n){ return n * 2; });
     * 这其实是 underscore 的两种使用方式，回调式的和链式的
     *
     *  Returns a wrapped object.
     *  Calling methods on this object will continue to return wrapped objects
     *  until value is called.
     *
     *  这里 wrapped object 其实是 类似 jQ 对象的一个包裹后的对象,
     *  本质就是挂载了 underscore 接口的 prototype
     *  之所以挂载 prototype 是因为, 为了实现链式操作
     */

    var chainData = _.chain(lyrics);
    log("chain, return a wrapped data:", chainData);
    log("chain, back to original data:", chainData.value());

    var d = chainData.map(function( line ) { return line.words.split(' '); })
            .flatten()
            // reduce(data, function(memo, value, key , list))
            .reduce(function(counts, word) { // 实际参数为： memo, value, key, list
                // 通过 log, 可以很清楚的看清 reduce 是怎么回事。
                // log('inner reduce', counts, word);

                counts[word] = (counts[word] || 0) + 1;
                return counts;
            }, {}) // 这里的 `{}` 作为 前面 `iteratee` 回调参数中 memo 的初始值。
            .value();
    log('chain compute', d);
</script>
</body >
</html >
```
