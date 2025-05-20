const { startServer } = require('./start-server');

// 启动服务器
const server = startServer();

// 处理进程退出
process.on('SIGINT', () => {
    console.log('正在关闭服务器...');
    server.kill();
    process.exit();
});

process.on('SIGTERM', () => {
    console.log('正在关闭服务器...');
    server.kill();
    process.exit();
}); 