---
title: Git工作流优化之旅：从混乱到自如的博客发布体验
author: mako, fish
abbrlink: e71dcf05
categories:
  - AI & LLM
  - 技术记录与分享
tags:
  - AI-LLM
  - 技术分享
  - next
  - git
  - ai
  - blog
  - workflow
  - automation
updated: "2025-09-05 12:56:04"
---

> 本文记录了 mako 与其AI助手 fish的一次深度合作。我们共同发现问题、反复推演，并最终设计出一套全新的Git工作流，旨在为每一位同时是“开发者”和“创作者”的博主，带来极致的发布体验。
<!--more-->
---

## 一、问题的提出：一个“软件工程级”工作流的烦恼

故事的开始，源于mako的一个烦恼。他的个人博客，在fish的协助下，已经演变成一个功能复杂的、拥有自动化部署流程的现代化平台。但技术的演进，也带来了新的不便。

当时的工作流，是严格按照软件工程的最佳实践来设计的：

- `main`分支作为生产分支，受保护，任何提交必须通过Pull Request (PR)合并。
- `develop`分支作为开发分支，所有新功能（如主题修改、脚本添加）都在此分支上进行。
- **发布流程**：当`develop`分支稳定后，创建一个到`main`分支的PR，一旦合并，GitHub Actions就会自动构建和部署网站。

这个流程非常规范，非常适合开发新功能。但当mako只想做一件最简单、最频繁的事——**写一篇新博客**——的时候，一个尖锐的矛盾就出现了。

## 二、核心矛盾：功能开发 vs. 内容创作

mako很快就发现了问题的核心：

> **“如果我的develop分支上，有一个还未完成、甚至会导致编译失败的新功能，那我岂不是永远无法发布一篇新写的、完美无瑕的博文了？”**

是的，这正是症结所在。“内容创作”（一篇独立的`.md`文件）的命运，和“功能开发”（可能涉及整个网站结构的代码）的命运，被死死地捆绑在了`develop`这一个分支上。

## 三、柳暗花明：设计轻量化的“内容发布”流程

经过一番深度探讨，我们设计了一套全新的、轻量化的工作流，专门用于发布文章这类“安全”的内容。它旨在**绕开不稳定的`develop`分支，同时又能享受GitHub Actions带来的自动化便利**。

以下是这套流程的完整操作步骤，以及关键节点的`git status`状态记录。

### 步骤一：清理工作区 (如有需要)

当`develop`分支有正在进行中的、未提交的修改时，我们需要先用`git stash`把它“藏”起来，还工作区一个干净的状态。
```bash
# Functor Fish 建议：使用 stash -u 将所有未提交的修改（包括新文件）存入储藏室
$ git stash -u

# 查看状态，工作区已恢复干净
$ git status
On branch develop
Your branch is up to date with 'origin/develop'.

nothing to commit, working tree clean
```

### 步骤二：为博文创建独立分支

从干净的`develop`分支出发，为新博文创建一个专属的、临时的分支。

```bash
# 使用 chore 或 docs 前缀，以区别于 feature 分支
$ git checkout -b chore/new-post-workflow
Switched to a new branch 'chore/new-post-workflow'
```

### 步骤三：撰写并提交文章

在新分支上，可以安心地创建和撰写新文章。

```bash
# 创建文章
$ hexo new "Git工作流优化之旅"

# ...奋笔疾书后，添加并提交...
$ git add .
$ git commit -m "docs: add new post about git workflow optimization"
```

### 步骤四：创建PR直达`main`分支 (关键！)

这是整个流程最核心的一步。我们将这个只包含一篇文章的干净分支，直接推送到远程，并创建一个到`main`分支的PR。

```bash
$ git push origin chore/new-post-workflow
# ... 前往GitHub网站操作 ...
```

这个PR将非常干净，因为它只包含新分支上独有的commit，`develop`上的其他修改完全不会被牵扯进来。

### 步骤五：合并PR，自动部署

在GitHub上点击“Merge Pull Request”按钮，GitHub Actions就会被触发，网站自动部署。大功告成！

### 步骤六：回归开发

发布完博客，可以轻松地回到之前的工作中。

```bash
$ git checkout develop
$ git stash pop
```

## 四、深度研讨：两种部署模式的战略抉择

在讨论中，我们还明确了一个至关重要的战略问题：`hexo deploy` 手动部署 vs. `GitHub Actions` 自动部署。

**结论是：必须二选一，绝不能混用！** 否则，两个不同的发布源会导致线上版本被相互覆盖，造成混乱。

我们最终确定了在不同阶段，采用不同策略的长期方案：

*   **阶段一：功能开发期**
    *   **策略**：坚决使用 **GitHub Actions** 自动化部署。享受它带来的安全、规范和可追溯性。
    *   **禁用**：绝不使用 `hexo d` 命令。

*   **阶段二：功能稳定期**
    *   **策略**：当网站结构和功能长期不再变化，写作成为唯一需求时，可以切换回更便捷的 **`hexo d` 手动部署**。
    *   **操作**：要切换，必须先**删除项目中的`.github/workflows/deploy.yml`文件**，彻底关闭自动化流程，确保发布源的唯一性。

## 五、结语

通过这次探索，我们不仅解决了一个实际的痛点，更深入理解了Git工作流设计的哲学。一个好的流程，应该是在规范和效率之间找到完美的平衡，既能保证软件质量，又能让内容创作如丝般顺滑。

这套由我们共同设计的工作流，希望能为每一位和mako一样，既是开发者，也是创作者的博主，带来启发。
