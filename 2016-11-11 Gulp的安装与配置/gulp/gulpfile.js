// 载入插件
var gulp = require("gulp"),
	runSequence = require("run-sequence"),    // 按顺序执行任务
	concat = require("gulp-concat"),          // 多个文件合并一个
	del = require("del"),                     // 删除文件或者文件夹
	vinylPaths = require("vinyl-paths");      // 从管道中删除文件
	htmlMin = require("gulp-htmlmin"),        // 压缩html
	less = require("gulp-less"),              // 编译less
	cssMin = require("gulp-clean-css"),       // 压缩css
	uglify = require('gulp-uglify'),          // 压缩js
	revDoc = require('gulp-rev-doc');

// 打包方法
var teemoGulp = {

	// 打包HTML
	bulidHtml:function(){

		// 设置路径
		var srcPath = "./src/views/**/*.html",
			distPath = "./dist/views";

		// 执行方法
		gulp.src(srcPath)
			.pipe(htmlMin({
				removeComments: true,      // 清除HTML注释
				collapseWhitespace: true,  // 压缩HTML
				minifyJS: true,            // 压缩页面JS
				minifyCSS: true            // 压缩页面CSS
			}))
			.pipe(gulp.dest(distPath));

		// 执行完成提示
		console.log("------------------------------------------------------------ bulidHtml done!!!");
	},

	// 版本号
	bulidVersion:function(){

		var htmlPath = "./dist/views/";

		gulp.src(htmlPath + "**/*.html")
		    .pipe(revDoc())
		    .pipe(gulp.dest(htmlPath));
	},

	// 编译less
	bulidCss:function(){

		// 设置路径
		var srcPath = "./src/css/**/*.less",
			distPath = "./dist/css";

		// 执行方法
		gulp.src(srcPath)
			.pipe(less())
			.pipe(cssMin())
			.pipe(gulp.dest(distPath));

		// 执行完成提示
		console.log("------------------------------------------------------------ bulidCss done!!!");
	},

	// 合并css
	bulidConcat:function(){

		// 设置路径
		var commonCssPath = "./dist/css",
			pliginsCssPath = "./dist/css/plugins";

		// 合并css
		gulp.src([commonCssPath + "/*.css","!"+commonCssPath+"/*.min.css"])
			.pipe(concat("common.min.css"))
			.pipe(gulp.dest(commonCssPath));

		// 合并组件css
		gulp.src([pliginsCssPath + "/*.css","!"+pliginsCssPath+"/*.min.css"])
			.pipe(concat("plugins.min.css"))
			.pipe(gulp.dest(pliginsCssPath));

		// 设置路径
		var commonJsPath = "./dist/js",
			pliginsJsPath = "./dist/js/plugins";

		// 合并js
		gulp.src([commonJsPath + "/*.js","!"+commonJsPath+"/*.min.js"])
			.pipe(concat("common.min.js"))
			.pipe(gulp.dest(commonJsPath));

		// 合并组件js
		gulp.src([pliginsJsPath + "/*.js","!"+pliginsJsPath+"/*.min.js"])
			.pipe(concat("plugins.min.js"))
			.pipe(gulp.dest(pliginsJsPath));

		// 执行完成提示
		console.log("------------------------------------------------------------ bulidConcat done!!!");
	},

	// 压缩JS
	bulidJs:function(){

		// 设置路径
		var srcPath = "./src/js/**/*.js",
			distPath = "./dist/js";

		// 执行方法
		gulp.src(srcPath)
			.pipe(uglify())
			.pipe(gulp.dest(distPath));

		console.log("------------------------------------------------------------ bulidJs done!!!");
	},

	// 打包IMG
	bulidImg:function(){
		var src = "bulidImg";
		console.log("------------------------------------------------------------ bulidImg done!!!");
	},

	// 清理dist下合并文件之外的css、js
	bulidClean:function(cb){
		del([
			// 清理css
			'dist/css/**/*.css',
			'!dist/css/*.min.css',
			'!dist/css/plugins/*.min.css',
			// 清理js
			'dist/js/**/*.js',
			'!dist/js/*.min.js',
			'!dist/js/plugins/*.min.js'
		], cb);
		console.log("------------------------------------------------------------ bulidClean done!!!");
	}
};

// 执行打包html方法
gulp.task("bulid-html",function(){
	teemoGulp.bulidHtml();
});

// 版本号
gulp.task("bulid-version",function(){
	teemoGulp.bulidVersion();
});

// 执行打包css方法
gulp.task("bulid-css",function(){
	teemoGulp.bulidCss();
});

// 执行打包js方法
gulp.task("bulid-js",function(){
	teemoGulp.bulidJs();
});

// 执行合并js方法
gulp.task("bulid-concat",["bulid-css","bulid-js"],function(){
	teemoGulp.bulidConcat();
});

// 执行打包img方法
gulp.task("bulid-img",function(){
	teemoGulp.bulidImg();
});

// 执行clean方法
gulp.task("bulid-clean",function(){
	teemoGulp.bulidClean();
});

// help
gulp.task("help",function(){

	console.log("stept1 ----- gulp-css");
	console.log("stept1 ----- gulp-js");
	console.log("stept1 ----- gulp-concat");
	console.log("stept1 ----- gulp-html");
	console.log("stept1 ----- gulp-version");

});

// default
gulp.task('default', function (done) {
	// runSequence(
	// 	'help','bulid-css','bulid-js','bulid-html'
	// );

	gulp.start("bulid-css","bulid-js","bulid-html");

	var cssPath = "src/css/**/*.less",
		jsPath = "src/js/**/*.js";

	gulp.watch([cssPath,jsPath],function(){
		console.log("change.......................................");
		gulp.start("bulid-css","bulid-js","bulid-concat","bulid-version");
	});

});