title: js中的编码转换
tags:
  - Injury
  - Fight
  - Shocking
categories:
  - Sports
  - Baseball
date: 2015-10-23 00:24:35
updated: 2015-10-23 00:24:35
---


#js 的码

#1. btoa, atob

WindowBase64.btoa()

```
var encodedData = window.btoa(stringToEncode);
```

```
var encodedData = window.btoa("Hello, world"); // encode a string
var decodedData = window.atob(encodedData); // decode the string
```


Notes
You can use this method to encode data which may otherwise cause communication problems, transmit it, then use the window.atob() method to decode the data again. For example, you can encode control characters such as ASCII values 0 through 31.

btoa() is also available to XPCOM components implemented in JavaScript, even though window is not the global object in components.

Unicode Strings
In most browsers, calling window.btoa() on a Unicode string will cause a Character Out Of Range exception.

To avoid this, consider this pattern, noted by Johan Sundström:

	function utf8_to_b64(str) {
   	 return window.btoa(unescape(encodeURIComponent(str)));
	}

	function b64_to_utf8(str) {
   	 return decodeURIComponent(escape(window.atob(str)));
	}

// Usage:
utf8_to_b64('✓ à la mode'); // JTI1dTI3MTMlMjUyMCUyNUUwJTI1MjBsYSUyNTIwbW9kZQ==
b64_to_utf8('JTI1dTI3MTMlMjUyMCUyNUUwJTI1MjBsYSUyNTIwbW9kZQ=='); // "✓ à la mode"

utf8_to_b64('I \u2661 Unicode!'); // SSUyNTIwJTI1dTI2NjElMjUyMFVuaWNvZGUlMjUyMQ==
b64_to_utf8('SSUyNTIwJTI1dTI2NjElMjUyMFVuaWNvZGUlMjUyMQ=='); // "I ♡ Unicode!"
A better, more faithful and less expensive solution is to convert the DOMString to a UTF-8 encoded string passing for typed arrays. In order to do this, please, read this paragraph.
##2. escape



##. encodeURIComponent