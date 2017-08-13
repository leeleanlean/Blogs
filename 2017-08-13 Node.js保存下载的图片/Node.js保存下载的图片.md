~~~
var url = "http://www.baidu.com/1111111.jpg";
    http.get(url, function(res){

        var imgData = "";

        res.setEncoding("binary"); //一定要设置response的编码为binary否则会下载下来的图片打不开
        
        res.on("data", function(chunk){
            imgData+=chunk;
        });

        res.on("end", function(){
            fs.writeFile("uploads/list/logonew.png", imgData, "binary", function(err){
                if(err){
                    console.log("down fail");
                }
                console.log("down success");
            });
        });
    });
~~~
