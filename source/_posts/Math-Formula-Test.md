---
title: 数学公式渲染测试
categories:
  - 技术测试
tags:
  - 数学公式
  - 测试
mathjax: true
abbrlink: 73657a7b
date: 2025-08-13 22:20:00

---

> 本文用于测试数学公式的渲染效果，包括行内公式和块级公式。

<!--more-->

## 🧮 行内公式测试

这是一个行内公式：$E = mc^2$，爱因斯坦的质能方程。

另一个行内公式：$\sum_{i=1}^{n} x_i = x_1 + x_2 + \cdots + x_n$

## 📐 块级公式测试

### 二次方程求根公式

$$
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$

### 欧拉公式

$$
e^{i\pi} + 1 = 0
$$

### 傅里叶变换

$$
\hat{f}(\omega) = \int_{-\infty}^{\infty} f(t) e^{-2\pi i \omega t} \mathrm{d}t
$$

### 矩阵表示

$$
\begin{bmatrix}
a & b \\
c & d
\end{bmatrix}
\begin{bmatrix}
x \\
y
\end{bmatrix} = 
\begin{bmatrix}
ax + by \\
cx + dy
\end{bmatrix}
$$

## 🔢 复杂公式测试

### 积分公式

$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$

### 极限公式

$$
\lim_{n \to \infty} \left(1 + \frac{1}{n}\right)^n = e
$$

### 级数展开

$$
\sin(x) = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \frac{x^7}{7!} + \cdots
$$

## 🎯 对偶空间测试

### 向量空间对偶

对于向量空间 $V$，其对偶空间记为 $V^{\ast}$：

$$
V^{\ast} = \{ f: V \to \mathbb{R} \mid f \text{ 是线性函数} \}
$$

### 对偶基

如果 $\{e_1, e_2, \ldots, e_n\}$ 是 $V$ 的基，那么对偶基 $\{e^1, e^2, \ldots, e^n\}$ 满足：

$$
e^i(e_j) = \delta^{i}_{j} = \begin{cases}
1 & \text{if } i=j \\
0 & \text{if } i \neq j
\end{cases}
$$

### 维度关系

$$
\dim(V) = \dim(V^{\ast})
$$

## ✅ 测试结果

如果以上公式都能正确渲染，说明数学公式支持配置成功！

---

*测试完成时间：2025年8月13日*
