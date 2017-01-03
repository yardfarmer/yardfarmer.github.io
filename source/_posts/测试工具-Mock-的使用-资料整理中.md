title: 测试工具 Mock 的使用(资料整理中)
date: 2015-10-23 00:25:10
updated: 2015-10-23 00:25:10
tags:
---

因为重构，所以需要测试。

## 前言

###单元测试
单元测试主要包含断言，测试框架，测试用例，测试覆盖率，mock，持续集成等几个方面：

Mocha 支持你用任何一种断言库，无论是should.js、chai、expect.js、better-assert等等。也可以用node原始的assert。
 
###测试风格
Mocha支持BDD（行为驱动开发）和TDD（测试驱动开发）两种测试风格，BDD对于TDD来说在关注点更关注整体行为是否符合预期，在表达方式上更接近于自然语言的习惯。Mocha的默认模式是BDD，在此我们只关注BDD模式。

###钩子函数
BDD风格的钩子函数有：before, after, beforeEach, afterEach 典型BDD风格测试：