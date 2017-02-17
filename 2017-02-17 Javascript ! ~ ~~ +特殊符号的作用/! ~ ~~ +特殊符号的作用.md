```
/* 
** 自执行函数
** ! ~ + -可以将函数变成一个函数表达式，从而进行自执行，类似于JQuery的(function(){})()
**
*/

+function(){
	console.log("++++++++++++++++++++++++");
}();

-function(){
	console.log("------------------------");
}();

!function(){
	console.log("!!!!!!!!!!!!!!!!!!!!!!!!");
}();

~function(){
	console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
}();

/* 
** +可以快速把string类型的数字转换成number类型
**
*/

var str = "100";
console.log(typeof(str));
console.log(typeof(+str));

/* 
** ~~双波浪号可以快速取整数，移除小数点后面的小数，不会进行四舍五入
**
*/

var number = 3.954;
console.log(~~number);
```