#!/usr/bin/env python3
"""
从 jsDelivr 迁移图片到 Cloudflare R2 的实际脚本
使用你的真实 R2 配置
"""
import boto3
import requests
import logging
import time
import sys
from pathlib import Path

# 导入配置
sys.path.append('.')
from scripts.config import R2_CONFIG, CUSTOM_DOMAIN, IMAGE_MAPPING

# 配置日志
logging.basicConfig(
    level=logging.INFO, 
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('migration.log', encoding='utf-8'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# R2 S3 客户端配置
s3_client = boto3.client(
    's3',
    endpoint_url=R2_CONFIG['endpoint_url'],
    aws_access_key_id=R2_CONFIG['aws_access_key_id'],
    aws_secret_access_key=R2_CONFIG['aws_secret_access_key']
)

def upload_with_retry(bucket, key, body, content_type, max_retries=3):
    """带重试机制的上传函数"""
    for attempt in range(max_retries):
        try:
            s3_client.put_object(
                Bucket=bucket,
                Key=key,
                Body=body,
                ContentType=content_type,
                ACL='public-read'  # 确保图片可公开访问
            )
            return True
        except Exception as e:
            if attempt == max_retries - 1:
                raise
            logger.warning(f'Upload failed (attempt {attempt + 1}), retrying... Error: {str(e)}')
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
        success = upload_with_retry(
            bucket=R2_CONFIG['bucket_name'],
            key=new_path,
            body=response.content,
            content_type=content_type
        )
        
        if success:
            logger.info(f'✅ Success: {old_path} -> {new_path}')
            return True
        else:
            logger.error(f'❌ Upload failed: {old_path}')
            return False
        
    except Exception as e:
        logger.error(f'❌ Failed: {old_path}. Error: {str(e)}')
        return False

def test_connection():
    """测试 R2 连接"""
    try:
        # 尝试列出存储桶内容
        response = s3_client.list_objects_v2(Bucket=R2_CONFIG['bucket_name'], MaxKeys=1)
        logger.info('✅ R2 connection test successful')
        return True
    except Exception as e:
        logger.error(f'❌ R2 connection failed: {str(e)}')
        return False

def main():
    """执行迁移"""
    logger.info('=' * 50)
    logger.info('Starting migration from jsDelivr to Cloudflare R2...')
    logger.info(f'Bucket: {R2_CONFIG[\"bucket_name\"]}')
    logger.info(f'Custom Domain: {CUSTOM_DOMAIN}')
    logger.info('=' * 50)
    
    # 测试连接
    if not test_connection():
        logger.error('Migration aborted due to connection failure')
        return
    
    success_count = 0
    total_count = len(IMAGE_MAPPING)
    
    logger.info(f'Found {total_count} images to migrate')
    
    for old_path, new_path in IMAGE_MAPPING.items():
        if download_and_upload(old_path, new_path):
            success_count += 1
    
    logger.info('=' * 50)
    logger.info(f'Migration completed: {success_count}/{total_count} files migrated successfully')
    
    # 生成新旧 URL 映射文件
    with open('url_mapping.txt', 'w', encoding='utf-8') as f:
        f.write('# URL Mapping - jsDelivr to Cloudflare R2\\n')
        f.write(f'# Generated: {time.strftime(\"%Y-%m-%d %H:%M:%S\")}\\n')
        f.write(f'# Custom Domain: {CUSTOM_DOMAIN}\\n\\n')
        
        for old_path, new_path in IMAGE_MAPPING.items():
            old_url = f'https://cdn.jsdelivr.net/gh/zhu-jl18/cdn4blog@main/{old_path}'
            new_url = f'{CUSTOM_DOMAIN}/{new_path}'
            f.write(f'{old_url} => {new_url}\\n')
    
    logger.info('URL mapping saved to url_mapping.txt')
    logger.info('Detailed log saved to migration.log')
    
    if success_count == total_count:
        logger.info('🎉 All images migrated successfully!')
    else:
        logger.warning('⚠️  Some images failed to migrate. Check migration.log for details')

if __name__ == '__main__':
    main()