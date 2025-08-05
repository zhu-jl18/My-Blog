---
title: LaTex-Algorithm-and-Pseudocode
date: 2021-04-09 11:19:48
tags:
categories: LaTeX
---

Beautiful Algorithm-and-Pseudocode Style.

<!--more-->

**References:**
- [aaa](232)


### Code

```latex
\documentclass{article}
\usepackage{algorithm}
\usepackage{algorithmic}
\begin{document}
\begin{algorithm}
    \caption{Calculate $y = x^n$}
    \label{alg1}
    \begin{algorithmic}
    \REQUIRE $n \geq 0 \vee x \neq 0$
    \ENSURE $y = x^n$
    \STATE $y \gets 1$
    \IF{$n < 0$}
    \STATE $X \gets 1 / x$
    \STATE $N \gets -n$
    \ELSE
    \STATE $X \gets x$
    \STATE $N \gets n$
    \ENDIF
    \WHILE{$N \neq 0$}
    \IF{$N$ is even}
    \STATE $X \gets X \times X$
    \STATE $N \gets N / 2$
    \ELSE[$N$ is odd]
    \STATE $y \gets y \times X$
    \STATE $N \gets N - 1$
    \ENDIF
    \ENDWHILE
    \end{algorithmic}
  \end{algorithm}
\end{document}
```

### Style

It looks like:
<img src ="https://cdn.jsdelivr.net/gh/zhu-jl18/cdn4blog/2021-4/LaTex-Algorithm-and-Pseudocode-01.PNG" style="width:%60">