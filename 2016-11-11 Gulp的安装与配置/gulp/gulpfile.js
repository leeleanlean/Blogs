// 载入插件
var gulp = require("gulp"),
	concat = require("gulp-concat"),          // 多个文件合并一个
	del = require("del"),                     // 删除文件或者文件夹
	vinylPaths = require("vinyl-paths");      // 从管道中删除文件
	htmlMin = require("gulp-htmlmin"),        // 压缩html
	less = require("gulp-less"),              // 编译less
	cssMin = require("gulp-clean-css"),       // 压缩css
	uglify = require("gulp-uglify"),          // 压缩js
	revDoc = require("gulp-rev-doc"),         // 添加版本号
	prefix = require("gulp-prefix"),          // 静态资源添加前缀
	replace = require("gulp-replace"),        // 替换匹配字符串插件
	config = require("./config.js");          // 引入配置文件

// 资源根目录
var wwwroot;
config.wwwroot ? wwwroot = config.wwwroot : wwwroot = "";

// 打包方法
var leanGulp = {

	// 编译less、压缩js、html
	bulidRes:function(){

		// 设置路径
		var srcCssPath = "./src/css/**/*.less",
			disCsstPath = "./dist/css",
			srcJsPath = "./src/js/**/*.js",
			distJsPath = "./dist/js",
			srcHtmlPath = "./src/views/**/*.html",
			distHtmlPath = "./dist/views",
			srcImgPath = "./src/images/*",
			distImgPath = "./dist/images";
			srcFontPath = "./src/font/*",
			distFontPath = "./dist/font";

		// 执行css方法
		gulp.src(srcCssPath)
			.pipe(less())
			.pipe(cssMin())
			.pipe(gulp.dest(disCsstPath));

		// 执行js方法
		gulp.src(srcJsPath)
			.pipe(uglify())
			.pipe(gulp.dest(distJsPath));

		// 执行html方法
		gulp.src(srcHtmlPath)
			.pipe(htmlMin({
				removeComments: true,      // 清除HTML注释
				collapseWhitespace: true,  // 压缩HTML
				minifyJS: true,            // 压缩页面JS
				minifyCSS: true            // 压缩页面CSS
			}))
			.pipe(gulp.dest(distHtmlPath));

		// 执行images方法
		gulp.src(srcImgPath)
			.pipe(gulp.dest(distImgPath));

		// 执行font方法
		gulp.src(srcFontPath)
			.pipe(gulp.dest(distFontPath));

		// 延时2s执行合并文件方法
		setTimeout(function(){
			leanGulp.bulidConcat();
		},2000);

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

	// CDN
	bulidCDN:function(){

		// 设置输出路径
		var srcPath = "./dist/views/**/*.html",
			distPath = "./dist/viewsCdn";

		// 判断是否传递cdn
		if(config.cdnPath){
			gulp.src(srcPath)
				.pipe(replace("../", ''))
				.pipe(prefix(config.cdnPath, null, '{{'))
				.pipe(gulp.dest(distPath));
		}else{
			gulp.src(srcPath)
				.pipe(prefix(config.cdnPath, null, '{{'))
				.pipe(gulp.dest(distPath));
		}

		// 执行完成提示
		console.log("------------------------------------------------------------ bulidCDN done!!!");
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
	leanGulp.bulidRes();
});

// 合并css、js
gulp.task("bulid-concat",function(){
	leanGulp.bulidConcat();
});

// 版本号
gulp.task("bulid-version",function(){
	leanGulp.bulidVersion();
});

// CDN
gulp.task("bulid-cdn",function(){
	leanGulp.bulidCDN();
});

// 清理dist下合并文件之外的css、js
gulp.task("bulid-clean",function(){
	leanGulp.bulidClean();
});

// help
gulp.task("help",function(){

	console.log(" > gulp               ----- 代码构建到dist目录");
	console.log(" > gulp bulid-version ----- 添加版本号");
	console.log(" > gulp bulid-cdn     ----- 配置cdn地址(config.js中配置)");
	console.log(" > gulp bulid-clean   ----- 清理压缩前的css、js");

});

// default
gulp.task('default', function (done) {

	// start
	gulp.start("help","bulid-resource");

	// 设置路径
	var cssPath = "src/css/**/*.less",
		jsPath = "src/js/**/*.js",
		htmlPath = "src/views/**/*.html";

	// 监听css、js变化
	gulp.watch([cssPath,jsPath,htmlPath],function(){
		console.log("change.......................................");
		gulp.start("bulid-resource");
	});

});