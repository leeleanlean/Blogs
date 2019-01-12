## Vue.js2.0 项目构建过程

#### 初始化项目

$ npm install vue
$ npm install --g vue-cli
$ vue init webpack project
$ cd project
$ npm install
$ npm run dev

#### 引入ajax插件

vue.js2.0 官方推荐ajax插件 [axios](https://github.com/mzabriskie/axios/)

安装：
~~~
cnpm install axios --save
~~~

引入插件（路径 src > main.js）：
~~~
import axios from 'axios'
Vue.prototype.$http = axios
~~~

用法：
~~~ 
this.$http({
    method: 'get',
    url: '/static/aaa.txt',
    data: {
        name: 'name',
        info: 'info'
    }
}).then(function(res){
    console.log(res);
});
~~~

> 其他插件可以直接在 main.js 中引入并 Vue.use()，但是 axios 并不能 use，需要在引入 axios 之后，修改原型链 Vue.prototype.$http = axios

#### Express 配置静态资源文件夹

> 路径：build > dev-server.js
> app.use(staticPath, express.static('./static'))

#### npm run bulid 部署后，打开 dist/index.html 空白页

解决方法：
> 1、打开 build > webpack.prod.conf.js
> 2、在 output 对象中新增参数 publicPath: "./"