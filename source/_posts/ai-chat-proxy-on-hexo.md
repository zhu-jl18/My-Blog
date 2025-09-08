---
title: Simple AI Chat with Cloudflare Workers 
categories:
  - 技术记录与分享
  - AI && LLM
tags:
  - AI-LLM
  - Hexo
  - Cloudflare Workers
  - CORS
  - Service Worker
  - PJAX
  - 部署排错
author: Mako & Cascade
abbrlink: bfdcb374
date: 2025-09-08 04:02:20
---

这是一篇记录从零打造并稳定上线「高粱米 AI 姐姐」聊天系统的实战总结。项目基于 Hexo + NexT，前端纯静态，通过 Cloudflare Workers 作为安全代理完成与 OpenAI 兼容接口的对接。

## 目标与约束

- 前端纯静态，不暴露任何密钥
- 流式输出、连续对话、轻量 UI
- 具备速率限制和来源校验，防滥用
- GitHub Pages 自动部署，故障可快速回滚

## 架构设计

- 前端：`source/js/chat.js`
  - 通过 `STATE.globalConfig.proxyUrl` 统一指向 Worker 代理
  - 两条路径：非流式与流式（SSE），均走代理
  - 本地开发：推荐使用 `wrangler dev` 启动本地 Workers 代理；前端不再注入 API Key（不再支持直连）
- 代理：Cloudflare Worker `chat-proxy`
  - 环境变量：`CHAT_API_KEY`、`ALLOWED_ORIGINS`
  - 速率限制（KV 可选）：每小时/每日
  - CORS 处理，阻断非白名单来源
  - 仅允许受控 model 列表

## 核心演进与坑点

1) 代理地址与优先级
- 现象：控制台仍然请求旧域名
- 根因：PJAX + 浏览器缓存 + localStorage 旧配置覆盖
- 方案：代码优先使用 `global.proxyUrl`，并给 `chat.js` 增加版本号参数强制刷新

2) Service Worker 安装失败
- 现象：`addAll` 404、`installing worker became redundant`
- 根因：GitHub Pages 上的路径不一，预缓存名单失配
- 方案：更换为极简透传 SW（只 skipWaiting/clients.claim，不做缓存拦截）

3) UI 可拖拽“漂移”
- 现象：入口气泡可被拖到奇怪位置、记忆后影响体验
- 方案：默认关闭拖拽（`entryBubbleDraggable: false`），需要时再手动开启

4) CORS 与来源校验
- 现象：`Failed to fetch` / `Origin not allowed`
- 方案：Worker 中检查 `Origin` 是否包含 `https://zhu-jl18.github.io`（或其它白名单），OPTIONS 预检返回 200 + CORS 头

5) 清理废弃的 API Base / API Key 前端配置
- 现象：设置面板里仍能看到 API Base / API Key，但实际请求已统一走 Worker 代理
  - 方案：移除前端的 API Base / API Key 字段与本地直连逻辑（`CHAT_LOCAL_*`），统一使用 `proxyUrl`；`chat.js` 已精简设置面板为仅选择模型

## 本地开发与测试（统一代理）

- 前置环境
  - 启动 Hexo 本地服务（默认 http://localhost:4000）：
    ```bash
    npm run server
    ```
  - 启动 Cloudflare Worker 本地代理（默认 http://127.0.0.1:8787）：
    ```bash
    cd cloudflare-worker
    wrangler dev
    ```

- 指定本地代理地址（两选一）
  - 使用浏览器控制台设置持久覆盖（推荐）：
    ```js
    localStorage.setItem('chat-proxy-override', 'http://127.0.0.1:8787');
    location.reload();
    ```
  - 临时变量（刷新后失效）：
    ```js
    window.CHAT_PROXY_DEV = 'http://127.0.0.1:8787';
    ```

- 验证
  - 打开网页 → 开发者工具 → Network，确认聊天请求发往 `127.0.0.1:8787`。
  - 代理会校验 `Origin`。当前 `chat-proxy.js` 默认允许 `localhost:4000/127.0.0.1:4000`；若需更严格控制，可在 Cloudflare Dashboard 的 `ALLOWED_ORIGINS` 中显式加入本地地址。
  - 预检（OPTIONS）应返回 200，并带有 CORS 头（见 `handleCORS()`）。

- 恢复生产代理
  ```js
  localStorage.removeItem('chat-proxy-override');
  location.reload();
  ```

## 部署与回滚

- 分支：`develop` 开发 → PR → `main` 自动部署（GitHub Actions）
- 缓存处置：新版本发布后，给关键脚本带版本号；必要时在浏览器 DevTools 中清理 SW 与缓存
- 回滚：强制推送 `main` 到上一稳定提交（紧急时使用）

## 速查清单

- Worker 环境变量：
  - `CHAT_API_KEY`：真实 API Key
  - `ALLOWED_ORIGINS`：`https://zhu-jl18.github.io`
- 快速探活：
  ```bash
  curl -I https://chat-proxy.nontrivial2025.workers.dev
  ```
- 前端清本地配置：
  ```js
  localStorage.removeItem('chatcfg.v2')
  ```
- 常见报错：
  - `ERR_BLOCKED_BY_CLIENT`：被广告拦截插件拦截，非功能性错误
  - SW 404：使用极简 SW；若安装失败，先 Unregister 再刷新
  - 仍走旧域名：确认脚本已带版本号、清理缓存

## 致谢

- 开发：Mako & Cascade（级联的含义是把复杂问题拆成有序步骤，像瀑布一样推进）
- 特别感谢每次“线上 real-time 排障”的耐心与果断，这个系统在不断打磨中变得越来越稳。
