# 📸 从 jsDelivr 迁移到 Cloudflare R2 完整指南

## 🎯 迁移前准备

### 1. 创建 Cloudflare R2 存储桶
1. 登录 Cloudflare Dashboard
2. 进入 R2 → 创建存储桶
3. 名称: `your-hexo-assets`
4. 区域: 选择离你最近的区域

### 2. 获取 API 凭据
1. 进入 R2 → 管理 R2 API 令牌
2. 创建新的 API 令牌
3. 权限: 对象读写权限
4. 保存 Access Key 和 Secret Key

### 3. 配置自定义域名
1. 在 Cloudflare DNS 中添加记录:
   - 类型: CNAME
   - 名称: `media`
   - 目标: `your-account-id>.r2.cloudflarestorage.com`
2. 启用 CDN 和 SSL

## 🚀 执行迁移

### 第一步：配置脚本
```bash
# 安装依赖
pip install boto3 requests

# 编辑配置文件
cp scripts/config_template.py scripts/config.py
# 修改 config.py 中的实际配置
```

### 第二步：上传图片到 R2
```bash
# 运行迁移脚本
python scripts/migrate_to_r2.py
```

### 第三步：替换文章链接
```bash
# 运行替换脚本
node scripts/batch_replace.js
```

### 第四步：验证迁移结果
```bash
# 运行验证脚本
node scripts/verify_migration.js
```

## 🔧 脚本说明

### migrate_to_r2.py
- 从 jsDelivr 下载图片
- 上传到 Cloudflare R2
- 生成 URL 映射文件

### batch_replace.js  
- 批量替换所有文章中的图片链接
- 支持多种 URL 变体格式
- 备份原文文件

### verify_migration.js
- 检查所有新链接是否有效
- 生成迁移报告
- 标识问题链接

## 📊 迁移统计

需要迁移的图片文件:
- avatar/avatar.jpg
- avatar/Gauss.png  
- logo/evolution.png
- 2021-3/latex-draw-a-tree-*.png (3个文件)
- 2025-8/dual-1.png
- 2025-8/pascal.png
- 2025-8/Brianchon.png
- 2025-8/Duals_graphs.png

**总计: 11 个图片文件**

## 🎉 迁移完成后的好处

1. **更快的加载速度** - Cloudflare 全球 CDN
2. **完全控制** - 自主管理图片存储
3. **免费额度** - 每月 10GB 免费流量
4. **自动化工作流** - PicGo 自动上传
5. **更好的可靠性** - 企业级基础设施

## ⚠️ 注意事项

1. 先备份所有 Markdown 文件
2. 测试少量图片后再批量迁移
3. 验证自定义域名配置正确
4. 监控 R2 使用量和费用

## 📞 遇到问题？

1. 检查 R2 API 权限是否正确
2. 确认自定义域名 DNS 解析正常
3. 查看脚本日志中的错误信息
4. 在 Cloudflare 控制台检查存储桶状态

---

💖 祝你迁移顺利！有任何问题随时找高粱米姐姐~