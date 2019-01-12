# 目录
[TOC]
# 一、基础语法

#### 取整数
~~~
console.log(~~5.689);           // 直接截取为整数
console.log(Math.round(5.689)); // 四舍五入为整数
console.log(5.689.toFixed(0));  //参数为0取整，否则保留小数点后参数位
~~~

#### 随机生成指定长度的字符串
~~~
!function(n){
    var str = "abcdefghijklmnopqrstuvwxyz0123456789",
        length = str.length,
        result = "";

    for(var i=0; i<n; i++){
        result += str.charAt(Math.floor(Math.random()*length));
        // result += str.split("")[Math.floor(Math.random()*length)];
    }

    console.log(result);
}(4);
~~~

# 二、数组

#### 匹配字符出现的次数 - 分割为数组法

通过字符，把字符串拆分为数组，获取到的数组的长度-1为字符出现的次数，如果数组长度为0，即没有此字符

```
!function arraySplitFindChar(str,char){
	var length = str.split(char).length-1;
	if(length==0){
		console.log("cannot find!");
	}else{
		console.log(length);
	}
}("this is a string...","a");
```

#### 匹配字符出现的次数 - 正则表达式法

通过正则表达式匹配字符出现的次数

```
!function regFindChar(str,char){
	var re = new RegExp(char,"g");
	var arr = str.match(re);
	if(arr){
		console.log(arr.length);
	}else{
		console.log("cannot find!");
	}
}("this is a string...","i");
```

#### 判断是否为数组
~~~
function consoleArr(arr){
    // 判断传进来参数是否为数组
    if(typeof(arr) === "object" && arr instanceof Array && arr.constructor === Array && Array.isArray(arr)){
        // 如果是数组的提示信息
        console.log("参数的类型是数组");
    }else{
        // 如果不是数组的提示信息
        console.log("参数的类型不是数组");
    }
}
~~~

#### 计算一个数组内所有元素的和
~~~    
    var arr = [1,2,3,4,5,"asdasdasda",6,7,8,9,10,"aaa"];
    var total = 0;
    for(var i=0; i<arr.length; i++){

        // 如果是数字，进行累加
        if(!isNaN(arr[i])){
            total += arr[i];
        }
    }
    console.log(total);

    **************************************************

    var arr1 = [1,2,3,4,5,"asdasd",6,7,8,-9,10];
    var total1 = 0;
    arr1.map(function(item,index){
        // 如果是数字，进行累加
        if(!isNaN(item)){
            total1 += item;
        }
    });
    console.log(total1);
~~~

#### 查找数组中是否含有某个字符串以及个数
~~~
function searchStr(arr,str){
    var number = arr.join("").split(str).length-1;
    if(number === 0){
        console.log("数组没有查找到");
    }else{
        console.log("查询到" + number + "个");
    }
}

var arr = ["我是","不知道的","不知","谁知","知道","呵呵哒","么么哒","代码片段"];
var str = "知道";

searchStr(arr,str);
~~~

#### 把数组转换为本地字符串
~~~
var arr = [1,2,3,333,4,55];

//转换为字符串类型数组
//arr ==> 1,2,3,333,4,55
console.log(arr.toLocaleString());

//检测转换后的类型
console.log(typeof(arr.toLocaleString()));
~~~

#### 屏蔽某些字符，如：屏蔽小狗，但不屏蔽小狗狗
~~~
var str = "谁知道小狗和小狗狗的区别,这里有小狗，你知道么小狗狗";
var strArr = str.split("");
for(var i=0; i<strArr.length; i++){
    if(strArr[i] + strArr[i+1] == "小狗" && strArr[i] + strArr[i+1] + strArr[i+2] !== "小狗狗"){
        strArr.splice(i,2,"**");
    }
}
console.log(strArr.join(""));
~~~

#### 获取列表中包含某个字符的位置
~~~
<!---------- html ---------->
<ul id="list">
    <li>aaaaa</li>
    <li>bbbbb</li>
    <li>ccccc</li>
</ul>

<!---------- javascript ---------->
!function(str){
    var list = document.getElementById("list");
    for(var i=0; i<list.children.length; i++){
        if(list.children[i].innerText.split(str).length-1 >0){
            console.log("包含"+str+"内容的li标签的位置为："+(i+1));
        }else{
            continue;
        }
    }
}("ccc");

// ==> 包含aaa内容的li标签的位置为：1
~~~

#### 判断一个单词是否是回文
>回文是指把相同的词汇或句子，在下文中调换位置或颠倒过来，产生首尾回环的情趣，叫做回文，也叫回环。比如 mamam redivider

~~~
var str = "a nan a";
function checkPalindrom(str){
    if(str == str.split("").reverse().join("")){
        console.log("Yes！");
    }else{
        console.log("No!");
    }
}
checkPalindrom(str);
~~~

#### 字符串转换为驼峰结构
~~~
function doStr(str){

    // 转换为数组
    var strArr = str.split("");

    // 循环数组
    for(var i=0; i<strArr.length; i++){

        // 移除 - 字符
        if(strArr[i] == "-"){

            // 删除匹配到的 - 符号
            strArr.splice(i,1);

            // 如果不是第一个，替换之后字母为大写
            if(i!==0){

                // 如果 - 后面不为空
                if(strArr[i]!==""){
                    strArr[i] = strArr[i].toUpperCase();
                }
            }
        }

    }
    // 数组转换为字符串
    var str = strArr.join("");
    return str;

}
document.write("-webkit-border-image ==>>> "+doStr("-webkit-border-image"));
~~~

#### 将连续的字符替换成“连续出现的个数+字符”
~~~
!function countStr(str){

    var strArr = str.split(""),// 将字符串转换为数组
        num = 1,               // 设置默认个数为1，用于存储相同元素出现的次数
        resultStr = "";        // 设置空字符串，用于保存结果

    // 遍历数组
    for(var i=0; i<strArr.length+1; i++){

        // 判断相邻两项是否相等
        if(strArr[i] != strArr[i-1]){

            // 不相等时结果加上个数和元素
            resultStr += (num + strArr[i-1]);

            // 重设num==1
            num = 1;
        }else{

            // 如果相邻两项相等，默认个数累加1
            num += 1;
        }

    }

    // 判断结果中是否有NaN字符
    if(resultStr.split("NaN").length>1){
        console.log(resultStr.split("NaN")[1]);
    }else{
        console.log(resultStr);
    }

}("AAAAAbCCCdddEfg");

~~~

# 三、函数

#### 自执行函数
~~~
!function(){
    console.log("!!");
}();
+function(){
    console.log("++");
}();
-function(){
    console.log("--");
}();
~function(){
    console.log("~~");
}();
~~~

#### 函数的arguments参数
~~~
function sum(){
    console.log(arguments);
    var total = 0;
    for(var i=0; i<arguments.length; i++){
        if(!isNaN(arguments[i])){
            total += +arguments[i];
        }
    }
    console.log(total);
}

sum(1,2,3,4,"5","aasd",5);
~~~

# 四、对象

#### 查询对象中是否有某个属性
~~~
var getObjAttr = function(obj,attr){
    for(var name in obj){
        if(name == attr){
            console.log("找到查询的属性");
            break;
        }else{
            console.log("没有查询的属性");
            continue;
        }
    }
};

var obj = {
    name:"1213",
    age:"sss",
    location:"aaa"
};

getObjAttr(obj,"name");
~~~

# 五、其他

#### JavaScript中this的指向
~~~
<!---------- 1、作为函数调用,指向全局对象 ---------->
var name = "winName";
!function(){
    var name = "fnName";
    console.log(this.name);
}();
// ==> winName

<!---------- 2、作为对象调用,指向该对象 ---------->
var name = "winName";
var obj = {
    name:"objName",
    getName:function(){
        console.log(this.name);
    }
}
obj.getName();
// ==> objName

<!---------- 3、作为构造函数调用 ---------->
// ==> 指向构造函数本身
function GetName(){
    this.name = "fnName";
}
var getName = new GetName();
console.log(getName.name);

// 如果构造函数返回一个object类型的对象，指向该对象
// 如果返回对象中没有属性返回underfind
function GetName(){
    this.name = "fnName";

    return {
        name : "objName"
    };

}
var getName = new GetName();
console.log(getName.name);

<!---------- 4、call apply调用 ---------->

~~~

#### JavaScript获取cookie
~~~
function getCookie(name){
    var arr,
        reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg)){
        return unescape(arr[2]);
    }else{
        return null;
    }
}
~~~

#### JavaScript秒数转换为时间格式
~~~
function setTime(time){

    // 获取小时、分钟和秒数
    var hours = parseInt(time/3600)
        minuts = parseInt(time/60%60),
        second = parseInt(time%60);

    // 小于10个位数补0
    if(hours<10) hours = "0"+hours;
    if(minuts<10) minuts = "0"+minuts;
    if(second<10) second = "0"+second;

    // 返回出格式化后的时间
    var totalTimes = hours + ":" + minuts + ":" + second;
    return totalTimes;
}
setTime(6050);
~~~

#### JavaScript设置图片高度等于宽度
~~~
window.onload = function(){

    // 获取元素
    var img = document.getElementsByClassName("img");

    // 设置元素的宽高
    for(var i=0; i<img.length; i++){
        console.log(img[i].width);
        img[i].width = img[i].height = img[i].width;
    }
    
};
~~~