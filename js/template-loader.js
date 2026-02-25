// 初始化搜索功能
function initSearch() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    // 检查搜索元素是否存在
    if (!searchInput || !searchButton) {
        console.log('搜索元素不存在，跳过搜索功能初始化');
        return;
    }

    // 搜索数据
    const searchData = {
        pages: [
            { title: '首页', url: 'index.html', content: '京藏古道人文环境时空信息开放平台 元代北京至西藏的驿路文明' },
            { title: '古道路线', url: 'pages/route.html', content: '古道路线复原与重建 元代京藏古道 北京至西藏 路线可视化' },
            { title: '文化内涵', url: 'pages/culture.html', content: '京藏古道文化内涵 宗教艺术建筑 历史文化元素' },
            { title: '旅游攻略', url: 'pages/travel.html', content: '京藏古道旅游攻略 旅游路线 景点推荐 自然风光' },
            { title: '线性文化遗产', url: 'pages/heritage.html', content: '线性文化遗产 遗产识别与分类 价值评估 保护策略' },
            { title: '历史事件', url: 'pages/events.html', content: '历史事件脉络 交互式时间轴 重要历史事件' },
            { title: '元代地图', url: 'pages/yuan-dynasty-map.html', content: '元代地图 历史地图 地理信息' },
            { title: '文物分布地图', url: 'pages/artifacts_map.html', content: '文物分布 文化遗产 考古遗址' },
            { title: '考古遗址数据集', url: 'pages/dataset-archaeology.html', content: '考古遗址 数据 研究成果' },
            { title: '历史文献数据集', url: 'pages/dataset-history.html', content: '历史文献 古籍 资料' },
            { title: '图像数据集', url: 'pages/dataset-images.html', content: '图像 照片 视觉资料' },
            { title: '地理数据集', url: 'pages/dataset-geography.html', content: '地理数据 地图 空间信息' },
            { title: 'PDF查看器', url: 'pages/pdf-viewer.html', content: 'PDF 文档 资料' }
        ],
        sites: [
            { name: '大都（今北京）', type: '节点', content: '元代首都，京藏古道起点' },
            { name: '居庸关', type: '节点', content: '位于北京西北，是京藏古道出京的第一重要关口' },
            { name: '大同', type: '节点', content: '元代称为大同路，是京藏古道的重要枢纽' },
            { name: '兰州', type: '节点', content: '元代称为兰州路，是京藏古道进入西北地区的重要节点' },
            { name: '西宁', type: '节点', content: '元代称为西宁州，是京藏古道进入青藏高原的门户' },
            { name: '拉萨', type: '节点', content: '元代称为萨斯迦，是京藏古道的终点' }
        ]
    };

    // 执行搜索
    function performSearch(query) {
        if (!query || query.trim() === '') return [];
        
        const results = [];
        const lowerQuery = query.toLowerCase();

        // 搜索页面
        searchData.pages.forEach(page => {
            if (page.title.toLowerCase().includes(lowerQuery) || 
                page.content.toLowerCase().includes(lowerQuery)) {
                results.push({
                    type: '页面',
                    title: page.title,
                    url: page.url,
                    content: page.content
                });
            }
        });

        // 搜索站点
        searchData.sites.forEach(site => {
            if (site.name.toLowerCase().includes(lowerQuery) || 
                site.content.toLowerCase().includes(lowerQuery)) {
                results.push({
                    type: '站点',
                    title: site.name,
                    url: 'route.html',
                    content: site.content
                });
            }
        });

        return results;
    }

    // 显示搜索结果
    function displayResults(results) {
        // 清除旧结果
        const oldResults = document.getElementById('search-results');
        if (oldResults) {
            oldResults.remove();
        }

        // 创建结果容器
        const resultsContainer = document.createElement('div');
        resultsContainer.id = 'search-results';
        resultsContainer.className = 'search-results';

        // 添加到页面
        const headerContainer = document.querySelector('header .container');
        if (headerContainer) {
            headerContainer.appendChild(resultsContainer);
        } else {
            document.body.appendChild(resultsContainer);
        }

        if (results.length === 0) {
            resultsContainer.innerHTML = '<p>没有找到相关内容</p>';
            return;
        }

        // 显示结果
        resultsContainer.innerHTML = `
            <h3>搜索结果 (${results.length})</h3>
            <ul>
                ${results.map(result => `
                    <li>
                        <a href="${result.url}">
                            <span class="result-type">${result.type}</span>
                            <span class="result-title">${result.title}</span>
                            <span class="result-content">${result.content.substring(0, 100)}...</span>
                        </a>
                    </li>
                `).join('')}
            </ul>
        `;
    }

    // 搜索按钮点击事件
    searchButton.addEventListener('click', function() {
        const query = searchInput.value;
        const results = performSearch(query);
        displayResults(results);
    });

    // 输入框回车事件
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const query = searchInput.value;
            const results = performSearch(query);
            displayResults(results);
        }
    });

    // 点击页面其他地方关闭搜索结果
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.search-container') && !e.target.closest('#search-results')) {
            const resultsContainer = document.getElementById('search-results');
            if (resultsContainer) {
                resultsContainer.remove();
            }
        }
    });
}

// 加载导航栏模板
function loadNavbar() {
    // 根据当前页面位置确定模板路径
    const currentPath = window.location.pathname;
    const isPagesDirectory = currentPath.includes('/pages/');
    const templatePath = isPagesDirectory ? '../templates/navbar.html' : './templates/navbar.html';
    
    fetch(templatePath)
        .then(response => response.text())
        .then(html => {
            const navbarContainer = document.getElementById('navbar-container');
            if (navbarContainer) {
                navbarContainer.innerHTML = html;
                
                // 调整导航链接路径
                const navLinks = navbarContainer.querySelectorAll('nav ul li a');
                
                navLinks.forEach(link => {
                    const linkId = link.getAttribute('id');
                    const originalHref = link.getAttribute('href');
                    
                    // 对于pages目录下的页面，调整相对路径
                    if (isPagesDirectory) {
                        if (originalHref.startsWith('index.html') || originalHref.startsWith('#')) {
                            // 首页和锚点链接需要调整
                            link.setAttribute('href', '../' + originalHref);
                        } else if (originalHref.startsWith('pages/')) {
                            // 已经是pages目录的链接，去掉pages/前缀
                            link.setAttribute('href', originalHref.replace('pages/', ''));
                        }
                    }
                    
                    // 激活当前页面的导航链接
                    if (currentPath.includes(link.getAttribute('href')) || 
                        (link.getAttribute('href').includes('index.html') && currentPath.includes('index.html')) ||
                        (linkId === 'nav-home' && currentPath.includes('index.html'))) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
                
                // 初始化搜索功能
                initSearch();
            }
        })
        .catch(error => {
            console.error('Error loading navbar template:', error);
        });
}

// 页面加载完成后加载导航栏
window.addEventListener('DOMContentLoaded', loadNavbar);