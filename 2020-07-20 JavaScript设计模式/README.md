# 2020-07-20 JavaScript设计模式

## 1. 构造函数模式

```javascript
function Person(name ,age) {
  this.name = name
  this.age = age
  this.init = () => {
    console.log(this.name, this.age)
  }
}
var l = new Person('l', 1)
var b = new Person('b', 2)
l.init() // l 1
b.init() // b 2

console.log(l === b) // false
console.log(l.init === b.init) // false
```



## 2. 原型模式

```javascript
function Person () {}
Person.prototype.name = 'lee'
Person.prototype.age = 'lean'
Person.prototype.init = function () {
  console.log(this.name, this.age)
}

const l = new Person()
const b = new Person()

l.init() // lee lean
b.init() // lee lean

console.log(l === b) // false
console.log(l.init === b.init) // true
```



## 3. 构造函数 + 原型模式

```javascript
function Person(name, age) {
  this.name = name
  this.age = age
}

Person.prototype.init = function () {
  console.log(this.name, this.age)
}

const l = new Person('l', 1)
const b = new Person('b', 2)

l.init() // l 1
b.init() // b 2

console.log(l === b) // false
console.log(l.init === b.init) // true
```



## 4. 工厂模式

```javascript
class Factory {
  constructor (name, age) {
    this.instance = new Object()
    this.instance.name = name
    this.instance.age = age
  }
  init () {
    console.log(this.instance)
  }
}
const l = new Factory('l', 1)
const b = new Factory('b', 2)

l.init() // { name: 'l', age: 1 }
b.init() // { name: 'b', age: 2 }

console.log(l === b) // false
console.log(l.init === b.init) // true
```



## 5. 单例模式

```javascript
class Singleton {
  constructor (msg) {
    this.msg = msg
  }
  message () {
    console.log(this.msg)
  }
  static init (msg) {
    if (!this.instance) {
      this.instance = new Singleton(msg)
    }
    return this.instance
  }
}

const l = Singleton.init('l')
const b = Singleton.init('b')

l.message() // l
b.message() // l

console.log(l === b) // true
console.log(l.init === b.init) // true
```



## 6. 观察者模式（发布-订阅）



