---
layout: post
date: 2014-10-31  1:04:47 +0800
title: jQuery-event-on
---

**.on()**

**.on(event,[,selector][,data],handler)**

重点在于这里有个 selector，这个 selector 是对前面选择器的一个细化，选择的是前面选择器的子元素。

 好方法

```javascript
    var option = "loading";
    var a = typeof option == "object" && option;
    var b = true && option;  // return "loading"
    var c = false && option; // return false;
```

 > Selector context is implemented with the .find() method; 
therefore:

```javascript
    $( "li.item-ii" ).find( "li" ) 
 // is equivalent to 
    $( "li", "li.item-ii" ).
```
