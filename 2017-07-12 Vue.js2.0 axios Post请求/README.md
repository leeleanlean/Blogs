另外，由于axios默认发送数据时，数据格式是Request Payload，而并非我们常用的Form Data格式，后端未必能正常获取到，所以在发送之前，需要使用qs模块对其进行处理。这个库是axios里面包含的，不需要再下载

import qs from 'qs';

var data = qs.stringify({
    name:'name' 
});