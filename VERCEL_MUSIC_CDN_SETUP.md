# Vercel 音乐 CDN 配置指南

## 快速开始

### 1. 准备音乐文件
从你的 GitHub 仓库 `zhu-jl18/cdn4blog/music/` 下载音乐文件：
- acoustic breeze.mp3
- The Sounds of Silence.mp3

### 2. 创建 Vercel 项目

#### 方法一：通过 Vercel 网站（推荐）
1. 访问 [vercel.com](https://vercel.com) 并登录
2. 点击 "New Project"
3. 选择 "Import Git Repository" 或 "Start from template"
4. 如果选择 Git，确保音乐文件在 `public/music/` 目录下

#### 方法二：使用 Vercel CLI
```bash
# 1. 安装 Vercel CLI
npm i -g vercel

# 2. 创建项目文件夹
mkdir vercel-music-cdn
cd vercel-music-cdn

# 3. 创建目录结构
mkdir -p public/music

# 4. 复制音乐文件到 public/music/
# 将你的 .mp3 文件放在这里

# 5. 创建 vercel.json
cat > vercel.json << 'EOF'
{
  "version": 2,
  "builds": [
    {
      "src": "public/**/*",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/music/(.*)",
      "dest": "/music/$1"
    }
  ],
  "headers": [
    {
      "source": "/music/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        },
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
EOF

# 6. 登录 Vercel
vercel login

# 7. 部署
vercel --prod
```

### 3. 获取部署后的 URL
部署完成后，你会得到一个类似这样的 URL：
```
https://your-project-name.vercel.app
```

### 4. 更新博客配置
在 `source/js/music-config.js` 中更新：

```javascript
window.MusicConfig = {
  mode: 'vercel',
  vercel: {
    baseUrl: 'https://your-project-name.vercel.app',
    musicPath: 'music'
  },
  // ... 其他配置
}
```

### 5. 自定义域名（可选）
1. 在 Vercel 项目设置中添加自定义域名
2. 配置 DNS 记录
3. 更新配置文件中的 baseUrl

## 文件结构
```
vercel-music-cdn/
├── public/
│   └── music/
│       ├── acoustic breeze.mp3
│       └── The Sounds of Silence.mp3
├── vercel.json
└── package.json
```

## 注意事项
- Vercel 免费套餐有带宽限制（100GB/月）
- 单个文件大小限制为 250MB
- 音乐文件会自动启用 CORS
- 支持 HTTPS，安全可靠

## 故障排除
- 如果音乐无法播放，检查 URL 是否正确
- 确保音乐文件在 `public/music/` 目录下
- 验证 Vercel 部署是否成功
- 检查浏览器控制台是否有 CORS 错误