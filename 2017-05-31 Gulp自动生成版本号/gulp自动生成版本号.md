## gulp-rev-append

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

## gulp-rev-doc

1、初始化package.json

> npm init

2、安装gulp

> npm install gulp -save-dev
 
3、安装gulp-rev-doc

> npm install gulp-rev-doc -save-dev
 
4、配置gulpfile.js

~~~
var gulp = require('gulp')
var revDoc = require('gulp-rev-doc');
 
gulp.task('html', function() {
    gulp.src('./*.html')
        .pipe(revDoc())
        .pipe(gulp.dest('./'))
});

gulp.task('css', function() {
    gulp.src('./css/*.css')
        .pipe(revDoc())
        .pipe(gulp.dest('./css'))
});

gulp.task('default', ['html', 'css']);
~~~

5、运行gulp命令
> gulp