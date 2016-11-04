##为什么要用require.js？##

* 页面加载js的时候，浏览器会停止网页渲染，加载文件越多，网页失去响应的时间就会越长
* js文件之间存在依赖关系，因此必须严格保证加载顺序

##require.js的作用

* 实现js文件的异步加载，避免网页失去响应；
* 管理模块之间的依赖性，便于代码的编写和维护。

##require.js的用法

* 下载[require.js](http://requirejs.org/)
* 加载require.js文件
```
<script src="js/libs/require.js"></script>
```
* 用require(['','',''])引入所需js文件
```
require(['js/jquery','js/a'],function(){
	console.log("js加载完毕...");
});
```

> 可用require.config配置路径

```
require.config({
    paths:{
        'jquery': "js/libs/jquery.min"
    }
});
```
