## setInterVal 暂停、重新获取时间

* 点击获取当前时间按钮，执行获取时间定时器
* 获取到当前时间后，按钮变为暂停
* 点击暂停，重新启动定时器获取当前时间

```
<button id="getNowTime">获取当前时间</button>
<h1 id="timeBox"></h1>

<script>

// 获取存放时间的盒子
var getNowTime = document.getElementById("getNowTime");
var timeBox = document.getElementById("timeBox");

// 初始化timer为null
var timer = null;

// 获取时间
function getTime(){

	// 获取当前时间
	var nowTime = new Date(),
		nowYear = nowTime.getFullYear(),
		nowMonth = nowTime.getMonth()+1,
		nowDate = nowTime.getDate(),
		nowDay = nowTime.getDay(),
		nowHours = nowTime.getHours(),
		nowMinutes = nowTime.getMinutes(),
		nowSeconds = nowTime.getSeconds();

	// 将时间设置在页面上
	timeBox.innerHTML = nowYear + "-" + nowMonth + "-" + nowDate + " " + nowHours + ":" + nowMinutes + ":" + nowSeconds + " 星期" + nowDay;
}

// 判断定时器是否处在运行状态
function fn(){
	if(timer){
		clearInterval(timer);
		timer = null;

		getNowTime.innerText = "点击重新获取";

	}else{
		timer = window.setInterval(getTime,1000);
		getNowTime.innerText = "点击暂停";
	}
}

// 点击执行判断定时器方法
getNowTime.onclick = function(){
	fn();
};

</script>
```