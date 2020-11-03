# 经典编程300例

### 1. 输出“hello world” 

```java
public class HelloWorld {
  public static void main(String[] args) {
    System.out.println("Hello World!");
    // Hello World!
  }
}
```



### 2. 输出由“*”组成的三角形

```java
public class HelloWorld {
  public static void main(String[] args) {
    System.out.println("     *\n    ***\n   *****\n  *******");
  }
}
```



### 3. 输出可爱的符号表情

```java
public class HelloWorld {
  public static void main(String[] args) {
    System.out.println("🙂");
    System.out.println("^-^");
  }
}
```



### 4. 输出整数值最大/最小值

```java
public class HelloWorld {
  public static void main(String[] args) {
    System.out.println(java.lang.Integer.MAX_VALUE);
    System.out.println(java.lang.Integer.MIN_VALUE);
  }
}
```



### 5. 输出浮点类型最大/最小值

```java
public class HelloWorld {
  public static void main(String[] args) {
    System.out.println(java.lang.Float.MAX_VALUE);
    System.out.println(java.lang.Float.MIN_VALUE);
    System.out.println(java.lang.Double.MAX_VALUE);
    System.out.println(java.lang.Double.MIN_VALUE);
  }
}
```



### 6. 常见字母大小写转换

```java
public class HelloWorld {
  public static void main(String[] args) {
    String Hello = "Hello World!";
    System.out.println(Hello.toUpperCase());
    System.out.println(Hello.toLowerCase());
  }
}
```



### 7. 两个变量互换

```java
public class HelloWorld {
  public static void main(String[] args) {
    String A = "A";
    String B = "B";

    System.out.println("A:" + A + ", B:" + B);

    String C = A;
    A = B;
    B = C;

    System.out.println("A:" + A + ", B:" + B);
  }
}
```



### 8. 判断某一年是否为闰年

```java
public class HelloWorld {
  public static void main(String[] args) {
    /**
     * 闰年分为普通闰年和世纪闰年
     * - 普通闰年: 公历年份是4的倍数的，且不是100的倍数，为普通闰年。
     * - 世纪闰年: 公历年份是400的倍数才是世纪闰年
     */
    Integer year = 2020;
    if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
      System.out.println("闰年");
    } else {
      System.out.println("不是闰年");
    }
  }
}
```



### 9. 验证登录用户名和密码

```java
public class HelloWorld {
  public static void main(String[] args) {
    String userName = "lean";
    String password = "666666";

    if (!userName.equals("lean")) {
      System.out.println("请输入正确的用户名");
    } else if (!password.equals("666666")) {
      System.out.println("请输入正确的密码");
    } else {
      System.out.println("校验成功可以登录");
    }
  }
}
```



### 10. 使用switch计算折扣

```java
public class HelloWorld {
  public static void main(String[] args) {
    float money = 200;
    if (money >= 200) {
      String rebate = "";
      int grade = (int)money / 200;
      switch (grade) {
        case 1:
          rebate = "九折";
          break;
        case 2:
          rebate = "九五折";
          break;
        case 3:
          rebate = "八折";
          break;
        case 4:
          rebate = "八五折";
          break;
        default:
          rebate = "五折";
          break;
      }
      System.out.println(rebate);
    }
  }
}
```



### 11. 判断月份是什么季节

```java
public class HelloWorld {
  public static void main(String[] args) {
    Integer month = 10;
    switch (month) {
      case 12:
      case 1:
      case 2:
        System.out.println("冬季");
        break;

      case 3:
      case 4:
      case 5:
        System.out.println("春季");
        break;

      case 6:
      case 7:
      case 8:
        System.out.println("夏季");
        break;

      case 9:
      case 10:
      case 11:
        System.out.println("秋季");
        break;
    
      default:
        System.out.println("请输入正确的月份");
        break;
    }
  }
}
```



###  12. 计算数组中元素的和

```java
public class HelloWorld {
  public static void main(String[] args) {
    int [] arr = { 85, 65, 86, 88, 38, 69, 100 };
    Integer totel = 0;
    Integer index = 0;
    while (arr.length > index) {
      totel += arr[index];
      index++;
    }
    System.out.println(totel);
  }
}
```



