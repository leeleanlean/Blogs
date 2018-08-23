'use strict';

var Stream = require('stream');
var Path = require('path');
var crypto = require('crypto');
var fs = require('fs');

function getFileHash(path) {
    var hash = '';
    try {
        var contentText = fs.readFileSync(path, 'utf-8');
        hash = crypto.createHash('md5').update(contentText).digest('hex');
    } catch (e) {}

    return hash.slice(-12);
}

// 插件级别函数 (处理文件)
function gulpScriptRev(options) {

    var stream = new Stream.Transform({
        objectMode: true
    });



    // 创建一个让每个文件通过的 stream 通道
    stream._transform = function(file, enc, cb) {

        if (file.isStream()) {
            return cb();
        }

        var baseDir = file.cwd;
        var fileDir = Path.dirname(file.path) + Path.sep;

        var html = file.contents.toString();


        [
            /(<script)(.*?)(src=")([^"]*)(".*?)(>\s*<\/script>)/g,
            /(<img)(.*?)(src=")([^"]*)(".*?)(>)/g,
            /(<link)(.*?)(href=")([^"]*)(".*?)(>)/g,
            /(u)(r)(l\("?)(.*?)("?\))(.*?)/g
        ].forEach(function(zz) {
            html = html.replace(zz, function(test, t1, t2, t3, t4, t5, t6) {
                t4 = t4.split('?')[0];

                var url = t4.match('^\/') ? baseDir : fileDir;
                var hash = getFileHash(url + t4);
                var out = [];

                out.push(t1);
                out.push(t2);
                out.push(t3);
                out.push(t4);

                if (hash) {
                    out.push('?v=');
                    out.push(hash);
                }
                out.push(t5);
                out.push(t6);

                return hash ? out.join('') : test;
            });
        });



        file.contents = new Buffer(html);


        // 告诉 stream 转换工作完成
        cb(null, file);
    };

    // 返回文件 stream
    return stream;
}

// 暴露（export）插件的主函数
module.exports = gulpScriptRev;