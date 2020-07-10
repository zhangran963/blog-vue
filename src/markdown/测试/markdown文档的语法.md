---
title: "markdown"
keys: "md markdown"
description: "markdown文档的语法示例"
created: "2020年6月28日 20:06"
---

# 博客的写作语法

## 博客的写作语法

### 博客的写作语法

#### 博客的写作语法

##### 博客的写作语法

###### 博客的写作语法

`撇号包含的内容` 

``` js
const name = "四叶草"

function say(msg = name) {
    console.log( `${name} 曰:` )
}
```

> 在视图显示出来之前，Angular 会先根据你的应用数据和逻辑来运行模板中的指令并解析绑定表达式，以修改 HTML 元素和 DOM。 Angular 支持**双向数据绑定**，这意味着 DOM 中发生的变化（比如用户的选择）同样可以反映回你的程序数据中。

  > 你的模板也可以用管道转换要显示的值以增强用户体验。比如，可以使用管道来显示适合用户所在语言环境的*日期和货币*格式。 Angular 为一些通用的转换提供了预定义管道，你还可以定义自己的管道。
  > 1. 这是第一行列表项。
  > 2. 这是第二行列表项。
  > return shell_exec("echo $input | $markdown_script"); 

* red
* Green
* Blue

这是一个普通段落

![默认提示文字](https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Unicode_logo.svg/440px-Unicode_logo.svg.png)

[Unicode字符列表](https://zh.wikipedia.org/wiki/Unicode%E5%AD%97%E7%AC%A6%E5%88%97%E8%A1%A8)

---

***

### 示例

|标题1|标题2|标题3|标题4|
|--|:---:|--:|:--:|
|aaa|1| ||
|bbb|1|1|1|
|ccc|1|1|1|
|ddd|2|1|1|

_斜体_
*这也是斜体*

__粗体__
**这也是粗体** 

_中间带有**粗体**字符串_

~~删除线~~

* item1
* item2
    - subItem1
    - subItem2

> 引用的内容

分隔线1

---

分隔线2

***

分隔线3

___

指明代码块的语言

``` js
function speak(name) {
    console.log("内容");
}
```

上标
30^th^

下标
H~2~0

脚注(链接到文档底部)
Content [^1]
Content [^1]
[^1]: Hi!

### markdown中的链接

``` md
[网络地址链接](网络地址)

[本页地址链接](#本页的某个地址, 如'#检测程序更新');
```
