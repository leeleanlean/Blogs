#encoding: utf-8

from flask import Flask, request, jsonify, make_response
import requests

app = Flask(__name__)

import pymysql
db = pymysql.connect(host="localhost",user="root",password="root",db="f2e-work",charset="utf8")
cur = db.cursor()

@app.route('/')
def index():
	return 'Index'

#
# 列表接口
# 
@app.route('/api/list')
def list():

	id = request.args.to_dict().get('id')
	if id:
		sql = "select * from workList where id = '%s'"
		cur.execute(sql % (id))
		resules = cur.fetchall()
		if resules:
			result_str = {
				'id': resules[0][0],
				'num': resules[0][1],
				'title': resules[0][2],
				'developer': resules[0][3],
				'tag': resules[0][4],
				'status': resules[0][5],
				'textarea': resules[0][6]
			}
			return jsonify({
				'status': 1,
				'msg': '数据返回成功',
				'payload': result_str
			})
		else:
			return jsonify({
				'status': 0,
				'msg': '根据ID获取数据失败',
				'payload': ''
			})

	else:

		developer = request.args.to_dict().get('developer')
		status = request.args.to_dict().get('status')

		if developer:
			sql = "select * from workList where developer = '%s'"
			cur.execute(sql % (developer))
		elif status:
			sql = "select * from workList where status = '%s'"
			cur.execute(sql % (status))
		else:
			sql = "select * from workList"
			cur.execute(sql)
		results = cur.fetchall()

		if results:
			result_arr = []
			for i in results:
				result_arr.append({
					'id': i[0],
					'num': i[1],
					'title': i[2],
					'developer': i[3],
					'tag': i[4],
					'status': i[5],
					'textarea': i[6]
				})

			return jsonify({
				'status': 1,
				'msg': '数据返回成功',
				'payload': result_arr
			})
		else:
			return jsonify({
				'status': 0,
				'msg': '根据ID获取数据失败',
				'payload': ''
			})

#
# 新增接口
# 
@app.route('/api/add', methods=['POST', 'GET'])
def add():
	num = request.args.to_dict().get('num')
	title = request.args.to_dict().get('title')
	status = request.args.to_dict().get('status')
	developer = request.args.to_dict().get('developer')
	tag = request.args.to_dict().get('tag')
	textarea = request.args.to_dict().get('textarea')

	if request.method == 'POST' and num and title:

		sql = "insert into workList(id, num, title, developer, tag, status, textarea) values (null, '%s', '%s', '%s', '%s', '%s', '%s')"
		cur.execute(sql % (num, title, developer, tag, status, textarea))
		db.commit()
		return jsonify({
			'status': 1,
			'payload': '任务新建成功'
		})
	else:
		return jsonify({
			'status': 0,
			'msg': '请求方式、参数有误',
			'payload': ''
		})

#
# 编辑接口
# 
@app.route('/api/update', methods=['POST', 'GET'])
def update():
	num = request.args.to_dict().get('num')
	title = request.args.to_dict().get('title')
	status = request.args.to_dict().get('status')
	developer = request.args.to_dict().get('developer')
	tag = request.args.to_dict().get('tag')
	textarea = request.args.to_dict().get('textarea')

	sql = "select * from workList where num = '%s'"
	cur.execute(sql % (num))
	resules = cur.fetchall()
	if resules:
		# 更新数据
		sql = "update workList set num = '%s', title = '%s', status = '%s', developer = '%s', tag = '%s', textarea = '%s' where num = '%s' "
		cur.execute(sql % (num, title, status, developer, tag, textarea, num))
		db.commit()
		return jsonify({
			'status': 1,
			'msg': '任务更新成功',
			'payload': ''
		})
	else:
		return jsonify({
			'status': 0,
			'msg': '未找到相应编号的数据',
			'payload': ''
		})

if __name__ == '__main__':
    app.run(debug = True, host = '0.0.0.0')