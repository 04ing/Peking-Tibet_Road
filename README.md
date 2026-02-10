# 京藏古道人文环境时空信息开放平台

## 项目简介

京藏古道人文环境时空信息开放平台是一个综合性的历史地理信息系统，旨在通过时空信息技术，重现元代北京至西藏驿路的历史风貌与人文环境。

**核心价值**：通过整合历史文献、考古资料、地理信息等多源数据，构建元代京藏古道的数字化重现，为研究人员、教育工作者和历史爱好者提供丰富的历史地理数据和可视化工具。

## 功能特点

### 🗺️ 时空地图展示
- 基于高德地图API实现的交互式地图
- 元代京藏古道路线复原与重建
- 历史地理节点标记与信息展示

### 📚 丰富的数据集
- **历史文献**：整合相关历史记载和研究资料
- **考古资料**：包含古道沿线的考古发现
- **地理信息**：古道途经地区的地理环境数据
- **图像资料**：历史图片和现代对比照片

### 🎯 文化内涵
- 元代驿路制度研究
- 古道沿线的文化遗产
- 历史人物与事件
- 宗教与民俗文化

### ✈️ 旅游攻略
- 现代可游览的古道遗迹
- 沿线旅游景点推荐
- 交通路线规划
- 旅游季节与注意事项

### 🛠️ 技术特色
- 响应式设计，支持多设备访问
- 交互式地图与数据可视化
- 视频播放器集成
- 数据开放共享机制

## 目录结构

```
├── css/             # 样式文件
│   ├── heritage.css    # 文化遗产页面样式
│   ├── pdf-viewer.css  # PDF查看器样式
│   ├── style.css       # 主样式文件
│   └── travel.css      # 旅游攻略样式
├── img/             # 图片资源
├── js/              # JavaScript文件
│   └── main.js         # 主要脚本文件
├── json/            # 数据文件
│   ├── Inheritors.geojson       # 继承者数据
│   └── cultural-relics.json     # 文化遗产数据
├── index.html       # 首页
├── culture.html     # 文化内涵页面
├── travel.html      # 旅游攻略页面
├── route.html       # 路线页面
├── heritage.html    # 文化遗产页面
├── events.html      # 历史事件页面
├── dataset-*.html   # 各类数据集页面
├── yuan-dynasty-map.html # 元代地图页面
├── pdf-viewer.html  # PDF查看器
└── .gitignore       # Git忽略文件配置
```

## 技术栈

- **前端框架**：纯HTML5 + CSS3 + JavaScript
- **地图服务**：高德地图API
- **图标库**：Font Awesome 6.4.0
- **数据格式**：JSON, GeoJSON
- **响应式设计**：媒体查询 + 弹性布局

## 快速开始

### 本地部署

1. **克隆项目**
   ```bash
   git clone https://github.com/04ing/Peiking-Tibet_Road.git
   cd Peiking-Tibet_Road
   ```

2. **直接打开**
   - 在浏览器中直接打开 `index.html` 文件
   - 或使用本地服务器（推荐）

3. **使用本地服务器**
   ```bash
   # 使用Python 3
   python -m http.server 8000
   
   # 或使用Node.js
   npx http-server -p 8000
   ```
   然后访问 `http://localhost:8000`

### 在线访问

- **GitHub仓库**：https://github.com/04ing/Peiking-Tibet_Road
- **GitHub Pages**：[待开启]（可在仓库设置中启用）

## 核心功能模块

### 1. 首页 (index.html)
- 平台介绍与功能导航
- 古道探索入口
- 视频播放区域
- 平台特色展示

### 2. 地图展示
- 元代京藏古道复原地图
- 历史地理节点标记
- 交互式地图操作

### 3. 数据集模块
- 历史文献数据集
- 考古发现数据集
- 地理信息数据集
- 图像资料数据集

### 4. 文化内涵 (culture.html)
- 元代驿路制度研究
- 古道文化遗产
- 历史人物与事件

### 5. 旅游攻略 (travel.html)
- 现代旅游路线
- 景点推荐
- 交通与住宿信息

## 数据资源

### JSON数据文件
- `json/Inheritors.geojson` - 继承者相关地理数据
- `json/cultural-relics.json` - 文化遗产数据

### 地图API
项目使用高德地图API，已内置API密钥（请遵守高德地图API使用条款）。

## 浏览器兼容性

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## 项目价值

1. **学术研究**：为历史地理研究提供数字化工具和数据集
2. **教育教学**：作为历史文化教育的辅助资源
3. **文化传承**：促进元代京藏古道历史文化的保护与传承
4. **旅游开发**：为古道沿线的文化旅游提供参考

## 贡献指南

欢迎对项目提出改进建议和贡献：

1. Fork 本仓库
2. 创建 feature 分支
3. 提交更改
4. 推送到分支
5. 开启 Pull Request

## 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 联系方式

如有问题或建议，请通过以下方式联系：

- GitHub Issues：https://github.com/04ing/Peiking-Tibet_Road/issues
- 项目维护者：04ing

---

**探索历史，连接古今** - 让我们一起重现元代京藏古道的辉煌文明！
