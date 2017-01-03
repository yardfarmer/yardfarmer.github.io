title: node stream
date: 2015-10-23 00:24:54
updated: 2015-10-23 00:24:54
tags:
---


##引子
最近编写 gulp-gaea 插件时用到了遇到了 `stream` 的问题， 在这里总结一下。在node中，流可以帮助我们将事情的重点分为几份，因为使用流可以帮助我们将实现接口的部分分割成一些连续的接口，这些接口都是可重用的。接着，你可以将一个流的输出口接到另一个流的输入口，然后使用使用一些库来对流实现高级别的控制。相比 java 的复杂庞大的 IO 接口，node 的接口简单了很多。

##使用流的好处

在node中，I/O都是异步的，所以在和硬盘以及网络的交互过程中会涉及到传递回调函数的过程。你之前可能会写出这样的代码：

```
var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req, res) {
    fs.readFile(__dirname + '/data.txt', function (err, data) {
        res.end(data);
    });
});
server.listen(8000);

```

上面的这段代码并没有什么问题，但是在每次请求时，我们都会把整个data.txt文件读入到内存中，然后再把结果返回给客户端。如果data.txt文件非常大，在响应大量用户的并发请求时，程序可能会消耗大量的内存，这样很可能会造成用户连接缓慢的问题。

所幸的是，(req,res)参数都是流对象，这意味着我们可以使用一种更好的方法来实现上面的需求：

```
var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req, res) {
    var stream = fs.createReadStream(__dirname + '/data.txt');
    stream.pipe(res);
});
server.listen(8000);
```
在这里，.pipe()方法会自动帮助我们监听data和end事件。上面的这段代码不仅简洁，而且data.txt文件中每一小段数据都将源源不断的发送到客户端, 还有一个好处就是，如果流出的慢了， 那么会自动减少数据的读入，减少对内存的压力。

##node的流模块

在node中，一共有五种类型的流：readable,writable,transform,duplex以及"classic"。

###pipe

无论哪一种流，都会使用.pipe()方法来实现输入和输出。

`.pipe()` 函数很简单，它仅仅是接受一个源头`src`并将数据输出到一个可写的流`dst`中：

```
src.pipe(dst)
.pipe(dst) 
```
将会返回dst因此你可以链式调用多个流:

```
a.pipe(b).pipe(c).pipe(d)
```
上面的代码也可以等价为：
```
a.pipe(b);
b.pipe(c);
c.pipe(d);
```

类似 unix 中编写流代码很类似：
```
a | b | c | d
```


###readable流

`Readable` 流可以产出数据，你可以将这些数据传送到一个 `writable`，`transform` 或者 `duplex` 流中，只需要调用`pipe()`方法:

```
readableStream.pipe(dst)
```
创建一个readable流

```
var Readable = require('stream').Readable;

var rs = new Readable;
rs.push('beep ');
rs.push('boop\n');
rs.push(null);
rs.pipe(process.stdout);

```

下面运行代码：

```
beep boop
```

**在上面的代码中rs.push(null)的作用是告诉rs输出数据应该结束了。**

需要注意的一点是我们在将数据输出到 process.stdout 之前已经将内容推送进readable流rs中，但是所有的数据依然是可写的。

这是因为在你使用.push()将数据推进一个readable流中时，一直要到另一个东西来消耗数据之前，数据都会存在一个缓存中。

可以使用util.inherit()来继承一个Readable流。

###消耗一个readable流

大部分时候，将一个readable流直接 pipe 到另一种类型的流或者使用`through` 创建的流中，是一件很容易的事情。但是有时我们也会需要直接来消耗一个readable流。

```
process.stdin.on('readable', function () {
    var buf = process.stdin.read();
    console.dir(buf);
});
```

当数据可用时，readable事件将会被触发，可以调用.read()方法来从缓存中获取这些数据。

当流结束时，.read()将返回null，因为此时已经没有更多的字节可以供我们获取了。

也可以告诉.read()方法来返回n个字节的数据。

下面是一个例子，在这里我们制定每次读取3个字节的数据：

process.stdin.on('readable', function () {
    var buf = process.stdin.read(3);
    console.dir(buf);
});
 
###writable流

一个writable流指的是只能流进不能流出的流:

```
src.pipe(writableStream)
```

####创建一个writable流

只需要定义一个._write(chunk,enc,next)函数，你就可以将一个readable流的数据释放到其中：

```
var Writable = require('stream').Writable;
var ws = Writable();
ws._write = function (chunk, enc, next) {
    console.dir(chunk);
    next();
};

process.stdin.pipe(ws);
```
第一个参数，chunk代表写进来的数据。

第二个参数enc代表编码的字符串，但是只有在opts.decodeString为false的时候你才可以写一个字符串。

第三个参数，next(err)是一个回调函数，使用这个回调函数你可以告诉数据消耗者可以写更多的数据。你可以有选择性的传递一个错误对象error，这时会在流实体上触发一个emit事件。

**在从一个readable流向一个writable流传数据的过程中，数据会自动被转换为Buffer对象**，除非你在创建writable流的时候制定了`decodeStrings`参数为false,  `Writable({decodeStrings: false})`。

如果你需要传递对象，需要指定objectMode参数为true，`Writable({ objectMode: true })`。

####向一个writable流中写东西

如果需要向一个writable流中写东西，只需要调用.write(data)即可。

```
process.stdout.write('beep boop\n');
```

为了告诉一个writable流你已经写完毕了，只需要调用.end()方法。**你也可以使用.end(data)在结束前再写一些数据。**

```
var fs = require('fs');
var ws = fs.createWriteStream('message.txt');

ws.write('beep ');

setTimeout(function () {
    ws.end('boop\n');
}, 1000);
```

###transform流

你可以将 `transform` 流想象成一个流的中间部分，它可以读也可写，但是并不保存数据，它只负责处理流经它的数据。 gulp 中接触的流就是 transform 流。

###duplex流

Duplex 流是一个可读也可写的流，就好像一个电话，可以接收也可以发送语音。一个rpc交换是一个duplex流的最好的例子。如果你看到过下面这样的代码：

a.pipe(b).pipe(a)
那么你需要处理的就是一个duplex流对象。