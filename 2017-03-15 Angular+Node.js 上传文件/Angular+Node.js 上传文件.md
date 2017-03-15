### Angular + Node.js 单文件上传

HTML:
~~~
<form ng-controller="form" id="uploadFiles" name="uploadFiles" action="javascript:">
    <div class="form-list">
        <input type="file" name="files">
    </div>
    <div class="form-list">
        <button type="button" ng-click="formSubmit()">Submit</button>
    </div>
</form>
~~~

AngularJs:
~~~
$scope.formSubmit = function(){

    var formData = new FormData(document.getElementById("uploadFiles"));

    var url = "/postFile",
        method = "post",
        data = formData;
    $http({ 
        url:url,
        method:method,
        headers : {'Content-Type': undefined},
        data:data,
    }) 
    .success(function(data){ 
        console.log("yes!");
    })
    .error(function(data){
        console.log("error");
    });

};
~~~

Node.js
~~~
// postFile
router.post('/postFile', upload.single('files'), function(req, res, next) {

    // 保存文件
    fs.readFile(process.cwd() + '/uploads/' + req.file.filename,function(err,data){

        if(err){
            console.log("文件读取失败："+err);
        }else{
            console.log("文件读取成功");
            // 将文件写入到指定目录
            fs.writeFile(process.cwd() + '/uploads/' + req.file.originalname,data,function(err){
                if(err){
                    console.log("写入失败："+err);
                }else{
                    console.log('写入成功');
                }
            });
            // 删除临时保存的文件
            fs.unlink(process.cwd() + '/uploads/' + req.file.filename, function(err) {
                if(err){
                    console.log("文件删除失败："+err);
                }else{
                    console.log('文件删除成功');
                }
            });
        }
    });

});
~~~