---
layout: post
date: 2015-01-11  0:37:45 +0800
title: web-animations
tags: [library, w3c] 
---


> Web Animations defines APIs for synchronizing several of the web’s animation models with complex, scriptable animations.


在 Web 平台上有四种技术可实现动画：CSS Transitions, CSS Animations, SVG Animations / SMIL, and requestAnimationFrame(). 
但是 
- CSS Transitions / CSS Animations 表现能力不足,无法并行运行，不能用 script 控制.
- SVG Animations are  有表现力，但是编写复杂， can’t be applied to HTML content.
- requestAnimationFrame() is not a declarative approach, 运行在主线程，主线程忙时，会卡顿


于是，w3c 搞出了替代品

Basic usage
Here’s a simple example of an animation that scales and changes the opacity of a <div> over 0.5 seconds. The animation alternates producing a pulsing effect.

```html
<div class="pulse" style="width:150px;">Hello world!</div>
<script>
  var elem = document.querySelector('.pulse');
  var player = document.timeline.play(new Animation(elem, [
      {opacity: "0.5", transform: "scale(0.5)"}, 
      {opacity: "1.0", transform: "scale(1)"}
    ],
    {
      direction: "alternate", duration: 500, iterations: Infinity
    }));
</script>
```


## 问题
还未正式发布，浏览器兼容不全，需要`刮腻子`.
