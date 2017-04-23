---
layout: post
date: 2014-10-31  13:02:19 +0800
title: linux 用户管理
tags: linux
---

创建一个用户 foo 这个用户只能在/home/foo 上面增加删除文件， foo 不能在其他目录加减文件

    useradd -d /home/foo  -m foo
    [root@] # passwd jc

    chown foo -R /home/foo


Linux 系统是一个多用户多任务的分时操作系统，用户在登录时键入正确的用户名和口令后，就能够进入系统和自己的主目录。


用户账号的管理工作主要涉及到用户账号的添加、修改和删除。
添加用户账号就是在系统中创建一个新账号，然后为新账号分配用户号、用户组、主目录和登录Shell等资源。刚添加的账号是被锁定的，无法使用。

## 添加新的用户账号

使用useradd命令，其语法如下：

代码:
useradd 选项 用户名

-c comment 指定一段注释性描述。
-d 目录 指定用户主目录，如果此目录不存在，则同时使用 ==-m ==选项，可以创建主目录。
-g 用户组 指定用户所属的用户组。
-G 用户组，用户组 指定用户所属的附加组。
-s Shell文件 指定用户的登录Shell。
-u 用户号 指定用户的用户号，如果同时有-o选项，则可以重复使用其他用户的标识号。



    # useradd –d /usr /sam -m sam

此命令创建了一个用户sam，其中-d和-m选项用来为登录名sam产生一个主目录/usr/sam（/usr为默认的用户主目录所在的父目录）。


    # useradd -s /bin/sh  -g group –G adm,root gem

此命令新建了一个用户gem，该用户的登录Shell是/bin/sh，它属于group用户组，同时又属于adm和root用户组，其中group用户组是其主组。
 
## 删除帐号

如果一个用户的账号不再使用，可以从系统中删除。删除用户账号就是要将/etc/passwd等系统文件中的该用户记录删除，必要时还删除用户的主目录。删除一个已有的用户账号使用userdel命令，其格式如下：

代码:
userdel 选项 用户名

常用的选项是-r，它的作用是把用户的主目录一起删除。

代码:

    # userdel sam


此命令删除用户sam在系统文件中（主要是/etc/passwd, /etc/shadow, /etc/group等）的记录，同时删除用户的主目录。

## 修改帐号

修改用户账号就是根据实际情况更改用户的有关属性，如用户号、主目录、用户组、登录Shell等。


    usermod 选项 用户名


常用的选项包括-c, -d, -m, -g, -G, -s, -u以及-o等，这些选项的意义与useradd命令中的选项一样，可以为用户指定新的资源值。另外，有些系统可以使用如下选项：

-l 新用户名

    #usermod -l urchin(新用户名称)  test(原来用户名称) 

这个选项指定一个新的账号，即将原来的用户名改为新的用户名。



    # usermod -s /bin/ksh -d /home/z –g developer sam

此命令将用户sam的登录Shell修改为ksh，主目录改为/home/z，用户组改为developer。



## 用户口令的管理

用户管理的一项重要内容是用户口令的管理。用户账号刚创建时没有口令，但是被系统锁定，无法使用，必须为其指定口令后才可以使用，即使是指定空口令。
指定和修改用户口令的Shell命令是passwd。超级用户可以为自己和其他用户指定口令，普通用户只能用它修改自己的口令。


    passwd 选项 用户名


-l 锁定口令，即禁用账号。
-u 口令解锁。
-d 使账号无口令。
-f 强迫用户下次登录时修改口令。
如果默认用户名，则修改当前用户的口令。

假设当前用户是sam，则下面的命令修改该用户自己的口令：

    $ passwd
    Old password:******
    New password:*******
    Re-enter new password:*******


如果是超级用户，可以用下列形式指定任何用户的口令：

    # passwd sam
    New password:*******
    Re-enter new password:*******


