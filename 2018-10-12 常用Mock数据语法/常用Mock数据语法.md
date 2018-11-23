### String
```
//随机循环指定范围次数的字符串
'string|1-10': 'text'

//循环一个字符串N次
'string|3': 'text'

//随机产生一个中文的姓名
name: Mock.Random.cname()

//随机生成一个地址
addr: Mock.mock('@county(true)')

//随机生成一个网址
url: Mock.Random.url()

//随机生成一个日期
date: Mock.Random.date()
time: Mock.Random.date('yyyy-MM-dd mm:hh:ss')

//随机生成一个邮箱
email: Mock.mock('@EMAIL()')

//随机生成N句话
content: Mock.Random.cparagraph(3)
```

### Number
```
//1开始，递增
'id|+1': 1

//随机生成一个数字 大小在1到100
'age|1-100': 1

//随机生成一个数字 保留小数点指定范围数
'number|123.1-10': 1

//随机生成一个指定范围的整数
sex: Mock.Random.integer(0, 1)

//1-100 中随机生成一个保留两位小数点
'num1|1-100.2': 1

//随机生成一个11位的手机号
mobile: /^1[0-9]{10}$/
```

### Array
```
// 随机生成一个固定/随机（10/1-10）长度的数组
'array|10': [
  {
    'id|+1': 1,
    'string|1': ['a', 'b', 'c', 'd']
  }
]
```

### Image
```
Random.image(size, background, foreground, format, text)
Random.dataImage(size, text)
```

