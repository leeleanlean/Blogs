### 1. 简介
javascript的一个超集，有类型的script
```
- 编译型
- 强类型
- 面向对象
	- 有接口
	- 有泛型
	- 有枚举
	- 有接口
	- 有访问修饰符
```

### 2. 环境搭建

#### 2.1 安装
```
npm install -g typescript
```

#### 2.2 编译代码
```
- 控制台
tsc *.ts || *.tsx || *.d.ts

- SublimeText
typescriptCompletion
```

### 3. 类型

#### 3.1 基本类型

number（数值类型）
```
let age:number = 20
```

string（字符类型）
```
let lee:string = 'lee'
```

array（数组类型）
```
let arrString:string[] = ['1', '2', '3']
let arrNumber:number[] = [1, 2, 3]
```

元组类型
```
let x: [string, number] = ['lee', 20]
```

boolean（布尔类型）
```
let gender:boolean = true
```

symbol（唯一的）

void（空，用于返回空值）
```
let fn = ():void => {}
```

null（只能null）
```
let nike:null = null
```

undefined（只能undefined）
```
let jordan:undefined = undefined
```
enum（枚举）
```
enum Color { Blue = 'blue', Red = 'red', Black = 'black' }
let text: Color = Color.Black
// text = black
```

any（任何类型）
```
let all:any = 'any'
```

#### 3.2 联合类型
```
let res:string | number | number[] = [10]
```

#### 3.3 类型推测
```
let gender === let gender:any
let age = 12 === let age:number = 12
let str = 'lee' === let str:string = 'lee'
```

#### 3.4 外部变量声明
```
declare var $
$('.div')
```

### 4. 函数

#### 4.1 可选参数
```
- 有类型
- 签名检查

let fn = (name:string, age?:number, gender?:number) => { }
fn('lee')
fn('lee', 20)
fn('lee', 20, 1)
```

#### 4.2 返回值
```
let fnNumber = (name:string, age: number):number => { 
	return 100 
}

let fnString = (name:string, age: number):string => { 
	return 'string' 
}

let fnArrayNumber = (name:string, age: number):number[] => { 
	return [1, 2, 3] 
}

let fnArrayString = (name:string, age: number):string[] => { 
	return ['1', '2', '3'] 
}
```

### 5. 对象
```
let obj: {name: string, age: number, gender?: boolean}
obj = {
	name: 'lee',
	age: 20,
	gender: true
}
```

### 6. class - （类）
#### 6.1 定义类
```
class Person {
	name
	age
	constructor (name:string, age:number) {
		this.name = name
		this.age = age
	}
	showInfo () {
		console.log(this.name, this.age)
	}
}

let lee = new Person('name', 20)
```
#### 6.1 修饰符
```
- public    公有的
- private   私有的，只有类内部才可以访问
- protected 受保护的，只有子类能访问

class Person {
	name
	age
	gender
	constructor (name: string, age: number, gender: number) {
		this.name = name
		this.age = age
		this.gender = gender
	}
	public showName () {
		return this.name
	}
	private showAge () {
		return this.age
	}
	protected showGender () {
		return this.gender
	}
}

let lee = new Person('lee', 20, 1)

lee.showName()

```

### 7. interface - （规范约定）
对结构的约定、限制

```
interface PointA {
	x: number
	z?: number
}

interface PointB {
	x: number
}

let p:PointA | PointB = {
	x: 10,
	z: 1000
}
```

### 8. 泛型
```
class Person<T> {
	a: T
	b: T
}

let lee = new Person<string>()

lee.a = 'lee'
lee.b = 'lean'
```