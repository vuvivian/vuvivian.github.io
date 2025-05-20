@echo off
echo 开始安装 SGRR Clock 反馈系统...

:: 检查 Node.js 是否已安装
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo 错误: 未找到 Node.js，请先安装 Node.js
    echo 请访问 https://nodejs.org/ 下载并安装 Node.js
    exit /b 1
)

:: 检查 npm 是否已安装
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo 错误: 未找到 npm，请确保 Node.js 安装正确
    exit /b 1
)

:: 安装项目依赖
echo 正在安装项目依赖...
call npm install express cors

:: 安装 PM2
echo 正在安装 PM2...
call npm install -g pm2

:: 启动代理服务
echo 正在启动代理服务...
call pm2 start proxy-server.js --name "sgrr-clock-proxy"

:: 设置开机自启
echo 正在设置开机自启...
call pm2 startup
call pm2 save

echo 安装完成！
echo 现在你可以访问 http://localhost:3000 使用反馈系统了
echo 如果遇到问题，请运行: pm2 logs sgrr-clock-proxy 查看日志
pause 