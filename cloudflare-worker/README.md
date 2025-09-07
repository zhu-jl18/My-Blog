# Cloudflare Workers AI Chat Proxy

这是一个安全的AI聊天代理服务，部署在Cloudflare Workers上，为博客提供AI聊天功能而不暴露API密钥。

## 🚀 部署步骤

### 1. 准备工作
- 注册 [Cloudflare](https://cloudflare.com) 账号（免费）
- 安装 [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/)

### 2. 部署Worker
```bash
# 安装Wrangler CLI
npm install -g wrangler

# 登录Cloudflare
wrangler login

# 部署Worker
wrangler deploy
```

### 3. 配置环境变量
在Cloudflare Dashboard中设置以下环境变量：

1. 进入 **Workers & Pages** → 选择你的Worker → **Settings** → **Variables**

2. 添加环境变量：
   - `CHAT_API_KEY`: 你的真实API密钥
   - `ALLOWED_ORIGINS`: `https://zhu-jl18.github.io`

### 4. 创建KV存储（可选，用于速率限制）
```bash
# 创建KV namespace
wrangler kv:namespace create "CHAT_RATE_LIMIT"

# 复制返回的ID到wrangler.toml文件中
```

### 5. 获取Worker URL
部署成功后，你会得到一个类似这样的URL：
```
https://chat-proxy.your-subdomain.workers.dev
```

## 🔧 配置说明

### 速率限制
- 每IP每小时：20次请求
- 每IP每日：100次请求
- 超出限制会返回429错误

### 安全特性
- 域名白名单验证
- API密钥完全隐藏
- 请求参数验证
- 模型白名单限制

### 支持的模型
- `[CLI反代]流式抗截断/gemini-2.5-pro-preview-06-05`
- `[CLI反代]gemini-2.5-pro-preview-06-05`

## 📝 API接口

### POST /
请求体格式：
```json
{
  "messages": [
    {"role": "system", "content": "你是一个AI助手"},
    {"role": "user", "content": "你好"}
  ],
  "model": "[CLI反代]流式抗截断/gemini-2.5-pro-preview-06-05",
  "temperature": 0.7,
  "max_tokens": 2000,
  "stream": false
}
```

响应格式：
```json
{
  "choices": [
    {
      "message": {
        "role": "assistant",
        "content": "你好！我是AI助手，有什么可以帮助你的吗？"
      }
    }
  ]
}
```

## 🛠️ 本地开发

```bash
# 本地运行
wrangler dev

# 测试请求
curl -X POST http://localhost:8787 \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:4000" \
  -d '{
    "messages": [{"role": "user", "content": "Hello"}],
    "model": "[CLI反代]流式抗截断/gemini-2.5-pro-preview-06-05"
  }'
```

## 💰 费用说明

Cloudflare Workers免费套餐：
- **每天10万次请求**
- **CPU时间：10ms/请求**
- **内存：128MB**

对于个人博客完全够用，基本不会产生费用。

## 🔍 监控和日志

在Cloudflare Dashboard中可以查看：
- 请求统计
- 错误日志
- 性能指标
- 实时监控
