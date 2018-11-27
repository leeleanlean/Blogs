#!/bin/bash

# 定义变量
LOG_FILE='./logs/deploy.log'

# 定义日志功能函数
write_log(){
  date=$(date +%F)
  time=$(date +%T)
  tips="$1"
  echo "${date +%F} ${date +%T} $0 : ${tips}" >> "${LOG_FILE}"
}

# 获取代码
get_code(){
  echo "获取代码"
}

# 打包代码
tar_code(){
  echo "打包代码"
  write_log "打包代码"
}

# 传输代码
scp_code(){
  echo "传输代码"
}

# 关闭应用
stop_serv(){
  echo "关闭应用"
  echo "关闭nginx应用"
  echo "关闭django应用"
}

# 解压代码
untar_code(){
  echo "解压代码"
}

# 放置代码
fangzhi_code(){
  echo "放置代码"
  echo "备份老文件"
  echo "放置新文件"
}

# 开启应用
start_serv(){
  echo "开启应用"
  echo "开启django应用"
  echo "开启nginx应用"
}

# 检查
check(){
  echo "检查项目"
}

# 部署函数
deploy_pro(){
  get_code
  tar_code
  scp_code
  stop_serv
  untar_code
  fangzhi_code
  start_serv
  check
}

# 主函数
main(){
  deploy_pro
}

# 执行主函数
main
