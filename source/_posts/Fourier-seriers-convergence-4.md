---
title: Fourier-seriers-convergence-4
categories:
  - []
date: 2025-08-10 04:58:12
tags:
---

> * * 

<!--more-->
----


`"https://cdn.jsdelivr.net/gh/zhu-jl18/cdn4blog/year-month/name" style= "width: 40% "`

## title: "Part IV — Cesàro / Fejér 平均与 Fejér 定理（严格证明）" date: "2025-08-09" tags: [Fejér, Cesaro, theorem, proof] summary: "对 Fejér 定理给出标准而严格的证明：连续函数的一致收敛与 \$L^1\$ 的收敛，并讨论勒贝格点处的点值收敛。"

# Part IV — Cesàro / Fejér 平均与 Fejér 定理（严格证明）

## 定理陈述（中文）

**Fejér 定理（连续）**：若 \$f\in C(\mathbb T)\$，则 Fejér 平均 \$\sigma\_N(f)\$ 一致收敛到 \$f\$。

**Fejér 定理（\$L^1\$ 与勒贝格点）**：若 \$f\in L^1(\mathbb T)\$，则 \$\sigma\_N(f)\to f\$ 于 \$L^1\$；并且在每个勒贝格点 \$x\$（Lebesgue point）有点值 \$\sigma\_N(f,x)\to f(x)\$。

## 证明（连续情形；一致收敛）

（证明在文档中已给出详细逐步论证，依赖 Fejér 核的非负性、归一化与质量集中性质。）