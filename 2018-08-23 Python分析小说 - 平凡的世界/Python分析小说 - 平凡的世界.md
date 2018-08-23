## Python分析小说 - 平凡的世界

### 1 明确目的

* 对小说关键词进行提取
* 根据关键词生成词云图
* 对小说进行分词
* 训练关系模型
* 调用模型分析关系

### 2 对小说关键词进行提取

* 2.1 导入平凡的世界.txt
* 2.2 提取前200个权重的关键词
* 2.3 根据关键词和权重生成云图


```
'''
提取前200个权重的关键词
'''
# 引入文件
path = './docs/平凡的世界.txt'
file = open(path, 'r')
text = file.read()

# 对小说关键词进行提取
keyword_arr = []
for keyword, weight in analyse.extract_tags(text, 200, withWeight=True):
	keyword_arr.append({
		'keyword': keyword,
		'weight': weight
	})
	# 打印关键词
	print('%s %s' % (int(weight * 1000), keyword))
	# print('%s %s %s' % (int(weight * 1000), keyword, weight))
```

### 3 根据关键词生成词云图

> 用在线词云生成如下图片

![](https://github.com/leeleanlean/Blogs/blob/gh-pages/2018-08-23%20Python%E5%88%86%E6%9E%90%E5%B0%8F%E8%AF%B4%20-%20%E5%B9%B3%E5%87%A1%E7%9A%84%E4%B8%96%E7%95%8C/wordCloud.png?raw=true)

### 4 对小说进行分词

### 5 训练关系模型

### 5 调用模型分析关系