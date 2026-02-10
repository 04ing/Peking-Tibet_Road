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

// 提取地理数据功能
function extractGeographicData() {
    const url = 'http://119.78.100.166/qzlab/Ancient-roads?type=jzgd';
    const loadingElement = document.getElementById('data-loading');
    const resultElement = document.getElementById('data-result');
    
    if (loadingElement) {
        loadingElement.textContent = '正在提取地理数据...';
    }
    
    if (resultElement) {
        resultElement.textContent = '';
    }
    
    // 尝试使用fetch API获取数据
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // 处理获取到的数据
            console.log('获取到的地理数据:', data);
            
            // 保存数据到本地存储，以便后续使用
            localStorage.setItem('jzgdGeographicData', JSON.stringify(data));
            
            // 显示成功消息
            if (loadingElement) {
                loadingElement.textContent = '数据提取成功！';
            }
            
            if (resultElement) {
                resultElement.textContent = '地理数据已成功提取并保存到本地存储。';
                // 显示数据预览
                resultElement.innerHTML += '<h4>数据预览：</h4>';
                resultElement.innerHTML += '<pre>' + JSON.stringify(data, null, 2).substring(0, 500) + '...</pre>';
            }
            
            // 触发数据处理完成事件
            const event = new CustomEvent('geographicDataExtracted', { detail: data });
            window.dispatchEvent(event);
        })
        .catch(error => {
            console.error('提取地理数据时出错:', error);
            
            // 显示错误消息
            if (loadingElement) {
                loadingElement.textContent = '数据提取失败！';
            }
            
            if (resultElement) {
                resultElement.textContent = '无法从指定URL获取数据，可能存在跨域限制。请尝试在浏览器中直接访问该URL，然后手动复制数据。';
            }
        });
}

// 初始化数据提取功能
function initDataExtraction() {
    const extractButton = document.getElementById('extract-data-btn');
    if (extractButton) {
        extractButton.addEventListener('click', extractGeographicData);
    }
}

// 在页面加载完成后初始化数据提取功能
window.addEventListener('load', function() {
    initDataExtraction();
});