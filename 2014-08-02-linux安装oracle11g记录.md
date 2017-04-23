---
layout: post
date: 2014-08-02 00:32:16 +0800
title: Linux 安装 oracle11g 记录
tags: database linux
---





## 准备oracle安装文件
 
 Oracle11gR2包含两个文件linux_11gR2_database_1of2.zip和linux_11gR2_database_2of2.zip，将这两个文件通过SSH上传到/usr /local/oracle中。
解压安装文件到当前目录

```
[root@localhost root]#cd /usr/local/oracle

[root@localhost oracle]#unzip linux_11gR2_database_1of2.zip

[root@localhost oracle]#unzip linux_11gR2_database_2of2.zip
```
执行以上命令后，将会在/usr/local/oracle/下面产生名为database的目录，这就是oracle安装程序的目录。
 
## 准备oracle的安装目标目录

```
[root@localhost oracle]#mkdir –p /opt/oracle

```
安装目标目录是用户想将oracle安装到哪个位置的目录，本次我们将oracle安装到/opt/oracle目录中，以下为目录创建命令。
 
## 创建oracle相关用户和用户组

oracle不能在root帐户下进行安装，所以需要为oracle的安装专门创建一个用户，同时需要创建dba和oinstall的用户组。

```
[root@localhost oracle]#groupadd dba
[root@localhost oracle]#groupadd oinstall

```
以下命令将创建dba和oinstall用户组：
以下命令将创建oracle用户，并设置密码

```
[root@localhost oracle]#useradd -g oinstall -G dba oracle

[root@localhost oracle]#passwd oracle

Changing password for user oracle.

New UNIX password: [在此键入密码]

BAD PASSWORD: it is based on a dictionary word

Retype new UNIX password: [在此再次键入密码]

passwd: all authentication tokens updated successfully.

```

以下命令将oracle安装目录（/opt/oracle）赋予oracle用户oinstall用户组

```
[root@localhost oracle]#chown –R oracle:oinstall /opt/oracle

```

 
## 检查安装ORACLE依赖的RPM软件包

oracle的安装所依赖的软件包，有一部分linux是没有安装的。这需要将这些尚未安装的软件包先安装后才能正常安装oracle。这些未安装的软件包在linux安装光盘上可以取到，我

们直接在linux的光盘上对这些软件包进行安装（也可将所需的软件包直接复制到linux本地磁盘中），首先我们需要挂载linux光盘，使用以下命令：

[root@localhost oracle]#mkdir /mnt/cdrom

[root@localhost oracle]#mount /dev/cdrom /mnt/cdrom
安装所缺少的软件包，此处只安装本linux系统所缺少的软件包。如oracle安装过程中，对软件包进行检查时，发现仍有所需软件包未安装时，可根据显示未安装软件包的名字，再次对所缺少的软件包进行安装。以下为安装命令：

```
[root@localhost oracle]#
rpm -ivh kernel-headers-2.6.18-164.el5.i386.rpm

rpm -ivh glibc-headers-2.5-42.i386.rpm

rpm -ivh glibc-devel-2.5-42.i386.rpm

rpm -ivh libgomp-4.4.0-6.el5.i386.rpm

rpm -ivh sysstat-7.0.2-3.el5.i386.rpm

rpm -ivh libaio-devel-0.3.106-3.2.i386.rpm

rpm -ivh libstdc++-devel-4.1.2-46.el5.i386.rpm

rpm -ivh unixODBC-2.2.11-7.1.i386.rpm

rpm -ivh unixODBC-devel-2.2.11-7.1.i386.rpm

rpm -ivh gcc-4.1.2-46.el5.i386.rpm

rpm -ivh gcc-c++-4.1.2-46.el5.i386.rpm

rpm -ivh elfutils-libelf-devel-0.137-3.el5.i386.rpm elfutils-libelf-devel-static-0.137-3.el5.i386.rpm

```

软件包安装完成后，
 
## 设置linux内核参数

打开修改/etc/sysctl.conf，在最后加入以下内容

```



#kernel.shmall = 2097152

#kernel.shmmax = 2147483648

kernel.shmmni = 4096

kernel.sem = 250 32000 100 128

net.core.rmem_default = 4194304

net.core.rmem_max = 4194304

net.core.wmem_default = 262144

fs.file-max = 6815744

net.ipv4.ip_local_port_range = 9000 65500

net.core.wmem_max = 1048576

fs.aio-max-nr = 1048576

```
 
## 修改 /etc/security/limits.conf

```
修改 /etc/security/limits.conf,加入内容

oracle soft nproc 2047

oracle hard nproc 16384

oracle soft nofile 1024

oracle hard nofile 65536

```

## 修改系统环境变量`/etc/profile`

修改环境变量`/etc/profile`，加入以下内容

```
if [ $USER = "oracle" ]; then

	if [ $SHELL = "/bin/ksh" ]; then

		ulimit -p 16384

		ulimit -n 65536

	else
		ulimit -u 16384 -n 65536
	fi
fi
```
 
## 设置ORACLE环境变量

修改oracle用户主目录（/home/oracle）的的环境变量配置文件`~/.bash_profile`。使用以下命令

```
[root@localhost oracle]#vi /home/oracle/.bash_profile
```

往配置文件中加入以下内容

```
export ORACLE_SID=orcl （注意这个值要和下面创建的数据库实例名称相同）

export ORACLE_BASE=/opt/oracle/app

export ORACLE_HOME=$ORACLE_BASE/product/11.2.0/dbhome_1

export PATH=$PATH:$HOME/bin:$ORACLE_HOME/bin

export LD_LIBRARY_PATH=$ORACLE_HOME/lib:/usr/lib

```
 
## 开始安装过程

以上步骤设置完成后，建议重新启动系统，使所有设置生效。现在使用oracle用户登录，并转到ORACLE安装程序目录。以下的每一个步骤都oracle安装过程的一个步骤（每一个步骤对应一个安装界面）。

```
[root@localhost oracle] # su oracle

[oracle@localhost oracle] #cd /usr/local/oracle/database

```

运行安装命令

```
[oracle@localhost database] #./runInstaller
```

 

有桌面类和服务器类两个选项，此处选择*服务器类(server)*。

*可以选择只安装数据库软件, 即不创建通常的数据库实例和数据库文件*

如果只是安装了数据库软件,**安装结束后**可以再

配置监听

```
$ORACLE_HOME/bin/netca
```

安装实例或数据库

```
$ORACLE_HOME/bin/dbca 
```
完成以上操作时，建议重新启动一次，避免某些设置未生效。重启后使用oracle用户登录，打开终端，键入以下命令运行以下命令
启动监听：

```
[root@localhost oracle]$lsnrctl start
```

启动数据库和实例：

```
[root@localhost oracle]$sqlplus /nolog
[root@localhost oracle]$conn /as sysdba

```
进入sqlplus后，执行启动数据库命令，以下命令将创建、安装并打开ORACLE实例。此时，数据库系统处于正常工作状态，可以接受用户请求。

```
SQL>startup

```

关闭用

```
SQL>shutdown immediate

```


## 额外说明

验证监听

```
$ tnsping sid/serviceName

```

## 监听的配置

下回再写.

