## gulp自动生成版本号

1、安装gulp-rev-append

> npm install gulp-rev-append --save-dev

2、gulpfile.js

~~~
var gulp = require('gulp'),
    rev = require('gulp-rev-append');
 
gulp.task('rev', function () {
    gulp.src('./index.html')
        .pipe(rev())
        .pipe(gulp.dest('page'));
});

gulp.task('default', function () {
    
    gulp.run('rev');
    
    gulp.watch('dest',function(){
        gulp.run('rev');
    });

    console.log("gulp is running...");

});
~~~

3、配置html页面

~~~
href="css/style.css?rev=@@hash"
src="js/js-one.js?rev=@@hash"
~~~

4、tips

引入的文件的路径必须正确