// 认证路由
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

// 内存存储用户信息
const users = [];

// 用户注册
router.post('/register', async (req, res) => {
    try {
        console.log('接收到注册请求:', req.body);
        
        // 检查请求体是否存在
        if (!req.body) {
            return res.status(400).json({ message: '请求体不能为空' });
        }
        
        const { username, email, password } = req.body;
        
        // 检查必填字段
        if (!username || !email || !password) {
            return res.status(400).json({ message: '用户名、邮箱和密码不能为空' });
        }
        
        // 检查邮箱格式
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: '请输入有效的邮箱地址' });
        }
        
        // 检查密码长度
        if (password.length < 6) {
            return res.status(400).json({ message: '密码长度至少为6位' });
        }
        
        // 检查邮箱是否已存在
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            return res.status(400).json({ message: '邮箱已存在' });
        }
        
        // 创建新用户
        const newUser = {
            id: 'user-' + Date.now(),
            username: username,
            email: email,
            password: password, // 注意：实际生产环境中应该加密存储密码
            role: 'user'
        };
        
        // 保存用户到内存存储
        users.push(newUser);
        console.log('用户注册成功，当前用户数:', users.length);
        
        // 生成JWT令牌
        const token = jwt.sign(
            { id: newUser.id, username: newUser.username, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );
        
        // 返回成功响应
        res.status(201).json({
            message: '注册成功',
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role
            },
            token
        });
    } catch (error) {
        console.error('注册错误:', error);
        res.status(500).json({ message: '注册失败，请稍后重试' });
    }
});

// 用户登录
router.post('/login', async (req, res) => {
    try {
        console.log('接收到登录请求:', req.body);
        
        // 检查请求体是否存在
        if (!req.body) {
            return res.status(400).json({ message: '请求体不能为空' });
        }
        
        const { email, password } = req.body;
        
        // 检查必填字段
        if (!email || !password) {
            return res.status(400).json({ message: '邮箱和密码不能为空' });
        }
        
        // 检查邮箱格式
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: '请输入有效的邮箱地址' });
        }
        
        // 查找用户
        const user = users.find(user => user.email === email);
        if (!user) {
            return res.status(401).json({ message: '邮箱或密码错误' });
        }
        
        // 验证密码
        if (user.password !== password) {
            return res.status(401).json({ message: '邮箱或密码错误' });
        }
        
        // 生成JWT令牌
        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );
        
        // 返回成功响应
        res.status(200).json({
            message: '登录成功',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            },
            token
        });
    } catch (error) {
        console.error('登录错误:', error);
        res.status(500).json({ message: '登录失败，请稍后重试' });
    }
});

module.exports = router;