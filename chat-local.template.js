/**
 * 本地开发配置模板
 * 使用方法：
 * 1. 复制此文件到 source/js/chat-local.js
 * 2. 填入你的API密钥和配置
 * 3. 本地开发时会自动使用这些配置
 * 
 * 注意：chat-local.js 已被 .gitignore 忽略，不会提交到仓库
 */

// 本地开发配置
window.CHAT_LOCAL_KEY = 'your-api-key-here';
window.CHAT_LOCAL_MODEL = '[CLI反代]流式抗截断/gemini-2.5-pro-preview-06-05';
window.CHAT_LOCAL_BASE = 'https://huggingface.qzz.io';
window.CHAT_LOCAL_STREAMING = true;
