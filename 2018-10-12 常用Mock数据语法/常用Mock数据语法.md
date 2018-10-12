```
/*
* String
*/

//随机产生一个中文的姓名
name: Mock.Random.cname()

//随机生成一个地址
addr: Mock.mock('@county(true)')

//随机生成一个日期
date: Mock.Random.date()
time: Mock.Random.date('yyyy-MM-dd mm:hh:ss')

//随机生成一个邮箱
email: Mock.mock('@EMAIL()')

/*
* Number
*/

//1开始，递增
'id|+1': 1

//随机生成一个数字 大小在1到100
'age|1-100': 1

//随机生成一个指定范围的整数
sex: Mock.Random.integer(0, 1)

//1-100 中随机生成一个保留两位小数点
'num1|1-100.2': 1

//随机生成一个11位的手机号
mobile: /^1[0-9]{10}$/

/*
* Array
*/

// 随机生成一个固定/随机（10/1-10）长度的数组
'array|10': [
  {
    'id|+1': 1,
    'string|1': ['a', 'b', 'c', 'd']
  }
]
```