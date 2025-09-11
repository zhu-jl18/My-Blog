# 个人博客源码（Hexo + NexT）

本仓库是一个使用 Hexo 7 与 NexT 主题搭建的个人博客源码，包含主题定制、分类页卡片化展示、少量构建脚本与工具。根目录下的 `cloudflare-worker/` 是独立的 Cloudflare Workers 代理示例，与博客构建无强依赖。

当前主栈
- Hexo: 7.3.0
- NexT: 8.23.2（Pisces 方案 + 深色模式）

注意：旧版 README 中存在大量过时与错误信息（如“AI 聊天系统前端”“GitHub Actions CI/CD”等）。本版已清理与更正。

## 快速开始

前置要求
- Node.js 18+（建议）
- npm

安装与本地预览
```bash
npm install

# 新建文章
npx hexo new "我的新文章"

# 清理、生成与本地预览
npx hexo clean && npx hexo generate
npx hexo server   # 访问 http://localhost:4000
```

部署到 GitHub Pages（两种方式）
```bash
## 方式 A：本地构建并推送（hexo-deployer-git）
npx hexo deploy
```
部署目标在 `/_config.yml: deploy.repo` 指向的仓库：`zhu-jl18/zhu-jl18.github.io` 的 `main` 分支。

- 方式 B：推送触发 GitHub Actions 在线构建与发布
  - 如需使用，请确保仓库中存在有效的工作流（如 `.github/workflows/*.yml`）以在 push 后自动生成并推送 `public/` 到 Pages 仓库。
  - 两种方式可并存；按需选择。

## 目录结构（要点）

- `/_config.yml`：Hexo 站点配置（站点信息、链接结构、部署、Feed/Sitemap 等）
- `/_config.next.yml`：NexT 主题配置；通过 custom_file_path 引入自定义片段与样式
- `/source/`：内容目录
  - `/_posts/`：文章 Markdown
  - `/_data/`：主题自定义片段与样式
    - `head.njk`、`sidebar.njk`、`post-body-start.njk`、`post-body-end.njk`、`body-end.njk`
    - `variables.styl`、`styles.styl`（自定义样式与变量）
  - 其他：`about/`、`tags/`、`categories/`、`archives/` 等页面
- `/layout/`：自定义页面模板
  - `categories-cards.njk` 与 `_partials/page/categories.njk`：分类页卡片化展示
- `/scaffolds/`：Hexo 新建内容时的模板（post/page/draft）
- `/scripts/`：Hexo 构建期扩展脚本
  - `inject-category-counts.js`：在生成阶段为分类卡片注入文章数量（PJAX 安全）
- `/tools/`：本地辅助工具
  - `enhance-frontmatter.js`：自动补全 Front‑matter（tags/updated）；用法见“自定义工具”
  - `scan-relative-images.js`：扫描相对图片引用，避免部署后 404
- `/hexo-offline.config.cjs`：PWA 缓存策略（workbox 生成 sw.js）
- `/cloudflare-worker/`：Cloudflare Workers 代理示例（可选，独立于博客）

## 关键配置说明

- 站点信息与多语言：见 `/_config.yml`（`title/subtitle/description/language`）
- 永久链接：使用 `hexo-abbrlink`，`permalink: posts/:abbrlink/`
- 归档目录：`archive_dir: /`（首页即归档聚合，`per_page` 调大）
- Feed/Sitemap：已启用 `hexo-generator-feed` 与 `hexo-generator-sitemap`
- 部署：`hexo-deployer-git` 推送到 `zhu-jl18/zhu-jl18.github.io:main`
- 主题定制：`/_config.next.yml` 中启用以下自定义片段
  ```
  custom_file_path:
    head: source/_data/head.njk
    sidebar: source/_data/sidebar.njk
    postBodyStart: source/_data/post-body-start.njk
    postBodyEnd: source/_data/post-body-end.njk
    bodyEnd: source/_data/body-end.njk
    variable: source/_data/variables.styl
    style: source/_data/styles.styl
  ```
- 分类页：元数据在 `source/_data/categories.yml`，模板在 `layout/categories-cards.njk`

## 自定义脚本与工具

- 构建期注入分类数量：`/scripts/inject-category-counts.js`
  - 自动统计各分类第一层的文章数，并注入到分类卡片，避免前端再计算

- Front‑matter 增强：`/tools/enhance-frontmatter.js`
  ```bash
  # 预览将要修改的字段（不写入）
  node tools/enhance-frontmatter.js --dry-run
  # 实际写入 tags/updated（有需要时再运行）
  node tools/enhance-frontmatter.js --apply
  ```

- 扫描相对图片：`/tools/scan-relative-images.js`
  ```bash
  node tools/scan-relative-images.js
  ```

## PWA 与 Service Worker

- 推荐方式：使用 `hexo-offline` 按 `hexo-offline.config.cjs` 生成 `public/sw.js`
- 仓库中还包含一个示例 `source/service-worker.js`（简单缓存示例）。如启用 `hexo-offline`，请勿同时让该示例 SW 生效，以免冲突。保持一种方案即可。

## Cloudflare Worker（可选）

`/cloudflare-worker/` 目录提供“AI Chat Proxy” 的独立示例，便于将第三方大模型 API 代理到前端使用。
- 它不参与 Hexo 构建流程，也不是本博客运行的前置条件
- 如需使用，请按 `cloudflare-worker/README.md` 与 `DEPLOY_GUIDE.md` 部署与配置

## 纠错与清理（相对旧版 README）

- 移除：不存在于本仓库的前端文件 `source/js/chat.js`、`chat-admin.js`、`chat-local.js`
- 更正：当前仓库不包含 `.github/workflows`；部署默认通过 `hexo-deployer-git` 本地执行
- 更正：评论系统 Giscus 在 `/_config.yml:giscus.enable` 默认为 false，如需启用请正确填入 repo_id 等参数

## 常见问题

- 生成后页面没更新：尝试 `npx hexo clean && npx hexo g -d`；浏览器强刷或清空站点数据
- 分类数量不对：确保 `scripts/inject-category-counts.js` 存在且分类名称与 `source/_data/categories.yml` 的键一致
- 文字乱码（编辑器显示 `???`）：请使用 UTF‑8 编码保存与查看文件

## 许可协议

MIT License，详见 `LICENSE`。
