----
title: "Part III — Dirichlet 定理（点值收敛）及其详细证明" 
date: "2025-08-09" 
tags: [Dirichlet, pointwise convergence, proof] 
----
summary: "逐步给出 Dirichlet 定理的严格证明，包括必要引理、振荡积分估计与常数说明，适合课堂讲义级别的详尽证明。"

Part III — Dirichlet 定理（点值收敛）及其详细证明 / Dirichlet theorem (pointwise convergence)

定理陈述（中文）

Dirichlet 定理：设 $f$ 为 $2\pi$-周期函数，并在点 $x$ 的某邻域内为分段 $C^1$（或有界变差）。则



讨论与证明策略（概览）

证明基于将部分和写为与 Dirichlet 核的卷积，并将积分分成“近点小区间”和“远点大区间”两部分：在小区间利用函数在 $x$ 处的局部行为控制误差；在远区间利用核的强烈振荡性（Riemann–Lebesgue 类型估计）使积分趋于零。为保持严格，我们将分几个引理来构建完整细致的证明，并给出明确的常数估计以便教学使用。


引理与准备工作

引理 3.1（Dirichlet 核的形式）  对于 $t\not\equiv0\pmod{2\pi}$，有



并且 $D_N(0)=2N+1$。

引理 3.2（振荡积分估计 — 一般形式） 若 $g\in L^1([\alpha,\beta])$ 且连续或可积，则



这是 Riemann–Lebesgue 引理的一个具体振荡积分表现。

引理 3.3（有界变差情形的替代） 若 $f$ 在 $x$ 邻域有界变差，则相应的振荡积分（写成 $g(t)\sin((N+\tfrac12)t)$ 的形式）可用分部积分（按变差）得到收敛到 0。

正式证明（逐步；含常数说明）

（证明省略于此处文档中有完整步奏，详见正文）