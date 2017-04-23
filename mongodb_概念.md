---
layout: post
date: 2016-04-23  15:10:18 +0800
title: MongoDB
tags: default
categories: default
description: 
toc: true
feature: http://7i7gr4.com1.z0.glb.clouddn.com/2017-04-23-14929312889535.jpg
---


#mongodb 概念

mongodb 的基本概念是 **文档,集合,数据库**

##数据库
一个 mongodb 可以建立**多个**数据库, 默认的数据库是 **db**,该数据库存储在 **data** 目录中.

*show dbs* 可以显示所有数据的列表.

```
mongo

show dbs #显示所有的数据库

use local #连接到指定的数据库

mongod —config /usr/local/etc/mongod.conf #启动

```

##文档
**文档**是 mongodb 最核心的概念, 是核心单元, 可以将**文档类比成关系型数据库中的每一行数据**.

**多个键值对放在一起就是文档.**, mongodb 使用的是类似 json 的 **bson**存储数据. bson 就是在 json 的基础上增加了一些数据类型.

文档:

```
{site: 'sjkljas.com'}
```
通常, "object(对象)" 术语指一个文件. 文件类似于 RDBMS 的记录, 集合( collection) 可以 crud.

RDBMS | MongoDB
:----------- | :-----------
Table        | Collection
Column         | key 
Value| value
Records/Rows| Document/Object

下面是 MongoDB 中的几种数据类型

数据类型 | 描述
:----------- | :-----------
string         | 
integer         |
boolean|
double|
null | 不是0,也不是空
array|
object| 对象型,,程序中被使用的实体. 可以是一个值,变量,函数,或者数据结构
timestamp|timestamp存储为64位的值，只运行一个mongod时可以确保是唯一的。前32位保存的是UTC时间，单位是秒，后32为是在这一秒内的计数值，从0开始，每新建一个MongoTimestamp对象就加一
Internationalized Strings|utf8 字符串
Object IDs|\_id, _id值可以是任何类型,最常见的做法是使用ObjectId类型


在mongodb中的集合是无模式的，也就是说集合中存储的,文档的结构可以是不同的，比如下面的两个文档可以同时存入到一个集合中：

```
{"name":"mengxiangyue"} {"Name":"mengxiangyue","sex":"nan"}
```

##MongoDB连接命令格式
使用用户名和密码连接到MongoDB服务器，你必须使用 **'username:password@hostname/dbname' **格式，'username'为用户名，'password' 为密码。

```
mongodb://username:pass@localhost/
```


###参数选项说明
标准格式：

```
mongodb://[username:password@]host1[:port1]   [,host2[:port2],...[,hostN[:portN]]][/[database]   [?options]]
```
标准的连接格式包含了多个选项(options)，如下所示：


| First Header | Second Header | Third Header |
| ------------ | ------------- | ------------ |
| Content Cell | Content Cell  | Content Cell |
| Content Cell | Content Cell  | Content Cell |


|选项|描述|
| ------------ | ------------- |
|replicaSet=name|验证replica set的名称。 Impliesconnect=replicaSet.|
|slaveOk=true,false|true:在connect=direct模式下，驱动会连接第一台机器，即使这台服务器不是主。在connect=replicaSet模式下，驱动会发送所有的写请求到主并且把读取操作分布在其他从服务器。false: 在 connect=direct模式下，驱动会自动找寻主服务器. 在connect=replicaSet 模式下，驱动仅仅连接主服务器，并且所有的读写命令都连接到主服务器。|
|safe=true,false	|true: 在执行更新操作之后，驱动都会发送getLastError命令来确保更新成功。(还要参考 wtimeoutMS). false: 在每次更新之后，驱动不会发送getLastError来确保更新成功。|
|w=n|	驱动添加 { w : n } 到getLastError命令. 应用于safe=true。|
|wtimeoutMS=ms|	驱动添加 { wtimeout : ms } 到 getlasterror 命令. 应用于safe=true.|
|fsync=true,false|true: 驱动添加 { fsync : true } 到 getlasterror 命令.应用于 safe=true. false: 驱动不会添加到getLastError命令中。|
|journal=true,false|	如果设置wie true, 同步到 journal (在提交到数据库前写入到实体中). 应用于 safe=true|
|connectTimeoutMS=ms|可以打开连接的时间。|
|socketTimeoutMS=ms	|发送和接受sockets的时间。|


[数据操作等更多内容](http://www.w3cschool.cc/mongodb/mongodb-insert.html "Title")


###mongodb 类型操作符

$type 根据类型值查找

```
db.testtable.find({"extra.friends" : {$type : 3}})
```

|类型|$type 值|
|---------|---------|
|Double|	1|
|String	|2|
|Object	|3|
|Array	|4|
|Binary data	|5|
|Object id	|7|
|Boolean	|8|
|Date	|9|


