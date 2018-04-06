"# myjquery" 
通过自己构建jQuery来学习jQuery源码，力求搞懂其中每一句代码，学习它的编程思想！

## basic-build
基本构建过程，是对原来jQuery构建过程的简化，把其中除了build之外的所有任务都先注释掉！

- 创建一个目录，用于我们的myjquery项目
- cd myjquery & npm init -y
- 创建src、build、dist目录，mkdir src build dist
- 拷贝Gruntfile.js，注释掉除了build之外的所有构建代码
- 拷贝build/tasks/build.js
- 安装所需npm包，npm install --save-dev grunt grunt-load-tasks insight strip-json-comments requirejs
- 全局安装grunt-cli，npm install -g grunt-cli
- 拷贝src/jquery.js，src/wrapper.js过来
- 注释掉src/jquery.js中的依赖引入代码

其实insight是用来统计用户使用自定义构建的数据，不过暂时我们并不需要，当然了，放着也不影响，所以这里就没有注释掉它。

## core
core是jQuery的核心模块。它定义了jQuery，并且在jQuery和jQuery原型上定义了一些我们常用的功能函数。

- jquery.js中解开对core.js的注释
- 把core.js拷贝过来
- 把core.js的依赖拷贝过来
- jquery.js中放开对global的注释，为了暴露jQuery到全局环境中

这里提一下var目录，在阅读jQuery源码时，会发现好多模块有var目录，而这个目录里面每个文件也都不大，很多都是一句return。所有var目录里面的内容再build时都是经过特殊处理的，会变成一个var定义放到前头。要想了解整个build过程，需要对requirejs的r.js有一定的了解，这个我们也放到后面再研究吧。

#### selector
选择器，现在jQuery的选择器用的是sizzle，所以暂时不去讨论选择器了

```

jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;

```

#### traversing
遍历

- 放开jquery.js中对traversing的依赖
- 拷贝src/traversing.js
- 拷贝traversing.js中所有的依赖


traversing给jQuery的原型上添加了以下方法：
- has
- closest
- index
- add
- addBack
- parent
- parents
- parentsUntil
- next
- prev
- nextAll
- prevAll
- nextUntil
- prevUntil
- siblings
- children
- contents
- find
- filter
- is
- not

jQuery.fn.init函数也是在这个模块里面的。

介绍一下traversing/var中三个文件：
- dir.js  
这是一个通用方法，用来沿着个方向遍历树，把途径的节点以数组方式返回。其中方向就是元素dom支持的一些属性：
1. parentNode 往上遍历直至到顶（window，不包括window）
2. nextSibling 后面的兄弟节点
3. previousSibling 前面的兄弟节点

这个过程中只会手机nodeType===1的节点

- siblings.js
返回指定元素的所有兄弟节点，包括前后

它的实现思路是，遍历指定元素父元素的第一个元素的nextSibling属性

- rneedsContext.js
jQuery.expr.match.needsContext;

我暂时还不知道这是什么鬼

接下来让我们说一下traversing目录下的findFilter.js  
它给jQuery原型添加了我们常用的方法：
- find 在当前jQuery对象中寻找符合选择器的子元素  
底层是调用Sizzle实现的，分别用到了Sizzle函数和Sizzle.contains函数  
如果是字符串就调用Sizzle函数，如果是非字符串就调用Sizzle.contains函数

- filter

用到了winnow
- not

用到了winnow
- is

用到了winnow

winnow是私有函数，并没有暴露到外面，只在这个模块里面。

#### callbacks

#### deferred

#### deferred/exceptionHook

#### core/ready

#### data

#### queue