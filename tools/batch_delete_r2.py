#!/usr/bin/env python3
"""
批量删除 R2 文件（基于模式匹配）
"""
import boto3
import re
import argparse

# R2 配置
ENDPOINT_URL = 'https://aa4ef15b1941fed76871afb631508821.r2.cloudflarestorage.com'
ACCESS_KEY = '5e40dbc3dfbfb5323c96edcb2b3c96e3'
SECRET_KEY = '343dea1453238242a1faf3e3de8d97d5ea8967361de3562b21aed383511ba911'
BUCKET_NAME = 'mako-hexo-assets'

def list_files():
    """列出所有文件"""
    s3_client = boto3.client(
        's3',
        endpoint_url=ENDPOINT_URL,
        aws_access_key_id=ACCESS_KEY,
        aws_secret_access_key=SECRET_KEY
    )
    
    files = []
    continuation_token = None
    
    while True:
        list_kwargs = {'Bucket': BUCKET_NAME, 'MaxKeys': 1000}
        if continuation_token:
            list_kwargs['ContinuationToken'] = continuation_token
            
        response = s3_client.list_objects_v2(**list_kwargs)
        
        for obj in response.get('Contents', []):
            files.append({
                'Key': obj['Key'],
                'Size': obj['Size'],
                'LastModified': obj['LastModified']
            })
            
        if 'NextContinuationToken' in response:
            continuation_token = response['NextContinuationToken']
        else:
            break
    
    return files

def delete_by_pattern(pattern, dry_run=True):
    """根据模式删除文件"""
    s3_client = boto3.client(
        's3',
        endpoint_url=ENDPOINT_URL,
        aws_access_key_id=ACCESS_KEY,
        aws_secret_access_key=SECRET_KEY
    )
    
    # 获取所有文件
    all_files = list_files()
    
    # 匹配文件
    if pattern.startswith('/'):
        # 精确路径匹配
        matched_files = [f for f in all_files if f['Key'] == pattern[1:]]
    else:
        # 正则表达式匹配
        try:
            regex = re.compile(pattern)
            matched_files = [f for f in all_files if regex.search(f['Key'])]
        except re.error as e:
            print(f"错误：无效的正则表达式 - {e}")
            return
    
    print(f"匹配到 {len(matched_files)} 个文件:")
    if not matched_files:
        return
    
    for f in matched_files:
        print(f"  - {f['Key']} ({f['Size']} bytes)")
    
    if dry_run:
        print("\n这是预览模式（--no-dry-run 才会实际删除）")
        return
    
    # 实际删除
    confirm = input("\n确认删除以上文件吗？(y/N): ")
    if confirm.lower() != 'y':
        print("取消删除。")
        return
    
    print("\n开始删除...")
    success_count = 0
    
    for f in matched_files:
        try:
            s3_client.delete_object(Bucket=BUCKET_NAME, Key=f['Key'])
            print(f"✅ 已删除: {f['Key']}")
            success_count += 1
        except Exception as e:
            print(f"❌ 删除失败 {f['Key']}: {str(e)}")
    
    print(f"\n完成：成功删除 {success_count}/{len(matched_files)} 个文件")

def main():
    parser = argparse.ArgumentParser(description='R2 文件批量删除工具')
    parser.add_argument('pattern', help='删除模式（文件路径或正则表达式）')
    parser.add_argument('--no-dry-run', action='store_true', help='实际执行删除（默认为预览模式）')
    
    args = parser.parse_args()
    
    print(f"=== R2 批量删除工具 ===")
    print(f"模式: {args.pattern}")
    print(f"模式: {'实际删除' if args.no_dry_run else '预览模式'}\n")
    
    delete_by_pattern(args.pattern, dry_run=not args.no_dry_run)

if __name__ == '__main__':
    main()