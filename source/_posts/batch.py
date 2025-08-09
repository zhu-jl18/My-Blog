import os
import re

# --- 配置 ---
# 1. 将此路径修改为您存放 Markdown 文件的文件夹路径
#    例如: "C:/Users/YourName/Documents/Notes" 或 "/home/user/notes"
TARGET_DIRECTORY = "D:/Blog Here/Source of Github Blog/source/_posts"  # 使用 "." 表示当前脚本所在的文件夹

# 2. 您想要处理的文件扩展名
FILE_EXTENSIONS = ('.md', '.markdown', '.txt')
# --- 配置结束 ---

def replace_and_escape(match):
    """
    这是一个回调函数，供 re.sub 使用。
    它接收一个匹配对象，处理后返回替换字符串。
    """
    # match.group(1) 是捕获到的 $...$ 之间的内容
    # 例如，对于 "$V \cong V^{**}$"，group(1) 就是 "V \cong V^{**}"
    inner_content = match.group(1)

    # 在捕获到的内容中，将所有的 '*' 替换为 '\*'
    # "V \cong V^{**}"  ->  "V \cong V^{\\*}"
    escaped_content = inner_content.replace('*', r'\*')

    # 用新的分隔符 \(...\) 包裹处理后的内容
    # 返回 "V \cong V^{\\*}" -> "\\(V \\cong V^{\\**}\\)"
    return f'\\({escaped_content}\\)'

def process_file(filepath):
    """
    读取单个文件，执行替换逻辑，然后写回文件。
    """
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            original_content = f.read()

        # 使用正则表达式查找所有 $...$ 格式的行内公式
        # 正则表达式解释:
        # \$       : 匹配一个字面的 '$' 符号
        # (.*?)    : 非贪婪模式捕获两个'$'之间的所有字符。这是捕获组 1。
        # \$       : 匹配另一个字面的 '$' 符号
        # re.DOTALL: 允许 '.' 匹配换行符，以处理跨行的公式
        modified_content = re.sub(r'\$(.*?)\$', replace_and_escape, original_content, flags=re.DOTALL)

        # 如果内容没有变化，则不重写文件
        if modified_content != original_content:
            print(f"  -> 内容已修改，正在保存...")
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(modified_content)
            return True
        else:
            print(f"  -> 内容无变化，已跳过。")
            return False

    except Exception as e:
        print(f"处理文件 {filepath} 时出错: {e}")
        return False

def main():
    """
    主函数，遍历目标文件夹并处理文件。
    """
    if not os.path.isdir(TARGET_DIRECTORY):
        print(f"错误：文件夹 '{TARGET_DIRECTORY}' 不存在。请检查脚本中的 TARGET_DIRECTORY 配置。")
        return

    print(f"--- Markdown/MathJax 批量修复脚本 ---")
    print(f"目标文件夹: {os.path.abspath(TARGET_DIRECTORY)}")
    print(f"目标文件类型: {FILE_EXTENSIONS}")
    print("-" * 30)

    processed_count = 0
    modified_count = 0

    # 遍历文件夹中的所有文件和子文件夹
    for root, dirs, files in os.walk(TARGET_DIRECTORY):
        for filename in files:
            if filename.endswith(FILE_EXTENSIONS):
                filepath = os.path.join(root, filename)
                print(f"正在处理文件: {filepath}")
                processed_count += 1
                if process_file(filepath):
                    modified_count += 1

    print("-" * 30)
    print("处理完成！")
    print(f"总共检查了 {processed_count} 个文件。")
    print(f"成功修改了 {modified_count} 个文件。")

if __name__ == "__main__":
    # 在运行前给出重要提示
    print("重要提示：此脚本将直接修改您的文件！")
    print("强烈建议在运行前备份您的文件夹。")
    user_confirmation = input("您是否已备份并希望继续？ (y/n): ")
    if user_confirmation.lower() == 'y':
        main()
    else:
        print("操作已取消。")
