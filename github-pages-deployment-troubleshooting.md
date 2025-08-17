# GitHub Pages 部署故障排除指南

## 🔍 常见问题及解决方案

### 1. 检查 GitHub Pages 设置

在仓库设置中确认：
1. 进入仓库的 **Settings** 页面
2. 左侧菜单选择 **Pages**
3. **Source** 应该设置为 **GitHub Actions**
4. 如果显示 "Your site is ready to be published at https://zhu-jl18.github.io/" 则设置正确

### 2. 修复了的问题

- ✅ 添加了子模块检出（themes 目录）
- ✅ 添加了工作流文件和主题文件的路径触发
- ✅ 将 Node.js 版本从 22 改为 20（更稳定）
- ✅ 添加了子模块支持

### 3. 检查分支保护

如果 main 分支有保护规则：
1. 进入 **Settings** → **Branches**
2. 检查 main 分支的保护规则
3. 确保 **Allow force pushes** 未被勾选
4. 确保 **Include administrators** 被勾选（如果需要）

### 4. 手动触发部署

如果需要立即部署：
1. 提交这个修复后的 workflow 文件
2. 或者进入 **Actions** 页面手动触发工作流

### 5. 查看错误日志

如果仍然失败：
1. 进入仓库的 **Actions** 标签页
2. 点击失败的 workflow run
3. 查看详细的错误信息

## 🚀 下一步操作

1. 提交这些更改
2. 观察 Actions 页面的执行情况
3. 如果仍有问题，检查错误日志并针对性修复