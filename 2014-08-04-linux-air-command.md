---
layout: post
date: 2014-08-01 00:32:16 +0800
title: linux常用工具
tags: linux
---

使用时
>如空气般必须，如呼吸般自然


## 文件链接 
链接文件可以节省磁盘空间，修改链接文件，等于修改原文件

```bash
ln -s /path/realfile /linkto/path/linkfile
-s 表示创建的是符号链接
```


## zip

```bash

zip -r myfile.zip ./*
-r: 递归压缩

zip -d myfile smart.txt
删除掉压缩文件中的 smart.txt

zip -m myfile.zip ./add.txt
向压缩文件中 myfile.zip 添加(插入) add.txt 文件

```

## unzip

```bash
unzip -o -d /home/sunny myfile.zip
-o: 直接覆盖不提示
-d: 指明将文件解压到哪
```


## 管道输出到文件

```bash
ls /ect/hosts > filename
追加到文件
ls /etc/hosts >> filename 
```

## env

>  env executes utility after modifying the environment as specified on the command line.  The option name=value
     specifies an environmental variable, name, with a value of value.  The option `-i' causes env to completely ignore
     the environment it inherits.


 If no utility is specified, env prints out the names and values of the variables in the environment, with one name=value pair per line.

如果使用参数 i, 设定环境为制定的环境,排除其他默认参数的影响
```
 env -i [name=value] java -jar xx 
```


