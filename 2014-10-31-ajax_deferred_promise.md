---
layout: post
date: 2014-10-31  13:04:57 +0800
title: ajax
---

最本质的 ajax 其实是这样的：

<iframe width="100%" height="300" src="http://jsfiddle.net/codinglion/Lnbvv/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>


jQuery 出现后，在发出Ajax请求时，jQuery会帮我们确定取得数据的最佳方式。可用的方式包括标准的XMLHttpRequest对象、ms的ActiveX对象XMLHTTP 或 script 标签。

由于不同请求使用的数据传输方式可能不一样，那我们就需要一个公共的接口与这些通信交互。为此，jqXHR对象提供了这种接口在 XMLHttpRequest对象可用的情况下，封装该对象的行为；在XMLHttpRequest对象不可用的情况下，则尽可能模拟它。这个对象提供给我们的属性和方法包括：

- 包含返回数据的 .responseText或.responseXML；
- 包含状态码和状态描述的 .status和.statusText；
- 操作与请求一起发送的HTTP头部的.setRequestHeader()；
- 提早中断通信的.abort()

jQuery的所有 Ajax 方法都会返回jqXHR对象，只要把这个对象保存起来，随后就可以方便地使用这些属性和方法。


乍一看，调用.done()和.fail()与之前的写法相比并没有明显的好处。可是，这两个承诺方法的确是有好处的。第一，可以多次调用这两个方法，根据需要添加多个处理程序。

第二，如果把调用$.ajax()的结果保存在一个变量中，那么就可以考虑代码的可读性，在后面再添加处理程序。

第三，如果在添加处理程序的时候Ajax操作已经完成，就会立即调用该处理程序。

第四，我们最好采用与jQuery库中其他代码一致的语法，这带来的好处不言而喻。


-----


## Promise 对象和Deferred 对象



    // jQuery 1.4 
    // "马上就要"
	$.get('/mydata', {
		success: onSuccess,
		failure: onFailure,
		always: onAlways
	});

	// jQuery 1.5
	// 分期交付
	var promise = $.get('/mydata');
		promise.done(onSuccess);
		promise.fail(onFailure);
		promise.always(onAlways);
	
jQuery 1.5 改变了 Ajax 那种“马上就要”的态度。我们喜爱的所有 Ajax 函数（$.ajax、$.get 及$.post）现在都会返回Promise（承诺）对象。

Promise 对象代表一项有两种可能结果（成功或失败）的任务，它还持有多个回调，出现不同结果时会分别触发相应的回调。


进度通知的存在并没有改变每个Promise 对象的最终状态为已执行或
已拒绝这一事实。（否则，Promise 对象将永远保持挂起状态。）但为
什么要这样呢？为什么不让Promise 对象随时变化成任意的状态，而
偏偏只有这两种状态呢？

<iframe width="100%" height="300" src="http://jsfiddle.net/codinglion/826p0n62/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

<iframe width="100%" height="300" src="http://jsfiddle.net/codinglion/zpnpzga2/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

<iframe width="100%" height="300" src="http://jsfiddle.net/codinglion/toLdwsjv/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

<iframe width="100%" height="300" src="http://jsfiddle.net/codinglion/1qmmro5o/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>


<iframe width="100%" height="300" src="http://jsfiddle.net/codinglion/bfdpnnen/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

