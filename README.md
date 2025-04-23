# ModelHub Frontend

ModelHub 是一个现代化的模型仓库平台前端项目，基于 React 和 TypeScript 构建，提供了友好的用户界面来管理和展示机器学习模型。

## 功能特点

- 🎯 模型展示：支持多种类型模型的展示和管理
- 📁 文件浏览：直观的文件树结构展示
- 🔍 搜索功能：支持模型搜索和过滤
- 🏷️ 标签管理：支持模型标签的添加和筛选
- 📊 数据统计：展示下载量、点赞数等统计信息
- 💻 响应式设计：完美适配桌面和移动设备
- 🌐 国际化支持：支持多语言切换

## 技术栈

- React 18
- TypeScript
- TailwindCSS
- React Router
- React Markdown

## 快速开始

### 环境要求

- Node.js 16+
- npm 7+ 或 yarn 1.22+

### 安装

```bash
# 克隆项目
git clone https://github.com/your-username/modelhub-frontend.git

# 进入项目目录
cd modelhub-frontend

# 安装依赖
npm install
# 或
yarn install
```

### 开发

```bash
# 启动开发服务器
npm run dev
# 或
yarn dev
```

访问 http://localhost:5173 查看应用。

### 构建

```bash
# 构建生产版本
npm run build
# 或
yarn build
```

## 项目结构

```
src/
├── components/     # 可复用组件
├── pages/         # 页面组件
├── hooks/         # 自定义 Hooks
├── types/         # TypeScript 类型定义
├── utils/         # 工具函数
├── config/        # 配置文件
└── App.tsx        # 应用入口
```

## 主要功能

### 模型列表页
- 支持模型卡片展示
- 标签筛选功能
- 分页加载
- 搜索功能

### 模型详情页
- 模型基本信息展示
- README 预览
- 文件浏览器
- 下载统计
- 讨论区

## 贡献指南

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的改动 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 联系我们

- 项目负责人：[Your Name]
- 邮箱：[your.email@example.com]
- 项目主页：[https://github.com/your-username/modelhub-frontend]

## 致谢

感谢所有为这个项目做出贡献的开发者！
