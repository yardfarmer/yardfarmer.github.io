---
layout: post
date: 2015-01-16  1:43:47 +0800
title: 使用hg推送后执行编译 
tag: hg
---

## hg hook
大多数的版本管理工具都具有`钩子`功能，这里记录下开发团队内部工具[sluggard](https://github.com/chenyakun/sluggard "github repo")时,遇到的关于[hg hook](http://www.selenic.com/mercurial/hgrc.5.html#hooks)的使用。

在被推送端, `.hg/hgrc`下配置

	[ui]
	username = hg_be_pushed
	verbose = True

	[hooks]
	commit = /path/to/commithook
	incoming = /path/to/incominghook    # 每个 commit 执行一次
	changegroup= /path/to/changegroup   # 每次被 push 执行一次

	[web]
	push_ssl = No    # 放开ssl限制
	allow_push = *   # 运行推送

需要说明的是，被push端需要开启**web服务**,才能接收`push`

	hg serve -p port

推送端，`.hg/hgrc`配置如下

	[ui]
	username = hg_to_push

	[paths]
	default = http://localhost:8002/       # 用于pulling
	default-push = http://localhost:8002/  # 被推送端的 web 服务地址


当推送遇到错误时，可尝试

	hg push -f

当更新遇到错误时，可尝试

	hg update --check











