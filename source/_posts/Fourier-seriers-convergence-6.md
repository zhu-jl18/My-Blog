---
title: Fourier-seriers-convergence-6
categories:
  - []
date: 2025-08-10 04:59:18
tags:
---

> * * 

<!--more-->
----



`"https://cdn.jsdelivr.net/gh/zhu-jl18/cdn4blog/year-month/name" style= "width: 40% "`

# File: 06\_advanced.md

---

---

## title: "Part VI — 更高层次的收敛结果与比较" date: "2025-08-09" tags: [L2, Carleson, advanced] summary: "讨论 L^2 收敛（Parseval/Riesz–Fischer）与 Carleson–Hunt 定理的要点，并比较不同求和法的优劣。"

# Part VI — 更高层次的收敛结果与比较 / Advanced results & comparisons

## \$L^2\$ 情形与 Parseval / Riesz–Fischer

若 \$f\in L^2(\mathbb T)\$，Parseval 恒等与 Riesz–Fischer 定理保证部分和 \$S\_N(f)\$ 在 \$L^2\$ 意义下收敛到 \$f\$。

## Carleson–Hunt 定理（要点说明）

**定理（Carleson, 1966; Hunt 扩展）**：若 \$f\in L^2(\mathbb T)\$（更广为 \$L^p\$ 对 \$p>1\$），则 \$S\_N(f,x)\$ 对几乎处处 \$x\$ 收敛到 \$f(x)\$。

- 这是关于**未加权的部分和**的 a.e. 收敛的深定理；其证明使用了时间-频率分析、树分解与多尺度技术（Lacey–Thiele 给出现代化证明）。相比之下，Fejér 方法给出的收敛性更容易（而且对 \$L^1\$ 有自然的 \$L^1\$ 收敛和勒贝格点处收敛结论），但 Fejér 是“求和法”，并不能直接说明纯部分和的 a.e. 收敛。

## 其他求和法

- Abel 求和（Poisson 核）：通过令系数乘以 \$r^{|n|}\$（\$r\uparrow1\$）得到的近似也称作 Poisson 积分，具有良好的逼近性质并与解析延拓/调和函数理论相关。

---