#encoding: utf-8
from flask import Flask, request, jsonify
from leelean import Spider, InsertTable, InsertMysql
import datetime

app = Flask(__name__)

@app.route('/api/leelean')
def leelean():
	return jsonify({
		'payload': 'leelean'
	})

@app.route('/')
def index():

	# 设置参数
	page = request.args.to_dict().get('page')

	url = 'http://top.baidu.com/buzz?b=341&c=513&fr=topbuzz_b42_c513'
	encode = 'gb2312'
	element = 'td.keyword'

	# 爬取网页数据
	spider = Spider({
		'url': url,
		'encode': encode,
		'page': page or 1,
		'element': element
	}).getHTML()
	# print(spider)

	# 提取数据
	title_list = []
	for i in range(len(spider)):
		title = spider[i].find('a').string
		title_list.append(title)

	res = {
		'id': int(datetime.datetime.now().strftime('%Y%m%d')),
		'keyword': title_list
	}

	# 保存到excel
	# InsertTable(res, './excel.xls')

	# 保存到数据库
	InsertMysql({
		'db_name': 'leelean',
		'data': res,
		'insert_sql': "insert into baidu_keyword(id, keyword) values (%d, '%s')",
		'update_sql': "update baidu_keyword set id = %d, keyword = '%s' where id = %d"
	})

	# 返回数据
	return jsonify({
		'payload': '%s Done!' % datetime.datetime.now().strftime('%Y-%m-%d')
	})

# run
if __name__ == '__main__':
    app.run(debug = True, host = '0.0.0.0')