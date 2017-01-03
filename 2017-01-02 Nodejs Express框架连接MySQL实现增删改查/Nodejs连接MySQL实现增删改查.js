var express = require('express');
var router = express.Router();
var mysql  = require('mysql');

//创建一个connection
var connection = mysql.createConnection({
	host     : 'localhost',       //主机
	user     : '',                //MySQL认证用户名
	password : '',                //MySQL认证用户密码
	database : 'test'
});

//创建一个connection
connection.connect(function(err){
	if(err){
		console.log('[query] - :'+err);
		return;
	}
	console.log('[connection connect]  succeed!');
});

// 在数据库中创建一个表sql
// DROP TABLE IF EXISTS `userinfo`;
// 	CREATE TABLE `userinfo` (
// 	`Id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
// 	`UserName` varchar(64) NOT NULL COMMENT '用户名',
// 	`UserPass` varchar(64) NOT NULL COMMENT '用户密码',
// 	PRIMARY KEY (`Id`)
// ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户信息表';

// 插入一条数据
// var addSql = 'INSERT INTO userinfo(Id,UserName,UserPass) VALUES(0,?,?)';
// var addSql_Params = ['newName','123456'];
// connection.query(addSql, addSql_Params , function(err, rows, fields) {
// 	if (err) {
// 		console.log('[query] - :'+err);
// 		return;
// 	}else{
// 		console.log('insert success!');
// 	}
// });

// 删除数据
// var deleteSql = 'DELETE FROM userinfo';
// connection.query(deleteSql, function(err, rows, fields) {
// 	if (err) {
// 		console.log('[query] - :'+err);
// 		return;
// 	}else{
// 		console.log('delete All success!');
// 	}
// });

// 删除某一条数据
// var deleteSql = 'delete from userinfo where id=?';
// var deleteSql_Params = 10;
// connection.query(deleteSql,deleteSql_Params, function(err, rows, fields) {
// 	if (err) {
// 		console.log('[query] - :'+err);
// 		return;
// 	}else{
// 		console.log('delete success!');
// 	}
// });

// 更新一条数据
// var updateSql = 'UPDATE userinfo SET UserName = ?,UserPass = ? WHERE Id = ?';
// var updateSql_Params = ['updateName', '123456789',8];
// connection.query(updateSql, updateSql_Params , function(err, rows, fields) {
// 	if (err) {
// 		console.log('[query] - :'+err);
// 		return;
// 	}else{
// 		console.log('update success!');
// 	}
// });

// 查询数据
// var searchSql = 'SELECT * FROM userinfo';
// connection.query(searchSql, function(err, rows, fields) {
// 	if (err) {
// 		console.log('[query] - :'+err);
// 		return;
// 	}else{
// 		console.log('search success!');
// 		console.log(rows);
// 	}
// });

// 查询某一条数据
// var searchSql = 'SELECT * from userinfo where id=? LIMIT 1';
// var searchSql_Params = 10;
// connection.query(searchSql,searchSql_Params, function(err, rows, fields) {
// 	if (err) {
// 		console.log('[query] - :'+err);
// 		return;
// 	}else{
// 		console.log('search success!');
// 		console.log(rows);
// 	}
// });

//关闭connection
connection.end(function(err){
	if(err){
		return;
	}
	console.log('[connection end] succeed!');
});

/* GET Index */
router.get('/', function(req, res, next) {
	res.send('node mysql');
});

module.exports = router;