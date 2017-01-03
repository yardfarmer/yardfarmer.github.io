#css编写规范

## css 书写顺序

尽量按照特定顺序编写规则，这将确保你充分发挥 CSS 中第一个 C 的意义：**cascade**，层叠。

一份规划良好的 CSS 应当按照如下排列：

1. Reset 万物之根源
2. 元素类型 没有 class 的 h1、ul 等
3. 对象以及抽象内容 最一般、最基础的设计模式
4. 子元素 由对象延伸出来的所有拓展及其子元素
5. 修补 针对异常状态



> 显示 > 盒模型 > 文本


```
/*========================
/*显示*/
display || visibility
list-style : list-style-type || list-style-position || list-style-image
position
top || right || bottom || left
z-index
clear
float
/*盒模型*/
width
max-width || min-width
height
max-height || min-height
overflow || clip
margin : margin-top || margin-right || margin-bottom || margin-left
padding : padding-top || padding-right || padding-bottom || padding-left
outline : outline-color || outline-style || outline-width
border
background : background-color || background-image || background-repeat || background-attachment || background-position
/*文本*/
color
font : font-style || font-variant || font-weight || font-size ||    line-height || font-family
font : caption | icon | menu | message-box | small-caption |    status-bar
text-overflow
text-align
text-indent
line-height
white-space
vertical-align
cursor
========================*/
```