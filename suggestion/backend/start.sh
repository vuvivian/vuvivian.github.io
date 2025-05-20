#!/bin/bash

# 启动启动器服务
node launcher-server.js &

# 等待启动器服务启动
sleep 2

echo "启动器服务已启动，可以通过 http://localhost:3001 访问"
echo "现在可以打开前端页面了" 