#!/usr/bin/env python3
"""
检查 Cloudflare R2 存储使用情况
"""
import boto3
import json
from datetime import datetime

# R2 配置
ENDPOINT_URL = 'https://aa4ef15b1941fed76871afb631508821.r2.cloudflarestorage.com'
ACCESS_KEY = '5e40dbc3dfbfb5323c96edcb2b3c96e3'
SECRET_KEY = '343dea1453238242a1faf3e3de8d97d5ea8967361de3562b21aed383511ba911'
BUCKET_NAME = 'mako-hexo-assets'

def get_bucket_usage():
    """获取存储桶使用情况"""
    s3_client = boto3.client(
        's3',
        endpoint_url=ENDPOINT_URL,
        aws_access_key_id=ACCESS_KEY,
        aws_secret_access_key=SECRET_KEY
    )
    
    try:
        # 列出所有对象
        objects = []
        continuation_token = None
        total_size = 0
        
        print(f"扫描存储桶: {BUCKET_NAME}")
        print("=" * 50)
        
        while True:
            list_kwargs = {
                'Bucket': BUCKET_NAME,
                'MaxKeys': 1000
            }
            
            if continuation_token:
                list_kwargs['ContinuationToken'] = continuation_token
            
            response = s3_client.list_objects_v2(**list_kwargs)
            
            for obj in response.get('Contents', []):
                objects.append({
                    'Key': obj['Key'],
                    'Size': obj['Size'],
                    'LastModified': obj['LastModified'].strftime('%Y-%m-%d %H:%M:%S'),
                })
                total_size += obj['Size']
                
            if 'NextContinuationToken' in response:
                continuation_token = response['NextContinuationToken']
            else:
                break
        
        # 生成使用报告
        report = {
            'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            'bucket': BUCKET_NAME,
            'total_objects': len(objects),
            'total_size_bytes': total_size,
            'total_size_mb': round(total_size / 1024 / 1024, 2),
            'files_by_type': {},
            'files_by_folder': {}
        }
        
        # 按类型统计
        for obj in objects:
            ext = obj['Key'].split('.')[-1].lower() if '.' in obj['Key'] else 'folder'
            report['files_by_type'][ext] = report['files_by_type'].get(ext, 0) + 1
        
        # 按文件夹统计
        for obj in objects:
            if '/' in obj['Key']:
                folder = obj['Key'].split('/')[0] + '/'
                report['files_by_folder'][folder] = report['files_by_folder'].get(folder, 0) + 1
        
        print("存储使用情况:")
        print(f"  总文件数: {report['total_objects']}")
        print(f"  总大小: {report['total_size_mb']} MB")
        print()
        print("按文件类型:")
        for ext, count in report['files_by_type'].items():
            print(f"  .{ext}: {count} 个")
        print()
        print("按文件夹:")
        for folder, count in report['files_by_folder'].items():
            print(f"  {folder}: {count} 个")
        print()
        print("所有文件:")
        for obj in sorted(objects, key=lambda x: x['Key']):
            print(f"  https://media.makomako.dpdns.org/{obj['Key']} ({obj['Size']} bytes)")
        
        # 保存报告
        with open('r2_usage_report.json', 'w', encoding='utf-8') as f:
            json.dump(report, f, indent=2, ensure_ascii=False)
        
        print()
        print(f"详细报告已保存到: r2_usage_report.json")
        
        return report
        
    except Exception as e:
        print(f"错误: {str(e)}")
        return None

if __name__ == '__main__':
    get_bucket_usage()