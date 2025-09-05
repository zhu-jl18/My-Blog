#!usr/bin/env python3
"""
删除本地文件
"""
import os
import sys
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def delete_files(file_paths):
    """删除指定路径的文件"""
    print("--- 开始删除文件 ---")
    success_count = 0
    for file_path in file_paths:
        try:
            if os.path.exists(file_path):
                os.remove(file_path)
                logger.info(f"✅ 已删除: {file_path}")
                success_count += 1
            else:
                logger.warning(f"⚠️ 文件不存在，跳过: {file_path}")
        except Exception as e:
            logger.error(f"❌ 删除失败 {file_path}: {str(e)}")
    print(f"--- 完成: 成功删除 {success_count}/{len(file_paths)} 个文件 ---")
    return success_count

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("用法: python delete_local_files.py <file_path1> <file_path2> ...")
        sys.exit(1)
    
    files_to_delete = sys.argv[1:]
    delete_files(files_to_delete)
