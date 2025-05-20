#!/bin/bash

echo "开始安装 SGRR Clock 反馈系统..."

# 检查 Node.js 是否已安装
if ! command -v node &> /dev/null; then
    echo "错误: 未找到 Node.js，请先安装 Node.js"
    echo "请访问 https://nodejs.org/ 下载并安装 Node.js"
    exit 1
fi

# 检查 npm 是否已安装
if ! command -v npm &> /dev/null; then
    echo "错误: 未找到 npm，请确保 Node.js 安装正确"
    exit 1
fi

# 安装项目依赖
echo "正在安装项目依赖..."
npm install express cors

# 安装 PM2
echo "正在安装 PM2..."
npm install -g pm2

# 启动代理服务
echo "正在启动代理服务..."
pm2 start proxy-server.js --name "sgrr-clock-proxy"

# 设置开机自启
echo "正在设置开机自启..."
pm2 startup
pm2 save

echo "安装完成！"
echo "现在你可以访问 http://localhost:3000 使用反馈系统了"
echo "如果遇到问题，请运行: pm2 logs sgrr-clock-proxy 查看日志" 