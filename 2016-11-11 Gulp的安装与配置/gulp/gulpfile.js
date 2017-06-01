// 载入插件
var gulp = require("gulp"),
	concat = require("gulp-concat"),          // 多个文件合并一个
	del = require("del"),                     // 删除文件或者文件夹
	vinylPaths = require("vinyl-paths");      // 从管道中删除文件
	htmlMin = require("gulp-htmlmin"),        // 压缩html
	less = require("gulp-less"),              // 编译less
	cssMin = require("gulp-clean-css"),       // 压缩css
	uglify = require('gulp-uglify'),          // 压缩js
	revDoc = require('gulp-rev-doc'),         // 添加版本号
	config = require('./config.js');          // 引入配置文件

// 资源根目录
var wwwroot;
config.wwwroot ? wwwroot = config.wwwroot : wwwroot = "";

// 打包方法
var teemoGulp = {

	// 编译less、压缩js
	bulidRes:function(){

		// 设置路径
		var srcCssPath = "./src/css/**/*.less",
			disCsstPath = "./dist/css";

		// 执行方法
		gulp.src(srcCssPath)
			.pipe(less())
			.pipe(cssMin())
			.pipe(gulp.dest(disCsstPath));

		// 设置路径
		var srcJsPath = "./src/js/**/*.js",
			distJsPath = "./dist/js";

		// 执行方法
		gulp.src(srcJsPath)
			.pipe(uglify())
			.pipe(gulp.dest(distJsPath));

		// 执行完成提示
		console.log("------------------------------------------------------------ bulidRes done!!!");
	},

	// 合并css、js
	bulidConcat:function(){

		// 设置路径
		var commonCssPath = "./dist/css",
			pliginsCssPath = "./dist/css/plugins";

		// 合并css
		gulp.src([commonCssPath + "/*.css","!"+commonCssPath+"/*.min.css"])
			.pipe(concat("common.min.css"))
			.pipe(gulp.dest(commonCssPath));

		// 合并css组件
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

		// 合并js组件
		gulp.src([pliginsJsPath + "/*.js","!"+pliginsJsPath+"/*.min.js"])
			.pipe(concat("plugins.min.js"))
			.pipe(gulp.dest(pliginsJsPath));

		// 执行完成提示
		console.log("------------------------------------------------------------ bulidConcat done!!!");
	},

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

		// 设置路径
		var htmlPath = "./dist/views/";

		// 执行方法
		gulp.src(htmlPath + "**/*.html")
		    .pipe(revDoc())
		    .pipe(gulp.dest(htmlPath));

		// 执行完成提示
		console.log("------------------------------------------------------------ bulidVersion done!!!");
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

// 编译less、压缩js
gulp.task("bulid-resource",function(){
	teemoGulp.bulidRes();
});

// 合并css、js
gulp.task("bulid-concat",function(){
	teemoGulp.bulidConcat();
});

// 打包HTML
gulp.task("bulid-html",function(){
	teemoGulp.bulidHtml();
});

// 版本号
gulp.task("bulid-version",function(){
	teemoGulp.bulidVersion();
});

// 打包IMG
gulp.task("bulid-img",function(){
	teemoGulp.bulidImg();
});

// 清理dist下合并文件之外的css、js
gulp.task("bulid-clean",function(){
	teemoGulp.bulidClean();
});

// help
gulp.task("help",function(){

	console.log(" > stept1 ----- gulp bulid-resource");
	console.log(" > stept2 ----- gulp bulid-concat");
	console.log(" > stept3 ----- gulp bulid-html");
	console.log(" > stept4 ----- gulp bulid-version");
	console.log(" > stept5 ----- gulp bulid-img");
	console.log(" > stept6 ----- gulp bulid-clean");

});

// default
gulp.task('default', function (done) {

	// 设置路径
	var cssPath = "src/css/**/*.less",
		jsPath = "src/js/**/*.js";

	// 监听css、js变化
	gulp.watch([cssPath,jsPath],function(){
		console.log("change.......................................");
		gulp.start("bulid-resource","bulid-concat","bulid-version");
	});

});