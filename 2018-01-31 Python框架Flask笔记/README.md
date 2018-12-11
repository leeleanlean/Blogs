[toc]
## 安装配置url

#### flask安装
```
pip install flask
```

#### 第一个flask程序
```
from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello Flask'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
```

#### 使用配置文件
```
import config
app.config.from_object(config)
```

#### URL传参到视图

##### url请求方法
```
@app.route('/list/<id>', methods=['POST', 'GET'])
```

##### 路由配置配置参数
```
@app.route('/list/<id>')
def list(id):
	return 'params:' + id
```

##### 获取url参数
```
# 导入request
# POST:  
# request.form获得所有post参数放在一个类似dict类中,to_dict()是字典化  
# 单个参数可以通过request.form.to_dict().get("xxx","")获得  
# --------------------------------------------------------------- 
# GET:  
# request.args获得所有get参数放在一个类似dict类中,to_dict()是字典化  
# 单个参数可以通过request.args.to_dict().get('xxx',"")获得  
```

##### url反转
```
# 导入url_for
# url_for('list', id='100')
```

##### url重定向
```
# 导入redirect
# login_url = url_for('list', id=100)
# return redirect(login_url)
```

##### 返回json文件
```
# 导入jsonify
return jsonify({
	'code': 0,
	'payload': {
		'msg': 'success'
	}
})
```


## 数据库

#### 安装 pymysql
```
# pip install pymysql
```

#### 链接数据库
```
import pymysql
db = pymysql.connect(host="localhost",user="root", password="root",db="db_name")
# 使用cursor()方法获取操作游标  
cur = db.cursor() 
```

#### 查询数据库
```
sql = "select * from user where name = '%s' and city = '%s'"
cur.execute(sql % ('lean', 'shanghai'))
resules = cur.fetchall()
db.close()
```

#### 插入数据库
```
sql = "insert into user(id, name, age, city) values (null, '%s', %d, '%s')"
cur.execute(sql % ('lean', 10, 'Beijing'))
db.commit()
db.close()
```

#### 更新数据库
```
sql = "update user set name = '%s', age = %d where id = %d "
cur.execute(sql % ('leelean', 20, 9))
db.commit()
db.close()
```

#### 删除数据库
```
sql = 'delete from user where id = %d'
cur.execute(sql % 10)
db.commit()
db.close()
```

## Cookie && Session

#### 存储Cookies
```
res = make_response('Set-Cookie')
outdate=datetime.datetime.today() + datetime.timedelta(days=30)
res.set_cookie('username', 'the username', expires = outdate)
return res
```

#### 读取Cookies
```
request.cookies.get('username')
```

#### 删除Cookies
```
1. 浏览器中主动删除
2. res.set_cookie('name','',expires=0)
3. res.delete_cookie('name')
```

#### 存储Session
```
# 导入session
app.config['SECRET_KEY'] = os.urandom(24)
session['name'] = 'lean'
```

#### 获取Session
```
session.get('name')
```

#### 删除Session
```
session.pop('name')
```

#### 清空Session
```
session.clear()
```
