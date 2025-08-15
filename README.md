# 🦕 Dirac Sea - 狄拉克之海

> **现代化Hexo博客平台** | love math and dinosaurs  
> 从单调博客到功能完备的学习记录平台，集成23项功能的完整实现

## 📊 项目概览

| 项目信息 | 详情 |
|---------|------|
| **博客引擎** | Hexo 7.3.0 + NexT 8.23.2 |
| **部署平台** | GitHub Pages + GitHub Actions |
| **功能完成度** | 23/23 (100%) |
| **PWA支持** | ✅ Lighthouse 96分 |
| **安全状态** | ✅ 0个已知漏洞 |
| **自动化程度** | ✅ 完全自动化部署 |
| **最新更新** | 2025-08-14 |

## 🏗️ 项目结构

```
📁 Dirac Sea Blog/
├── 📄 _config.yml              # Hexo主配置
├── 📄 _config.next.yml         # NexT主题配置
├── 📄 package.json             # 依赖包配置
├── 📄 hexo-offline.config.cjs  # PWA离线配置
├── 📄 README.md                # 项目说明文档
├── 📁 .github/                 # GitHub Actions配置
│   └── 📁 workflows/
│       └── 📄 deploy.yml       # 自动部署工作流
├── 📁 source/                  # 源文件目录
│   ├── 📁 _posts/             # 博客文章 (19篇)
│   ├── 📁 _data/              # 自定义数据
│   │   ├── 📄 head.njk        # 头部自定义
│   │   ├── 📄 body-end.njk    # 页尾自定义  
│   │   ├── 📄 sidebar.njk     # 侧边栏自定义
│   │   ├── 📄 styles.styl     # 样式自定义
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

### 🔥 高优先级功能 (4/4)
- ✅ **Giscus评论系统** - GitHub Discussions集成
- ✅ **本地搜索功能** - 毫秒级全文检索  
- ✅ **访客统计功能** - 不蒜子实时统计
- ✅ **暗黑模式功能** - 完整主题切换

### 🚀 中优先级功能 (3/3)  
- ✅ **图片缩放功能** - MediumZoom点击缩放
- ✅ **懒加载优化** - 图片按需加载
- ✅ **快速链接预取** - Quicklink智能预取

### 📦 扩展功能 (12/12)
- ✅ **404小恐龙游戏** - 趣味互动体验
- ✅ **控制台彩蛋系统** - 开发者友好彩蛋
- ✅ **个人成长里程碑** - 完整成长记录系统
- ✅ **Categories页面优化** - 动态分类卡片
- ✅ **Tags功能清理** - 系统性功能禁用
- ✅ **RSS订阅** - XML订阅源生成
- ✅ **网站地图** - SEO优化sitemap.xml
- ✅ **Google Analytics 4** - GA4完整集成
- ✅ **PWA支持** - 离线访问，Lighthouse 96分
- ✅ **性能优化** - 字体、压缩、缓存优化
- ✅ **🎵 多音乐源播放器** - 智能音量控制，多CDN支持
- ✅ **🚀 Vercel CDN自动部署** - 音乐文件自动同步

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

### 💻 本地开发

```bash
# 克隆仓库
git clone https://github.com/zhu-jl18/My-Blog.git
cd My-Blog

# 安装依赖
npm install

# 本地预览
npm run server
# 访问 http://localhost:4000

# 创建新文章
hexo new "Your-Article-Title"

# 生成静态文件
npm run build

# 部署到GitHub Pages
npm run deploy
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

# 6. (可选) 回到develop分支并恢复之前的工作
git checkout develop
git stash pop
```

## 🛠️ 技术栈

| 技术栈 | 版本 | 用途 |
|-------|------|------|
| **Hexo** | 7.3.0 | 静态站点生成器 |
| **NexT** | 8.23.2 | 博客主题 |
| **Node.js** | 18+ | 运行环境 |
| **GitHub Pages** | - | 部署平台 |
| **GitHub Actions** | - | CI/CD自动化 |
| **PWA** | Workbox | 离线支持 |
| **abbrlink** | 2.2.1 | 短链接生成 |
| **MathJax** | - | 数学公式渲染 |

## 📈 性能指标

| 指标 | 数值 | 说明 |
|------|------|------|
| **PWA得分** | 96/100 | Lighthouse评分 |
| **安全漏洞** | 0个 | npm audit检测 |
| **依赖优化** | 精简化 | 移除冗余包 |
| **构建时间** | ~1分40秒 | GitHub Actions自动构建 |
| **文件数量** | 96个 | Service Worker缓存 |
| **缓存大小** | 4.3MB | 完整离线支持 |
| **首屏加载** | <2秒 | 性能优化后 |
| **搜索速度** | <100ms | 本地搜索响应 |

## 🎨 主要特色

### 🌙 完整暗黑模式
- 全站UI元素适配
- 代码高亮主题切换
- 跟随系统设置
- 用户偏好记忆

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

## 🎵 多音乐源播放器系统

### 🎯 功能特性

- **🎚️ 智能音量控制**
  - 默认音量 25%，保护听力
  - 音量滑块实时调节
  - 一键静音/恢复
  - 音量设置本地存储

- **🌐 多CDN音乐源支持**
  - **Vercel CDN** - 主音乐源，稳定快速
  - **GitHub CDN** - 多CDN自动切换（jsDelivr、Statically、Raw）
  - **网易云音乐** - 第三方API支持
  - **紧急播放列表** - 最后的备用方案

- **🤖 智能降级机制**
  - 自动检测音乐源健康状态
  - 失败源自动标记和重试
  - 无缝切换到备用源
  - 保证音乐播放不中断

- **⌨️ 键盘快捷键**
  - `空格` - 播放/暂停
  - `←/→` - 上一首/下一首
  - `↑/↓` - 音量增减10%
  - `M` - 静音切换

### 🚀 Vercel CDN自动部署

#### 自动同步工作流
```yaml
# .github/workflows/sync-music.yml
on:
  push:
    paths: 
      - 'music/**'  # 音乐文件变化时触发
jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - 同步音乐文件到Vercel
      - 自动部署CDN
      - 清理临时文件
```

#### 手动同步脚本
```bash
# 使用shell脚本同步
./shell_scripts/vercel-music-sync.sh
```

#### CDN优势
- ✅ **CORS支持** - 完美解决跨域问题
- ✅ **全球加速** - Vercel全球CDN网络
- ✅ **自动部署** - GitHub Actions自动同步
- ✅ **高可用性** - 多重备份机制

### 📁 文件结构
```
source/
├── js/
│   ├── music-config.js              # 基础配置
│   ├── simple-music-player.js       # 基础播放器
│   ├── enhanced-music-config.js     # 增强版配置
│   └── enhanced-music-player.js     # 增强版播放器
└── _data/
    └── body-end.njk                 # HTML结构
```

### 🔧 配置示例

#### Vercel CDN配置
```javascript
// enhanced-music-config.js
vercel: {
  baseUrl: 'https://your-project.vercel.app',
  musicPath: 'music',
  playlist: [
    {
      id: 1,
      title: '歌曲名',
      artist: '艺术家',
      url: 'https://cdn4blog.vercel.app/music/song.mp3',
      duration: 240000
    }
  ]
}
```

#### GitHub CDN配置
```javascript
github: {
  owner: 'your-username',
  repo: 'your-repo',
  musicPath: 'music',
  branch: 'main',
  cdnProviders: [
    { name: 'jsdelivr', url: 'https://cdn.jsdelivr.net/gh/...' },
    { name: 'statically', url: 'https://cdn.statically.io/gh/...' },
    { name: 'raw', url: 'https://raw.githubusercontent.com/...' }
  ]
}
```

### 🎮 使用方法

#### 切换到增强版播放器
```html
<!-- 在 body-end.njk 中替换引用 -->
<script src="/js/enhanced-music-config.js"></script>
<script src="/js/enhanced-music-player.js"></script>
```

#### 添加新音乐
1. 将音乐文件放入 `music/` 目录
2. 更新配置文件中的播放列表
3. 提交代码，自动部署到CDN

### 🔍 故障排除

#### 网易云音乐无法播放
- 第三方API经常失效，属于正常现象
- 播放器会自动降级到其他音乐源
- 可手动更新API服务器列表

#### GitHub CDN访问慢
- 系统自动选择最快的CDN
- 如果jsDelivr被墙，自动切换到其他CDN

#### 音量设置不保存
- 确保浏览器允许localStorage
- 检查隐私插件是否阻止存储

## 🔗 相关链接

- 🌐 **网站地址**: [https://zhu-jl18.github.io](https://zhu-jl18.github.io)
- 📊 **功能文档**: [BLOG_FEATURES_IMPLEMENTATION.md](./BLOG_FEATURES_IMPLEMENTATION.md)
- 🚀 **GitHub Actions**: [自动化部署指南](./source/_posts/GitHub-Actions-CICD-Auto-Deploy-Guide.md)
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

MIT License - 详见 [LICENSE](./LICENSE) 文件

## 👤 作者

**makoMako** - love math and dinosaurs
- GitHub: [@zhu-jl18](https://github.com/zhu-jl18)
- Blog: [Dirac Sea](https://zhu-jl18.github.io)

---

<div align="center">

**🎉 从单调博客到现代化平台，21项功能100%完成！**

[🌟 Star](https://github.com/zhu-jl18/My-Blog) | [🍴 Fork](https://github.com/zhu-jl18/My-Blog/fork) | [📝 Issues](https://github.com/zhu-jl18/My-Blog/issues)

</div>
