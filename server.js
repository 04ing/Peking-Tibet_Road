// 后端服务主文件
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// 加载环境变量
dotenv.config();

// 创建Express应用
const app = express();

// 配置中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 连接数据库
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('数据库连接成功');
})
.catch((error) => {
    console.error('数据库连接失败:', error);
});

// 注册路由
const authRoutes = require('./routes/auth');

app.use('/api/auth', authRoutes);

// 静态文件服务（用于前端文件）
app.use(express.static(__dirname));

// 健康检查端点
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: '服务运行正常' });
});

// 启动服务
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`服务运行在端口 ${PORT}`);
});
