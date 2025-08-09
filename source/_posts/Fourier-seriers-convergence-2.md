----
 title: "Part II — 符号、卷积与核：Dirichlet 核与 Fejér 核" date: "2025-08-09" tags: [Fourier, Dirichlet Kernel, Fejér Kernel] summary: "将部分和写成卷积，推导 Dirichlet 和 Fejér 核，并证明其重要性质（归一化、非负性、近似恒等元）。"
----

# Part II — 符号、卷积与核：Dirichlet 核与 Fejér 核 / Notation, convolution, Dirichlet & Fejér kernels

## 部分和的卷积表达

对 \$f\in L^1\$，

$$
S_N(f,x) = \sum_{n=-N}^N\hat f(n)e^{inx} = \frac{1}{2\pi}\int_{-\pi}^{\pi} f(x-t)D_N(t)\,dt,
$$

其中

$$
D_N(t)=\sum_{n=-N}^N e^{int}=\frac{\sin\big((N+\tfrac12)t\big)}{\sin(t/2)}.
$$

（在 \$t=0\$ 取极限值 \$D\_N(0)=2N+1\$。）

## Cesàro (C,1) 平均与 Fejér 核

定义 Fejér 平均（C,1）：

$$
\sigma_N(f,x)=\frac{1}{N+1}\sum_{k=0}^N S_k(f,x).
$$

存在核 \$F\_N\$ 使得

$$
\sigma_N(f,x)=\frac{1}{2\pi}\int_{-\pi}^{\pi} f(x-t)F_N(t)\,dt,
$$

且

$$
F_N(t)=\frac{1}{N+1}\sum_{k=0}^N D_k(t)
      =\frac{1}{N+1}\left(\frac{\sin\!\big(\tfrac{N+1}{2}t\big)}{\sin(t/2)}\right)^2.
$$

## 关键性质证明（逐条）

**命题 2.1（归一化）**：\$\dfrac{1}{2\pi}\int\_{-\pi}^{\pi} F\_N(t),dt = 1\$.\ *证明*：由定义 \$F\_N\$ 为部分和的平均，并且每个 \$D\_k\$ 对应 Fourier 系数 \$\widehat{1}(0)=1\$，故 \$F\_N\$ 的积分为 \$2\pi\$。

**命题 2.2（非负性）**：对所有 \$t\$ 有 \$F\_N(t)\ge0\$.\ *证明*：由显式公式 \$F\_N(t)=\dfrac{1}{N+1}\dfrac{\sin^2(\tfrac{N+1}{2}t)}{\sin^2(t/2)}\ge0.\$

**命题 2.3（近似单位元 / concentration）**：对于任意 \$\delta>0\$，有

$$
\int_{|t|\ge\delta} F_N(t)\,dt \to 0\quad (N\to\infty).
$$

*证明要点*：对 \$|t|\ge\delta\$ 有 \$\sin^2(t/2)\ge c(\delta)>0\$. 因此 \$F\_N(t)\le \frac{1}{(N+1)c(\delta)}\$，积分上界 \$\le\frac{2\pi}{(N+1)c(\delta)}\to0\$。

**注（与 Dirichlet 核对比）**：虽然 \$\int D\_N = 2\pi\$（归一化），但 \$|D\_N|*{L^1}\$ 随 \$N\$ 增大呈对数增长（可证明 \$|D\_N|*{L^1}\approx C\log N\$），因此 \$D\_N\$ 不是良性的近似单位元；而 \$F\_N\$ 的非负性加上质量集中性质使其在 \$L^1\$ 与均匀逼近中更为有利。

---