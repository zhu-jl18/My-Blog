#!/bin/bash

# Vercel 自动部署脚本
# 用于同步 GitHub 仓库的音乐文件到 Vercel

set -e  # 遇到错误立即退出

# 配置
GITHUB_REPO="zhu-jl18/cdn4blog"
GITHUB_BRANCH="main"
VERCEL_PROJECT_DIR="vercel-music-cdn"
TEMP_DIR="/tmp/vercel-sync"

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 日志函数
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查依赖
check_dependencies() {
    log_info "检查依赖..."
    
    if ! command -v git &> /dev/null; then
        log_error "git 未安装"
        exit 1
    fi
    
    if ! command -v vercel &> /dev/null; then
        log_error "vercel CLI 未安装，请运行: npm i -g vercel"
        exit 1
    fi
    
    log_success "依赖检查通过"
}

# 创建临时目录
setup_temp_dir() {
    log_info "设置临时目录..."
    
    # 清理旧目录
    if [ -d "$TEMP_DIR" ]; then
        rm -rf "$TEMP_DIR"
    fi
    
    # 创建新目录
    mkdir -p "$TEMP_DIR"
    cd "$TEMP_DIR"
    
    log_success "临时目录创建成功"
}

# 从 GitHub 克隆音乐文件
clone_music_files() {
    log_info "从 GitHub 克隆音乐文件..."
    
    # 使用 sparse clone 只下载 music 文件夹
    git init
    git remote add origin "https://github.com/${GITHUB_REPO}.git"
    git config core.sparseCheckout true
    echo "music/" >> .git/info/sparse-checkout
    
    # 拉取最新文件
    git pull origin "$GITHUB_BRANCH"
    
    log_success "音乐文件克隆完成"
}

# 创建 Vercel 项目结构
create_vercel_project() {
    log_info "创建 Vercel 项目结构..."
    
    # 创建 public 目录
    mkdir -p public
    
    # 移动音乐文件到 public 目录
    if [ -d "music" ]; then
        cp -r music/* public/
        log_success "音乐文件复制完成"
    else
        log_error "未找到 music 目录"
        exit 1
    fi
    
    # 创建 vercel.json 配置
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
        },
        {
          "key": "Access-Control-Allow-Methods",
          "value": "GET, HEAD, OPTIONS"
        },
        {
          "key": "Access-Control-Allow-Headers",
          "value": "Origin, X-Requested-With, Content-Type, Accept, Range"
        }
      ]
    }
  ]
}
EOF
    
    # 创建 package.json
    cat > package.json << 'EOF'
{
  "name": "cdn4blog-vercel",
  "version": "1.0.0",
  "description": "CDN for blog music files",
  "private": true
}
EOF
    
    log_success "Vercel 项目结构创建完成"
}

# 部署到 Vercel
deploy_to_vercel() {
    log_info "部署到 Vercel..."
    
    # 检查是否已登录 Vercel
    if ! vercel whoami &> /dev/null; then
        log_warning "未登录 Vercel，请先登录"
        vercel login
    fi
    
    # 部署到生产环境
    vercel --prod
    
    log_success "部署完成！"
}

# 清理临时文件
cleanup() {
    log_info "清理临时文件..."
    cd - > /dev/null
    if [ -d "$TEMP_DIR" ]; then
        rm -rf "$TEMP_DIR"
    fi
    log_success "清理完成"
}

# 主函数
main() {
    log_info "开始同步音乐文件到 Vercel..."
    
    check_dependencies
    setup_temp_dir
    clone_music_files
    create_vercel_project
    deploy_to_vercel
    cleanup
    
    log_success "音乐文件同步完成！"
    echo ""
    echo "你的音乐文件现在可以通过以下 URL 访问："
    echo "https://cdn4blog.vercel.app/music/"
}

# 捕获 Ctrl+C 信号
trap cleanup EXIT

# 运行主函数
main "$@"