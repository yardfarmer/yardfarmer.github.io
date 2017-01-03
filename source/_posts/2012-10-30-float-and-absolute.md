---
layout: post
date: 2012-10-30  22:58:28 +0800
title: float and absoulte
tag: css
---

## float & absolute 共性：

1. 包裹性
	包裹性换种说法就是让元素inline-block化，例如一个div标签默认宽度是100% 显示的，但是一旦被absolute属性缠上，则100%默认宽度就会变成自适应内部元素的宽度。

2. 兼容 IE 半透明
background:rgba(0,0,0,0.5); 
filter: progid:DXImageTransform.Microsoft.gradient(startcolorstr=#7F000000,endcolorstr=#7F000000);


3. 位置 
　　position:relative和position:absolute都可以改变元素在文档中的位置，都能激活元素的left、top、right、bottom和z-index属性。（默认这些属性未激活，设置了也无效）

　　设置position:relative和position:absolute都会让元素浮起来，会改变正常情况下的文档流。

　　不同：

　　position : relative 会保留自己在z-index:0层的占位，left、top、right、bottom值是相对于自己在z-index层的位置。

　　position : absolute 会完全脱离文档流，不在z-index:0层保留占位符，其left、top、right、bottom值是相对于自己最近的一个设置了position:relative或position:absolute的祖先元素的，如果祖先元素全都没有设置，那么就相对于body元素。


　　float 也能改变文档流，不同的是，float不会让元素浮到另一个元素上面，它仍然让元素在z-index:0层排列，只能通过float:left和float:right来控制元素在同一层里"左浮"和"右浮"。float会改变正常的文档流排列，影响周围元素。

　　position : absolute 和 float 会隐式的改变 display 类型，不论之前什么类型的元素（display:none除外）,只要设置了position:absolute和float中任何一个，都会让元素以display:inline-block的方式显示：可以设置长宽，默认宽度并不占满父元素。
就算显示的设置display:inline或者display:block，也仍然无效（IE6双倍边距BUG利用display:inline解决）。

　  position:relative 却不会隐式改变display类型。


### 浮动的详细内幕

理解浮动，要理解包含块(containing block), 浮动元素的包含块是其最近的块级祖先元素。

动元素会生成一个块级框，而不论这个元素本身是什么。如果让一个链接浮动，即使该链接元素本身是行内元素，通常会生成一个（===行内框===），但只要它是浮动的，就会生成一个块级框。
1. 浮动元素的左(右) 外边界不能超出其包含在包含块的左(或右)内边界。
2. 如果一个元素已经浮动，而另一个元素已经在那个位置，则后放置的元素则挨着前一个浮动元素的右外边界放置。
