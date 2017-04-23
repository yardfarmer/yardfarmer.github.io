---
layout: post
date: 2014-04-10  16:04:53 +0800
title: 细枝末节css 
categories: css
tag: css
---



### 选择器解析

浏览器解析CSS 选择器是从右往左的。这意味着，如果它看到一个如“`nav ul li a` 的规则时，它首先必须获得所有匹配a 的元素列表，然后检查看 它是不是li 的后代，再按相同规则继续检查。后代选择器虽然看起来方便，但它的性能开销是最大的。

## 元素的位置

元素的 x 和 y 坐标可以相对于文档的`左上角`或者相对于在其中`显示文档`的 `视口`的左上角。

> 在顶级窗口和标签页中，视口只是实际显示文档内容的一部分； 它不包括浏览器的外壳，拖动浏览器的边框，大小会跟随改变。

无论在何种情况下，当讨论元素的位置时，必须弄清楚所使用的坐标是文档坐标还是视口坐标。如果文档比视口要小，或者说它还未出现滚动，则文档的左上角就是视口的左上角,文档和视口坐标系统是同一个。

```
视口坐标+滚动的偏移量 = 文档的坐标
```

文档坐标比视口坐标更加基础，并且在用户滚动时它们不会发生变化。

当为鼠标事件注册事件处理程序函数时，报告的鼠标指针的坐标是在`视口坐标系`中的。


#### Window.innerHeight

window.innerHeight 是为了兼容性的考虑，IE9才开始支持。 **用于窗口元素的，不是用于普通元素的**

也就是浏览器窗口的视口（viewport）高度（以像素为单位），如果存在水平滚动条，则包括滚动条.  任何窗口对象，如 window、frame、frameset 或 secondary window 都支持 `innerHeight` 属性。


兼容性：

		Chrome	   Firefox (Gecko)	   Internet Explorer Opera  Safari
			1	  1.0 (1.7 or earlier)	       9            9       3

想获取窗口的外层高度（outer height），即整个浏览器窗口的高度，使用 `window.outerHeight`。



#### document.height

已废弃 用什么替代该属性

```
document.body.clientHeight
document.documentElement.clientHeight
```

#### element.clientHeight

返回元素内部的高度(单位像数), 包含 padding, 但`不包括水平滚动条,border 和 margin`.

clientHeight 是只读的.  不是属于W3C规格。 **注意**

`clientHeight` 是一个非标准属性, 它从 Internet Explorer 对象模型引入. 它是`HTML`的特有属性.

#### Element.scrollHeight
Element.scrollHeight 是计量元素内容高度的只读属性，包括overflow样式属性导致的视图中不可见内容。
没有垂直滚动条的情况下，scrollHeight值与元素视图填充所有内容所需要的最小值clientHeight相同。 包括元素的padding，但不包括元素的margin.  

#### 判定元素是否滚动到底
如果元素滚动到底，下面等式返回true，没有则返回false.

```javascript
element.scrollHeight - element.scrollTop === element.clientHeight   // element 已滚动到底
```

浏览器兼容性

	Browser	       Lowest version
	Internet Explorer	8.0


#### Element.getBoundingClientRect()

相对于 `视口`，而不是 `文档(dom)`

> The returned value is a TextRectangle object, which contains read-only 
>  - left, 
>  - top, 
>  - right and 
>  - bottom 
>  properties describing the border-box in pixels. top and left are relative to the top-left of the viewport.


```javascript
var rect = obj.getBoundingClientRect();
```

Browser compatibility

	Desktop 
	Feature	       Chrome	Firefox (Gecko) Internet Explorer	Opera	Safari
	Basic support	1.0	    3.0 (1.9)	         4.0 [1]	    (Yes)	 4.0
	width/height	(Yes)	3.5 (1.9.1)          9	            (Yes)	(Yes)


#### HTMLElement.offsetLeft

The HTMLElement.offsetLeft read-only method returns the number of pixels that the upper left corner of the current element is offset to the left within the `HTMLElement.offsetParent` node.

For block-level elements, offsetTop, offsetLeft, offsetWidth, and offsetHeight describe the border box of an element relative to the offsetParent`(containing box)`.

没有 OffsetRight，offsetBottom

#### HTMLElement.offsetHeight

The HTMLElement.offsetHeight read-only property is the height of the element including（包括） vertical padding and borders, in pixels, as an integer.  

Typically, an element's offsetHeight is a measurement which includes the element borders, the element vertical padding, 
the element horizontal scrollbar (if present, if rendered) and the element CSS height.  (如果有滚动条，包括滚动条)


许多文章已经介绍了clientHeight和offsetHeight的区别，就是`clientHeight`的值不包括 scrollbar 的高度，而 `offsetHeight` 的值包括了scrollbar的高度。


判定一个元素的尺寸和位置最简单的方法是调用它的 `getBoundingClientRect()` 方法。该方法是在 `IE5` 中引入的，而现在当前的所有浏览器都实现了。 

在很多浏览器(和W3C标准)中， getBoundingClientRect() 返回的对象还包含width 和 height属性，但是在原始的IE中未实现。为了简便起见，可以这样计算元素的 width 和 height:

```
var box = e.getBoundingClientRect();
var w = box.width || (box.right - box.left);
var h = box.height || (box.bottom - box.top);
```


除了这些名字以 `offset` 开头的属性以外，所有的文档元素定义了同时其他两组属性，其名称一组以 `client` 开头，另一组以 `scroll` 开头。即，每个HTML元素都有以下这些属性:

	offsetWidth offsetHeight offsetLeft offsetTop offsetParent    // = css.height + border*2 + padding，不受滚动条影响 

	clientWidth clientHeight clientLeft clientTop \                
													 —— > 不滚动时(但可包括滚动条)数值一样; 滚动时，scroll 包括 全部高度，而 client 只含可见高度
	scrollWidth scrollHeight scrollLeft scrollTop /

> 为了理解这些 client 和 scroll 属性，你需要知道HTML元素的实际内容有可能比分配用来容纳内容的盒子更大，因此单个元素可能有海动条.

内容区域是视口，就像浏览器的窗口，当实际内容比视口更大时，需要把元素的滚动条位置考虑进去。

clientWidth 和 clientHeight 类似 offsetWidth 和 offsetHeight. 不同的是它们不包含`边框`大小，只包含内容和它的内边距。同时，如果浏览器在内边距和边框之间添加了滚动条. clientWidth 和 clientHeight 在其返回值中也不包含滚动条。

** `code`和`span`这些内联元素. clientWidth 和 clientHeight 总是返回0。**
font-size: px 
字体用像素设定

其他元素与浮动元素相邻，这些元素的外边距不会与浮动元素的外边距合并。即3+2 = 5，而不是3 + 2 = 3。


![格式计算图](codesnip_20150110204724.jpg)

#### 图片定位的百分数用法：


图片的(99.9%,99%) 这个点与.container(所在容器)的(99.9%，99%)这个点对齐。
```
background-position: 99.9% 99%;
```

这样在使图片紧紧靠右，紧紧靠下就很简单。就使图片的（100%，100%）对准容器的（100%，100%）就可以了。


#### 选择器规则

浏览器解析 CSS 选择器是从右往左的。这意味着，如果它看到一个如“`nav ul li a` 的规则时，它首先必须获得所有匹配 a 的元素列表，然后检查看它是不是li 的后代，再按相同规则继续检查。后代选择器虽然看起来方便，但它的性能开销是最大的。


## 盒 

这里的盒是个多元的概念,其中相关的有：

- block level boxes 
- containing block
- block formatting context(BFC)

想想浏览器怎么把一个元素"画"出来，至少要知道定位和尺寸。**定位有三种 normal flow, floats 和 absolute**，无论属于哪种首先要找所在的containing block(翻译为包含块)，相当于一个大箱子里摆很多小盒子，小盒子怎么摆取决于大箱子。

怎么确定一个元素的containing block，由position属性确定：

1. static(默认的)/relative：简单说就是它的父元素的内容框（即去掉padding的部分）
2. absolute: 向上找最近的定位为absolute/relative的元素
3. fixed: 它的containing block一律为根元素(html/body)，根元素也是initial containing block

`block formatting context(块级格式化上下文)`是一种**布局特性**，还是往箱子里放东西，bfc可以理解为打了**隔板**把一组小盒子分离开。

`block-level box`一定会产生'block formatting context'是错误的，block-level box须通过设置如overflow不为visible(IE6/7无效，可以设zoom)、float不为none等等来创建block formatting context。

触发了bfc的block level box，没有**margin callapse**的问题，并且边缘不会和`float`的box的边缘重叠，利用它可以清浮动。

> 页面上任何一个元素都可以看成 box ,可分为 
> - block-level(块级)，如  'block', 'list-item', and 'table'.
> - inline-level(行内) 
> 和匿名的。


### 关于行内框和行框的概念

文本行中的每个元素都会生成一个内容区。这个内容区则会生成一个行内框（inline box），当一行中的所有内容均已生成了行内框，那么接下来在行框的构造中就会考虑这些行内框，行框要包含住最高行内框的顶端和最低行内框的底端。


## 元素居中

元素居中分为固定宽度和非固定宽度

对于固定宽度:
	设定居中元素 margin: xxpx auto; // 同理适用于垂直居中

对于非固定宽度元素:
    在父元素上设定 text-align: center;
	在目标元素上设定  display: inline-block;



## 脱离文档流

也就是将元素从普通的布局排版中拿走，其他盒子在定位的时候，会当做脱离文档流的元素不存在而进行定位。需要注意的是，使用float脱离文档流时，其他盒子会无视这个元素，但其他盒子内的文本依然会为这个元素让出位置，环绕在周围。而对于使用absolute positioning脱离文档流的元素，其他盒子与其他盒子内的文本都会无视它。


