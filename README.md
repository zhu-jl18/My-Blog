# 个人博客记录

基于 Hexo + NexT 主题搭建的个人博客，记录了一些自定义修改和配置。

## 项目说明

本博客使用了 Hexo 7.3.0 作为静态站点生成器，NexT 8.23.2 作为主题。在官方配置基础上进行了一些个性化调整。


## 主题切换与显示（2025-09-05 更新）

- 默认配色：浅色（白天）。
- 切换方式：屏幕贴边的“浮动主题按钮”（默认位于左下角），点击可在浅色/深色间切换，并记忆到浏览器的 localStorage。
- 悬挂位置可选：
  - left-bottom（默认，左下）
  - left-middle（左中）
  - top-left（贴上边稍靠左）
- 修改位置：编辑文件 source/_data/body-end.njk，找到常量 `FLOAT_POS`，改为上面任一值；随后执行 `hexo clean && hexo generate`。
- 深色适配：当用户点击切换时，HTML 根元素会设置 `data-theme="dark"`。自定义样式在 `source/_data/styles.styl` 中通过 `html[data-theme="dark"]` 覆盖 CSS 变量（如 `--content-bg-color`），并同步应用到 `.main-inner` / `.sidebar-inner` / `header.header`，确保正文包裹区与侧栏背景正确变暗。

开发小贴士：
- 若页面使用 PJAX，切页后按钮会自动重新挂载。
- 如遇样式冲突导致按钮不可见，控制台会打印 `[theme] floating toggle attached` 日志；也可在控制台直接搜索 `.theme-floating-toggle` 元素进行排查。

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

## 🤖 AI 聊天系统（2025-09-07 稳定版）

项目内置完整的前端 AI 聊天系统，采用 OpenAI 兼容接口，支持流式输出、管理员控制、防滥用机制。

### 核心功能
- **智能入口**: Live2D 看板娘 + 可拖拽气泡入口，自然融入页面
- **角色设定**: 高粱米 AI 姐姐（温柔、可靠、可爱风格）
- **流式对话**: 支持 SSE 流式输出，实时显示 AI 回复
- **管理员面板**: 完整的后台控制系统（仅 localhost 可访问）
- **防滥用**: 速率限制、权限控制、请求频次跟踪

### 管理员控制面板
访问方式：`Ctrl+Shift+A`（仅本地环境）

功能包括：
- 🎛️ **基础控制**: 开关 AI 聊天功能
- ⏱️ **速率限制**: 每小时/每日请求数限制
- 🤖 **模型参数**: Temperature、Max Tokens 调节
- 📝 **系统提示词**: 自定义 AI 角色和行为
- 📤📥 **配置管理**: 导入/导出配置文件

### 用户体验优化
- **气泡定位**: 智能跟随 Live2D 看板娘位置，支持拖拽自定义
- **消息样式**: AI 纯白背景，用户淡紫背景，清晰区分
- **思考提示**: "💭 努力思索中..." 增强交互反馈
- **无密码弹窗**: 优化输入框属性，避免浏览器误判

### 技术架构
- **前端纯净**: 无后端依赖，所有配置存储在 localStorage
- **安全设计**: 本地配置文件 (`chat-local.js`) 已加入 `.gitignore`
- **模块化**: 主聊天逻辑 + 独立管理员模块
- **兼容性**: 支持各种 OpenAI 兼容 API（GLM、GPT、Qwen 等）

### 关键文件
- `source/js/chat.js` - 主聊天系统
- `source/js/chat-admin.js` - 管理员面板
- `source/js/chat-local.js` - 本地配置（gitignored）
- `source/_data/styles.styl` - UI 样式定义

### 使用指南
1. **本地开发**: `hexo clean && hexo g && hexo s`
2. **配置 API**: 点击齿轮图标，填写 API Base、Key、模型
3. **管理功能**: `Ctrl+Shift+A` 打开管理面板
4. **位置调整**: 直接拖拽 💬 气泡到理想位置

### 安全特性
- **权限隔离**: 管理面板仅 localhost 可访问
- **速率保护**: 可配置的请求频次限制
- **密钥安全**: 本地存储，不会提交到仓库
- **输出净化**: 自动过滤模型的元叙述和思考过程

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

## 🏷️ Front-matter 增强脚本 (2025-09-05)

新增自动化脚本，用于批量增强博客文章的 front-matter 元数据。

### 功能特性
- **智能标签生成**: 基于标题和内容自动生成相关标签
- **更新时间补全**: 为缺失 `updated` 字段的文章添加时间戳
- **多分类系统保持**: 完全保留现有的多分类结构
- **安全预览**: 提供 dry-run 模式预览所有改动
- **批量处理**: 一次性处理所有文章

### 使用方法
```bash
# 预览将要进行的更改（推荐先执行）
node tools/enhance-frontmatter.js --dry-run

# 应用更改到所有文章
node tools/enhance-frontmatter.js --apply
```

### 标签生成规则
- **技术相关**: `hexo`, `git`, `javascript`, `css`, `workflow`, `automation`
- **AI相关**: `AI-LLM`, `gemini`, `ai`
- **学科相关**: `数学`, `math`, `语言学习`, `english`, `grammar`
- **分类映射**: 根据现有分类自动添加对应标签
- **内容分析**: 智能识别文章中的技术术语和关键词

### 处理统计
- **文章总数**: 30篇
- **添加标签**: 27篇文章
- **补全时间**: 30篇文章
- **错误率**: 0%

### 优势
- **极速加载**: 利用 Cloudflare 全球 CDN，平均加载时间从 ~350ms 降至 ~120ms
- **完全控制**: 图片存储和分发完全自主管理
- **成本效益**: 免费额度充足，远低于 10GB/月
- **自动化工作流**: 建立了 PicGo + R2 自动化上传和管理流程

### 清理工作
- 删除了旧 CDN 本地仓库及所有遗留文件 (包括音频/音乐)
- 删除了迁移过程中生成的临时备份和报告文件
- 将所有迁移工具和指南文件整理到 `GUIDE/` 目录下，并添加到 `.gitignore`

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