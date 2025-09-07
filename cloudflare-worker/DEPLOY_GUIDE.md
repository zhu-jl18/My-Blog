# 🚀 Cloudflare Workers 部署指南

## 方法1：通过Dashboard部署（推荐）

### 1. 登录Cloudflare
访问 [Cloudflare Dashboard](https://dash.cloudflare.com)

### 2. 创建Worker
1. 点击左侧 **Workers & Pages**
2. 点击 **Create application**
3. 选择 **Create Worker**
4. 输入名称：`chat-proxy`
5. 点击 **Deploy**

### 3. 复制代码
1. 在Worker编辑器中，删除默认代码
2. 复制 `chat-proxy.js` 的全部内容并粘贴
3. 点击 **Save and Deploy**

### 4. 配置环境变量
1. 在Worker页面，点击 **Settings** 标签
2. 点击 **Variables**
3. 添加以下变量：
   - **Name**: `CHAT_API_KEY`
   - **Value**: 你的真实API密钥
   - **Type**: Secret (加密)
4. 添加第二个变量：
   - **Name**: `ALLOWED_ORIGINS`
   - **Value**: `https://zhu-jl18.github.io`
   - **Type**: Text

### 5. 获取Worker URL
部署成功后，你会看到类似这样的URL：
```
https://chat-proxy.你的用户名.workers.dev
```

## 方法2：命令行部署

如果你想使用命令行：

```bash
# 确保在cloudflare-worker目录下
cd cloudflare-worker

# 登录（会打开浏览器）
wrangler login

# 部署
wrangler deploy

# 设置环境变量
wrangler secret put CHAT_API_KEY
wrangler secret put ALLOWED_ORIGINS
```

## 🔧 测试部署

部署完成后，可以测试Worker是否正常工作：

```bash
curl -X POST https://你的worker地址 \
  -H "Content-Type: application/json" \
  -H "Origin: https://zhu-jl18.github.io" \
  -d '{
    "messages": [{"role": "user", "content": "Hello"}],
    "model": "[CLI反代]流式抗截断/gemini-2.5-pro-preview-06-05"
  }'
```

## 📝 下一步

1. 记录你的Worker URL
2. 更新前端配置文件中的代理地址
3. 测试聊天功能

## ❗ 重要提醒

- 确保API密钥设置为Secret类型
- 域名配置要准确，包含 `https://`
- Worker URL记得保存，后面要用到
