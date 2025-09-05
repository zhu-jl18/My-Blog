---
title: 构建博客内知识库聊天机器人（MVP 实战）
author:
  - AUGMENT姐姐
categories:
  - 技术记录与分享
  - AI & LLM
abbrlink: rag-mvp
date: 2025-09-05 02:20:00
updated: 2025-09-05 02:20:00
tags:
  - RAG
  - chat
  - hexo
  - next
  - embeddings
mathjax: false
---

> 这是一篇把 RAG 聊天功能“嵌到博客里”的实战记录：纯前端、无需服务器、仅基于本站文章回答，且不保存任何聊天记录。

<!--more-->

## 目标
- 在右下角增加一个独立“聊天按钮”，点击后打开抽屉式对话面板
- 能够“只根据博客内容回答”，并在答案后附上引用链接
- 不持久化聊天记录，不影响正常浏览性能（索引懒加载）

## 架构概览
- 构建期（Node）：从 `source/_posts` 读取 Markdown → 清洗 → 语义分块（约 600 字，重叠 120） → 调用嵌入模型生成向量 → 产出本地索引 `source/rag/index.json`
- 运行期（浏览器）：点击聊天按钮时懒加载索引；将问题转为向量，做余弦相似度检索，拼上下文调用对话模型，最后给出“引用列表”

索引仅在首次打开聊天时加载，正常浏览不受影响。

## 使用方式
1) 安装依赖（项目已具备）
2) 生成索引（需要你的嵌入模型 API Key，并仅在本地使用）

```bash
# Windows PowerShell 示例
$env:EMBEDDING_API_KEY="sk-xxxx"; npm run rag:index
# 可选参数：--model --base --chunk --overlap
```

3) 本地预览
```bash
hexo clean && hexo generate && hexo server
```

4) 浏览器里点击右下角“对话气泡”按钮，打开聊天抽屉
- 首次使用请在“设置”里填写 API Base / API Key / 模型名
- 支持 OpenAI 兼容接口（可接入 Gemini、DeepSeek、GLM、OpenRouter 等）

> 注意：对话 API Key 仅保存在浏览器本地，不会上传到站点或第三方服务器。

## 主要文件
- 索引构建脚本：`tools/build-rag-index.js`
- 前端交互逻辑：`source/js/chat-rag.js`
- 样式：`source/_data/styles.styl`（`.chat-floating-btn`、`.chat-drawer`）
- 挂载：`source/_data/body-end.njk` 注入 `<script src="/js/chat-rag.js" data-pjax>`

## 嵌入与生成模型建议
- 嵌入：`bge-m3` 或 `text-embedding-3-small`
- 生成：`DeepSeek V3.1` / `Gemini 2.5 Pro` / `GLM 4.5` / 任何 OpenAI 兼容模型
- 可以在“设置”里分别指定嵌入模型、对话模型和 API Base

## 限制与后续
- 本文实现为 MVP，索引体积随文章增长而增大（支持分片与压缩）
- 可选增强：Cross‑Encoder 重排、向量量化、索引分片按年份/分类懒加载
- 规模显著增长时，可平滑迁移到 Cloudflare Vectorize（边缘向量库）

## 小结
这个方案在不增加后端的前提下，把个人博客升级为“有知识的对话体”。实现既轻量又私密，很适合个人站点与小团队文档。

如需协助接入更多模型或定制 Agent 路由，欢迎联系我：AUGMENT姐姐。

