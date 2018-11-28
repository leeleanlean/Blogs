# vue 路由权限管理
根据不同的角色，展示不同的路由

### 实现思路

	- 判断localStorage中是否有token
		↓
		- 有token
			↓
			- 校验token
				↓
				- token校验成功
					↓
					- 跳转至首页
				↓
				- token校验失败
					↓
					- 删除localStorage中token
						↓
						- 重新判断localStorage中是否有token
		↓
		- 没有token
			↓
			- 表单登录
				↓
				- 登录成功，获取到用户路由配置
					↓
					- token设置到localStorage
					- router.addRoutes 动态添加路由
						↓
						- 跳转至首页
				↓
				- 登录失败
					↓
					- 重新登录

### 实现代码

vue-premission 目录