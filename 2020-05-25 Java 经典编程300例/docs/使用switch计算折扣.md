## 使用switch计算折扣
```
public class Example8 {
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