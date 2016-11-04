#Gulp的安装与配置#

##安装nodejs

* 下载nodejs
* 安装
* 测试安装是否成功 ： node-v

##切换到开发目录
> 在命令行切换到指定的开发目录

##初始化package.json
> npm init

##安装gulp
> npm install gulp -save-dev

##项目根目录创建gulpfile.js文件
```
var gulp = require("gulp");
gulp.task("default",function(){
  console.log("gulp is running...");
});
```

##运行gulp命令即可打印出gulp is running...

gulpfile.js

```
var gulp = require("gulp");
var minify = require('gulp-minify-css');  // 压缩css
var uglify = require('gulp-uglify');      // 压缩js
var jshint = require('gulp-jshint');      // 检查js

// htmlmin
var htmlmin = require('gulp-htmlmin');
var htmlDevPath = ['dev/pages/*.html','dev/pages/*/*.html'];
var htmlDistPath = 'dist/pages';
gulp.task('html', function() {
	gulp.src(htmlDevPath)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(htmlDistPath));
 
});

// imagemin
var imagemin = require("gulp-imagemin");
var pngcrush = require('imagemin-pngcrush');
var imgDevPath = ['dev/resources/images/*.{png,jpg,gif,ico}','dev/resources/images/*/*.{png,jpg,gif,ico}'];
var imgDistPath = 'dist/resources/images';
gulp.task('image', function () {
    gulp.src(imgDevPath)
    	.pipe(imagemin({
    		progressive: true,
	        svgoPlugins: [{removeViewBox: false}],
	        use: [pngcrush()]
    	}))
        .pipe(gulp.dest(imgDistPath));
});

// less
var less = require("gulp-less");
var lessDevPath = ['dev/resources/less/*.less','dev/resources/less/*/*.less'];
var lessDistPath = 'dist/resources/less';
gulp.task('less', function () {
    gulp.src(lessDevPath)
        .pipe(less())
        .pipe(minify())
        .pipe(gulp.dest(lessDistPath));
});

// uglify
var jsDevPath = ['dev/resources/js/*.js','dev/resources/js/*/*.js'];
var jsDistPath = 'dist/resources/js';
gulp.task("javascript",function(){
		gulp.src(jsDevPath)
			.pipe(uglify())
			.pipe(jshint())
			.pipe(jshint.reporter('default'))
			.pipe(gulp.dest(jsDistPath));
});

// default task
gulp.task('default',function(){


	gulp.run('html','image','less','javascript');

	// watch
	gulp.watch([lessDevPath,jsDevPath],function(){
		gulp.run('html','image','less','javascript');
	});

	console.log("gulp is running...");

});
```
