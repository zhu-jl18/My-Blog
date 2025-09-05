#!/usr/bin/env python3
"""
从本地 CDN 仓库迁移图片到 Cloudflare R2
使用本地文件直接上传，无需网络下载
"""
import boto3
import os
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
        logging.FileHandler('migration_local.log', encoding='utf-8'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# 本地 CDN 仓库路径
LOCAL_CDN_PATH = r"D:\Blog Here\My_blog_cdn"

# R2 S3 客户端配置
s3_client = boto3.client(
    's3',
    endpoint_url=R2_CONFIG['endpoint_url'],
    aws_access_key_id=R2_CONFIG['aws_access_key_id'],
    aws_secret_access_key=R2_CONFIG['aws_secret_access_key']
)

def upload_with_retry(bucket, key, file_path, content_type, max_retries=3):
    """带重试机制的上传函数 - 从本地文件上传"""
    for attempt in range(max_retries):
        try:
            with open(file_path, 'rb') as file_data:
                s3_client.put_object(
                    Bucket=bucket,
                    Key=key,
                    Body=file_data,
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

def get_content_type(file_path):
    """根据文件扩展名获取内容类型"""
    extension = file_path.lower().split('.')[-1]
    content_types = {
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'png': 'image/png',
        'gif': 'image/gif',
        'webp': 'image/webp',
        'svg': 'image/svg+xml',
    }
    return content_types.get(extension, 'application/octet-stream')

def upload_local_file(old_path, new_path):
    """从本地文件上传到 R2"""
    try:
        local_file_path = os.path.join(LOCAL_CDN_PATH, old_path)
        
        # 检查本地文件是否存在
        if not os.path.exists(local_file_path):
            logger.error(f'❌ Local file not found: {local_file_path}')
            return False
        
        # 获取文件大小
        file_size = os.path.getsize(local_file_path)
        logger.info(f'📁 Local file: {local_file_path} ({file_size} bytes)')
        
        # 获取内容类型
        content_type = get_content_type(local_file_path)
        
        # 上传到 R2
        logger.info(f'📤 Uploading to R2: {new_path}')
        success = upload_with_retry(
            bucket=R2_CONFIG['bucket_name'],
            key=new_path,
            file_path=local_file_path,
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
    logger.info('=' * 60)
    logger.info('🚀 Starting local migration to Cloudflare R2...')
    logger.info(f'📦 Local CDN path: {LOCAL_CDN_PATH}')
    logger.info(f'🗄️  Bucket: {R2_CONFIG["bucket_name"]}')
    logger.info(f'🌐 Custom Domain: {CUSTOM_DOMAIN}')
    logger.info('=' * 60)
    
    # 检查本地仓库是否存在
    if not os.path.exists(LOCAL_CDN_PATH):
        logger.error(f'❌ Local CDN repository not found at: {LOCAL_CDN_PATH}')
        logger.info('💡 Please check the path or use the network download version')
        return
    
    # 测试连接
    if not test_connection():
        logger.error('Migration aborted due to connection failure')
        return
    
    success_count = 0
    total_count = len(IMAGE_MAPPING)
    
    logger.info(f'📊 Found {total_count} images to migrate from local repository')
    
    for old_path, new_path in IMAGE_MAPPING.items():
        if upload_local_file(old_path, new_path):
            success_count += 1
    
    logger.info('=' * 60)
    logger.info(f'🎯 Migration completed: {success_count}/{total_count} files migrated successfully')
    
    # 生成新旧 URL 映射文件
    with open('url_mapping_local.txt', 'w', encoding='utf-8') as f:
        f.write('# URL Mapping - Local to Cloudflare R2\\n')
        f.write(f'# Generated: {time.strftime("%Y-%m-%d %H:%M:%S")}\\n')
        f.write(f'# Local Path: {LOCAL_CDN_PATH}\\n')
        f.write(f'# Custom Domain: {CUSTOM_DOMAIN}\\n\\n')
        
        for old_path, new_path in IMAGE_MAPPING.items():
            local_path = os.path.join(LOCAL_CDN_PATH, old_path)
            new_url = f'{CUSTOM_DOMAIN}/{new_path}'
            f.write(f'{local_path} => {new_url}\\n')
    
    logger.info('📋 URL mapping saved to url_mapping_local.txt')
    logger.info('📝 Detailed log saved to migration_local.log')
    
    if success_count == total_count:
        logger.info('🎉 All images migrated successfully from local repository!')
    else:
        logger.warning('⚠️  Some images failed to migrate. Check migration_local.log for details')

if __name__ == '__main__':
    main()