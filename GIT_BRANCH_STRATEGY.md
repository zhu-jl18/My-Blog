# Git 分支管理策略

## 📋 分支结构

```
main          # 生产分支，受保护，只允许通过PR合并
├── develop   # 开发分支，日常开发都在这里
└── feature/* # 功能分支，用于实验性功能开发
```

## 🔄 工作流程

### 1. 日常开发（develop 分支）
```bash
# 切换到开发分支
git checkout develop

# 日常提交
git add .
git commit -m "feat: 添加新功能"

# 推送到远程
git push origin develop
```

### 2. 新功能开发（feature 分支）
```bash
# 从 develop 创建功能分支
git checkout -b feature/new-feature develop

# 开发完成后合并回 develop
git checkout develop
git merge --squash feature/new-feature
git commit -m "feat: 完成新功能开发"

# 删除临时分支
git branch -d feature/new-feature
```

### 3. 发布到生产（main 分支）
```bash
# 从 develop 创建 PR 合并到 main
# 或者在本地合并后推送
git checkout main
git merge --no-ff develop
git push origin main  # 触发自动部署
```

## 🛡️ 保护规则

### main 分支保护
- 禁止直接推送
- 必须通过 PR 合并
- PR 需要至少一个审查
- CI 检查必须通过

### develop 分支
- 允许直接推送
- 用于日常开发
- 不触发部署

## 📝 提交规范

使用 Conventional Commits：
- `feat:` 新功能
- `fix:` 修复 bug
- `docs:` 文档更新
- `style:` 代码格式
- `refactor:` 重构
- `test:` 测试相关
- `chore:` 构建或辅助工具变动

## ⚡ 快捷操作

### 整理提交历史
```bash
# 压缩多个提交为一个
git rebase -i HEAD~3

# 或者使用 squash merge
git merge --squash feature-branch
```

### 同步分支
```bash
# 同步 main 到 develop
git checkout develop
git merge main

# 解决冲突后推送
git push origin develop
```

## 🎯 最佳实践

1. **小步提交**：频繁提交，保持清晰的提交历史
2. **及时同步**：定期从 main 同步到 develop
3. **清理分支**：删除已合并的功能分支
4. **保护 main**：永远不要直接在 main 上开发
5. **使用 PR**：即使是自己也要通过 PR 合并到 main

## 📊 当前状态

- ✅ 分支结构已优化
- ✅ GitHub Actions 只在 main 分支触发部署
- ✅ develop 分支用于日常工作
- ✅ PJAX 问题已解决

---

*更新时间：2025-08-14*