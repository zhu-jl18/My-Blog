#!/usr/bin/env python3
"""
从 jsDelivr 迁移图片到 Cloudflare R2 的 Python 脚本
"""
import boto3
import requests
import logging
import time
import json
from pathlib import Path

# 配置日志
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# R2 S3 客户端配置（需要替换为你的实际配置）
s3_client = boto3.client(
    's3',
    endpoint_url='https://<account-id>.r2.cloudflarestorage.com',
    aws_access_key_id='your-r2-access-key',
    aws_secret_access_key='your-r2-secret-key'
)

# 图片 URL 映射表
IMAGE_MAPPING = {
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

def upload_with_retry(bucket, key, body, content_type, max_retries=3):
    """带重试机制的上传函数"""
    for attempt in range(max_retries):
        try:
            s3_client.put_object(
                Bucket=bucket,
                Key=key,
                Body=body,
                ContentType=content_type
            )
            return True
        except Exception as e:
            if attempt == max_retries - 1:
                raise
            logger.warning(f'Upload failed (attempt {attempt + 1}), retrying...')
            time.sleep(2 ** attempt)
    return False

def download_and_upload(old_path, new_path):
    """下载旧图片并上传到 R2"""
    try:
        # 从 GitHub CDN 下载
        cdn_url = f'https://cdn.jsdelivr.net/gh/zhu-jl18/cdn4blog@main/{old_path}'
        logger.info(f'Downloading: {cdn_url}')
        
        response = requests.get(cdn_url, timeout=30)
        response.raise_for_status()
        
        # 获取图片类型
        content_type = response.headers.get('content-type', 'image/png')
        
        # 上传到 R2
        logger.info(f'Uploading to R2: {new_path}')
        upload_with_retry(
            bucket='your-hexo-assets',
            key=new_path,
            body=response.content,
            content_type=content_type
        )
        
        logger.info(f'✅ Success: {old_path} -> {new_path}')
        return True
        
    except Exception as e:
        logger.error(f'❌ Failed: {old_path}. Error: {str(e)}')
        return False

def main():
    """执行迁移"""
    logger.info('Starting migration from jsDelivr to Cloudflare R2...')
    
    success_count = 0
    total_count = len(IMAGE_MAPPING)
    
    for old_path, new_path in IMAGE_MAPPING.items():
        if download_and_upload(old_path, new_path):
            success_count += 1
    
    logger.info(f'Migration completed: {success_count}/{total_count} files migrated successfully')
    
    # 生成新旧 URL 映射文件
    with open('url_mapping.txt', 'w', encoding='utf-8') as f:
        for old_path, new_path in IMAGE_MAPPING.items():
            old_url = f'https://cdn.jsdelivr.net/gh/zhu-jl18/cdn4blog@main/{old_path}'
            new_url = f'https://media.makomako.dpdns.org/{new_path}'
            f.write(f'{old_url} => {new_url}\n')
    
    logger.info('URL mapping saved to url_mapping.txt')

if __name__ == '__main__':
    main()
