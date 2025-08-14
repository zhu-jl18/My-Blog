#!/bin/bash

# Vercel 音乐文件自动同步脚本
# 适用于 Hexo 博客 + Vercel CDN 架构

set -e

# 配置
SOURCE_REPO="zhu-jl18/My-Blog"           # 源博客仓库
SOURCE_BRANCH="claudecode"             # 源分支（包含音乐文件）
TARGET_REPO="zhu-jl18/cdn4blog"        # Vercel 对应的仓库
TARGET_BRANCH="main"                  # Vercel 部署分支
MUSIC_DIR="music"                      # 音乐文件目录
SYNC_SCRIPT_DIR="scripts"              # 脚本目录

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

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

log_step() {
    echo -e "\n${PURPLE}=== $1 ===${NC}"
}

# 显示横幅
show_banner() {
    echo -e "${CYAN}"
    cat << 'EOF'
╔══════════════════════════════════════════════════════════════╗
║                 Vercel 音乐同步工具                          ║
║                                                              ║
║  自动同步 GitHub 音乐文件到 Vercel CDN                        ║
║  支持增量同步、自动部署、状态通知                            ║
╚══════════════════════════════════════════════════════════════╝
EOF
    echo -e "${NC}"
}

# 检查依赖
check_dependencies() {
    log_step "检查依赖工具"
    
    local missing_deps=()
    
    if ! command -v git &> /dev/null; then
        missing_deps+=("git")
    fi
    
    if ! command -v curl &> /dev/null; then
        missing_deps+=("curl")
    fi
    
    if ! command -v jq &> /dev/null; then
        missing_deps+=("jq")
    fi
    
    if [ ${#missing_deps[@]} -gt 0 ]; then
        log_error "缺少依赖工具: ${missing_deps[*]}"
        log_info "请安装缺失的工具后再运行"
        exit 1
    fi
    
    log_success "所有依赖工具已就绪"
}

# 检查 GitHub CLI 登录状态
check_github_auth() {
    log_step "检查 GitHub 认证"
    
    if ! gh auth status &> /dev/null; then
        log_warning "GitHub CLI 未登录"
        log_info "请运行: gh auth login"
        read -p "是否现在登录 GitHub? (y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            gh auth login
        else
            log_error "需要 GitHub 认证才能继续"
            exit 1
        fi
    fi
    
    log_success "GitHub 认证状态正常"
}

# 创建工作目录
setup_workspace() {
    log_step "准备工作空间"
    
    # 清理旧的工作目录
    rm -rf workspace
    mkdir -p workspace
    
    # 进入工作目录
    cd workspace
    
    log_success "工作空间准备完成"
}

# 克隆源仓库
clone_source_repo() {
    log_step "克隆源仓库"
    
    log_info "从 $SOURCE_REPO 克隆 $SOURCE_BRANCH 分支..."
    
    git clone --branch "$SOURCE_BRANCH" "https://github.com/$SOURCE_REPO.git" source
    
    if [ ! -d "source/$MUSIC_DIR" ]; then
        log_error "源仓库中未找到 $MUSIC_DIR 目录"
        exit 1
    fi
    
    # 统计音乐文件
    local music_count=$(find "source/$MUSIC_DIR" -type f -name "*.mp3" -o -name "*.wav" -o -name "*.ogg" -o -name "*.flac" | wc -l)
    log_info "发现 $music_count 个音乐文件"
    
    log_success "源仓库克隆完成"
}

# 克隆目标仓库
clone_target_repo() {
    log_step "克隆目标仓库"
    
    log_info "从 $TARGET_REPO 克隆 $TARGET_BRANCH 分支..."
    
    git clone "https://github.com/$TARGET_REPO.git" target
    
    # 确保目标目录结构
    mkdir -p "target/$MUSIC_DIR"
    
    log_success "目标仓库克隆完成"
}

# 同步音乐文件
sync_music_files() {
    log_step "同步音乐文件"
    
    local source_dir="source/$MUSIC_DIR"
    local target_dir="target/$MUSIC_DIR"
    
    # 使用 rsync 进行增量同步（如果可用）
    if command -v rsync &> /dev/null; then
        log_info "使用 rsync 进行增量同步..."
        rsync -av --delete "$source_dir/" "$target_dir/"
    else
        log_info "使用 cp 进行同步..."
        # 清空目标目录
        rm -rf "$target_dir"/*
        # 复制所有文件
        cp -r "$source_dir/"* "$target_dir/"
    fi
    
    # 统计同步结果
    local synced_count=$(find "$target_dir" -type f | wc -l)
    log_info "成功同步 $synced_count 个文件"
    
    log_success "音乐文件同步完成"
}

# 提交并推送更改
commit_and_push() {
    log_step "提交更改到目标仓库"
    
    cd target
    
    # 配置 Git 用户信息
    git config user.name "Music Sync Bot"
    git config user.email "music-sync@bot.local"
    
    # 检查是否有变化
    if git diff --quiet; then
        log_info "没有检测到文件变化，跳过提交"
        cd ..
        return
    fi
    
    # 添加所有文件
    git add .
    
    # 创建提交
    local commit_msg="🎵 自动同步音乐文件
    
同步时间: $(date '+%Y-%m-%d %H:%M:%S')
源仓库: $SOURCE_REPO@$SOURCE_BRANCH

🤖 Generated with Vercel Sync Script"
    
    git commit -m "$commit_msg"
    
    # 推送到远程
    log_info "推送到 $TARGET_REPO..."
    git push origin "$TARGET_BRANCH"
    
    cd ..
    
    log_success "更改已推送到目标仓库"
}

# 检查 Vercel 部署状态
check_vercel_deployment() {
    log_step "检查 Vercel 部署状态"
    
    # 等待部署开始
    sleep 10
    
    # 获取最新的部署信息
    local deployment_url="https://api.vercel.com/v6/deployments"
    local response=$(curl -s "$deployment_url" -H "Authorization: Bearer $VERCEL_TOKEN")
    
    if [ $? -ne 0 ]; then
        log_warning "无法获取 Vercel 部署状态（需要 VERCEL_TOKEN）"
        return
    fi
    
    # 解析部署信息
    local latest_deployment=$(echo "$response" | jq -r '.deployments[0]')
    local deployment_state=$(echo "$latest_deployment" | jq -r '.state')
    local deployment_url=$(echo "$latest_deployment" | jq -r '.url')
    
    log_info "最新部署状态: $deployment_state"
    log_info "部署 URL: $deployment_url"
    
    if [ "$deployment_state" = "READY" ]; then
        log_success "Vercel 部署成功！"
        echo -e "${GREEN}音乐文件现在可以通过以下地址访问:${NC}"
        echo -e "${CYAN}https://cdn4blog.vercel.app/music/${NC}"
    else
        log_warning "Vercel 部署仍在进行中..."
    fi
}

# 发送通知（可选）
send_notification() {
    if [ -n "$SLACK_WEBHOOK_URL" ]; then
        log_step "发送通知"
        
        local webhook_data='{
            "text": "🎵 音乐文件已同步到 Vercel",
            "attachments": [
                {
                    "color": "#36a64f",
                    "fields": [
                        {
                            "title": "源仓库",
                            "value": "'"$SOURCE_REPO"'",
                            "short": true
                        },
                        {
                            "title": "目标仓库", 
                            "value": "'"$TARGET_REPO"'",
                            "short": true
                        },
                        {
                            "title": "同步时间",
                            "value": "'$(date '+%Y-%m-%d %H:%M:%S')'",
                            "short": false
                        }
                    ]
                }
            ]
        }'
        
        curl -X POST -H 'Content-type: application/json' \
            --data "$webhook_data" \
            "$SLACK_WEBHOOK_URL" > /dev/null 2>&1 || true
            
        log_success "通知已发送"
    fi
}

# 清理工作目录
cleanup() {
    log_step "清理工作目录"
    
    cd ..
    rm -rf workspace
    
    log_success "清理完成"
}

# 显示使用帮助
show_help() {
    cat << EOF
用法: $0 [选项]

选项:
    -h, --help          显示此帮助信息
    -s, --source        指定源仓库 (默认: $SOURCE_REPO)
    -b, --branch        指定源分支 (默认: $SOURCE_BRANCH)
    -t, --target        指定目标仓库 (默认: $TARGET_REPO)
    -v, --verbose       详细输出
    --no-cleanup        保留工作目录

环境变量:
    VERCEL_TOKEN        Vercel API Token（用于检查部署状态）
    SLACK_WEBHOOK_URL   Slack 通知 Webhook URL

示例:
    $0                              # 使用默认配置同步
    $0 -s owner/repo -b main       # 指定源仓库和分支
    VERCEL_TOKEN=xxx $0             # 启用 Vercel 部署检查

EOF
}

# 主函数
main() {
    # 解析命令行参数
    while [[ $# -gt 0 ]]; do
        case $1 in
            -h|--help)
                show_help
                exit 0
                ;;
            -s|--source)
                SOURCE_REPO="$2"
                shift 2
                ;;
            -b|--branch)
                SOURCE_BRANCH="$2"
                shift 2
                ;;
            -t|--target)
                TARGET_REPO="$2"
                shift 2
                ;;
            -v|--verbose)
                set -x
                shift
                ;;
            --no-cleanup)
                NO_CLEANUP=true
                shift
                ;;
            *)
                log_error "未知选项: $1"
                show_help
                exit 1
                ;;
        esac
    done
    
    # 显示横幅
    show_banner
    
    # 执行同步流程
    check_dependencies
    check_github_auth
    setup_workspace
    clone_source_repo
    clone_target_repo
    sync_music_files
    commit_and_push
    check_vercel_deployment
    send_notification
    
    # 清理（除非指定 --no-cleanup）
    if [ "$NO_CLEANUP" != "true" ]; then
        cleanup
    fi
    
    # 显示完成信息
    log_step "同步完成！"
    echo -e "\n${GREEN}✨ 音乐文件已成功同步到 Vercel CDN${NC}"
    echo -e "${CYAN}访问地址: https://cdn4blog.vercel.app/music/${NC}"
    echo -e "\n${YELLOW}提示: 如果你的博客使用了新的音乐文件，记得清除浏览器缓存${NC}"
}

# 错误处理
trap 'log_error "脚本执行失败"; exit 1' ERR

# 运行主函数
main "$@"