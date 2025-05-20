const { spawn } = require('child_process');
const path = require('path');

function startServer() {
    const serverPath = path.join(__dirname, 'server.js');
    const server = spawn('node', [serverPath], {
        stdio: 'inherit'
    });

    server.on('error', (error) => {
        console.error('启动服务器失败:', error);
    });

    return server;
}

// 如果直接运行此脚本，则启动服务器
if (require.main === module) {
    startServer();
}

module.exports = { startServer }; 