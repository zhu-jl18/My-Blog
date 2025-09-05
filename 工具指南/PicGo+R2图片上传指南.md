# PicGo + Cloudflare R2 图片上传指南

## 🚀 一、准备工作

### 1. 安装 PicGo
- [下载地址](https://github.com/Molunerfinn/PicGo/releases)
- 使用 PicGo 桌面版（推荐最新版本）

### 2. 安装 R2 插件
1. 打开 PicGo - 插件设置 - 搜索 `s3`
2. 安装 PicGo-S3 插件（兼容 R2）

## ⚙️ 二、配置 S3 插件

### S3 配置信息
```json
{
  "bucket": "mako-hexo-assets",
  "region": "auto",
  "endpointUrl": "https://aa4ef15b1941fed76871afb631508821.r2.cloudflarestorage.com",
  "accessKeyId": "你的 Access Key",
  "secretAccessKey": "你的 Secret Key",
  "path": "your-path-style",
  "customUrl": "https://media.makomako.dpdns.org",
  "cdnPath": "/"
}
```

### 详细配置步骤：
1. PicGo 右下角设置按钮
2. 选择 S3 插件
3. 填写以下信息：
   - **Bucket**: `mako-hexo-assets`
   - **地区**: `auto`
   - **节点地址**: 
     ```
     https://aa4ef15b1941fed76871afb631508821.r2.cloudflarestorage.com
     ```
   - **Access Key**: `5e40dbc3dfbfb5323c96edcb2b3c96e3`
   - **Secret Key**: `343dea1453238242a1faf3e3de8d97d5ea8967361de3562b21aed383511ba911`
   - **path**: 留空
   - **自定义域名**: 
     ```
     https://media.makomako.dpdns.org
     ```
   - **Acl**: `public-read`

## 📝 三、使用方法

### 方法一：拖拽上传（推荐）
1. 截图或保存图片到电脑
2. 将图片拖到 PicGo 界面
3. 自动上传并复制链接

### 方法二：剪贴板上传
1. QQ截图、Snipaste 等工具截图
2. PicGo 会自动检测到剪贴板图片
3. 点击 PicGo 图标上传

### 方法三：文件选择上传
1. 点击 PicGo 界面
2. 选择图片文件上传

## 📁 四、文件夹命名规范

### 推荐的文件夹结构
```
avatar/           # 用户头像相关
logo/             # Logo 和图标
2025/09/         # 按年月归档的文章图片
2025/10/
blog-images/     # 通用博客图片
```

### 实际路径示例
- 头像: `avatar/your-name.jpg`
- Logo: `logo/blog-logo.png`
- 文章图片: `2025/09/article-image.png`

## 🔗 五、在 Markdown 中使用

### 基本语法
```markdown
![图片描述](https://media.makomako.dpdns.org/2025/09/your-image.jpg)
```

### 带尺寸控制
```markdown
<img src="https://media.makomako.dpdns.org/2025/09/your-image.jpg" style="width: 70%"> 
```

## 💡 六、使用技巧

### 1. 快捷键设置
- 设置全局快捷键（如 Ctrl+Alt+U）
- 方便快速上传

### 2. 图片压缩
- 在上传前可使用工具压缩
- 查看R2存储配额使用情况

### 3. 备份策略
- 重要图片建议本地备份
- 定期检查R2存储状态

## ⚠️ 七、注意事项

1. **配额限制**: R2 免费额度为 10GB/月，超出需要付费
2. **图片大小**: 单个文件大小无限制，但大文件上传慢
3. **图片格式**: 支持 JPG、PNG、GIF、WebP 等
4. **域名解析**: 确保 media.makomako.dpdns.org 正常解析
5. **隐私保护**: 不要上传敏感图片

## 🚨 八、常见问题

### Q: 上传失败怎么办？
A: 检查网络、Access Key、桶名称是否正确

### Q: 图片不显示？
A: 检查自定义域名配置和图片 URL

### Q: 如何批量重命名？
A: 建议上传前就命名好

## 📞 九、技术支持

如遇到问题：
1. 查看错误详情
2. 检查 Cloudflare 控制台
3. 更新 PicGo 到最新版本

---

💖 祝你使用愉快！遇到问题随时找高粱米姐姐~