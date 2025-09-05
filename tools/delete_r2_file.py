#!/usr/bin/env python3
"""
删除 R2 中的指定文件
"""
import boto3
import sys

# R2 配置
ENDPOINT_URL = 'https://aa4ef15b1941fed76871afb631508821.r2.cloudflarestorage.com'
ACCESS_KEY = '5e40dbc3dfbfb5323c96edcb2b3c96e3'
SECRET_KEY = '343dea1453238242a1faf3e3de8d97d5ea8967361de3562b21aed383511ba911'
BUCKET_NAME = 'mako-hexo-assets'

def delete_file(file_key):
    """删除指定文件"""
    s3_client = boto3.client(
        's3',
        endpoint_url=ENDPOINT_URL,
        aws_access_key_id=ACCESS_KEY,
        aws_secret_access_key=SECRET_KEY
    )
    
    try:
        print(f"删除文件: {file_key}")
        s3_client.delete_object(Bucket=BUCKET_NAME, Key=file_key)
        print(f"✅ 成功删除!")
        return True
    except Exception as e:
        print(f"❌ 错误: {str(e)}")
        return False

def list_all_files():
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
            files.append(obj['Key'])
            
        if 'NextContinuationToken' in response:
            continuation_token = response['NextContinuationToken']
        else:
            break
    
    return files

if __name__ == '__main__':
    print("=== R2 文件管理工具 ===\n")
    
    # 列出所有文件
    files = list_all_files()
    print(f"存储桶中现有 {len(files)} 个文件:\n")
    
    for i, file_key in enumerate(files, 1):
        print(f"{i}. {file_key}")
    
    if len(files) == 0:
        print("没有文件可以删除。")
        sys.exit(0)
    
    # 交互式删除
    while True:
        print("\n" + "="*50)
        print("选择操作:")
        print("1. 输入编号删除单个文件")
        print("2. 输入多个编号删除多个文件（用空格分隔）")
        print("3. 输入 q 退出")
        
        choice = input("\n请输入选择: ").strip()
        
        if choice.lower() == 'q':
            print("退出程序。")
            break
        
        try:
            # 处理输入
            numbers = choice.split()
            files_to_delete = []
            
            # 构建文件 URL 到编号的映射
            file_dict = {str(i+1): file_key for i, file_key in enumerate(files)}
            
            for num in numbers:
                if num in file_dict:
                    files_to_delete.append(file_dict[num])
                else:
                    print(f"编号 {num} 无效！")
                    continue
            
            if not files_to_delete:
                print("没有选择要删除的文件。")
                continue
            
            # 显示要删除的文件
            print("\n要删除的文件:")
            for i, file_key in enumerate(files_to_delete, 1):
                print(f"{i}. {file_key}")
            
            # 确认删除
            confirm = input("\n确认删除吗？(y/N): ").strip().lower()
            
            if confirm == 'y':
                print("\n开始删除...")
                success_count = 0
                for file_key in files_to_delete:
                    if delete_file(file_key):
                        success_count += 1
                print(f"\n完成：成功删除 {success_count}/{len(files_to_delete)} 个文件")
            else:
                print("取消删除。")
                
        except Exception as e:
            print(f"错误：{str(e)}")