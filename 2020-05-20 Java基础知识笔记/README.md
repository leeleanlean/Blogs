<!--
 * @Descripttion: Java
 * @version: 
 * @Author: Lean
 * @Date: 2020-05-16 23:00:29
 * @LastEditors: Lean
 * @LastEditTime: 2020-05-21 17:50:27
 -->
# Java Basics

## 1. Arrays

#### 1.1 Init Arrays
```
int[] arr = new int[5];

Integer[] ages = { 1, 2, 3, 4};
String[] names = { "A", "B", "C", "D"};
System.out.println(ages[2]); // Outputs 3
System.out.println(names[2]); // Outputs "C"
```

#### 1.2 Array Length
```
Integer[] ages = {1, 2, 3};
System.out.print(names.length); // 3

Integer[] ages = {1, 2, 3};
int r = 0;
for(int i = 0; i < ages.length; i++) {
  r += ages[i];
}
System.out.print(r); // 6
```

#### 1.3 Enhanced for Loop
```
Integer[] ages = {1, 2, 3};
for(int t: ages){
  System.out.println(t);
}
```

#### 1.4 Multidimensional Arrays
```
int[][] o = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
System.out.println(o[0][1]);
```

## 2. Classes and Objects

#### 2.1 Methods
```
static void sayName () {
  System.out.print("name:lee");
}
public static void main(String[] args){
  sayName();
}
```

#### 2.2 Method Parameters
```
static void sayName (String name) {
  System.out.print("Params: name:" + name);
}
```

#### 2.3 The Return Type
```
static int sayName (String name, int age) {
  return 1;
}
```

#### 2.4 Creat Classes
```
public class Animal {
  void bark() {
    System.out.println("Woof-Woof");
  }
}
```

#### 2.5 Creat Objects
```
class MyClass {
  public static void main(String[] args) {
    Animal dog = new Animal();
    dog.bark();
  }
}
```

#### 2.6 Define Attributes
```
class MyClass {
  public static void main(String[ ] args) {
    Vehicle v1 = new Vehicle();
    Vehicle v2 = new Vehicle();
    v1.color = "red";
    v2.horn();
  }
}
```

#### 2.7 Access Modifiers
```
- classes
  public: 该类可被任何其他类访问。
  default: 该类只能由同一包中的类访问。

- attributes & methods
  default: 该类只能由同一包中的类访问。
  public: 可从任何其他类访问
  protected: 提供与默认访问修饰符相同的访问权限
  private: 仅在声明的类本身内可访问
```

#### 2.8 Getters & Setters
```
public class Vehicle {
  private String color;

  // Getter
  public String getColor() {
    return color;
  }

 // Setter
  public void setColor(String c) {
    this.color = c;
  }
}

public static void main(String[ ] args) {
  Vehicle v1 = new Vehicle();
  v1.setColor("Red");
  System.out.println(v1.getColor()); //Outputs "Red"
}
```

#### 2.9 Constructors
```
public class Vehicle {
  private String color;
  Vehicle(String c) {
    color = c;
  }
}

public class Vehicle {
  private String color;

  Vehicle() {
    this.setColor("Red");
  }
  Vehicle(String c) {
    this.setColor(c);
  }

  // Setter
  public void setColor(String c) {
    this.color = c;
  }
}
```

#### 2.10 Using Constructors
```
public class MyClass {
  public static void main(String[ ] args) {
    Vehicle v = new Vehicle("Blue");
  }
}
```

#### 2.11 Value Types
```
byte
short
int
long
float
double
boolean
char
```

#### 2.12 Reference Types
```
public class MyClass {
  public static void main(String[] args) {
    Person j;
    j = new Person("John");
    j.setAge(20);
    celebrateBirthday(j);
    System.out.println(j.getAge()); //Outputs "21"
  }
  static void celebrateBirthday(Person p) {
    p.setAge(p.getAge() + 1);
  }
}
```

#### 2.13 Math Class
```
int a = Math.abs(10);  // 10
int b = Math.abs(-20); // 20
double c = Math.ceil(7.342);  // 8.0
double f = Math.floor(7.343);  // 7.0
int m = Math.max(10, 20);  // 20
int m = Math.min(10, 20);  // 10
double p = Math.pow(2, 3); // 8.0
```

#### 2.14 Static
```
class Person {
  static int ID = 0;
  Person() {
    ID += 1;
  }
}
class HelloWorld {
  public static void main(String[] args) {
    Person a = new Person();
    System.out.println(a.ID); // 1
    Person b = new Person();
    System.out.println(b.ID); // 2
    Person c = new Person();
    System.out.println(c.ID); // 3
    Person d = new Person();
    System.out.println(d.ID); // 4
    System.out.println(Person.ID); // 4
  }
}
```

#### 2.15 Final
```
// mark a variable constant
class MyClass {
  public static final double PI = 3.14; 
  public static void main(String[ ] args) {
    System.out.println(PI);
  }
}
```

#### 2.16 Packages
```
package samples;
import samples.Vehicle;
import samples.*;

class MyClass {
  public static void main(String[ ] args) {
    Vehicle v1 = new Vehicle();
    v1.horn();
  }
}
```