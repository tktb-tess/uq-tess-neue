---
layout: ../../../layouts/MdLayout.astro
title: S₅ → S₆ exotic map
katex: true
---

5次の対称群 $\mathfrak{S}_5$ から6次の対称群 $\mathfrak{S}_6$ への例外的な推移的写像の構築方法。

### 目次

## Sylow 5-部分群の利用

$\mathfrak{S}_5$ のSylow 5-部分群 (位数5) は長さ5の巡回置換によって生成される。巡回置換は $5! / 5 = 24$ 個あり、またSylow 5-部分群には4つの巡回置換が含まれるので、巡回置換は $24 / 4 = 6$ 個のグループに分けられる。Sylow 5-部分群も6個ある。

```math
\begin{alignedat}{2}
H_1 &= \left\{ e, (12345), (13524), (14253), (15432) \right\} & \\
H_2 &= \left\{ e, (12354), (13425), (15243), (14532) \right\} & \\
H_3 &= \left\{ e, (12435), (14523), (13254), (15342) \right\} & \\
H_4 &= \left\{ e, (12453), (14325), (15234), (13542) \right\} & \\
H_5 &= \left\{ e, (12534), (15423), (13245), (14352) \right\} & \\
H_6 &= \left\{ e, (12543), (15324), (14235), (13452) \right\} &
\end{alignedat}
```

$i,j$ を1以上6以下の整数で、 $\sigma\in \mathfrak{S}_5,\ \tau\in H_i$ に対し $\sigma\tau\sigma^{-1} \in H_j$ を満たすペアとすると、 $\sigma \tau^n \sigma^{-1} = (\sigma \tau \sigma^{-1})^n \in H_j$ である。つまり部分群全体がほかの部分群と置換する。写像 $\psi$ を

```math
H_{\psi_\sigma(i)} = \sigma H_i \sigma^{-1}
```

と定義すれば、これが例外的な $\mathfrak{S}_5 \to \mathfrak{S}_6$ の写像になっている。

## 偶然同型の利用

同型写像 $\mathfrak{S}_5 \to \text{PGL}(2, \mathbb{F}_5)$ は

```math
\begin{aligned}
(1~2~3~4~5)
&\mapsto
\begin{bmatrix}
  1 & 1 \\ 0 & 1
\end{bmatrix} \\ \\
(1~2)
&\mapsto
\begin{bmatrix}
  0 & 2 \\ 1 & 0
\end{bmatrix}
\end{aligned}
```

と対応付けることにより構成でき、同様に $\mathfrak{A}_5 \to \text{PSL}(2, \mathbb{F}_5)$ も

```math
\begin{aligned}
(1~2~3~4~5) &\mapsto
\begin{bmatrix}
  1 & 1 \\ 0 & 1
\end{bmatrix} \\ \\
(1~5~3) &\mapsto
\begin{bmatrix}
  1 & 1 \\ 4 & 0
\end{bmatrix}
\end{aligned}
```

と対応付けられる。

5元体上の1次元射影直線 $\mathbf{P}^1 \mathbb{F}_5$ は 

```math
\mathbf{P}^1 \mathbb{F}_5 \ni [x:y] \mapsto
\left\{
\begin{aligned}
& x y^{-1} & &(y \neq 0) \\
& \infty & &(y = 0)
\end{aligned}
\right.
```

のように対応させることで、 $\mathbb{F}_5 \cup \{\infty\}$ と同一視できる。

$\mathbb{F}_5 \cup \{\infty\}$ には6つの点があり、6点への作用を置換とみることで自然に6次対称群への埋め込み $\mathfrak{S}_5 \simeq \text{PGL}(2, \mathbb{F}_5) \hookrightarrow \mathfrak{S}_6$ が構成できる。これが $\mathfrak{S}_5 \to \mathfrak{S}_6$ となる。
