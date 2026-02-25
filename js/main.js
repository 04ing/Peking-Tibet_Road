// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        header.style.padding = '10px 0';
    } else {
        header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        header.style.padding = '0';
    }
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// 导航栏激活状态
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current || (current === '' && link.getAttribute('href') === '#')) {
            link.classList.add('active');
        }
    });
});

// 按钮悬停效果
const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
    });
});

// 特征卡片动画
const featureItems = document.querySelectorAll('.feature-item');
featureItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
        this.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
    });
});

// 数据集和研究成果卡片动画
const datasetItems = document.querySelectorAll('.dataset-item');
const researchItems = document.querySelectorAll('.research-item');

[...datasetItems, ...researchItems].forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
        this.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
    });
});

// 地图控制交互
const mapCheckboxes = document.querySelectorAll('.checkbox-group input[type="checkbox"]');
mapCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        // 控制地图图层显示/隐藏的逻辑
        console.log(`${this.id} ${this.checked ? 'checked' : 'unchecked'}`);
        
        // 根据复选框ID控制不同图层
        if (window.amap) {
            if (this.id === 'layer-route') {
                // 控制路线图层
                if (window.amapPolyline) {
                    if (this.checked) {
                        window.amapPolyline.setMap(window.amap);
                    } else {
                        window.amapPolyline.setMap(null);
                    }
                }
            } else if (this.id === 'layer-station') {
                // 控制驿站标记
                if (window.amapMarkers) {
                    window.amapMarkers.forEach(marker => {
                        if (this.checked) {
                            marker.setMap(window.amap);
                        } else {
                            marker.setMap(null);
                        }
                    });
                }
            } else if (this.id === 'layer-landmark') {
                // 控制历史地标
                // 这里可以添加历史地标图层的控制逻辑
                console.log('Landmark layer control not implemented yet');
            }
        }
    });
});

// 时间范围选择交互
const timeSelect = document.querySelector('.control-group select');
if (timeSelect) {
    timeSelect.addEventListener('change', function() {
        // 时间范围变化的逻辑
        console.log(`Selected time: ${this.value}`);
        
        // 根据选择的时间范围更新地图显示
        // 这里可以添加不同时期路线的显示逻辑
        if (window.amap) {
            console.log(`Updating map for time period: ${this.value}`);
            // 示例：可以根据不同时期显示不同的路线样式或数据
        }
    });
}

// 页面加载完成后执行
window.addEventListener('load', function() {
    // 显示页面加载完成的提示
    console.log('Page loaded successfully');
    
    // 为英雄区域添加淡入动画
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
        
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // 初始化高德地图
    initAmap();
    
    // 初始化滚动动画
    initScrollAnimations();
});

// 初始化高德地图
function initAmap() {
    // 检查是否是route.html或heritage.html页面，如果是则跳过初始化（这些页面有自己的地图初始化）
    const currentPage = window.location.pathname;
    if (currentPage.includes('route.html') || currentPage.includes('heritage.html')) {
        console.log(`This is ${currentPage.includes('route.html') ? 'route.html' : 'heritage.html'}, skipping map initialization (this page has its own map initialization)`);
        return;
    }
    
    // 检查地图容器是否存在
    const mapContainer = document.getElementById('amap-container');
    if (!mapContainer) {
        console.log('Map container not found, skipping map initialization');
        return;
    }
    
    // 检查AMap是否加载
    if (!window.AMap) {
        console.error('AMap API not loaded. Please check your API key and network connection.');
        // 显示错误信息
        mapContainer.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #666;">高德地图加载失败，请检查API密钥是否正确</div>';
        return;
    }
    
    try {
        // 创建地图实例
        const map = new AMap.Map('amap-container', {
            center: [116.4074, 39.9042], // 北京坐标
            zoom: 5, // 缩放级别
            zooms: [3, 18], // 缩放范围
            mapStyle: 'amap://styles/normal' // 默认风格地图
        });
        
        // 定义京藏古道的路线坐标点（示例）
        const routePath = [
            [116.4074, 39.9042], // 北京
            [115.5006, 40.5847], // 张家口
            [113.6158, 40.8183], // 大同
            [111.6708, 40.8139], // 呼和浩特
            [106.2782, 38.4663], // 银川
            [101.7780, 36.6232], // 西宁
            [91.1170, 29.6657], // 拉萨
        ];
        
        // 定义驿站基本信息
        const stationInfo = [
            {
                name: '北京',
                type: '起点站',
                description: '元代大都，京藏古道的起点，是当时全国的政治、经济、文化中心',
                facilities: '马厩、仓库、驿舍、厨房',
                history: '元代建立，是连接全国各地驿路的枢纽'
            },
            {
                name: '张家口',
                type: '重要驿站',
                description: '位于北京西北方向，是京藏古道上的重要节点',
                facilities: '马厩、仓库、驿舍',
                history: '元代设立，是北京通往西北的必经之路'
            },
            {
                name: '大同',
                type: '重要驿站',
                description: '位于山西省北部，是京藏古道上的重要城市',
                facilities: '马厩、仓库、驿舍、兵营',
                history: '元代设立，是连接中原与草原的重要枢纽'
            },
            {
                name: '呼和浩特',
                type: '重要驿站',
                description: '位于内蒙古中部，是京藏古道上的重要草原城市',
                facilities: '马厩、仓库、驿舍、贸易市场',
                history: '元代设立，是草原丝绸之路的重要节点'
            },
            {
                name: '银川',
                type: '重要驿站',
                description: '位于宁夏平原，是京藏古道上的重要城市',
                facilities: '马厩、仓库、驿舍、水利设施',
                history: '元代设立，是连接中原与西北的重要枢纽'
            },
            {
                name: '西宁',
                type: '重要驿站',
                description: '位于青海省东部，是京藏古道进入西藏前的最后一个重要城市',
                facilities: '马厩、仓库、驿舍、宗教场所',
                history: '元代设立，是中原与西藏文化交流的重要节点'
            },
            {
                name: '拉萨',
                type: '终点站',
                description: '元代吐蕃地区的政治、宗教中心，京藏古道的终点',
                facilities: '马厩、仓库、驿舍、宗教场所',
                history: '元代设立，是京藏古道的最终目的地'
            }
        ];
        
        // 创建路线
        const polyline = new AMap.Polyline({
            path: routePath,
            strokeColor: '#8B4513', // 棕色
            strokeWeight: 6,
            strokeOpacity: 0.8,
            strokeStyle: 'solid'
        });
        
        // 添加路线到地图
        polyline.setMap(map);
        
        // 添加标记点
        const markers = routePath.map((point, index) => {
            const marker = new AMap.Marker({
                position: point,
                title: index === 0 ? '北京' : index === routePath.length - 1 ? '拉萨' : `节点${index}`
            });
            
            // 为标记点添加点击事件
            marker.on('click', function() {
                // 获取对应驿站的信息
                const info = stationInfo[index];
                
                // 创建信息窗口内容
                const content = `
                    <div style="padding: 10px; max-width: 300px;">
                        <h3 style="color: #8B4513; margin-bottom: 10px;">${info.name}</h3>
                        <p><strong>类型：</strong>${info.type}</p>
                        <p><strong>描述：</strong>${info.description}</p>
                        <p><strong>设施：</strong>${info.facilities}</p>
                        <p><strong>历史：</strong>${info.history}</p>
                    </div>
                `;
                
                // 创建信息窗口
                const infoWindow = new AMap.InfoWindow({
                    content: content,
                    offset: new AMap.Pixel(0, -30)
                });
                
                // 打开信息窗口
                infoWindow.open(map, point);
            });
            
            return marker;
        });
        
        // 将标记点添加到地图
        markers.forEach(marker => marker.setMap(map));
        
        // 调整地图视野以显示整个路线
        map.setFitView([...markers, polyline]);
        
        // 保存地图实例到全局变量，以便其他函数可以访问
        window.amap = map;
        window.amapMarkers = markers;
        window.amapPolyline = polyline;
        
        console.log('AMap initialized successfully');
    } catch (error) {
        console.error('Error initializing AMap:', error);
        // 显示错误信息
        mapContainer.innerHTML = `<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #666;">地图初始化失败: ${error.message}</div>`;
    }
}

// 滚动动画初始化
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .zoom-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(element => {
        element.style.animationPlayState = 'paused';
        observer.observe(element);
    });
}

// 为页面元素添加动画类
function addAnimationClasses() {
    // 为方法项目添加动画
    const methodItems = document.querySelectorAll('.method-item');
    methodItems.forEach((item, index) => {
        item.classList.add('fade-in-up', `delay-${index + 1}`);
    });
    
    // 为路线部分添加动画
    const routeSections = document.querySelectorAll('.route-section');
    routeSections.forEach((section, index) => {
        section.classList.add('fade-in-up', `delay-${index + 1}`);
    });
    
    // 为分支项目添加动画
    const branchItems = document.querySelectorAll('.branch-item');
    branchItems.forEach((item, index) => {
        item.classList.add('fade-in-up', `delay-${index + 1}`);
    });
    
    // 为节点项目添加动画
    const nodeItems = document.querySelectorAll('.node-item');
    nodeItems.forEach((item, index) => {
        item.classList.add('fade-in-up', `delay-${index + 1}`);
    });
    
    // 为结果项目添加动画
    const resultItems = document.querySelectorAll('.result-item');
    resultItems.forEach((item, index) => {
        item.classList.add('fade-in-up', `delay-${index + 1}`);
    });
    
    // 为时间线事件添加动画
    const timelineEvents = document.querySelectorAll('.timeline-event');
    timelineEvents.forEach((event, index) => {
        event.classList.add('fade-in-up', `delay-${index + 1}`);
    });
    
    // 为事件卡片添加动画
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach((card, index) => {
        card.classList.add('fade-in-up', `delay-${index + 1}`);
    });
    
    // 为分析项目添加动画
    const analysisItems = document.querySelectorAll('.analysis-item');
    analysisItems.forEach((item, index) => {
        item.classList.add('fade-in-up', `delay-${index + 1}`);
    });
    
    // 为意义项目添加动画
    const significanceItems = document.querySelectorAll('.significance-item');
    significanceItems.forEach((item, index) => {
        item.classList.add('fade-in-up', `delay-${index + 1}`);
    });
    
    // 为类型卡片添加动画
    const typeCards = document.querySelectorAll('.type-card');
    typeCards.forEach((card, index) => {
        card.classList.add('fade-in-up', `delay-${index + 1}`);
    });
    
    // 为区域部分添加动画
    const regionSections = document.querySelectorAll('.region-section');
    regionSections.forEach((section, index) => {
        section.classList.add('fade-in-up', `delay-${index + 1}`);
    });
    
    // 为价值项目添加动画
    const valueItems = document.querySelectorAll('.value-item');
    valueItems.forEach((item, index) => {
        item.classList.add('fade-in-up', `delay-${index + 1}`);
    });
    
    // 为保护项目添加动画
    const protectionItems = document.querySelectorAll('.protection-item');
    protectionItems.forEach((item, index) => {
        item.classList.add('fade-in-up', `delay-${index + 1}`);
    });
    
    // 为利用项目添加动画
    const utilizationItems = document.querySelectorAll('.utilization-item');
    utilizationItems.forEach((item, index) => {
        item.classList.add('fade-in-up', `delay-${index + 1}`);
    });
}

// 页面加载时添加动画类
window.addEventListener('DOMContentLoaded', function() {
    addAnimationClasses();
});

// 提取地理数据功能（兼容旧版）
function extractGeographicData() {
    const loadingElement = document.getElementById('data-loading');
    const resultElement = document.getElementById('data-result');
    
    if (loadingElement) {
        loadingElement.textContent = '数据功能已更新！';
    }
    
    if (resultElement) {
        resultElement.textContent = '古道数据功能已更新，相关数据将在后续版本中提供。';
    }
}

// 初始化数据提取功能
function initDataExtraction() {
    const extractButton = document.getElementById('extract-data-btn');
    if (extractButton) {
        extractButton.addEventListener('click', extractGeographicData);
    }
}

// 初始化数据获取功能
function initDataFetching() {
    // 移除了对不存在的API端点的调用
    console.log('数据获取功能已初始化');
}

// 登录注册功能

// 显示登录模态框
function showLoginModal() {
    // 创建登录容器
    const loginContainer = document.createElement('div');
    loginContainer.id = 'login-container';
    loginContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    // 创建登录内容
    const loginContent = document.createElement('div');
    loginContent.style.cssText = `
        background-color: white;
        padding: 40px;
        border-radius: 10px;
        text-align: center;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
        max-width: 400px;
        width: 100%;
    `;
    
    // 添加标题
    const loginTitle = document.createElement('h3');
    loginTitle.textContent = '用户登录';
    loginTitle.style.marginBottom = '30px';
    loginContent.appendChild(loginTitle);
    
    // 添加登录表单
    const loginForm = document.createElement('form');
    loginForm.id = 'login-form';
    loginForm.style.cssText = `
        display: flex;
        flex-direction: column;
        gap: 20px;
    `;
    
    // 添加邮箱输入
    const emailInput = document.createElement('div');
    emailInput.innerHTML = `
        <label for="login-email">邮箱：</label>
        <input type="email" id="login-email" name="email" required style="
            width: 100%;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
        ">
    `;
    loginForm.appendChild(emailInput);
    
    // 添加密码输入
    const passwordInput = document.createElement('div');
    passwordInput.innerHTML = `
        <label for="login-password">密码：</label>
        <input type="password" id="login-password" name="password" required style="
            width: 100%;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
        ">
    `;
    loginForm.appendChild(passwordInput);
    
    // 添加错误信息显示
    const errorMessage = document.createElement('div');
    errorMessage.id = 'login-error';
    errorMessage.style.cssText = `
        color: red;
        margin-top: 10px;
        font-size: 14px;
    `;
    loginForm.appendChild(errorMessage);
    
    // 添加提交按钮
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = '登录';
    submitButton.style.cssText = `
        padding: 12px;
        background-color: #8B4513;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        margin-top: 10px;
    `;
    loginForm.appendChild(submitButton);
    
    // 添加注册链接
    const registerLink = document.createElement('div');
    registerLink.innerHTML = `
        <p>还没有账号？<a href="javascript:void(0)" id="switch-to-register">立即注册</a></p>
    `;
    registerLink.style.marginTop = '20px';
    loginForm.appendChild(registerLink);
    
    // 添加关闭按钮
    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.textContent = '关闭';
    closeButton.style.cssText = `
        padding: 10px 20px;
        background-color: #666;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
        margin-top: 10px;
    `;
    closeButton.onclick = function() {
        document.body.removeChild(loginContainer);
    };
    loginForm.appendChild(closeButton);
    
    loginContent.appendChild(loginForm);
    loginContainer.appendChild(loginContent);
    document.body.appendChild(loginContainer);
    
    // 切换到注册模态框
    document.getElementById('switch-to-register').addEventListener('click', function() {
        document.body.removeChild(loginContainer);
        showRegisterModal();
    });
    
    // 处理登录表单提交
    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        handleLogin();
    });
}

// 显示注册模态框
function showRegisterModal() {
    // 创建注册容器
    const registerContainer = document.createElement('div');
    registerContainer.id = 'register-container';
    registerContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    // 创建注册内容
    const registerContent = document.createElement('div');
    registerContent.style.cssText = `
        background-color: white;
        padding: 40px;
        border-radius: 10px;
        text-align: center;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
        max-width: 400px;
        width: 100%;
    `;
    
    // 添加标题
    const registerTitle = document.createElement('h3');
    registerTitle.textContent = '用户注册';
    registerTitle.style.marginBottom = '30px';
    registerContent.appendChild(registerTitle);
    
    // 添加注册表单
    const registerForm = document.createElement('form');
    registerForm.id = 'register-form';
    registerForm.style.cssText = `
        display: flex;
        flex-direction: column;
        gap: 20px;
    `;
    
    // 添加用户名输入
    const usernameInput = document.createElement('div');
    usernameInput.innerHTML = `
        <label for="register-username">用户名：</label>
        <input type="text" id="register-username" name="username" required style="
            width: 100%;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
        ">
    `;
    registerForm.appendChild(usernameInput);
    
    // 添加邮箱输入
    const emailInput = document.createElement('div');
    emailInput.innerHTML = `
        <label for="register-email">邮箱：</label>
        <input type="email" id="register-email" name="email" required style="
            width: 100%;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
        ">
    `;
    registerForm.appendChild(emailInput);
    
    // 添加密码输入
    const passwordInput = document.createElement('div');
    passwordInput.innerHTML = `
        <label for="register-password">密码：</label>
        <input type="password" id="register-password" name="password" required style="
            width: 100%;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
        ">
    `;
    registerForm.appendChild(passwordInput);
    
    // 添加错误信息显示
    const errorMessage = document.createElement('div');
    errorMessage.id = 'register-error';
    errorMessage.style.cssText = `
        color: red;
        margin-top: 10px;
        font-size: 14px;
    `;
    registerForm.appendChild(errorMessage);
    
    // 添加提交按钮
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = '注册';
    submitButton.style.cssText = `
        padding: 12px;
        background-color: #8B4513;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        margin-top: 10px;
    `;
    registerForm.appendChild(submitButton);
    
    // 添加登录链接
    const loginLink = document.createElement('div');
    loginLink.innerHTML = `
        <p>已有账号？<a href="javascript:void(0)" id="switch-to-login">立即登录</a></p>
    `;
    loginLink.style.marginTop = '20px';
    registerForm.appendChild(loginLink);
    
    // 添加关闭按钮
    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.textContent = '关闭';
    closeButton.style.cssText = `
        padding: 10px 20px;
        background-color: #666;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
        margin-top: 10px;
    `;
    closeButton.onclick = function() {
        document.body.removeChild(registerContainer);
    };
    registerForm.appendChild(closeButton);
    
    registerContent.appendChild(registerForm);
    registerContainer.appendChild(registerContent);
    document.body.appendChild(registerContainer);
    
    // 切换到登录模态框
    document.getElementById('switch-to-login').addEventListener('click', function() {
        document.body.removeChild(registerContainer);
        showLoginModal();
    });
    
    // 处理注册表单提交
    document.getElementById('register-form').addEventListener('submit', function(e) {
        e.preventDefault();
        handleRegister();
    });
}

// 处理登录表单提交
async function handleLogin() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const errorElement = document.getElementById('login-error');
    
    try {
        // 验证表单数据
        if (!email || !password) {
            errorElement.textContent = '请填写所有必填字段';
            return;
        }
        
        // 验证邮箱格式
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errorElement.textContent = '请输入有效的邮箱地址';
            return;
        }
        
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        // 检查响应状态
        if (!response.ok) {
            // 尝试解析错误响应
            try {
                const errorData = await response.json();
                errorElement.textContent = errorData.message || '登录失败，请检查邮箱和密码';
            } catch (e) {
                // 如果响应不是有效的JSON
                errorElement.textContent = '登录失败，请检查网络连接';
            }
            return;
        }
        
        // 尝试解析成功响应
        try {
            const data = await response.json();
            
            // 登录成功，保存token和用户信息
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            // 更新UI
            updateUserUI(data.user);
            
            // 关闭登录模态框
            document.body.removeChild(document.getElementById('login-container'));
            
            // 显示成功消息
            alert('登录成功！');
        } catch (e) {
            console.error('解析响应失败:', e);
            errorElement.textContent = '登录失败，请稍后重试';
        }
    } catch (error) {
        console.error('登录错误:', error);
        errorElement.textContent = '登录失败，请检查网络连接';
    }
}

// 处理注册表单提交
async function handleRegister() {
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const errorElement = document.getElementById('register-error');
    
    try {
        // 验证表单数据
        if (!username || !email || !password) {
            errorElement.textContent = '请填写所有必填字段';
            return;
        }
        
        // 验证邮箱格式
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errorElement.textContent = '请输入有效的邮箱地址';
            return;
        }
        
        // 验证密码长度
        if (password.length < 6) {
            errorElement.textContent = '密码长度至少为6位';
            return;
        }
        
        const response = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });
        
        // 检查响应状态
        if (!response.ok) {
            // 尝试解析错误响应
            try {
                const errorData = await response.json();
                errorElement.textContent = errorData.message || '注册失败，请稍后重试';
            } catch (e) {
                // 如果响应不是有效的JSON
                errorElement.textContent = '注册失败，请检查网络连接';
            }
            return;
        }
        
        // 尝试解析成功响应
        try {
            const data = await response.json();
            
            // 注册成功，保存token和用户信息
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            // 更新UI
            updateUserUI(data.user);
            
            // 关闭注册模态框
            document.body.removeChild(document.getElementById('register-container'));
            
            // 显示成功消息
            alert('注册成功！');
        } catch (e) {
            console.error('解析响应失败:', e);
            errorElement.textContent = '注册失败，请稍后重试';
        }
    } catch (error) {
        console.error('注册错误:', error);
        errorElement.textContent = '注册失败，请检查网络连接';
    }
}

// 处理登出
function handleLogout() {
    // 清除localStorage中的token和用户信息
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // 更新UI
    updateUserUI(null);
    
    // 显示成功消息
    alert('登出成功！');
}

// 更新用户UI
function updateUserUI(user) {
    const loginButtons = document.getElementById('login-buttons');
    const userMenu = document.getElementById('user-menu');
    const usernameDisplay = document.getElementById('username-display');
    
    if (user) {
        // 显示用户菜单
        loginButtons.style.display = 'none';
        userMenu.style.display = 'block';
        usernameDisplay.textContent = user.username;
    } else {
        // 显示登录注册按钮
        loginButtons.style.display = 'block';
        userMenu.style.display = 'none';
    }
}

// 检查用户登录状态
function checkLoginStatus() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
        try {
            const user = JSON.parse(userStr);
            updateUserUI(user);
        } catch (error) {
            console.error('解析用户信息失败:', error);
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        }
    }
}

// 初始化下拉菜单功能
function initDropdowns() {
    // 绑定所有下拉按钮的点击事件
    const dropdownButtons = document.querySelectorAll('.dropdown-toggle');
    dropdownButtons.forEach(button => {
        button.addEventListener('click', function() {
            const dropdownMenu = this.nextElementSibling;
            if (dropdownMenu && dropdownMenu.classList.contains('dropdown-menu')) {
                // 切换下拉菜单的显示状态
                dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
            }
        });
    });
    
    // 点击页面其他地方关闭下拉菜单
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.dropdown')) {
            const dropdownMenus = document.querySelectorAll('.dropdown-menu');
            dropdownMenus.forEach(menu => {
                menu.style.display = 'none';
            });
        }
    });
}

// 初始化用户相关功能
function initUserAuth() {
    // 检查登录状态
    checkLoginStatus();
    
    // 初始化下拉菜单
    initDropdowns();
    
    // 绑定登录按钮点击事件
    const loginButton = document.getElementById('login-button');
    if (loginButton) {
        loginButton.addEventListener('click', function() {
            // 关闭下拉菜单
            const dropdownMenu = this.closest('.dropdown-menu');
            if (dropdownMenu) {
                dropdownMenu.style.display = 'none';
            }
            showLoginModal();
        });
    }
    
    // 绑定注册按钮点击事件
    const registerButton = document.getElementById('register-button');
    if (registerButton) {
        registerButton.addEventListener('click', function() {
            // 关闭下拉菜单
            const dropdownMenu = this.closest('.dropdown-menu');
            if (dropdownMenu) {
                dropdownMenu.style.display = 'none';
            }
            showRegisterModal();
        });
    }
    
    // 绑定登出按钮点击事件
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            // 关闭下拉菜单
            const dropdownMenu = this.closest('.dropdown-menu');
            if (dropdownMenu) {
                dropdownMenu.style.display = 'none';
            }
            handleLogout();
        });
    }
}

// 在页面加载完成后初始化数据提取功能
window.addEventListener('load', function() {
    initDataExtraction();
    initDataFetching();
    initUserAuth();
});