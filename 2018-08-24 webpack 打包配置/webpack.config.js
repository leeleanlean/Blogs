let path = require('path')
let uglify = require('uglifyjs-webpack-plugin')

module.exports = {
	//入口文件的配置项
	entry: {
		entry: './src/js/entry.js'

		// 多入口
		// entry1: './src/js/entry1.js'
	},

	//出口文件的配置项
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'

		// 多出口
		// filename: '[name].js'
	},

	//模块：例如解读CSS,图片如何转换，压缩
	module: {
		rules: [
			{
				test: /\.css$/,
				loader: ['style-loader', 'css-loader']
			}
		]
	},

	//插件，用于生产模版和各项功能
	plugins: [
		// new uglify()
	],

	//配置webpack开发服务功能
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),

		// 服务器的IP地址，可以使用IP也可以使用localhost
		host: 'localhost',

		// 服务端压缩是否开启
		compress: true,

		// 配置服务端口号
		port: 9000,

		// 设置热更新
		inline: true
	}
}