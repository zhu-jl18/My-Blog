/**
 * 本地直连配置模板（已废弃）
 *
 * 说明：从 2025-09-08 起，前端 chat.js 统一走 Cloudflare Workers 代理，
 * 不再在前端注入/保存任何 API Key。本模板仅作为历史文档保留。
 *
 * 本地开发建议：使用 Cloudflare Wrangler 启动本地 Worker 代理进行联调
 *   1) cd cloudflare-worker
 *   2) wrangler dev
 * 然后前端继续访问代理地址（proxyUrl），即可完成本地调试。
 *
 * 注意：如果你依然复制到 source/js/chat-local.js，它也不会被 chat.js 读取。
 */

// 已废弃：以下字段不再被前端读取
// window.CHAT_LOCAL_KEY = 'your-api-key-here';
// window.CHAT_LOCAL_MODEL = '[CLI反代]流式抗截断/gemini-2.5-pro-preview-06-05';
// window.CHAT_LOCAL_BASE = 'https://huggingface.qzz.io';
// window.CHAT_LOCAL_STREAMING = true;
