const express = require('express');
const cors = require('cors');
const { startServer } = require('./start-server');

const app = express();
const PORT = 3001; // 使用不同的端口

app.use(cors());
app.use(express.json());

// 启动主服务器的API端点
app.post('/start-main-server', (req, res) => {
    try {
        const server = startServer();
        res.json({ success: true, message: '主服务器启动成功' });
    } catch (error) {
        res.status(500).json({ success: false, message: '主服务器启动失败', error: error.message });
    }
});

// 检查主服务器状态的API端点
app.get('/check-main-server', async (req, res) => {
    try {
        const response = await fetch('http://localhost:3000/suggestion');
        if (response.ok) {
            res.json({ status: 'running' });
        } else {
            res.json({ status: 'stopped' });
        }
    } catch (error) {
        res.json({ status: 'stopped' });
    }
});

app.listen(PORT, () => {
    console.log(`启动器服务运行在 http://localhost:${PORT}`);
}); 