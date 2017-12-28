[toc]

## 变量声明

* var   声明变量
* const 声明常量
* let   块级作用域

## 解构赋值

* #### 数组解构赋值

```
const [a,[b,c],d] = [0,[1,2,3],4]
console.log(a,b,c,d);
```

```
const [a=1,b=2,c=3,d=4,e=5] = ['a','b','c',undefined,null];
console.log(a,b,c,d,e);
```

* #### 对象解构赋值

```
const {a,b,c,d='44'} = {'a':'11','b':'22','c':'33'}
console.log(a,b,c,d);
```

* #### 字符串解构赋值

```
const [a,b,c,d=4] = 'abc'
console.log(a,b,c,d);
```

## 扩展运算符和rest运算符

* #### 对象扩展运算符

```
((...arr)=>{
	console.log(arr);
})(1,2,3,4,5)
```

```
var arr1 = [1,2,3]
var arr2 = [...arr1]
arr2.push(4,5,6);
console.log(arr2);
console.log(arr1);
```

* #### rest运算符

```
((first,srcond,...arr)=>{
	console.log(arr.length);
	console.log(arr);
	for(let i of arr){
		console.log(i);
	}
})(0,1,2,3,4,5)
```

## 字符串模板

```
const [a,b] = [10,2]

var str = `
<div class="str">
	<p>Hi,name</p>
	<p>${a+b}</p>
	<p>value</p>
</div>
`
console.log(str.repeat(10));
console.log(str.includes('a'));
console.log(str.startsWith('a'));
console.log(str.endsWith('a'));
```

## ES6数字操作

```
var a = 10.012312;

console.log(Number.isFinite(a));
console.log(Number.isInteger(a));

console.log(Number.parseInt(a));
console.log(Number.parseFloat(a));

console.log(Number.MAX_SAFE_INTEGER);
console.log(Number.MIN_SAFE_INTEGER);
console.log(Number.isSafeInteger(a));
```

## 新增数组知识

* #### Array.from

> json数组格式转换

```
var json = {
	'0':'a',
	'1':'b',
	'2':'c',
	'3':'d',
	length:4
}

var arr = Array.from(json);
console.log(arr);
```

* #### Array.of

> 把文本或者变量转换成数组

console.log(Array.of(0,1,2));
console.log(Array.of('a','b','c'));

* #### find()

> 查找数组中是否有某个元素

```
let arr = [0,1,2,3,4,5,6,7,8,9]

// value 当前查找的值
// index 索引值
// arr   返回的数组
console.log(arr.find((v,i,a)=>{
	return v == 5
}))
```

* #### fill()

> 填充数组

```
let arr = [0,1,2,3]

// 替换之后的内容
// 开始index
// 结束index
arr.fill('replace',1,3)

console.log(arr);
```

* #### for...of 遍历数组

```
let arr = ['a','b','c','d','e','f']

for(let [index,item] of arr.entries()){
	console.log(index,item);
}
```

## 箭头函数

```
var fn = (a,b=1) => console.log(a+b)
fn(1,2);
```

## 对象

* #### 赋值

```
let name = 'name';
let age = '20';

let obj = {name,age}

console.log(obj);
```

* #### key值构建

```
let key = 'name';
let obj = {
	[key]:'lee'
}
console.log(obj);
```

* #### Object.is() 对象比较

```
let obj1 = {name:'name1'}
let obj2 = {name:'name2'}
let res = Object.is(obj1.name,obj2.name)
console.log(res);
```

* #### Object.assgin() 对象合并

```
let obj1 = {name1:'name1'}
let obj2 = {name2:'name2'}
let res = Object.assign(obj1,obj2)
console.log(res);
```


## Symbol对象

```
let a = Symbol('lee');
console.log();
```

## Set和WeakSet数据结构

> Set不允许内部有重复的值（针对数组）

```
let set = new Set([1,2,3]);

set.add('4');
console.log(set);

set.delete(2);
console.log(set);

console.log(set.has(3));

for(let item of set){
	console.log('item:' + item);
}

set.forEach((v)=>{
	console.log('v:' + v);
})

console.log(set.size);

set.clear();
console.log(set);
```

> WeakSet针对对象

## map数据类型

```
let json = {
	name:'lee',
	age:20
}

let map = new Map();
map.set(json,'im');
map.set('im',json);

// 新增 set()

// 获取 set()

// 删除 delete()

// 查找 has()

// 清空 clear()

// 长度 size()
```


## 用Proxy进行预处理

## 用Promise进行预处理

```
let status = 1;

let step1 = (resolve,reject)=>{
	if(status){
		resolve('step-resolve-1');
	}else{
		reject('step-reject-1');
	}
}

let step2 = (resolve,reject)=>{
	if(!status){
		resolve('step-resolve-2');
	}else{
		resolve('step-reject-2');
	}
}

let step3 = (resolve,reject)=>{
	if(status){
		resolve('step-resolve-3');
	}else{
		resolve('step-reject-3');
	}
}

new Promise(step1).then((val)=>{
	console.log(val);
	return new Promise(step2);
}).then((val)=>{
	console.log(val);
	return new Promise(step3);
}).then((val)=>{
	console.log(val);
})
```

## class 类

```
class Person{
	// 类的参数
	constructor(a,b){
		this.a = a;
		this.b = b;
	}
	name(name){
		console.log(name);
	}
	age(age){
		console.log(age);
		this.name('lean');
	}
	add(){
		console.log(this.a + this.b);
	}
}

// 传参
let lee = new Person(1,10);

lee.name('lee');
lee.age('20');
lee.add();


// 继承
class Lean extends Person{

}
let lean = new Lean(1,2);
lean.add();
```

## 模块化操作

> export :负责进行模块化，也是模块的输出。
> import : 负责把模块引，也是模块的引入操作。

* #### export对应的导入方式

```
import {a,b} form './temp';
```

* #### export defalut对应的导入方式

```
import a from './temp';
```