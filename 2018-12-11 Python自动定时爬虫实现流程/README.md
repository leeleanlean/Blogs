# Python抓取百度搜索榜每天的数据

### 实现思路
```
- 创建项目
  ↓
  - 启动项目
    ↓
    - 后台运行进程 - nohup
      ↓
      - 定时自动请求接口 - crontab
        ↓
        - 抓取数据
        - 保存至数据库
```

### 创建项目
> 见项目目录

### 后台运行进程 - nohup
```
- 启动后台运行
nohup python -u index.py > log.log 2>&1 &

tips:
&: 后台运行
2>&1: 把标准错误和标准输出都导入到log.log

- 查看运行的后台进程
jobs -l

- 停止后台运行
lsof -i tcp:5000
kill [PID]
```

### 定时请求接口 - crontab
```
crond start    //启动服务
crond stop     //关闭服务
crond restart  //重启服务
crond reload   //重新载入配置
crond status   //查看服务状态

查看定时任务列表
crontab -l

创建定时任务列表
crontab -e

任务格式
* * * * * path
minute hour day-of-month month day-of-week full-path-to-shell-script
- minute:         区间为 0 – 59 
- hour:           区间为0 – 23 
- day-of-month:   区间为0 – 31 
- month:          区间为1 – 12. 1 是1月. 12是12月. 
- Day-of-week:    区间为0 – 7. 周日可以是0或7.

example:

*/1 * * * * /root/deploy.sh
// 每分钟运行一次脚本

0 10 * * * /root/deploy.sh
// 每天十点运行脚本
```