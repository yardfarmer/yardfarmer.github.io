---
layout : post
title : CSS3 的 transition 和 animation
tags : css
---

##transition
transition 属性是
transition-property,
transition-duration,
transition-timing-function,
transition-delay
的简称,用于设定一个元素的两个状态,不同的状态可以用伪类，比如:hover, :active 或者是通过 javascript 动态设定。IE10+支持。

所以 transition 的初始值为：
```css
transition-delay: 0s;
transition-duration: 0s;
transition-property: all;
transition-timing-function: ease;
```
###用法
```css
div {
  transition: <property> <duration>    <timing-function> <delay>;
}
```
并且有事件可以监测 transition 结束
```javascript
el.addEventListener("transitionend",updateTransition,true);

//in webkit
el.addEventListener("webkitTransitionEnd",updateTransition,true);
```
###实例
HTML
```html
<!--  DEMO 1: Fade Block -->
<div id="fade">
     move here  !
</div>


<div id="nudge">
    mouse on me 
</div>


<div id="bounce">Place mouse on  me i will bounce!</div>


<div id="spin">Place mouse on  me i won  me i won  me i won  me i won  me i won  me i won  me i won  me i won  me i won  me i won  me i won  me i won  me i won  me i won  me i will spin</div>


<div id="accordion" class="accordion">
    <a href="#first">This is first tab</a>
    <div id="first"><p>Lorem ipsum </p> </div>

    <a href="#second">This is second tab</a>
    <div id="second"><p>Lorem ipsum </p> </div>
	
    <a href="#third">This is third tab</a>
    <div id="third"><p>Lorem ipsum </p> </div>
</div>
```
CSS
```css
/*
DEMO 1: Fade Block
*/
div {
    margin-bottom: 50px;
}


#fade {
    /*opacity:1;
    -webkit-transition: opacity 10s liner 10s;*/
  position: relative;
  transition-property: font-size;
  transition-duration: 0.5s;
  transition-delay: 0;
  font-size: 14px;
}

#fade:hover {
  font-size: 36px;
}


/* DEMO2 */
#nudge{
    
    -webkit-transition-property: color,
        background-color,padding-left;
    -webkit-transition-duration: 500ms,500ms, 500ms;
}

#nudge:hover{
    background-color: #efefef;
    color: #333;
    padding-left: 50px;
}




#bounce:hover {
    -webkit-animation-name:bounce;
    -webkit-animation-duration:1s;
    -webkit-animation-iteration-count:2;
    -webkit-animation-direction:alternate
}
@-webkit-keyframes bounce {
    from{margin-left:0;}
    to{margin-left:250px;}
}




#spin{
    -webkit-transition: -webkit-transform 10s ease-in;
}

#spin:hover{
    -webkit-transform: rotate(36000deg);
}



.accordion a{
    display: block;
    padding:5px 10px;
    background-color:#ccc;
    color:#000;
    
    /*可以去掉链接的下划线等修饰效果*/
    text-decoration:none;
    
}
.accordion a:hover{
    background-color:#999;
}
.accordion div{
    background-color:#cda;
    color:#222;
}
.accordion div p{
    padding:20px
}
 
#accordion div{
    /*先隐藏起来*/
    height:0;
    overflow:hidden;
    
    -webkit-transition:height 600ms ease;
}

#accordion div:target{
    height:110px;
}
```

##animation
animation 属性是如下这些属性的简写
animation-name: none
animation-duration: 0s
animation-timing-function: ease
animation-delay: 0s
animation-iteration-count: 1
animation-direction: normal
animation-fill-mode: none

###用法
```css
animation:
	animation-name
    time(duration)
    timing-function
    time(delay)
    animation-iteration-count( 结束之前的循环次数)
    single-animation-direction 
    /*{
    	animation-direction: normal (每次从正方向开始)
		animation-direction: reverse （每次从反方向开始）
		animation-direction: alternate （正反往复）
    }*/
    single-animation-fill-mode
```
###实例
```html
<div class="view_port">
   <div class="polling_message">
        Listener for dispatches     
   </div>
   <div class="cylon_eye">
   </div>
</div>
```
```css
.polling_message {
    color: white;
    float: left;
    margin-right:2%;
}
.view_port {
    background-color: black;
    height: 50px;
    width: 100%;
    overflow: hidden;
}
.cylon_eye {
    color: white;
    height: 100%;
    width: 80%;
    background-color: red;
    
    background-image: linear-gradient(to right, rgba(0, 0, 0, 0.9) 25%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.9) 75%);
    
    -webkit-animation: move_eye 4s linear 0s infinite alternate;
       -moz-animation: move_eye 4s linear 0s infinite alternate;
         -o-animation: move_eye 4s linear 0s infinite alternate;
            animation: move_eye 4s linear 0s infinite alternate;
}
@-webkit-keyframes move_eye {
    from {
        margin-left:-20%;
    }
    to {
        margin-left:100%;
    }
}
@-moz-keyframes move_eye {
    from {
        margin-left:-20%;
    }
    to {
        margin-left:100%;
    }
}
@-o-keyframes move_eye {
    from {
        margin-left:-20%;
    }
    to {
        margin-left:100%;
    }
}
@keyframes move_eye {
    from {
        margin-left:-20%;
    }
    to {
        margin-left:100%;
    }
}
```


