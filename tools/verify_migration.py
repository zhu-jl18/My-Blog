#!/usr/bin/env python3
"""
验证迁移结果，检查所有新链接是否可访问
使用方法：python verify_migration.py
"""

import requests
import json
import re
import os
from concurrent.futures import ThreadPoolExecutor, as_completed
from urllib.parse import urlparse

def check_url_accessible(url):
    """检查单个 URL 是否可访问"""
    try:
        response = requests.head(url, timeout=10, allow_redirects=True)
        return response.status_code == 200
    except requests.RequestException:
        return False

def extract_media_urls_from_file(file_path):
    """从文件中提取所有 media.zhu-jl18.github.io 的链接"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 匹配 media.zhu-jl18.github.io 的链接
        pattern = r'https://media\.zhu-jl18\.github\.io/[^\s"\)\']+'
        urls = re.findall(pattern, content)
        
        # 去重
        return list(set(urls))
    except Exception as e:
        print(f"Error reading {file_path}: {str(e)}")
        return []

def main():
    """主函数"""
    print("开始验证迁移结果...")
    
    # 需要检查的文件列表
    files_to_check = [
        'source/_posts/Records-for-my-Proxy.md',
        'source/_posts/design-github-profile-with-Gemini.md',
        'source/_posts/English-Grammar-Overview.md',
        'source/_posts/Latex-Draw-a-Tree.md',
        'source/_posts/duality-and-isomorphism-1.md',
        'source/_posts/duality-and-isomorphism-4.md',
        'source/_posts/What-can-a-Free-Domain-Do.md',
        'source/_posts/Simulated-Vagina-Usage-Experience.md',
        'source/_posts/潇洒美少年.md',
        'source/_posts/Hexo博客构建专业级图片加速与自动化工作流：一份面向未来的实践指南.md',
        'source/_posts/从-jsDelivr-迁移到-Cloudflare-R2：实战经验分享.md',
        '_config.next.yml',
        'scaffolds/post.md'
    ]
    
    # 收集所有需要验证的 URL
    all_urls = set()
    checked_files = set()
    
    for file_path in files_to_check:
        if os.path.exists(file_path):
            urls = extract_media_urls_from_file(file_path)
            if urls:
                all_urls.update(urls)
                checked_files.add(file_path)
                print(f"Found {len(urls)} URLs in {file_path}")
        else:
            print(f"⚠️  File not found: {file_path}")
    
    if not all_urls:
        print("❌ No media URLs found to verify")
        return
    
    print(f"\nChecking {len(all_urls)} unique URLs...")
    
    # 并行检查所有 URL
    failed_urls = []
    successful_urls = []
    
    with ThreadPoolExecutor(max_workers=10) as executor:
        # 提交所有检查任务
        future_to_url = {executor.submit(check_url_accessible, url): url for url in all_urls}
        
        for future in as_completed(future_to_url):
            url = future_to_url[future]
            try:
                is_accessible = future.result()
                if is_accessible:
                    successful_urls.append(url)
                    print(f"✅ {url}")
                else:
                    failed_urls.append(url)
                    print(f"❌ {url}")
            except Exception as e:
                failed_urls.append(url)
                print(f"❌ {url} (Error: {str(e)})")
    
    # 输出验证结果
    print(f"\n=== Verification Summary ===")
    print(f"Files checked: {len(checked_files)}")
    print(f"URLs checked: {len(all_urls)}")
    print(f"Successful: {len(successful_urls)}")
    print(f"Failed: {len(failed_urls)}")
    
    if failed_urls:
        print(f"\n❌ Failed URLs:")
        for url in failed_urls:
            print(f"  {url}")
        
        # 保存错误报告
        with open('verification_errors.json', 'w', encoding='utf-8') as f:
            json.dump({
                'failed_urls': failed_urls,
                'checked_files': list(checked_files),
                'total_urls': len(all_urls)
            }, f, indent=2, ensure_ascii=False)
        
        print(f"\n❌ Some URLs failed verification. Check verification_errors.json for details.")
    else:
        print(f"\n✅ All URLs are accessible! Migration successful!")
        
        # 保存成功报告
        with open('verification_success.json', 'w', encoding='utf-8') as f:
            json.dump({
                'successful_urls': successful_urls,
                'checked_files': list(checked_files),
                'total_urls': len(all_urls)
            }, f, indent=2, ensure_ascii=False)
        
        print("Verification report saved to verification_success.json")

if __name__ == "__main__":
    main()