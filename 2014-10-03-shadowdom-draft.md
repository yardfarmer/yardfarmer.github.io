---
layout: post
date: 2014-10-03 20:41:43 +0800
title: Shadow trees
---

## Shadow trees

w3c 中关于 Shadow tress 是这样说的：

1.  文档树是根节点为文档(document)的节点树. (A document tree is a node tree [DOM] whose root node is a document.)
2.  任何元素都能拥有一个按顺序排列的关联0到多个节点树的列表.(Any element can have an associated ordered list of zero or more node trees.)
3.  该元素作为此节点树的宿主，如果这个节点树在该元素的节点树列表中.(An element hosts a node tree if the node tree is a member of this associated list.)
4.  shadow host就一个元素 hosts 一个或多个节点树.(A shadow host is an element that hosts one or more node trees.)
5.  shadow root 是一个 shadow tree 的根节点。
6.  如果某个shadow host, hosts 了多个 shadow tree， 最近添加的成为 younger，越早越 older。

参考
http://w3c.github.io/webcomponents/spec/shadow/#shadow-trees
