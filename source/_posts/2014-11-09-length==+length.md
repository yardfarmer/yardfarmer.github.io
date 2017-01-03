---
layout: post
date: 2014-11-09 14:41:06 +0800
title: length==+length
---

读 underscroe 源码的时候看到了

```javascript
var length = obj.length;

 if (length === +length) {
    } else {
 }
```

符号会尝试把后面的 length 转成数字，比如 +"1" => 1, 同样 -"1" => -1

所以，+length 的目的就是如果 length 不是数字的化，就要转成数字。

> NaN === NaN 返回false
>
> null === null 返回 true

但这还不是最终目的:

1.   如果 length 赋值为 undefined，

	因为 +undefined => NaN, 并且 NaN 不等 NaN

	所以 length==+length 可以排除 length 为 undefinde 的情况.

1.   如果 length 赋值为 null，

	因为 +null => 0,  从而，null === 0 同样返回false

	所以 length==+length 可以排除 length 为 null 的情况.

最终实现了 只有 length 是 **数字** 或者 **数字字符串** 的目的。
	


