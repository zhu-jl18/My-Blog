# 博客部署配置说明

## 🏗️ 架构说明

### 仓库结构
- **源码仓库**: `https://github.com/zhu-jl18/My-Blog.git`
  - 存放 Hexo 源码、主题、配置文件
  - 通过 GitHub Actions 自动构建和部署
  
- **部署仓库**: `https://github.com/zhu-jl18/zhu-jl18.github.io.git`
  - 存放生成的静态文件
  - 通过 GitHub Pages 提供博客服务

## 🚀 部署流程

1. 推送代码到 `My-Blog` 仓库的 `main` 分支
2. GitHub Actions 自动触发构建
3. Hexo 生成静态文件到 `public` 目录
4. Actions 自动将 `public` 目录内容推送到 `zhu-jl18.github.io` 仓库
5. GitHub Pages 自动部署博客到 `https://zhu-jl18.github.io`

## 🔧 重要配置

### 1. GitHub Actions 权限
确保 `My-Blog` 仓库的 GitHub Actions 有权限写入 `zhu-jl18.github.io` 仓库：

#### 方法一：使用 GITHUB_TOKEN（推荐）
- 确保 `zhu-jl18.github.io` 仓库允许 `My-Blog` 仓库的 Actions 写入
- 在仓库设置中启用 Actions 权限

#### 方法二：使用 Personal Access Token
1. 生成 GitHub Personal Access Token
2. 在 `My-Blog` 仓库的 Settings → Secrets and variables → Actions 中添加：
   - Name: `PERSONAL_TOKEN`
   - Value: 你的 Personal Access Token
3. 修改 `.github/workflows/deploy.yml`：
   ```yaml
   - name: 🚀 部署到 GitHub Pages 仓库
     uses: peaceiris/actions-gh-pages@v3
     with:
       personal_token: ${{ secrets.PERSONAL_TOKEN }}
       external_repository: zhu-jl18/zhu-jl18.github.io
       publish_dir: ./public
   ```

### 2. GitHub Pages 设置
在 `zhu-jl18.github.io` 仓库中：
1. Settings → Pages
2. Source 设置为 "Deploy from a branch"
3. Branch 选择 "main"
4. 文件夹选择 "/ (root)"

## 📝 工作流说明

当前工作流会在以下情况触发：
- 推送到 `main` 分支
- 以下文件变更：
  - `source/**` - 博客文章和页面
  - `_config.yml` - 主配置文件
  - `_config.next.yml` - 主题配置文件
  - `package.json` - 依赖文件
  - `.github/workflows/**` - 工作流文件
  - `themes/**` - 主题文件

## 🔍 故障排除

### 如果部署失败
1. 检查 Actions 日志中的错误信息
2. 确认仓库权限设置正确
3. 验证 Personal Access Token（如果使用）
4. 确保 `zhu-jl18.github.io` 仓库的 GitHub Pages 已启用

### 常见错误
- "Permission denied" - 检查仓库写入权限
- "Repository not found" - 确认仓库名称正确
- "Build failed" - 检查 Hexo 构建日志