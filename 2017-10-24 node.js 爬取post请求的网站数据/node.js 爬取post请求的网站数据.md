```
/* xxx.com */

// 获取免费玩的id
var ids = [];
router.get('/xxx/games', function(req, res, next) {

    // 获取免费玩的id
    var game_id = 1,
        data = "";

    setInterval(function(){
        url = "http://xxx.com/community-api/game?game_id="+game_id++;
        console.log(url);

        http.get(url, function(res) {
            var chunks = [];
            res.on('data', function(chunk){
                chunks.push(chunk);
            });
            res.on('end', function(){
                var game = JSON.parse(Buffer.concat(chunks).toString());
                doData(game);
            });
        })

    },100);

    // 处理数据
    function doData(game){
        if(game.status=="ok"){
            if(game.payload.free){

                ids.push(game.payload.game_id);

                // 有免费账号的游戏id列表
                fs.writeFile('ids.txt', ids,  function(err) {
                    if (err) {
                        return console.error(err);
                    }
                    console.log("id写入成功！");
                });

            }else{
                console.log(game.payload.game_id);
            }
        }
    }
});

// 根据id获取免费账号
router.get('/xxx/account', function(req, res, next) {

    // 有免费账号的游戏id列表
    fs.readFile('ids.txt', function (err, data) {
        if (err) {
            return console.error(err);
        }

        var dataObj = data.toString().split(",");

        for(var i=0; i<dataObj.length; i++){
            getAccount(dataObj[i]);
        }

    });

});

// 根据id获取免费账号
function getAccount(id){
    var postData = querystring.stringify({  
        game_id:id
    });  
    var options={  
        hostname:'xxx.com',  
        port:80,  
        path:'/community-api/play-free',
        method:'POST',
        headers:{  
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData),
            'Host':'xxx.com',  
            'Origin':'http://xxx.com',
            'Referer':'http://xxx.com/community-frontend/',
            'Cookie':'OUTFOX_SEARCH_USER_ID_NCOO=577599308.6490608; Hm_lvt_b05b3127e40a81ad43cdb7979734ab7a=1508405347; Hm_lpvt_b05b3127e40a81ad43cdb7979734ab7a=1508832051; laravel_session=eyJpdiI6ImtTRXBwR1dpWVR1d0IrY09jOGdEXC93PT0iLCJ2YWx1ZSI6ImZpbVgzNVplSlVyUXdPeWszTUQydWpDRjlGc1dKSEJKRzJ3SFE3QUp4b2JtVjNsTlJua0RLQTNOUVNLZ1d2ajlBZzZKdmp4bExpY0N0cU5JaTgyQzRBPT0iLCJtYWMiOiI5ZmU4YjNmNmFmNDQ2ODk2YTNmOWFhYzA1ZTViMThhMWM1YjY0MTQ4MGM1ZGRkZWQ2YTBhYmJjNGI3ODVhZWVlIn0%3D',
            'xxx-TOKEN':'daZx2yf/OgammlY5jdPubUYKw8ivJoe6NpbBsoejgO0='
        }  
    }  
    var req = http.request(options, function(res) {  
        var chunks = [];
        res.on('data',function(chunk){  
            chunks.push(chunk);
        });  
        res.on('end',function(){  

            // 转换为对象
            var account = JSON.parse(Buffer.concat(chunks).toString()).payload;
            console.log(account);

            // 存放数据
            var accountObj = "";
            var date = new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate()+" "+new Date().getHours()+":"+new Date().getMinutes()+":"+new Date().getSeconds();
            accountObj += '{"id":"'+id+'","account":"'+account.account+'","paddword":"'+account.password+'"},';

            // 账号密码保存到account.txt
            fs.writeFile('account'+date+'.txt', accountObj,{flag:'a'},  function(err) {
                if (err) {
                    return console.error(err);
                }
                console.log("account写入成功！");
            });

        });  
    });   
    req.write(postData); 
}
```