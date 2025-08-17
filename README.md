# 🦕 Dirac Sea - 狄拉克之海

> **Hexo博客平台搭建记录** | love math and dinosaurs  
> 从单调博客到功能完备的学习记录平台，集成23项功能的完整实现

## 😦 TO DO:
- 修复github自动部署脚本~ 引入更强的 权限（强制覆写）
- 测试相关音乐播放器 以及 另一个仓库的自动同步脚本能否工作
- 好好调教gemin-cli和claude-code


** 作者声明，全是AI写的。。。没啥可参考性~~很多功能能不能用都存疑**


## 📊 项目概览

| 项目信息       | 详情                          |
| -------------- | ----------------------------- |
| **博客引擎**   | Hexo 7.3.0 + NexT 8.23.2      |
| **部署平台**   | GitHub Pages + GitHub Actions |
| **功能完成度** | 24/24 (100%)                  |
| **PWA支持**    | ✅ Lighthouse 96分             |
| **安全状态**   | ✅ 0个已知漏洞                 |
| **自动化程度** | ✅ 自动部署                   |
| **最新更新**   | 2025-08-14                    |

## 🏗️ 项目结构

```
📁 Dirac Sea Blog/
├── 📄 _config.yml              # Hexo主配置
├── 📄 _config.next.yml         # NexT主题配置
├── 📄 package.json             # 依赖包配置
├── 📄 hexo-offline.config.cjs  # PWA离线配置
├── 📄 CLAUDE.md               # AI对话上下文跟踪
├── 📄 README.md                # 项目说明文档
├── 📁 .github/                 # GitHub Actions配置
│   └── 📁 workflows/ 
│       └── 📄 deploy.yml       # 自动部署工作流
├── 📁 source/                  # 源文件目录
│   ├── 📁 _posts/             # 博客文章 (25篇)
│   ├── 📁 _data/              # 自定义数据
│   │   ├── 📄 head.njk        # 头部自定义
│   │   ├── 📄 body-end.njk    # 页尾自定义  
│   │   ├── 📄 sidebar.njk     # 侧边栏自定义
│   │   ├── 📄 styles.styl     # 样式自定义 1
│   │   ├── 📄 variables.styl  # 样式自定义 2
│   │   └── 📄 post-body-end.njk # 文章底部自定义
│   ├── 📁 images/             # 图片资源
│   ├── 📁 js/                 # JavaScript文件
│   ├── 📄 manifest.json       # PWA应用清单
│   ├── 📁 categories/         # 分类页面
│   ├── 📁 milestones/         # 里程碑页面
│   ├── 📁 schedule/           # 日程页面
│   ├── 📁 about/              # 关于页面
│   └── 📁 404/                # 404页面
├── 📁 public/                  # 生成的静态文件
├── 📁 scaffolds/              # 文章模板
│   ├── 📄 post.md             # 数学笔记模板
│   ├── 📄 draft.md            # 草稿模板
│   └── 📄 page.md             # 页面模板
└── 📁 scripts/                # 自定义脚本
```

## ✨ 核心功能特性

### 🔥 核心功能
- ✅ **评论系统** - Giscus 集成 GitHub Discussions
- ✅ **搜索功能** - 本地全文检索
- ✅ **访客统计** - 不蒜子计数器
- ✅ **主题切换** - 明暗模式支持

### 🚀 增强功能  
- ✅ **图片交互** - 点击缩放查看
- ✅ **性能优化** - 图片懒加载
- ✅ **预加载** - Quicklink 链接预取

### 📦 扩展功能
- ✅ **404页面** - 小恐龙游戏
- ✅ **控制台彩蛋** - 开发者互动
- ✅ **里程碑页面** - 成长记录
- ✅ **分类优化** - 动态卡片布局
- ✅ **RSS订阅** - XML 订阅源
- ✅ **SEO优化** - 站点地图生成
- ✅ **数据分析** - Google Analytics
- ✅ **PWA支持** - 离线访问能力
- ✅ **音乐播放器** - 多源音乐播放
- ✅ **PJAX支持** - 无刷新切换

### 📚 页面体系 (4/4)
- ✅ **Categories页面** - 智能分类导航
- ✅ **Schedule页面** - Google Calendar集成
- ✅ **Milestones页面** - 成长里程碑记录  
- ✅ **About页面** - 个人信息展示

## 🎯 快速开始

### 📱 移动端编辑 (GitHub Actions自动部署)

现在支持完全自动化的移动端写作流程：

```bash
# 1. 手机GitHub APP或网页端直接编辑markdown文件
# 2. git commit 提交更改
# 3. GitHub Actions自动执行完整构建流程：
#    ✅ Node.js环境设置
#    ✅ 依赖安装和缓存
#    ✅ hexo clean & generate 
#    ✅ 静态文件构建验证
#    ✅ 自动部署到GitHub Pages
# 4. 网站自动更新完成 ✨
```

**创建新文章**:
```bash
# 本地环境
hexo new "数学笔记标题"
# 自动使用优化的数学笔记模板

# 移动端
直接在GitHub APP中创建新md文件
```

### 💻 本地构建

```bash
# 克隆仓库
git clone https://github.com/zhu-jl18/My-Blog.git
cd My-Blog

# 安装依赖
npm install

# 创建新文章
hexo new "Your-Article-Title"

# 生成静态文件
hexo clean && hexo g 

# 本地预览
hexo s (- p port)
```

### ✍️ 内容创作流程 (博文发布)

此流程用于在不影响`develop`分支开发的情况下，快速、安全地发布新文章。

```bash
# 1. (如有需要) 将正在进行中的开发修改暂存起来
git stash -u

# 2. 从最新的develop分支创建内容分支
git checkout develop
git pull
git checkout -b chore/my-new-post

# 3. 撰写文章并提交
hexo new "My New Post Title"
# ... write your post ...
git add .
git commit -m "docs: add new post about X"

# 4. 推送分支到GitHub
git push origin chore/my-new-post

# 5. 在GitHub上创建从 `chore/my-new-post` 到 `main` 的Pull Request并合并
# 合并后，GitHub Actions将自动完成部署

# 6. 回到develop分支并恢复之前的工作
git checkout develop
git stash pop
```

## 🛠️ 技术栈

| 技术栈             | 版本    | 用途           |
| ------------------ | ------- | -------------- |
| **Hexo**           | 7.3.0   | 静态站点生成器 |
| **NexT**           | 8.23.2  | 博客主题       |
| **Node.js**        | 18+     | 运行环境       |
| **GitHub Pages**   | -       | 部署平台       |
| **GitHub Actions** | -       | CI/CD自动化    |
| **PWA**            | Workbox | 离线支持       |
| **abbrlink**       | 2.2.1   | 短链接生成     |
| **MathJax**        | -       | 数学公式渲染   |

## 📈 性能特点

- **PWA支持** - Service Worker 缓存策略
- **构建优化** - GitHub Actions 自动构建
- **搜索性能** - 本地索引，快速响应
- **资源优化** - 图片懒加载和压缩

## 🎨 主要特色

### 📱 PWA离线支持
- 完整离线访问
- 桌面应用安装
- 后台自动更新
- 智能缓存策略

### 🎮 趣味互动功能
- 404小恐龙游戏
- 控制台开发者彩蛋
- 数学符号点击特效
- Konami Code密码彩蛋

### 📊 内容管理系统
- 动态分类卡片
- 个人成长里程碑
- Google Calendar集成
- 智能搜索过滤

## 🎵 音乐播放器

集成了智能音乐播放系统，支持：
- **多音源智能切换**：Vercel CDN、GitHub CDN（多提供商）、网易云等
- **智能降级机制**：音源失败时自动切换到备用源
- **健康检查系统**：定期监测音源可用性
- **紧急播放列表**：所有音源失效时的备用方案
- **完整播放控制**：播放/暂停、音量调节、进度条、循环模式
- **响应式设计**：完美适配桌面和移动设备

## 🔗 相关链接

- 🌐 **网站地址**: [https://zhu-jl18.github.io](https://zhu-jl18.github.io)
- 📊 **功能文档**: [BLOG_FEATURES_IMPLEMENTATION.md](./BLOG_FEATURES_IMPLEMENTATION.md)
- 🚀 **GitHub Actions**: [自动化部署指南](./source/_posts/GitHub-Actions-CICD-Auto-Deploy-Guide.md)
- 🌿 **Git分支策略**: [GIT_BRANCH_STRATEGY.md](./GIT_BRANCH_STRATEGY.md)
- 📈 **博客优化指南**: [BLOG_OPTIMIZATION_GUIDE.md](./BLOG_OPTIMIZATION_GUIDE.md)
- 🤖 **AI对话上下文**: [CLAUDE.md](./CLAUDE.md)
- 📱 **移动端编辑**: 直接在GitHub APP中编辑即可自动部署

## 🤝 参与贡献

### 📝 文章投稿
1. Fork本仓库
2. 在`source/_posts/`创建新文章
3. 提交Pull Request
4. 自动部署发布

### 🐛 问题反馈
- [GitHub Issues](https://github.com/zhu-jl18/My-Blog/issues)
- 功能建议和Bug报告

### 💡 功能建议
欢迎在Issues中提出新功能建议！

## 📄 许可证

本项目基于 [MIT License](./LICENSE) 开源协议。

### 项目声明

- **基础框架**: [Hexo](https://github.com/hexojs/hexo) (MIT)
- **主题**: [NexT](https://github.com/next-theme/hexo-theme-next) (MIT)
- **本项目**: 基于上述项目的改进和扩展，同样使用 MIT 协议

### 使用说明

您可以自由使用、修改、分发本项目代码，但需保留版权声明。详见 [LICENSE](./LICENSE) 文件。

## 👤 作者

**mako** - love math and dinosaurs
- GitHub: [@zhu-jl18](https://github.com/zhu-jl18)
- Blog: [Dirac Sea](https://zhu-jl18.github.io)

### 🛠️ 开发工具
- fine-tuned **gemini cli** && **claude code** 
  - 帮助优化博客功能，实现PJAX解决方案
  - 协助编写技术文档和优化指南
  - 提供本地开发支持和代码辅助
  - 协助项目管理和任务执行
  - 都是他俩干的
  

<div align="center">

**🎉 持续优化中的个人博客平台**

[🌟 Star](https://github.com/zhu-jl18/My-Blog) | [🍴 Fork](https://github.com/zhu-jl18/My-Blog/fork) | [📝 Issues](https://github.com/zhu-jl18/My-Blog/issues)

</div>
