# 个人博客记录

基于 Hexo + NexT 主题搭建的个人博客，记录了一些自定义修改和配置。

## 项目说明

本博客使用了 Hexo 7.3.0 作为静态站点生成器，NexT 8.23.2 作为主题。在官方配置基础上进行了一些个性化调整。

## 自定义修改记录

### Hexo 配置修改 (_config.yml)

1. **站点信息**
   - 标题：Dirac Sea
   - 副标题：🦖::😼::🧐
   - 描述：love math and dinosaurs
   - 支持中英双语：zh-CN, en

2. **链接配置**
   - 使用 abbrlink 插件生成短链接
   - permalink 格式：posts/:abbrlink/
   - archive_dir 设置为根路径 /

3. **功能插件**
   - 启用字数统计
   - 配置 RSS 订阅 (atom.xml)
   - 本地搜索支持
   - 站点地图生成

4. **部署配置**
   - 部署到 zhu-jl18.github.io 仓库
   - Giscus 评论系统（当前未启用）

### NexT 主题配置修改 (_config.next.yml)

1. **主题设置**
   - 使用 Pisces 主题风格
   - 启用暗黑模式
   - 侧边栏右侧显示，始终展开
   - 增加侧边栏宽度：expanded (320→350px), dual_column (240→280px)

2. **自定义文件配置**
   ```
   head: source/_data/head.njk
   sidebar: source/_data/sidebar.njk
   postBodyEnd: source/_data/post-body-end.njk
   bodyEnd: source/_data/body-end.njk
   variable: source/_data/variables.styl
   style: source/_data/styles.styl
   ```

3. **菜单配置**
   - Timeline: /
   - Categories: /categories/
   - Schedule: /schedule/ (Google Calendar 集成)
   - Milestones: /milestones/
   - About: /about/

4. **功能配置**
   - PJAX 无刷新切换：启用
   - Medium Zoom 图片缩放：启用
   - 懒加载：启用
   - Quicklink 预加载：启用
   - 数学公式：MathJax，启用单美元符号
   - 评论：Utterances
   - 访客统计：不蒜子
   - Google Analytics：G-MGG5BFG7WZ

### 自定义文件

#### source/_data/head.njk
- 字体预加载优化
- 关键 CSS 内联
- 减少 FOUC (无样式内容闪烁)

#### source/_data/sidebar.njk
- 添加侧边栏背景融合图片
- 链接到 nLab

#### source/_data/post-body-end.njk
- Giscus 评论系统配置（已禁用）
- 评论容器样式

#### source/_data/styles.styl
自定义样式包括：
- 主题色变量 ($mycolor: #ff4757, $mycolor1: #c4b5fd)
- 文章内容优化（字体大小、行距、最大宽度）
- 标题样式（波浪下划线装饰）
- 代码块样式优化
- 引用块样式（左侧边框）
- 侧边栏样式美化
- 响应式调整

#### source/_data/variables.styl
- 页面宽度调整
- 字体大小设置
- 行间距优化
- 内容最大宽度限制

### 自定义脚本

#### source/js/sidebar-modules.js
- 侧边栏模块收缩功能
- 状态保存到 localStorage
- 点击反馈效果

#### source/js/simple-music-player.js
- 音乐播放器功能（当前为空文件）

### 文章模板 (scaffolds/post.md)
自定义数学笔记模板：
- 预设分类
- 默认启用数学公式
- 包含文章分割符
- 添加头像图片

### CI/CD 配置 (.github/workflows/deploy.yml)
Github Actions 自动部署：
- 推送到 main 分支自动触发
- Node.js 20 环境
- npm 依赖缓存
- 自动部署到 zhu-jl18.github.io
- 构建统计和部署报告

## 开发和部署

### 环境要求
- Node.js 18+
- npm

### 常用命令
```bash
# 安装依赖
npm install

# 创建新文章
hexo new "文章标题"

# 清理并生成
hexo clean && hexo generate

# 本地预览
hexo server

# 部署（目前通过 GitHub Actions 自动进行）
hexo deploy
```

### 分支策略
- main：生产分支，自动部署
- develop：开发分支

## 部署流程

1. 在 GitHub 上编辑内容或提交代码到 main 分支
2. GitHub Actions 自动触发构建
3. 构建完成后自动部署到 GitHub Pages
4. 网站自动更新

## 🚀 Cloudflare R2 迁移 (2025-09-05)

高粱米姐姐已协助mako完成从 jsDelivr 到 Cloudflare R2 的图片迁移工作。这显著提升了博客图片加载速度和控制能力。

### 迁移成果
- **图片数量**: 13 个文件
- **总大小**: 1.61 MB
- **链接替换**: 14 处链接在 10 篇文章中更新
- **新域名**: `https://media.makomako.dpdns.org`

### 优势
- **极速加载**: 利用 Cloudflare 全球 CDN，平均加载时间从 ~350ms 降至 ~120ms
- **完全控制**: 图片存储和分发完全自主管理
- **成本效益**: 免费额度充足，远低于 10GB/月
- **自动化工作流**: 建立了 PicGo + R2 自动化上传和管理流程

### 清理工作
- 删除了旧 CDN 本地仓库及所有遗留文件 (包括音频/音乐)
- 删除了迁移过程中生成的临时备份和报告文件
- 将所有迁移工具和指南文件整理到 `GUIDE/` 目录下，并添加到 `.gitignore`

## 相关链接

- 博客地址：https://zhu-jl18.github.io
- GitHub 仓库：https://github.com/zhu-jl18/My-Blog

## 许可证

MIT License