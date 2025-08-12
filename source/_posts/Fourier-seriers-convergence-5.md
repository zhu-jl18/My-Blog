---
title: Fourier-seriers-convergence-5
categories:
  - []
date: 2025-08-10 04:59:09
tags:
---

> * * 

<!--more-->
----

!= 


`"https://cdn.jsdelivr.net/gh/zhu-jl18/cdn4blog/year-month/name" style= "width: 40% "`

## title: "Part V — 示例：方波、Gibbs 效应以及 Fejér 平滑" date: "2025-08-09" tags: [example, Gibbs, square wave] summary: "以方波为主例说明 Gibbs 现象，并展示 Fejér 平均如何平滑振荡。包含可直接嵌入博客的 Python 代码片段（用户自行运行）。"

# Part V — 示例：方波、Gibbs 效应以及 Fejér 平滑 / Examples: square wave & Gibbs

## 方波定义与傅里叶系数

取 \$2\pi\$-周期方波

$$
f(x)=\begin{cases}
1,& x\in(0,\pi),\\
-1,& x\in(-\pi,0),
\end{cases}
\qquad f(k\pi)=0\ (\text{或取平均}).
$$

其傅里叶系数（正弦展开形式）为

$$
f(x)=\frac{4}{\pi}\sum_{k=1,3,5,\dots}\frac{1}{k}\sin(kx).
$$

## Gibbs 现象与 Fejér 的平滑效果

- 部分和 \$S\_N(f,x)\$ 在间断点附近表现为振荡并产生约 \$9%\$ 的过冲（Gibbs overshoot），且该过冲的幅度不会随着 \$N\to\infty\$ 消失（虽然其宽度收缩）。
- Fejér 平均 \$\sigma\_N(f,x)\$ 则消除振荡特征：由于 Fejér 核非负并将质量集中，\$\sigma\_N(f,x)\$ 在任何连续点一致收敛到 \$f(x)\$，在间断点收敛到平均值 \$0\$。

## 示例代码（用户自行运行）

```python
# Python (示例)：用 numpy 和 matplotlib 绘制方波的部分和与 Fejér 平均
import numpy as np
import matplotlib.pyplot as plt

def square_wave(x):
    return np.where((x % (2*np.pi)) < np.pi, 1.0, -1.0)

def partial_sum_square(x, N):
    s = np.zeros_like(x, dtype=float)
    for k in range(1, N+1, 2):  # 只用奇项
        s += (4/np.pi) * (1.0/k) * np.sin(k*x)
    return s

def fejer_sum_square(x, N):
    S = np.zeros((N+1, len(x)))
    cur = np.zeros_like(x)
    for m in range(N+1):
        if m % 2 == 1:
            k = m
            cur += (4/np.pi) * (1.0/k) * np.sin(k*x)
        S[m,:] = cur
    return S.mean(axis=0)

x = np.linspace(-np.pi, np.pi, 1001)
plt.plot(x, square_wave(x), 'k', linewidth=1, label='square')
plt.plot(x, partial_sum_square(x, 51), label='Partial sum N=51')
plt.plot(x, fejer_sum_square(x, 51), label='Fejér mean N=51')
plt.legend()
plt.ylim(-1.5,1.5)
plt.show()
```

---

---
