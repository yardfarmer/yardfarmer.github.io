css 编写习惯

1. 分区, 看过视觉稿之后，我们可以得出该视觉稿有9个独立区块，所以我们描写结构的css文件中的区块样式定义最多为9块

2. 抽象, 考虑哪些局部分类的样式是基本相似的, 可以抽出来复用. 
 	*  比如字体, 颜色做成复用的样式, 所以在分区的基础上再加一个定义块, 用于编写复用的样式; 

 	* 比如使用 css sprite 图时, 不应每使用一次图片就引用一次, 而是应该定义一个工公用的样式.
 	
 	* 把定义背景的代码也放在一处, 便于维护


> css文件中定义样式区块的数量 = 页面最多区块数 + 公共区块 + 背景图区块 

* IE6下如果背景图在各处定义，那么它将导致背景图多次被请求，加大服务器开销

* 构思 css 文件中的代码结构

> css代码结构先后循序为：背景图定义、公用定义、各个页面区块定义，两个代码区块之间请用回车键换行隔开



	/* 背景图 */
	.part-a .background,
	.part-b .background,
	.part-c .background{background:url("http://www.aissa.me/fuck/you/once.png") no-repeat;}
	 
	/* 公用 */
	.link:link,
	.link:visited{color:#06c; text-decoration:none;}
	.link:hover{color:#ff7300; text-decoration:underline;}
	.margin-top-8px{margin-top:8px;}
	 
	/* 区块一 */
	.part-a{width:400px; height:300px;}
	.part-a .background{background-position:-50px -100px; width:100px; height:150px;}
	.part-a .class-a{width:100px; height:100px;}
	......
	 
	/* 区块二 */
	.part-b{width:400px; height:300px;}
	.part-b .background{background-position:-50px -100px; width:100px; height:150px;}
	.part-b .class-a{width:100px; height:100px;}
	......
	 
	/* 区块三 */
	.part-c{width:400px; height:300px;}
	.part-c .background{background-position:-50px -100px; width:100px; height:150px;}
	.part-c .class-a{width:100px; height:100px;}
	......
	
	
	