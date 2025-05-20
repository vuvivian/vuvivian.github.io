const express = require('express');
const bodyParser = require('body-parser');
const suggestionRoutes = require('./routes/suggestion');
const cors = require('cors');
const { startServer } = require('./start-server');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// 添加启动服务器的API端点
app.post('/start-server', (req, res) => {
    try {
        const server = startServer();
        res.json({ success: true, message: '服务器启动成功' });
    } catch (error) {
        res.status(500).json({ success: false, message: '服务器启动失败', error: error.message });
    }
});

// 路由
app.use('/suggestion', suggestionRoutes);

// 启动服务
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});