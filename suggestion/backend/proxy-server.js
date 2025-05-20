const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let mainServer = null;

// 启动主服务器
function startMainServer() {
    if (mainServer) {
        return;
    }

    const serverPath = path.join(__dirname, 'server.js');
    mainServer = spawn('node', [serverPath], {
        stdio: 'inherit'
    });

    mainServer.on('error', (error) => {
        console.error('主服务器启动失败:', error);
        mainServer = null;
    });

    mainServer.on('exit', () => {
        console.log('主服务器已停止');
        mainServer = null;
    });
}

// 停止主服务器
function stopMainServer() {
    if (mainServer) {
        mainServer.kill();
        mainServer = null;
    }
}

// 启动服务器的API端点
app.post('/start', (req, res) => {
    try {
        startMainServer();
        res.json({ success: true, message: '服务器启动成功' });
    } catch (error) {
        res.status(500).json({ success: false, message: '服务器启动失败', error: error.message });
    }
});

// 停止服务器的API端点
app.post('/stop', (req, res) => {
    try {
        stopMainServer();
        res.json({ success: true, message: '服务器停止成功' });
    } catch (error) {
        res.status(500).json({ success: false, message: '服务器停止失败', error: error.message });
    }
});

// 检查服务器状态的API端点
app.get('/status', (req, res) => {
    res.json({ 
        running: mainServer !== null,
        pid: mainServer ? mainServer.pid : null
    });
});

// 启动代理服务
app.listen(PORT, () => {
    console.log(`代理服务运行在 http://localhost:${PORT}`);
    console.log('使用以下命令安装为系统服务:');
    console.log('npm install -g pm2');
    console.log('pm2 start proxy-server.js --name "sgrr-clock-proxy"');
}); 