---
layout: post
date: 2013-12-09 23:42:04 +0800
title: vim-vundle
categories: note vim
tags: [vim,tools]
---

> Vundle is Vim bundle Manager

## Vundle 是什么
Vundle 是 vim 上的一款插件管理工具, 能帮助统一管理 vim 插件.

1. simplel config  # 只需配置 .vimrc
1. install 
1. update 
1. search
1. clean 



## 安装 Vundle

```
$ git clone https://github.com/gmarik/Vundle.vim.git ~/.vim/bundle/Vundle.vim
```


## .vimrc 配置

只需在现有 ~/.vimrc 文件之上加入这些配置.

Plugin 'Valloric/MatchTagAlways',格式通常是 作者名/插件名,插件可以去 github 搜.

```
set nocompatible              " be iMproved, required
filetype off                  " required

" set the runtime path to include Vundle and initialize
set rtp+=~/.vim/bundle/Vundle.vim

call vundle#begin()
" alternatively, pass a path where Vundle should install plugins
"call vundle#begin('~/some/path/here')


" let Vundle manage Vundle, required
Plugin 'gmarik/Vundle.vim'

" The following are examples of different formats supported.
" Keep Plugin commands between vundle#begin/end.

" plugin on GitHub repo
Plugin 'tpope/vim-fugitive'
Plugin 'git://git.wincent.com/command-t.git'
Plugin 'rstacruz/sparkup', {'rtp': 'vim/'}

" Avoid a name conflict with L9
" Plugin 'user/L9', {'name': 'newL9'}


" Tags Match Plugin
Plugin 'Valloric/MatchTagAlways'

" All of your Plugins must be added before the following line

call vundle#end()            " required
filetype plugin indent on    " required

" To ignore plugin indent changes, instead use:
"filetype plugin on

" Brief help
" :PluginList       - lists configured plugins
" :PluginInstall    - installs plugins; append `!` to update or just :PluginUpdate
" :PluginSearch foo - searches for foo; append `!` to refresh local cache
" :PluginClean      - confirms removal of unused plugins; append `!` to auto-approve removal
"
" see :h vundle for more details or wiki for FAQ
" Put your non-Plugin stuff after this line
```

## 使用方法

开启 Vim, 执行:

```
  :PluginInstall
```





