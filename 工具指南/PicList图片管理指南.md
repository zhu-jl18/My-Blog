# PicList 图片管理指南

## 简介

PicList 是 PicGo 的命令行管理工具，可以方便地查看、删除、复制已上传的图片。

## 安装

```bash
npm install piclist -g
```

## 常用命令

### 1. 查看帮助
```bash
piclist --help
```

### 2. 查看配置
```bash
piclist config
```

### 3. 列出图片
```bash
# 列出所有图床的图片
piclist ls

# 只列出 S3/R2 图床的图片
piclist s3 ls

# 按日期排序
piclist ls --sort date

# 按大小排序
piclist ls --sort size
```

### 4. 删除图片
```bash
# 删除指定图片
piclist del https://media.makomako.dpdns.org/path/to/image.jpg

# 交互式删除
piclist del --interactive
```

### 5. 查看图片信息
```bash
# 查看详细信息
piclist info https://media.makomako.dpdns.org/path/to/image.jpg
```

### 6. 搜索图片
```bash
# 搜索文件名
piclist search keyword
```

### 7. 复制链接
```bash
# 复制到剪贴板
piclist cp https://media.makomako.dpdns.org/path/to/image.jpg
```

## 交互式模式

```bash
# 启动交互式 shell
piclist shell
```

在交互模式中常用命令：
```bash
# 查看所有图片
piclist> ls

# 删除编号为 3 的图片
piclist> del 3

# 删除多个图片
piclist> del 1,3,5

# 确认删除
piclist> del --confirm 3

# 退出
piclist> exit
```

## 高级功能

### 1. 按文件夹筛选
```bash
# 查看 2025/09 文件夹下的图片
piclist grep "2025/09"
```

### 2. 批量操作
```bash
# 删除所有匹配的图片
piclist bulk-del "2021/.*\.jpg"
```

### 3. 导出列表
```bash
# 导出为 CSV
piclist export --format csv > images.csv

# 导出为 JSON
piclist export --format json > images.json
```

## 实际使用示例

### 查找并删除旧图片
```bash
# 1. 列出所有图片
piclist ls

# 2. 搜索特定日期的图片
piclist grep "2021/"

# 3. 进入交互模式删除
piclist shell
piclist> ls  # 查看编号
piclist> del 1,2,3  # 删除不需要的图片
```

## 注意事项

1. **删除不可恢复**：删除操作无法撤销，请确认后再执行
2. **批量删除要小心**：使用 del --confirm 选项避免误删
3. **定期维护**：建议定期清理不需要的图片

## 配置问题

如果 PicList 找不到 PicGo 的配置，可以手动指定：
```bash
# 使用 PicGo 的配置文件
piclist --config ~/.picgo/config.json
```

---

使用 PicList 比手动删除脚本更方便，它是专门为此设计的工具！