# TTS Worker 部署指南

## 1. 创建 R2 存储桶
```bash
wrangler r2 bucket create tts-audio
```

## 2. 部署 Worker（使用专用配置）
```bash
cd cloudflare-worker
wrangler deploy --config wrangler-tts.toml
```

## 3. 设置 API 密钥（多密钥支持）

### 方式 1：单个密钥
```bash
wrangler secret put GEMINI_API_KEY --config wrangler-tts.toml
# 输入你的 API Key
```

### 方式 2：多个密钥（逗号分隔）
```bash
wrangler secret put GEMINI_API_KEYS --config wrangler-tts.toml
# 输入：key1,key2,key3...（最多100个）
```

### 方式 3：JSON 数组（推荐用于大量密钥）
```bash
wrangler secret put GEMINI_API_KEYS_JSON --config wrangler-tts.toml
# 输入：["key1","key2","key3",...,"key100"]
```

## 4. 测试部署
```bash
# 健康检查
curl https://ttf-proxy.nontrivial2025.workers.dev/tts/health

# 语音合成测试
curl -X POST "https://ttf-proxy.nontrivial2025.workers.dev/tts" \
  -H "Content-Type: application/json" \
  -H "Origin: https://zhu-jl18.github.io" \
  -d '{"text":"你好，这是 Leda 声线测试。"}' \
  --output test.wav
```

## 5. 环境变量说明

已在 `wrangler-tts.toml` 预设：
- `TTS_DEFAULT_VOICE = "Leda"`
- `TTS_STYLE = "普通话，温柔少女音色，可爱"`  
- `TEMPERATURE = "0.7"`
- `ALLOWED_ORIGINS = "https://zhu-jl18.github.io,http://localhost:4000"`

## 6. 自动部署（可选）

在 GitHub Actions 中添加：
```yaml
- name: Deploy TTS Worker
  run: |
    cd cloudflare-worker
    wrangler deploy --config wrangler-tts.toml
  env:
    CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
```

## 密钥轮换机制
- Worker 会自动在多个密钥间轮换
- 遇到 401/403/429 错误时自动切换下一个密钥
- 基于请求文本和 IP 的稳定哈希选择起始密钥
- 最多尝试 5 个密钥后报错

## 缓存策略
- 首次合成：调用 Gemini API → 存储到 R2
- 后续请求：直接从 R2 返回（永久缓存）
- 缓存键：`tts/{model}/{voice}/{hash}.wav`
