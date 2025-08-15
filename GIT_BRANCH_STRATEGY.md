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

## 🎯 实际案例：从混乱到有序的迁移过程

### 背景情况
- 原有分支：`claudecode`（功能混乱）、`roocode`（多余分支）
- 目标：迁移到标准的三层分支结构

### 执行步骤

#### 1. 重命名功能分支
```bash
# 将原有的 claudecode 分支重命名为 develop
git branch -m claudecode develop
git push origin -u develop  # 设置上游跟踪并推送
```

#### 2. 清理多余分支
```bash
# 删除本地多余分支（强制删除）
git branch -D roocode

# 删除远程多余分支
git push origin --delete roocode
git push origin --delete claudecode  # 删除重命名前的远程分支
```

#### 3. 创建第一个 PR
- 从 `develop` 创建 PR 到 `main`
- PR 标题："feat: 添加Git分支策略文档和优化工作流"
- 包含更改：分支策略文档、博客优化、PJAX 解决方案等

#### 4. 验证结果
```bash
# 查看最终分支状态
git branch -a
# 输出：
# * develop
#   main
#   remotes/origin/develop
#   remotes/origin/main
```

### 迁移总结
✅ 成功从混乱的分支结构迁移到清晰的三层策略
✅ 保留了所有功能提交
✅ 建立了标准化的工作流程
✅ 清理了所有冗余分支

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

## 🚨 常见场景与解决方案

### 场景1：开发新功能
```bash
# 开始新功能
git checkout develop
git pull origin develop
git checkout -b feature/awesome-feature

# 开发过程中...
git add .
git commit -m "feat: 实现核心功能"
git commit -m "fix: 修复边缘情况"

# 完成功能
git checkout develop
git merge --squash feature/awesome-feature
git commit -m "feat: 添加awesome功能，包含核心实现和边缘情况修复"
git branch -d feature/awesome-feature
```

### 场景2：紧急修复生产 bug
```bash
# 从 main 创建 hotfix 分支
git checkout main
git checkout -b hotfix/urgent-bug-fix

# 修复后同时合并到 main 和 develop
git checkout main
git merge --no-ff hotfix/urgent-bug-fix
git tag v1.0.1  # 可选：打上版本标签

git checkout develop
git merge --no-ff hotfix/urgent-bug-fix
git branch -d hotfix/urgent-bug-fix
```

### 场景3：同步远程分支
```bash
# 查看所有分支状态
git branch -av

# 删除已不存在的远程分支引用
git remote prune origin

# 同步 main 最新更改到 develop
git checkout develop
git fetch origin
git merge origin/main
```

### 场景4：提交历史整理
```bash
# 查看提交历史
git log --oneline -10

# 交互式 rebase 整理最近3个提交
git rebase -i HEAD~3

# 或者使用 reset 重新提交
git reset --soft HEAD~3  # 保留修改，撤销提交
git commit -m "feat: 完整的功能描述"
```

### 场景5：处理合并冲突
```bash
# 合并时出现冲突
git merge feature-branch

# 查看冲突文件
git status

# 手动解决冲突后标记已解决
git add resolved-file.js
git commit  # 完成合并

# 或者取消合并
git merge --abort
```

### 场景6：临时保存工作
```bash
# 临时保存当前修改
git stash push -m "WIP: 未完成的功能"

# 查看所有暂存
git stash list

# 恢复暂存
git stash pop  # 恢复并删除暂存
git stash apply stash@{0}  # 恢复但不删除

# 删除暂存
git stash drop stash@{0}
```

### 场景7：撤销操作
```bash
# 撤销最后一次提交（保留修改）
git reset --soft HEAD~1

# 撤销最后一次提交（丢弃修改）
git reset --hard HEAD~1

# 撤销已推送的提交（创建新提交）
git revert HEAD

# 修改最后一次提交信息
git commit --amend
```

### 场景8：分支管理
```bash
# 查看所有分支（包含远程）
git branch -a

# 删除本地分支
git branch -d feature-branch  # 安全删除（已合并）
git branch -D feature-branch  # 强制删除

# 删除远程分支
git push origin --delete feature-branch

# 重命名本地分支
git branch -m old-name new-name

# 重命名远程分支
git branch -m old-name new-name
git push origin --delete old-name
git push origin new-name
```

### 场景9：标签管理
```bash
# 创建轻量标签
git tag v1.0.0

# 创建带注释的标签
git tag -a v1.0.0 -m "版本 1.0.0 发布"

# 推送标签到远程
git push origin v1.0.0
git push origin --tags  # 推送所有标签

# 删除标签
git tag -d v1.0.0
git push origin --delete v1.0.0
```

### 场景10：查看差异
```bash
# 查看工作区差异
git diff

# 查看暂存区差异
git diff --staged

# 查看分支差异
git diff main..develop

# 查看文件历史
git log --follow filename.js
git show commit-hash:filename.js
```

## 📋 快速参考卡片

### 日常开发流程
```bash
git checkout develop && git pull
git checkout -b feature/new-feature
# ... 开发 ...
git add . && git commit -m "feat: ..."
git checkout develop
git merge --squash feature/new-feature
git commit -m "feat: 完整功能描述"
git push origin develop
```

### 发布流程
```bash
git checkout main
git pull
git merge --no-ff develop
git push origin main  # 触发部署
git checkout develop
git merge main
```

### 救急命令
```bash
git stash && git pull && git stash pop  # 保存工作，拉取，恢复工作
git reset --hard HEAD~1  # 撤销最后一次提交
git merge --abort  # 取消合并
git rebase -i HEAD~3  # 整理提交历史
```

---

*更新时间：2025-08-14*