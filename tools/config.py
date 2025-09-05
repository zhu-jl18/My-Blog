"""
Cloudflare R2 实际配置
请妥善保管这些敏感信息！
"""

# Cloudflare R2 配置 - 使用你的实际凭据
R2_CONFIG = {
    'endpoint_url': 'https://aa4ef15b1941fed76871afb631508821.r2.cloudflarestorage.com',
    'aws_access_key_id': '5e40dbc3dfbfb5323c96edcb2b3c96e3',
    'aws_secret_access_key': '343dea1453238242a1faf3e3de8d97d5ea8967361de3562b21aed383511ba911',
    'bucket_name': 'mako-hexo-assets'
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
    '2021-4/English-Grammar-Overview-01.PNG': '2021/4/English-Grammar-Overview-01.PNG',
    '2021-4/English-Grammar-Overview-02.PNG': '2021/4/English-Grammar-Overview-02.PNG',
    '2021-4/English-Grammar-Overview-03.PNG': '2021/4/English-Grammar-Overview-03.PNG',
    '2025-8/dual-1.png': '2025/8/dual-1.png',
    '2025-8/pascal.png': '2025/8/pascal.png',
    '2025-8/Brianchon.png': '2025/8/Brianchon.png',
    '2025-8/Duals_graphs.png': '2025/8/Duals_graphs.png',
}