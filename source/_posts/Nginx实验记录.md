---
title: Nginx 实验记录
author:
  - mako
categories:
    - 技术记录与分享
    - 学习笔记
tags:
    - Nginx
    - 实验记录
    - WSL2
    - Docker
abbrlink: nginx-experiment-log
date: 2025-09-04 11:00:00
mathjax: false
---

> 实时记录 Nginx 学习实验过程

## 实验环境
- **系统**: WSL2 Ubuntu
- **工具**: Docker
- **端口**: 1313
- **实验目录**: ~/Nginx-Test

## 实验步骤

### 第一步：创建目录结构
```bash
mkdir -p ~/Nginx-Test/{html,conf,logs}
cd ~/Nginx-Test
ls -la  # 确认目录创建成功
```

⚠️ **重要：权限问题修复**
如果遇到无法删除文件夹的问题，是因为Docker容器以root权限创建了文件。解决方法：

```bash
# 方法1：使用sudo删除
sudo rm -rf ~/Nginx-Test

# 方法2：修改权限后再删除
sudo chown -R travis:travis ~/Nginx-Test
rm -rf ~/Nginx-Test

# 方法3：在docker run时添加用户参数（推荐避免）
docker run -d \
  --name nginx-learn \
  -p 1313:80 \
  -v $(pwd)/html:/usr/share/nginx/html \
  -v $(pwd)/conf:/etc/nginx/conf.d \
  -v $(pwd)/logs:/var/log/nginx \
  nginx:latest

# 清理命令（实验完成后使用）
docker stop nginx-learn
docker rm -f nginx-learn
sudo rm -rf ~/Nginx-Test
```

### 第二步：创建测试网页
```bash
cat > html/index.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>My Nginx Test</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        h1 { color: #0066cc; }
    </style>
</head>
<body>
    <h1>Hello from Nginx in WSL2!</h1>
    <p>This page is served by Nginx running in Docker on port 1313</p>
    <p>Created by Mako for learning purposes</p>
</body>
</html>
EOF
```

### 第三步：创建 Nginx 配置文件
```bash
cat > conf/nginx.conf << 'EOF'
events {
    worker_connections 1024;
}

http {
    server {
        listen 80;
        server_name localhost;
        
        root /usr/share/nginx/html;
        index index.html;
        
        location / {
            try_files $uri $uri/ =404;
        }
        
        # 添加一个测试接口
        location /test {
            return 200 "Hello from Nginx API endpoint!\n";
        }
        
        access_log /var/log/nginx/access.log;
        error_log /var/log/nginx/error.log;
    }
}
EOF
```

### 第四步：启动 Nginx 容器
```bash
# 拉取最新镜像（如果还没有）
docker pull nginx:latest

# 启动容器，映射端口和目录
docker run -d \
  --name nginx-learn \
  -p 1313:80 \
  -v $(pwd)/html:/usr/share/nginx/html \
  -v $(pwd)/conf:/etc/nginx/conf.d \
  -v $(pwd)/logs:/var/log/nginx \
  nginx:latest

# 检查容器状态
docker ps | grep nginx
```

### 第五步：测试访问
```bash
# 测试基本访问
curl http://localhost:1313

# 测试 API 端点
curl http://localhost:1313/test

# 查看实时日志
tail -f logs/access.log
```

## 实用命令集合

### 容器管理
```bash
# 查看容器状态
docker ps | grep nginx

# 查看容器日志
docker logs nginx-learn

# 停止容器
docker stop nginx-learn

# 启动容器
docker start nginx-learn

# 重启容器
docker restart nginx-learn

# 删除容器
docker rm -f nginx-learn
```

### 配置管理
```bash
# 查看 Nginx 配置（容器内）
docker exec nginx-learn nginx -T

# 测试配置文件语法
docker exec nginx-learn nginx -t

# 重新加载配置（修改后）
docker kill -s HUP nginx-learn
```

### 进入容器
```bash
# 进入容器内部
docker exec -it nginx-learn /bin/bash

# 查看配置文件
cat /etc/nginx/conf.d/nginx.conf

# 查看网页文件
cat /usr/share/nginx/html/index.html
```

### 日志查看
```bash
# 查看访问日志
tail -f logs/access.log

# 查看错误日志
tail -f logs/error.log

# 查看最近的访问
tail -n 20 logs/access.log
```

## 进阶实验配置

### 实验1：配置你感兴趣的 API 反向代理
编辑 `conf/nginx.conf`，在 server 块内添加：
```nginx
location /api/ {
    proxy_pass http://api.openai.com/;
    proxy_set_header Host api.openai.com;
    proxy_set_header User-Agent "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
}
```

测试命令：
```bash
curl -H "Content-Type: application/json" http://localhost:1313/api/v1/models
```

### 实验2：配置域名访问
1. 在 Windows 的 `hosts` 文件中添加：
   ```
   127.0.0.1 makomako.dpdns.org
   ```

2. 修改 `conf/nginx.conf`：
```nginx
server {
    listen 80;
    server_name makomako.dpdns.org;
    
    root /usr/share/nginx/html;
    index index.html;
    
    location / {
        try_files $uri $uri/ =404;
    }
}
```

测试：在浏览器访问 `http://makomako.dpdns.org:1313`

### 实验3：目录列表功能
修改 `conf/nginx.conf`：
```nginx
location /files {
    alias /usr/share/nginx/html;
    autoindex on;
    autoindex_exact_size off;
    autoindex_localtime on;
}
```

测试：访问 `http://localhost:1313/files`

### 实验4：负载均衡演示
修改 `conf/nginx.conf`：
```nginx
upstream backend {
    server localhost:8000 weight=3;
    server localhost:8001 weight=2;
}

location /balance {
    proxy_pass http://backend;
    proxy_set_header Host $host;
}
```

## 常见问题排查

### 1. 端口被占用
```bash
# 查看端口占用
sudo netstat -tulpn | grep :1313

# 如果被占用，可以：1) 停止占用进程 2) 更换端口
```

### 2. 权限问题
```bash
# 如果遇到权限问题，检查 Docker 权限
sudo usermod -aG docker $USER
# 需要重新登录 WSL
```

### 3. 容器无法启动
```bash
# 查看错误日志
docker logs nginx-learn

# 删除容器重新创建
docker rm -f nginx-learn
# 然后重新运行 docker run 命令
```

### 4. 配置文件不生效
```bash
# 确保配置文件语法正确
docker exec nginx-learn nginx -t

# 重新加载配置
docker kill -s HUP nginx-learn

# 如果还不行，重启容器
docker restart nginx-learn
```

## 实验进度记录

### 2025-09-04 11:00
- [x] 创建实验目录
- [x] 编写实验记录文档
- [ ] 启动第一个 Nginx 实例
- [ ] 测试基本网页访问
- [ ] 配置反向代理
- [ ] 测试域名访问

### 下一步计划
1. 搭建静态网站
2. 配置反向代理 API
3. 学习 HTTPS 配置
4. 实践负载均衡
5. 性能优化实验

---

*本文档实时更新，记录每次实验的步骤和结果*