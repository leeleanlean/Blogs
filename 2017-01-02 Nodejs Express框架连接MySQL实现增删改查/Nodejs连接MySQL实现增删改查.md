##安装mysql##

```
npm install mysql --save
```

##创建数据库信息

```
var connection = mysql.createConnection({
	host     : 'localhost',       //主机
	user     : '',                //MySQL用户名
	password : '',                //MySQL密码
	database : 'test'             //MySQL数据库名称
});

connection.connect(function(err){
	if(err){
		console.log('[query] - :'+err);
		return;
	}
	console.log('[connection connect]  succeed!');
});
```

##在数据库中创建一个表sql语句

```
DROP TABLE IF EXISTS `userinfo`;
	CREATE TABLE `userinfo` (
	`Id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
	`UserName` varchar(64) NOT NULL COMMENT '用户名',
	`UserPass` varchar(64) NOT NULL COMMENT '用户密码',
	PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户信息表';
```

##插入一条数据

```
var addSql = 'INSERT INTO userinfo(Id,UserName,UserPass) VALUES(0,?,?)';
var addSql_Params = ['newName','123456'];
connection.query(addSql, addSql_Params , function(err, rows, fields) {
	if (err) {
		console.log('[query] - :'+err);
		return;
	}else{
		console.log('insert success!');
	}
});
```

##删除数据

```
var deleteSql = 'DELETE FROM userinfo';
connection.query(deleteSql, function(err, rows, fields) {
	if (err) {
		console.log('[query] - :'+err);
		return;
	}else{
		console.log('delete All success!');
	}
});
```

##删除某一条数据

```
var deleteSql = 'delete from userinfo where id=?';
var deleteSql_Params = 10;
connection.query(deleteSql,deleteSql_Params, function(err, rows, fields) {
	if (err) {
		console.log('[query] - :'+err);
		return;
	}else{
		console.log('delete success!');
	}
});
```

##更新一条数据

```
var updateSql = 'UPDATE userinfo SET UserName = ?,UserPass = ? WHERE Id = ?';
var updateSql_Params = ['updateName', '123456789',8];
connection.query(updateSql, updateSql_Params , function(err, rows, fields) {
	if (err) {
		console.log('[query] - :'+err);
		return;
	}else{
		console.log('update success!');
	}
});
```

##查询数据

```
var searchSql = 'SELECT * FROM userinfo';
connection.query(searchSql, function(err, rows, fields) {
	if (err) {
		console.log('[query] - :'+err);
		return;
	}else{
		console.log('search success!');
		console.log(rows);
	}
});
```

##查询某一条数据

```
var searchSql = 'SELECT * from userinfo where id=? LIMIT 1';
var searchSql_Params = 10;
connection.query(searchSql,searchSql_Params, function(err, rows, fields) {
	if (err) {
		console.log('[query] - :'+err);
		return;
	}else{
		console.log('search success!');
		console.log(rows);
	}
});
```

##关闭connection

```
connection.end(function(err){
	if(err){
		return;
	}
	console.log('[connection end] succeed!');
});
```

##修改mysql的编码方式可以有以下几个：

####1.通过配置文件修改my.ini(windows下)或/etc/my.cnf(linux下)
分别添加如下内容
```
[mysqld]
character_server_set=utf8
[mysql]
default-character-set=utf8
[mysql.server]
default-character-set=utf8
[mysql_safe]
default-character-set=utf8
[client]
default-character-set=utf8
```
####2.创建数据库时设置编码
```
create database test character set utf8;
```
####3.创建表时设置编码
```
create table test(id int primary key)DEFAULT charset=utf8;
```
####4.修改数据库编码
```
alter database test character set utf8;
```
####5.修改表默认编码
```
alter table test character set utf8;
```
####6.修改字段编码
```
alter table test modify col_name varchar(50) CHARACTER SET utf8;
```
