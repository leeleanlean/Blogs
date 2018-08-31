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

#### 4.1 将小说关键词加入结巴分词
```
# 将关键词加入结巴分词
    for i in range(len(keyword_arr)):
        keyword = keyword_arr[i]['keyword']
        jieba.add_word(keyword)
        print(keyword)
```
#### 4.2 加入常用中文停用词列表
```
file_stopWord = open('./docs/stopWords.txt', 'r')
STOPWORD = [word.strip() for word in file_stopWord.readlines()]
```

#### 4.3 开始进行分词
```
# 开始进行分词
print('开始进行分词。。。。')
sentence = []
seg_list = list(jieba.cut(text, cut_all=False))
unique_list = []
for seg in seg_list:
    if seg not in STOPWORD:
        unique_list.append(seg)
print(unique_list)
sentence.append(unique_list)
print('分词完毕')
```

### 5 训练关系模型
```
# 开始训练模型
print('开始训练模型...')
model = gensim.models.Word2Vec(
    sentence,
      size=65,
      workers=4
)
print('训练完毕！正在将模型保存到本地')
model.save('./docs/ordinaryWord.model')
print('模型保存到本地成功！')
```

### 6 调用模型分析关系

```
# 利用训练好的模型，进行文本相似性分析
# 读入训练好的模型
# 关键词相似性分析
# 展示关键词相似词

***************************
* 看到分析结果后，发现用处没那么大
* 可能跟训练关系模型、分词有很大的原因
***************************

```

#### 少安
![](https://github.com/leeleanlean/Blogs/blob/gh-pages/2018-08-23%20Python%E5%88%86%E6%9E%90%E5%B0%8F%E8%AF%B4%20-%20%E5%B9%B3%E5%87%A1%E7%9A%84%E4%B8%96%E7%95%8C/image/1.png?raw=true)
#### 少平
![](https://github.com/leeleanlean/Blogs/blob/gh-pages/2018-08-23%20Python%E5%88%86%E6%9E%90%E5%B0%8F%E8%AF%B4%20-%20%E5%B9%B3%E5%87%A1%E7%9A%84%E4%B8%96%E7%95%8C/image/2.png?raw=true)
#### 润叶
![](https://github.com/leeleanlean/Blogs/blob/gh-pages/2018-08-23%20Python%E5%88%86%E6%9E%90%E5%B0%8F%E8%AF%B4%20-%20%E5%B9%B3%E5%87%A1%E7%9A%84%E4%B8%96%E7%95%8C/image/3.png?raw=true)
#### 孙玉厚
![](https://github.com/leeleanlean/Blogs/blob/gh-pages/2018-08-23%20Python%E5%88%86%E6%9E%90%E5%B0%8F%E8%AF%B4%20-%20%E5%B9%B3%E5%87%A1%E7%9A%84%E4%B8%96%E7%95%8C/image/4.png?raw=true)
#### 孙玉亭
![](https://github.com/leeleanlean/Blogs/blob/gh-pages/2018-08-23%20Python%E5%88%86%E6%9E%90%E5%B0%8F%E8%AF%B4%20-%20%E5%B9%B3%E5%87%A1%E7%9A%84%E4%B8%96%E7%95%8C/image/5.png?raw=true)
#### 田福堂
![](https://github.com/leeleanlean/Blogs/blob/gh-pages/2018-08-23%20Python%E5%88%86%E6%9E%90%E5%B0%8F%E8%AF%B4%20-%20%E5%B9%B3%E5%87%A1%E7%9A%84%E4%B8%96%E7%95%8C/image/6.png?raw=true)
#### 田福军
![](https://github.com/leeleanlean/Blogs/blob/gh-pages/2018-08-23%20Python%E5%88%86%E6%9E%90%E5%B0%8F%E8%AF%B4%20-%20%E5%B9%B3%E5%87%A1%E7%9A%84%E4%B8%96%E7%95%8C/image/7.png?raw=true)
#### 田晓霞
![](https://github.com/leeleanlean/Blogs/blob/gh-pages/2018-08-23%20Python%E5%88%86%E6%9E%90%E5%B0%8F%E8%AF%B4%20-%20%E5%B9%B3%E5%87%A1%E7%9A%84%E4%B8%96%E7%95%8C/image/8.png?raw=true)
#### 二爸
![](https://github.com/leeleanlean/Blogs/blob/gh-pages/2018-08-23%20Python%E5%88%86%E6%9E%90%E5%B0%8F%E8%AF%B4%20-%20%E5%B9%B3%E5%87%A1%E7%9A%84%E4%B8%96%E7%95%8C/image/9.png?raw=true)
#### 金俊文
![](https://github.com/leeleanlean/Blogs/blob/gh-pages/2018-08-23%20Python%E5%88%86%E6%9E%90%E5%B0%8F%E8%AF%B4%20-%20%E5%B9%B3%E5%87%A1%E7%9A%84%E4%B8%96%E7%95%8C/image/10.png?raw=true)

