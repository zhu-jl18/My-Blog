---
title: Python批量重命名文件
date: 2021-08-04 09:06:26
tags:
categories: 
    - [Programming,Python]
    - [Method and Solution]
---

利用Python实现对文件的重命名。

<!--more-->
**Reference**

- [菜鸟网：Python批量修改文件名](https://www.runoob.com/note/27030)

----

作为一位资深女性鉴赏师，搜罗的图片自然是不在少数，看到那些下载下来的带着无规则名字的美女图片自然不是很舒畅，于是便有了这个工具。

原理十分简单：

```python
import os
# path = input('请输入文件路径(结尾加上/)：')

path = 'H:/涩图/不是那么涩的二次元/奶子/'
# 获取该目录下所有文件，存入列表中
fileList = os.listdir(path)

n = 0
for i in fileList:

    # 设置旧文件名（就是路径+文件名）
    oldname = path + os.sep + fileList[n]   # os.sep添加系统分隔符

    # 设置新文件名
    newname = path + os.sep + '奶子-'+str(n+1).rjust(2, '0')+'.jpg'

    os.rename(oldname, newname)  # 用os模块中的rename方法对文件改名
    print(oldname, '======>', newname)

    n += 1
```

效果示意图：

<img src="https://cdn.jsdelivr.net/gh/zhu-jl18/cdn4blog/2021-8/Python-Rename-Tool-01.PNG" style= "width: 75% ">

不过存在问题，每当往里加入新的图片后，重命名的格式就要改变，因为已存在的不能再创建。