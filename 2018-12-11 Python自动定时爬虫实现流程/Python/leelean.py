#encoding: utf-8
import requests
from bs4 import BeautifulSoup

import xlwt

import pymysql

"""爬取数据
attributes:
  args:{
    url:     爬取网页的链接地址
    encode:  爬取网页的编码
    page:    页数
    element: 爬取的元素
  }
"""
class Spider(object):
  def __init__(self, args):
    """初始化数据"""
    self.url = args['url']
    self.encode = args['encode']
    self.page = args['page']
    self.element = args['element']

  def getHTML(self):
    """获取HTML"""
    url = self.url
    res = requests.get(url)
    res.encoding = self.encode
    if res:
      chunk = BeautifulSoup(res.text, 'html.parser')
      # 获取DOM
      _list = chunk.select(self.element)
      return _list

"""插入表格
attributes:
  data:     需要插入的数据
  filePath: 保存的文件地址和名字
"""
class InsertTable(object):
  def __init__(self, data, filePath):
    """初始化数据"""
    self.data = data
    self.filePath = filePath
    self.save()

  def save(self):
    """插入数据"""

    # 创建单元格
    payload = xlwt.Workbook()
    sheet = payload.add_sheet('payload')

    # 遍历数据插入表格
    for i in range(len(self.data)):
      for ii in range(len(self.data[0])):
        # print(i, ii, list(self.data[ii].keys())[ii])
        # print(i, ii, self.data[i][list(self.data[ii].keys())[ii]])
        sheet.write(i, ii, self.data[i][list(self.data[ii].keys())[ii]])

    # 保存文件
    payload.save(self.filePath)
    print('----- save success - %s' % self.filePath)

"""插入数据库
attributes:
"""
class InsertMysql(object):

  def __init__(self, args):
    """初始化数据"""
    self.db_name = args['db_name']
    self.data = args['data']
    self.insert_sql = args['insert_sql']
    self.update_sql = args['update_sql']
    self.insert()

  def insert(self):
    # 插入数据库
    db = pymysql.connect(host='localhost', user='root', password='root', db='%s' % self.db_name, charset='utf8')
    # 使用cursor()方法获取操作游标
    cur = db.cursor()

    # print(self.data['id'])
    # print(','.join(self.data['keyword']))
    id = self.data['id']
    title = ','.join(self.data['keyword'])

    # 判断是否有此数据
    sql = "select * from baidu_keyword where id = %d" % id
    cur.execute(sql)
    resules = cur.fetchall()
    if len(resules):
      # 更新
      sql = self.update_sql
      cur.execute(sql % (id, title, id))
      print('----- update Mysql success')
    else:
      # 插入
      sql = self.insert_sql
      cur.execute(sql % (id, title))
      print('----- insert Mysql success')
    db.commit()
    print('----- Mysql done')

    # 关闭数据库连接
    db.close()
