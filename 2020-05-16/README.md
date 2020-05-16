<!--
 * @Descripttion: Python-Flask
 * @version: 
 * @Author: Lean
 * @Date: 2020-05-16 23:00:29
 * @LastEditors: Lean
 * @LastEditTime: 2020-05-16 23:02:35
 -->
## Python-Flask 返回html的多种方法

### 1、使用模板
```
@app.route('/')
def home():
  #index.html在templates文件夹下
  return render_template("index.html")
```

### 2、使用 send_from_directory
```
#html是个文件夹
root = os.path.join(os.path.dirname(os.path.abspath(__file__)), "html")

@app.route('/')
def home():
  #index.html在html文件夹下
  return send_from_directory(root, "index.html")
```

### 3、使用 app.send_static_file
```
#修改静态文件夹的目录
app = Flask(__name__, static_url_path='')

@app.route('/')
def home():
  #index.html在static文件夹下
  return app.send_static_file('index.html')
```