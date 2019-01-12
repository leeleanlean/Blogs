var express = require('express');
var router = express.Router();
var http = require("http");
var https = require('https');
var fs = require("fs");
var cheerio = require("cheerio");
var mysql = require('mysql');

// 链接数据库
var connection = mysql.createConnection({
    host     : 'localhost',           //主机
    user     : 'root',                //MySQL用户名
    password : 'root',                //MySQL密码
    database : 'AS_game'
});
connection.connect(function(err){
    if(err){
        console.log('[query] - :'+err);
        return;
    }
    console.log('[connection connect]  succeed!');
});

// 公共方法
function download ( url,callback ) {

    console.log('ing...');
    https.get( url,function(res){
        var data = "";
        res.on("data",function(chunk){
            data += chunk;
        });
        res.on("end",function(){
            callback(data)
        })
    }).on("error",function(err){
        console.log(err)
    })

}

// 抓取排行榜前200名付费游戏
router.get('/getGame', function(req, res, next) {

    // 抓取地址
    var date = new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate();
    var url = "https://aso100.com/rank/index/genre/6014/device/iphone/brand/paid/date/"+date+"/country/cn";

    download( url,function( data ) {
        if(data){
            var $=cheerio.load(data);

            // 保存付费榜前200游戏信息
            $(".rank-list .col-md-2").each(function(i,elem){
                var title = $(this).find(".caption h5").text().split(".")[1];
                var company = $(this).find(".caption h6").eq(0).text();
                var appid = $(this).find(".thumbnail a").attr("href").split("appid/")[1].split("/")[0];
                var icon = "http://" + req.hostname + ":" +req.app.settings.port + "/uploads/game_icon/"+i+".jpg";

                // 游戏信息保存到数据库
                var deleteSql = 'DELETE FROM game_rank';
                connection.query(deleteSql, function(err, rows, fields) {
                    if (err) {
                        console.log('[query] - :'+err);
                        return;
                    }else{
                        console.log('delete All success!');
                        var addSql = 'INSERT INTO game_rank(id,appid,title,icon,company) VALUES(0,?,?,?,?)';
                        var addSql_Params = [appid,title,icon,company];
                        connection.query(addSql, addSql_Params , function(err, rows, fields) {
                            if (err) {
                                console.log('[query] - :'+err);
                                return;
                            }else{
                                console.log('insert success!');
                            }
                        });
                    }
                });

            });

            // 保存图片
            $(".rank-list img").each(function(i,elem){
                var imgSrc=$(this).attr("data-original") || $(this).attr("src");
                https.get(imgSrc,function(res){
                    var imgData="";
                    res.setEncoding("binary");
                    res.on("data",function(chunk){
                        imgData += chunk;
                    });
                    res.on("end",function(){
                        console.log(imgSrc.split(".").pop())
                        if(imgSrc.split(".").pop()=='jpg' || imgSrc.split(".").pop()=='png'){
                            var imgPath="/"+i+"."+imgSrc.split(".").pop();
                        }else{
                            var imgPath="/"+i+"."+"jpg";
                        }

                        fs.writeFile(process.cwd() + "/public/uploads/game_icon"+imgPath,imgData,"binary",function(err){
                            console.log(err);
                        })

                    })

                })
            })
        }
    })

});

module.exports = router;
