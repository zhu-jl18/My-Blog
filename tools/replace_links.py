#!/usr/bin/env python3
"""
批量替换文章中旧的 CDN 链接为新的 R2 链接
使用方法：python replace_links.py
"""

import json
import re
import os
from pathlib import Path

# 读取 URL 映射文件
with open('url_mapping.json', 'r', encoding='utf-8') as f:
    url_mapping = json.load(f)

def replace_links_in_file(file_path):
    """替换单个文件中的链接"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 记录替换次数
        replacements = 0
        
        # 对每个旧链接进行替换
        for old_url, new_url in url_mapping.items():
            # 转义特殊字符用于正则表达式
            escaped_old_url = re.escape(old_url)
            # 统计替换次数
            count_before = content.count(old_url)
            if count_before > 0:
                content = content.replace(old_url, new_url)
                replacements += count_before
                print(f"  Replaced {count_before} occurrence(s) of {old_url[:50]}...")
        
        if replacements > 0:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✅ Updated {file_path}: {replacements} replacement(s)")
            return replacements
        else:
            print(f"✅ No changes needed for {file_path}")
            return 0
            
    except Exception as e:
        print(f"❌ Error processing {file_path}: {str(e)}")
        return 0

def main():
    """主函数"""
    print("开始批量替换 CDN 链接...")
    
    # 需要处理的文件列表（根据之前的搜索结果）
    files_to_process = [
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
    
    total_replacements = 0
    
    for file_path in files_to_process:
        if os.path.exists(file_path):
            print(f"\nProcessing: {file_path}")
            replacements = replace_links_in_file(file_path)
            total_replacements += replacements
        else:
            print(f"⚠️  File not found: {file_path}")
    
    print(f"\n🎉 Link replacement completed! Total replacements: {total_replacements}")
    
    if total_replacements > 0:
        print("\n下一步：")
        print("1. 运行 verify_migration.py 验证迁移结果")
        print("2. 本地预览确认图片显示正常")

if __name__ == "__main__":
    main()