"""
Cloudflare R2 配置模板
请将以下信息替换为你的实际配置
"""

# Cloudflare R2 配置
R2_CONFIG = {
    'endpoint_url': 'https://<your-account-id>.r2.cloudflarestorage.com',
    'aws_access_key_id': 'your-r2-access-key-here',
    'aws_secret_access_key': 'your-r2-secret-key-here',
    'bucket_name': 'your-hexo-assets'
}

# 自定义域名配置
CUSTOM_DOMAIN = 'https://media.makomako.dpdns.org'

# 图片映射配置
IMAGE_MAPPING = {
    # 格式: '旧路径': '新路径'
    'avatar/avatar.jpg': 'avatar/avatar.jpg',
    'avatar/Gauss.png': 'avatar/Gauss.png',
    'logo/evolution.png': 'logo/evolution.png',
    '2021-3/latex-draw-a-tree-01.png': '2021/3/latex-draw-a-tree-01.png',
    '2021-3/latex-draw-a-tree-02.png': '2021/3/latex-draw-a-tree-02.png',
    '2021-3/latex-draw-a-tree-03.png': '2021/3/latex-draw-a-tree-03.png',
    '2025-8/dual-1.png': '2025/8/dual-1.png',
    '2025-8/pascal.png': '2025/8/pascal.png',
    '2025-8/Brianchon.png': '2025/8/Brianchon.png',
    '2025-8/Duals_graphs.png': '2025/8/Duals_graphs.png',
}