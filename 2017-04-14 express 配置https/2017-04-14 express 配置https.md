## express 配置https

1、生成签名
~~~
＃生成私钥key文件
openssl genrsa 1024 > path/to/private.pem

＃通过私钥文件生成CSR证书签名
openssl req -new -key path/to/private.pem -out csr.pem

＃通过私钥文件和CSR证书签名生成证书文件
openssl x509 -req -days 365 -in csr.pem -signkey path/to/private.pem -out path/to/file.crt
~~~

2、app.js 最下面添加
> https 默认端口为443

~~~
var https = require('https')
	,fs = require("fs");
var options = {
    key: fs.readFileSync('path/to/private.pem'),
    cert: fs.readFileSync('path/to/file.crt')
};
https.createServer(options, app).listen(443, function () {
    console.log('Https server listening on port ' + 443);
});
~~~