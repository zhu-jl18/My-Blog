---
title: tts-gemini-leda-cloudflare-worker
author:
  - mako
categories:
  - Math 技术记录与分享  AI & LLM Interesting 语言学习  其他
mathjax: false
abbrlink: 2e49c59f
date: 2025-09-09 07:36:02
---
>  
<!--more-->
----
## 功能综述

给 Hexo + NexT 博客加上“AI 朗读”能力：页面顶部出现“朗读”按钮，点击后优先使用云端高质量 TTS（Google AI Studio 的 Gemini TTS 模型，预设 Leda 女声、风格提示与温度），失败时自动回退浏览器内置语音。云端合成的音频会缓存到 Cloudflare R2，后续命中直接秒开且减少额度消耗。

- 预设参数：voiceName=Leda；style=“普通话，温柔少女音色，可爱”；temperature=0.7
- 云端：Cloudflare Worker（ttf-proxy）负责转发到 Gemini TTS，并带有多密钥轮换 / R2 缓存 / 允许来源校验
- 前端：简洁播放器 UI，调用远端 /tts 接口；失败回退 Web Speech

## 架构与代码位置

- 前端 UI 与调用
  - 入口注入：`source/_data/post-body-start.njk`（文章开头按钮与状态栏）
  - 页面脚本挂载：`source/_data/body-end.njk`（设置 `window.__TTS_PROXY_URL` 指向 Worker 域名，并引入 `/js/tts.js`）
  - 调用逻辑：`source/js/tts.js`（优先云端，默认传入 Leda + 风格 + 温度；失败回退浏览器 TTS）
- Cloudflare Worker（TTS 代理）
  - 代码：`cloudflare-worker/tts-proxy.js`
  - Wrangler 配置：`cloudflare-worker/wrangler-tts.toml`
  - 部署工作流：`.github/workflows/deploy-tts-worker.yml`

## Worker 端能力

- 路由
  - `POST /tts`：{ text, voiceName?, style?, model?, temperature? } → 返回音频 WAV
  - `GET /tts`：query 同上，用于快速测试
  - `GET /tts/health`：健康探活
- 允许来源校验（CORS）
  - 读取环境变量 `ALLOWED_ORIGINS`（逗号分隔的 Origin 列表，如 `https://zhu-jl18.github.io,http://localhost:4000`）
  - 未配置时也有安全默认：`https://zhu-jl18.github.io`、`http://localhost:4000`、`http://127.0.0.1:4000`
- 多密钥轮换
  - 支持：`GEMINI_API_KEYS`（逗号/分号/换行分隔）、`GEMINI_API_KEYS_JSON`（JSON 数组）、`GEMINI_API_KEY`（单密钥）
  - 依据请求文本与 IP 计算稳定起始索引；遇到 401/403/429/5xx 自动尝试下一把 key（最多 5 次）
- 样式与温度注入
  - 通过 `TTS_STYLE` 与 `TEMPERATURE` 注入到生成参数（默认 `0.7`）；可被请求体覆盖
  - 声线通过 `TTS_DEFAULT_VOICE`（默认 `Leda`）或请求体覆盖
- R2 缓存
  - 绑定 `TTS_AUDIO` → 桶名 `tts-audio`
  - 缓存键包含模型/声线/风格/温度 + 文本哈希，命中后直接返回 WAV，`Cache-Control: immutable`

### 关键环境变量（Wrangler / Dashboard）

- 非敏感（wrangler-tts.toml [vars]）：
  - `ALLOWED_ORIGINS = "https://zhu-jl18.github.io,http://localhost:4000,http://127.0.0.1:4000"`
  - `TTS_DEFAULT_MODEL = "gemini-2.5-flash-preview-tts"`
  - `TTS_DEFAULT_VOICE = "Leda"`
  - `TTS_STYLE = "普通话，温柔少女音色，可爱"`
  - `TEMPERATURE = "0.7"`
- 敏感（Dashboard / wrangler secret put）：
  - `GEMINI_API_KEYS_JSON`（推荐，大量密钥）/ `GEMINI_API_KEYS` / `GEMINI_API_KEY`

## 前端接入与回退策略

- `source/_data/body-end.njk`
  - 设置：`window.__TTS_PROXY_URL = "https://ttf-proxy.nontrivial2025.workers.dev"`
- `source/js/tts.js`
  - 请求体默认携带：model=`gemini-2.5-flash-preview-tts`，voiceName=`Leda`，style=`普通话，温柔少女音色，可爱`，temperature=`0.7`
  - 云端失败（网络/额度）自动回退到 Web Speech API（浏览器本地语音）
- `source/_data/post-body-start.njk`
  - 顶部插入朗读按钮、语速选择与状态提示

## GitHub Actions 自动部署（可选）

- 工作流：`.github/workflows/deploy-tts-worker.yml`
  - 安装 `wrangler@4`
  - 需要 GitHub Secrets：`CLOUDFLARE_API_TOKEN`（必需）、`CLOUDFLARE_ACCOUNT_ID`（可选）
  - 支持手动触发时选择是否下发/覆盖 Gemini 密钥（`set_secrets=true` 时执行 `wrangler secret put`）

## 部署步骤速记

1）创建 R2 桶
```bash
wrangler r2 bucket create tts-audio
```

2）设置密钥（任选一种）
```bash
# 单密钥
wrangler secret put GEMINI_API_KEY --config cloudflare-worker/wrangler-tts.toml
# 多密钥（逗号/分号/换行）
wrangler secret put GEMINI_API_KEYS --config cloudflare-worker/wrangler-tts.toml
# JSON 数组（推荐用于 100+ key）
wrangler secret put GEMINI_API_KEYS_JSON --config cloudflare-worker/wrangler-tts.toml
```

3）部署 Worker
```bash
wrangler deploy --config cloudflare-worker/wrangler-tts.toml
```

## 本地/远端验证

- 健康检查
```bash
curl https://ttf-proxy.nontrivial2025.workers.dev/tts/health
```

- PowerShell 合成测试（注意必须带 Origin）
```powershell
curl.exe -X POST "https://ttf-proxy.nontrivial2025.workers.dev/tts" `
  -H "Origin: https://zhu-jl18.github.io" `
  -H "Content-Type: application/json" `
  -d "{\"text\":\"你好，这是 Leda 声线测试。\"}" `
  --output test.wav
```

- 本地预览站点
```bash
npm run server
```
打开任一文章页，顶部“朗读”按钮会优先走云端 Leda；失败自动回退浏览器语音。

## 故障排查

- 403: Origin not allowed
  - 确认 `ALLOWED_ORIGINS` 覆盖了你的来源（线上 GitHub Pages、本地 4000 端口等）
- GitHub Actions 报 “Unknown argument: quiet”
  - 升级到 `wrangler@4`，并去掉 `wrangler secret put` 的 `--quiet` 参数
- 429/401/403：额度或密钥问题
  - Worker 已内置多密钥轮换与重试；如仍失败，增加密钥池或降低调用频率
- R2 未命中/未写入
  - 确认 `[[r2_buckets]]` 绑定与桶名 `tts-audio` 一致，且 Worker 有写权限

## 一些实现细节

- TTS 参数注入
  - `generationConfig.responseModalities=['AUDIO']`
  - `speechConfig.voiceConfig.prebuiltVoiceConfig.voiceName='Leda'`
  - `temperature` 默认 0.7，可覆盖
  - `style` 通过 parts 文本提示注入，建议中文描述音色与语气
- WAV 封装
  - Gemini 返回 PCM 数据（inlineData），Worker 端封装为 WAV（16-bit、24kHz、单声道）
- 缓存键设计
  - 以 `model|voice|style|temperature|text` 生成 SHA-256；不同参数/文本命中不同音频

## 后续计划

- UI：分段朗读/高亮进度、暂停继续、跳段等
- 多声线切换、文章级覆盖参数
- 对接更多存储/域名与访问统计

—— 以上就是本次为 Hexo 博客接入 Gemini TTS（Leda 女声）的完整实践记录，欢迎交流与改进建议。

<img src = "https://media.makomako.dpdns.org/avatar/avatar.jpg" style= "width: auto ">
