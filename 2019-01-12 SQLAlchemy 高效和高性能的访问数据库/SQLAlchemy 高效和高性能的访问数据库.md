# SQLAlchemy

### 1. 介绍

```
1. SQLAlchemy是Python编程语言下的一款开源软件。提供了SQL工具包及对象关系映射（ORM）工具，使用MIT许可证发行。
2. SQLAlchemy采用简单的Python语言，为高效和高性能的数据库访问设计，实现了完整的企业级持久模型。
```

### 2. 安装

```
pip install sqlalchemy
注: 依赖 MySQLdb 模块
```

### 3. 导入项目

```
# pymysql
import pymysql
pymysql.install_as_MySQLdb()
注: MySQLdb只适用于python2.x，python3的替代品是：import pymysql

# sqlalchemy
from sqlalchemy import Column, String, create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
```

### 4. 连接数据库

```
# 创建对象的基类:
Base = declarative_base()

# 初始化数据库连接:
engine = create_engine('mysql+mysqlconnector://root:root@localhost:3306/leelean')
# 创建DBSession对象:
DBSession = sessionmaker(bind=engine)()
```

### 5. 基本用法

```
# 定义User对象:
class List(Base):
    # 表的名字:
    __tablename__ = 'list'

    # 表的结构:
    id = Column(String(11), primary_key=True)
    title = Column(String(255))

# 创建新User对象:
new_user = List(id='5', title='Basdob')
# 添加到session:
DBSession.add(new_user)

# 提交即保存到数据库:
DBSession.commit()
# 关闭DBSession:
DBSession.close()
```

### 6. 常用操作

#### 6.1 增
```
// 单个新增
obj = Users(name="lee", level='ss')
session.add(obj)

// 批量新增
session.add_all([
	Users(name="lee", level='ss'),
	Users(name="lee", level='ss'),
])
```

#### 6.2 删
```
session.query(Users).filter(Users.id > 2).delete()
```

#### 6.3 改
```
session.query(Users).filter(Users.id > 2).update({"name" : "099"})
session.query(Users).filter(Users.id > 2).update({Users.name: Users.name + "099"}, synchronize_session=False)
session.query(Users).filter(Users.id > 2).update({"num": Users.num + 1}, synchronize_session="evaluate")
```

#### 6.4 查
```
res = session.query(Users).all()
res = session.query(Users.name, Users.extra).all()
res = session.query(Users).filter_by(name='alex').all()
res = session.query(Users).filter_by(name='alex').first()
```
