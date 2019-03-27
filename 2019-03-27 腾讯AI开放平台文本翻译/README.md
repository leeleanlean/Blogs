## 腾讯AI开放平台文本翻译

### 1. 接口描述
提供自动翻译文本的功能，支持中、英、德、法、日、韩、西、粤等语种
### 2. 请求参数

参数名称 | 是否必填 | 数据类型 | 描述 
---|---|---|---
app_id | 是 | int | 应用标识（AppId）
time_stamp | 是 | int | 请求时间戳（秒级）
nonce_str | 是 | string | 随机字符串（非空且长度上限32字节）
type | 是 | int | 详见4.介绍
text | 是 | string | UTF-8编码且上限1024字节
sign | 是 | string | 详见5.介绍


### 3. 响应参数


参数名称 | 数据类型 | 描述
---|---|---
ret | int | 返回码； 0表示成功，非0表示出错
msg | string | 返回信息；ret非0时表示出错时错误原因
data | object | 返回数据；ret为0时有意义
+ type | int | API请求中的翻译类型
+ org_text | string | API请求中的待翻译文本
+ trans_text | string | 翻译后文本


### 4. 签名规则

1、对请求参数对象进行参数升序排序
```
// Example 字典升序一个对象后的结果
let params = {
  app_id: '',
  nonce_str: '',
  sign: '',
  text: '',
  time_stamp: '',
  type: ''
}
```
2、根据升序后的结果，依次拼接字符串
```
// Example 依次拼接排序后的对象参数和值
let str = ''
params.forEach(key => {
  str += `${key}=${encodeURI(params[key])}&`
})
```
3、将 app_key 拼接到至步骤2的结尾
```
str += 'app_key=4xiPIW0HapnpmuKW'
```
4、将拼接好的字符串进行MD5加密
```
const md5_str = MD5(str)
```
5、将MD5加密后的结果全部转换成大写即可得到签名信息
```
const sign = md5_str.toUpperCase()
```

### 5. 翻译类型定义


翻译类型 | 描述
---|---
0 | 自动识别（中英文互转）
1 | 中文翻译成英文
2 | 英文翻译成中文
3 | 中文翻译成西班牙文
4 | 西班牙文翻译成中文
5 | 中文翻译成法文
6 | 法文翻译成中文
7 | 英文翻译成越南语
8 | 越南语翻译成英文
9 | 中文翻译成粤语
10 | 粤语翻译成中文
11 | 中文翻译成韩文
13 | 英文翻译成德语
14 | 德语翻译成英文
15 | 中文翻译成日文
16 | 日文翻译成中文

### 6. 参考示例

```
// 设置参数
let params = {
    app_id: '',
    time_stamp: Number(Date.now().toString().substr(0, 10)),
    nonce_str: Math.random(32).toString().replace('.', ''),
    type: 0,
    text: '今天深圳的天气怎么样？明天呢'
}


// 获取签名
getSign(params).then(res => {
    params.sign = res
    // 调用腾讯AI接口
    this.AI(params)
})

// 调用腾讯AI接口
const AI = (params) => {
  wx.request({
    url: 'https://api.ai.qq.com/fcgi-bin/nlp/nlp_texttrans',
    data: parmas,
    success (res) {
      console.log(res.data)
      /*
      * 返回结果
      {
          ret: 0,
          msg: "ok",
          data: {
              org_text: "今天深圳的天气怎么样？明天呢",
              trans_text: "What's the weather like in shenzhen today?",
              type: 0
          }
      }
      */
    }
  })
}

// 签名方法
import MD5 from 'js-md5'
const getMD5 = (params) => {
  return new Promise((resolve, reject) => {
    // 判断传递的参数
    if (!params || params.constructor !== Object) {
      reject(new Error('传递参数有误'))
    } else {
      let keys = Object.keys(params).sort((a, b) => a > b)
      let str = ''
      let sign = ''
      
      // 遍历参数
      keys.forEach(key => {
        str += `${key}=${encodeURI(params[key])}&`
      })
      str += 'app_key={app_key}'
      console.log(str)
        
      // MD5加密并转换为大写
      sign = MD5(str).toUpperCase()
      resolve(sign)
    }
  })
}


```