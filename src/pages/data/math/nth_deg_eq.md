---
layout: ../../../layouts/MdLayout.astro
title: n次方程式の解法まとめ
description: よくクソ長い解みたいな感じで話題になる 3, 4 次方程式の解ですけど、一つ一つ順を追っていけば別にそこまで難しいものでもなくないですか?
---

### 目次

## 備考

- 最高次係数は常に非零とする。
- 1の原始3乗根 $e^{2\pi i/3} = \dfrac{-1 + \sqrt{3}i}{2}$ を $\omega$ とおく。
- 複素数 $\alpha$ を極座標形式で $|\alpha|e^{i\theta}$ と表す。ただし、 $\theta$ は $\alpha$ の偏角であり、範囲は $-\pi < \theta \le \pi$ とする。このとき、根号 $\sqrt[n]{\alpha}$ の値を $\sqrt[n]{|\alpha|}\,e^{i\theta/n}$ と定義する。また $\alpha^{1/n}$ の値も同様に定義する。
  - 実数に対する冪根の定義とは値が異なる場合があることに注意。例えば正の実数 $a$ に対する $\sqrt[3]{-a}$ は $-\sqrt[3]{a}$ ではなく $e^{\pi i/3}\sqrt[3]{a}$ となる。

## 1次方程式

$$
\begin{gather*}
a_1x + a_0 = 0 \\ \\
x = -\frac{a_0}{a_1}
\end{gather*}
$$

ただの式変形。特筆すべきことはない。

## 2次方程式

$$
a_2 x^2 + a_1 x + a_0 = 0
$$

$a_2$ で割り、平方完成する。

$$
\begin{gather*}
&x^2 + \frac{a_1}{a_2} x + \frac{a_0}{a_2} = 0 \\ \\
& \left( x + \frac{a_1}{2 a_2} \right)^2 - \frac{a_1^2}{4a_2^2} + \frac{a_0}{a_2} = 0 \\ \\
& \left( x + \frac{a_1}{2 a_2} \right)^2 = \frac{a_1^2 - 4a_0a_2}{4a_2^2}
\end{gather*}
$$

平方根をとり、整理する。

$$
\begin{gather*}
x + \frac{a_1}{2 a_2} = \pm \frac{\sqrt{a_1^2 - 4a_0a_2}}{2a_2} \\ \\
x = \frac{-a_1 \pm \sqrt{a_1^2 - 4a_0a_2}}{2a_2}
\end{gather*}
$$


## 3次方程式


$$
a_3 x^3 + a_2 x^2 + a_1 x + a_0 = 0
$$

### 立方完成

$a_3$ で割り、$b_k = \dfrac{a_k}{a_3} \ (k = 0, 1, 2)$ とおくと

$$
x^3 + b_2 x^2 + b_1 x + b_0 = 0
$$

立方完成して、2次の項を消す。立方完成後の3次の項は $\left(x + \dfrac{b_2}{3}\right)^3$ となるので、 $x = t - \dfrac{b_2}{3}$ と変換する。代入して整理すると

$$
\begin{alignedat}{2}
& x^3 + b_2 x^2 + b_1 x + b_0 = 0 \\ \\
& \left(t - \frac{b_2}{3}\right)^3 + b_2 \left(t - \frac{b_2}{3}\right)^2 + b_1 \left(t - \frac{b_2}{3}\right) + b_0 = 0 \\ \\
& t^3 - b_2 t^2 + \frac{b_2^2}{3} t - \frac{b_2^3}{27} + b_2 \left(t^2 - \frac{2b_2}{3} t + \frac{b_2^2}{9} \right) + b_1 \left(t - \frac{b_2}{3}\right) + b_0 = 0 \\ \\
& t^3 + \left(b_1 - \frac{b_2^2}{3} \right) t + b_0 + \frac{2b_2^3}{27} - \frac{b_1b_2}{3} = 0
\end{alignedat}
$$

が得られ

$$
\begin{alignedat}{2}
c_0 &= b_0 + \frac{2b_2^3}{27} - \frac{b_1b_2}{3} \\ \\
c_1 &= b_1 - \frac{b_2^2}{3}
\end{alignedat}
$$

とおけば、$t^3 + c_1t + c_0 = 0$ を得る。

$c_1 = 0$ のときは立方根をとるだけで済み、また $c_0 = 0$ のときは2次式以下に因数分解できるため、以降 $c_0 \ne 0,\ c_1 \ne 0$ とする。

### *Cardano*の解法

まず $t = u + v$ とおく。すると

$$
\begin{alignedat}{2}
& (u + v)^3 + c_1(u + v) + c_0 = 0 \\
& u^3 + v^3 + 3uv(u + v) + c_1(u + v) + c_0 = 0 \\
& u^3 + v^3 + c_0 + (3uv + c_1)(u + v) = 0 \qquad \cdots \text{(A)}
\end{alignedat}
$$

ここで、$\text{(A)}$ が成り立つためには、以下の2式が成立すれば十分である。

$$
\left\{
\begin{alignedat}{2}
u^3 + v^3 + c_0 &= 0 \\
3uv + c_1 &= 0
\end{alignedat}
\right.
$$

変形して

$$
\left\{
\begin{alignedat}{2}
u^3 + v^3 &= -c_0 \\
u^3v^3 &= -\left(\frac{c_1}{3}\right)^3
\end{alignedat}
\right.
$$

解と係数の関係より、 $u^3, v^3$ は以下の2次方程式の解になる。

$$
s^2 + c_0 s - \left(\frac{c_1}{3}\right)^3 = 0
$$

これを解くと

$$
s = -\frac{c_0}{2} \pm \sqrt{\left(\frac{c_0}{2}\right)^2 + \left(\frac{c_1}{3}\right)^3}
$$

二つの解のうちいずれか一つを選んで $u^3$ とする。ここでは符号が正の方を選ぶ。

$$
\begin{alignedat}{2}
u^3 &= -\frac{c_0}{2} + \sqrt{\left(\frac{c_0}{2}\right)^2 + \left(\frac{c_1}{3}\right)^3}
\end{alignedat}
$$

立方根をとると

$$
\begin{alignedat}{2}
u &= \omega^k \sqrt[3]{-\frac{c_0}{2} + \sqrt{\left(\frac{c_0}{2}\right)^2 + \left(\frac{c_1}{3}\right)^3}} \quad (k = 0, 1, 2)
\end{alignedat}
$$

のように、3つの解が得られる。

$uv = -\dfrac{c_1}{3}$ より

$$
\begin{alignedat}{2}
v = -\frac{c_1}{3u} = -\frac{c_1\omega^{-k}}{3}\left(-\frac{c_0}{2} + \sqrt{\left(\frac{c_0}{2}\right)^2 + \left(\frac{c_1}{3}\right)^3}\right)^{-1/3} \quad (k = 0, 1, 2)
\end{alignedat}
$$


よって、以下の三つの解が得られる。

$$
\begin{alignedat}{2}
t &= u + v \\ \\
&= \omega^k \sqrt[3]{-\frac{c_0}{2} + \sqrt{\left(\frac{c_0}{2}\right)^2 + \left(\frac{c_1}{3}\right)^3}}
-\frac{c_1\omega^{-k}}{3}\left(-\frac{c_0}{2} + \sqrt{\left(\frac{c_0}{2}\right)^2 + \left(\frac{c_1}{3}\right)^3}\right)^{-1/3} \quad (k = 0, 1, 2)
\end{alignedat}
$$

よって $a_3 x^3 + a_2 x^2 + a_1 x + a_0 = 0$ の解は

$$
\begin{alignedat}{2}
x &= - \frac{b_2}{3} + t \\ \\
&= -\frac{b_2}{3} + \omega^k \sqrt[3]{-\frac{c_0}{2} + \sqrt{\left(\frac{c_0}{2}\right)^2 + \left(\frac{c_1}{3}\right)^3}}
-\frac{c_1\omega^{-k}}{3}\left(-\frac{c_0}{2} + \sqrt{\left(\frac{c_0}{2}\right)^2 + \left(\frac{c_1}{3}\right)^3}\right)^{-1/3} \quad (k = 0, 1, 2)
\end{alignedat}
$$

ただし

$$
\begin{alignedat}{2}
b_l &= \frac{a_l}{a_3} \ \ (l = 0, 1, 2) \\ \\
c_0 &= b_0 + \frac{2b_2^3}{27} - \frac{b_1b_2}{3} \\ \\
c_1 &= b_1 - \frac{b_2^2}{3}
\end{alignedat}
$$

である。

また、積と立方根の交換をしても値が保たれる場合、つまり

$$
\begin{alignedat}{2}
&\sqrt[3]{-\frac{c_0}{2} + \sqrt{\left(\frac{c_0}{2}\right)^2 + \left(\frac{c_1}{3}\right)^3}}
\times \sqrt[3]{-\frac{c_0}{2} - \sqrt{\left(\frac{c_0}{2}\right)^2 + \left(\frac{c_1}{3}\right)^3}} \\ \\
&= \sqrt[3]{\left(-\frac{c_0}{2} + \sqrt{\left(\frac{c_0}{2}\right)^2 + \left(\frac{c_1}{3}\right)^3}\right)
\left(-\frac{c_0}{2} - \sqrt{\left(\frac{c_0}{2}\right)^2 + \left(\frac{c_1}{3}\right)^3}\right)}
\end{alignedat}
$$

が成り立つときは

$$
\begin{alignedat}{2}
v &= -\frac{c_1\omega^{-k}}{3\sqrt[3]{-c_0/2 + \sqrt{(c_0/2)^2 + (c_1/3)^3}}} \\ \\
&= -\frac{c_1\omega^{-k}\sqrt[3]{-c_0/2 - \sqrt{(c_0/2)^2 + (c_1/3)^3}}}
{3\sqrt[3]{\left(-c_0/2 + \sqrt{(c_0/2)^2 + (c_1/3)^3}\right)\left(-c_0/2 - \sqrt{(c_0/2)^2 + (c_1/3)^3}\right)}} \\ \\
&= -\frac{c_1\omega^{-k}\sqrt[3]{-c_0/2 - \sqrt{(c_0/2)^2 + (c_1/3)^3}}}
{3\sqrt[3]{(-c_0/2)^2 - \left((c_0/2)^2 + (c_1/3)^3\right)}} \\ \\
&= -\frac{c_1\omega^{-k}}{3\sqrt[3]{-(c_1/3)^3}}\sqrt[3]{-\frac{c_0}{2} - \sqrt{\left(\frac{c_0}{2}\right)^2 + \left(\frac{c_1}{3}\right)^3}} \\ \\
&= -\frac{c_1\omega^{-k}}{\sqrt[3]{-c_1^3}}\sqrt[3]{-\frac{c_0}{2} - \sqrt{\left(\frac{c_0}{2}\right)^2 + \left(\frac{c_1}{3}\right)^3}}
\end{alignedat}
$$

さらに $c_1$ が負の実数であるなら、$\sqrt[3]{-c_1^3} = -c_1$ が成立するので

$$
\begin{alignedat}{2}
v &= -\frac{c_1\omega^{-k}}{-c_1}\sqrt[3]{-\frac{c_0}{2} - \sqrt{\left(\frac{c_0}{2}\right)^2 + \left(\frac{c_1}{3}\right)^3}} \\ \\
&= \omega^{-k}\sqrt[3]{-\frac{c_0}{2} - \sqrt{\left(\frac{c_0}{2}\right)^2 + \left(\frac{c_1}{3}\right)^3}}
\end{alignedat}
$$

と表せ、解を

$$
\begin{alignedat}{2}
x &= -\frac{b_2}{3} + \omega^k \sqrt[3]{-\frac{c_0}{2} + \sqrt{\left(\frac{c_0}{2}\right)^2 + \left(\frac{c_1}{3}\right)^3}}
+ \omega^{-k}\sqrt[3]{-\frac{c_0}{2} - \sqrt{\left(\frac{c_0}{2}\right)^2 + \left(\frac{c_1}{3}\right)^3}} \quad (k = 0, 1, 2)
\end{alignedat}
$$

という形にできる。特に、$c_0, c_1$ が共に負の実数である場合、立方根の中身は共に正の実数か互いに共役な虚数となり、この形に変形できる。以下軽く理由を説明する。

立方根は偏角を1/3倍し、複素共役は-1倍する。これらの操作をどの順で適用しても、範囲 $\left(-\pi, \pi \right]$ の外に偏角の値がはみ出ることはない。正確には偏角が $\pi$ のとき、複素共役をとる操作で範囲をはみ出るが、これは負の実数であるので条件に合致しない。つまり、$\alpha$ が正の実数あるいは虚数であるとき、$\sqrt[3]{\overline{\alpha}} = \overline{\sqrt[3]{\alpha}}$ が成り立つ。

よって

$$
\begin{alignedat}{2}
\sqrt[3]{\alpha}\sqrt[3]{\overline{\alpha}} &= \sqrt[3]{\alpha}\overline{\sqrt[3]{\alpha}} \\
&= |\sqrt[3]{\alpha}|^2 \\
&= \sqrt[3]{|\alpha|^2} \\
&= \sqrt[3]{\alpha\overline{\alpha}}
\end{alignedat}
$$

となり、立方根と積を交換しても等しいことが分かる。

### 還元不能 (casus irreducibilis)

以下 $c_0, c_1$ を実数とする。

上の $\left(\dfrac{c_0}{2}\right)^2 + \left(\dfrac{c_1}{3}\right)^3$ の値が負のとき、$u^3, v^3$ は虚数となる。不等式を立てて変形すると

$$
\begin{alignedat}{2}
\left(\frac{c_0}{2}\right)^2 + \left(\frac{c_1}{3}\right)^3 &< 0 \\ \\
27c_0^2 + 4c_1^3 &< 0 \\ \\
- 4c_1^3 - 27c_0^2 &> 0
\end{alignedat}
$$

である。

また、3次方程式 $a_3 x^3 + a_2 x^2 + a_1 x + a_0 = 0$ の判別式 $\Delta$ は

$$
\Delta = -4a_1^3 a_3 + a_1^2 a_2^2 - 4a_0 a_2^3 + 18a_0 a_1 a_2 a_3 - 27 a_0^2 a_3^2
$$

である。これに $a_0 = c_0, \ a_1 = c_1, \ a_2 = 0, \ a_3 = 1$ を代入すると

$$
\Delta = -4c_1^3 - 27c_0^2
$$

つまり $u^3, v^3$ が虚数であることと、$\Delta > 0$ すなわち3次方程式が3つの実数解をもつことは、実は同値なのである。さらに3次方程式が既約な場合、虚数を避けて代数的に解を書き下すことはできないことが分かっており、これを **還元不能 (casus irreducibilis)** という。

### *Viète*の解法

代数的な解法に拘らなければ、$\Delta > 0$ の場合に虚数を避けることもできる。立方完成までは同じなので $t^3 + c_1 t + c_0 = 0$ の形から始める。

$c_0, c_1$ を $0$ ではない実数とし $\Delta > 0$ とする。またこのとき $c_1 < 0$ である。なぜなら $c_1 > 0$ であれば $\Delta = -4c_1^3 - 27c_0^2 < 0$ となるため。

$\cos$ の3倍角の公式 $\cos{3\theta} = 4\cos^3{\theta} - 3\cos{\theta}$ を変形して

$$
\cos^3{\theta} - \frac{3}{4} \cos{\theta} - \frac{1}{4} \cos{3\theta} = 0
$$

3次方程式をこの変形3倍角の公式が使える形に持っていきたい。そのために $A$ をある $0$ でない複素数（値は後で求める）として $t = A\cos{\theta}$ とおき代入する。

$$
\begin{alignedat}{2}
&(A\cos{\theta})^3 + c_1 A\cos{\theta} + c_0 = 0 \\ \\
& \cos^3{\theta} + \frac{c_1}{A^2}\cos{\theta} + \frac{c_0}{A^3} = 0
\end{alignedat}
$$

変形3倍角の公式と係数を比較して

$$
\begin{alignedat}{2}
\frac{c_1}{A^2} &= -\frac{3}{4} \\ \\
\frac{c_0}{A^3} &= -\frac{1}{4} \cos{3\theta}
\end{alignedat}
$$

1つ目の式から $A = \pm 2\sqrt{-\dfrac{c_1}{3}}$ が求められる。符号はどちらでも良いのでここでは正の方をとる。

$$
\begin{alignedat}{2}
\cos{3\theta} &= -\frac{4c_0}{A^3} \\ \\
&= -4c_0 \times \frac{1}{8}\left(-\frac{3}{c_1}\right)\sqrt{-\frac{3}{c_1}} \\ \\
&= \frac{3\sqrt{3}c_0}{2c_1\sqrt{-c_1}}
\end{alignedat}
$$

$\cos$ の逆関数で値域を $[0, \pi]$ に制限したものを $\operatorname{Cos}^{-1}$ とすると、$\theta$ は

$$
\begin{alignedat}{2}
3\theta &= \pm \operatorname{Cos}^{-1}{\frac{3\sqrt{3}c_0}{2c_1\sqrt{-c_1}}} + 2k \pi \\ \\
\theta &= \pm \frac{1}{3} \operatorname{Cos}^{-1}{\frac{3\sqrt{3}c_0}{2c_1\sqrt{-c_1}}} + \frac{2}{3} k\pi \quad (k \in \mathbb{Z})
\end{alignedat}
$$

と求められる。

ここで $\operatorname{Cos}^{-1}$ の定義域は $[-1, 1]$ なので、$\dfrac{3\sqrt{3}c_0}{2c_1\sqrt{-c_1}}$ がこの範囲内になるのかの確認が必要だが、$\Delta = -4c_1^3 - 27c_0^2 > 0$ より $0 < 27 c_0^2 < 4(-c_1)^3$ がわかり、したがって

$$
0 < \frac{27c_0^2}{4(-c_1)^3} < 1
$$

また

$$
\left(\frac{3\sqrt{3}c_0}{2c_1\sqrt{-c_1}}\right)^2 = \frac{27c_0^2}{4(-c_1)^3}
$$

であるので、$-1 < \dfrac{3\sqrt{3}c_0}{2c_1\sqrt{-c_1}} < 1$ であることが分かる。

さて、上で求めた $\theta$ は無限個あるが、$\cos$ の周期性と偶関数性から、複数の $\theta$ が同じ $t$ の値に対応する。そのような重複する $\theta$ を除きつつ、 $t = A \cos{\theta}$ を求めると次の三つになる。

$$
t = 2\sqrt{-\frac{c_1}{3}} \cos{\left(\frac{1}{3}\operatorname{Cos}^{-1}{\frac{3\sqrt{3}c_0}{2c_1\sqrt{-c_1}} + \frac{2}{3}}k\pi\right)} \quad (k = 0, 1, 2)
$$

よって $a_3 x^3 + a_2 x^2 + a_1 x + a_0 = 0$ の解は

$$
\begin{alignedat}{2}
x &= -\frac{b_2}{3} + t \\ \\
&= -\frac{b_2}{3} + 2\sqrt{-\dfrac{c_1}{3}} \cos{\left(\frac{1}{3}\operatorname{Cos}^{-1}{\frac{3\sqrt{3}c_0}{2c_1\sqrt{-c_1}} + \frac{2}{3}}k\pi\right)} \quad (k = 0, 1, 2)
\end{alignedat}
$$

ただし

$$
\begin{alignedat}{2}
b_l &= \frac{a_l}{a_3} \ \ (l = 0, 1, 2) \\ \\
c_0 &= b_0 + \frac{2b_2^3}{27} - \frac{b_1b_2}{3} \\ \\
c_1 &= b_1 - \frac{b_2^2}{3}
\end{alignedat}
$$

### 例

次の3次方程式を解いてみる。

$$
x^3 - 6x^2 + 3x + 6 = 0
$$

$x = t + 2$ とおいて2次の項を消す。

$$
\begin{alignedat}{2}
(&t + 2)^3 - 6(t + 2)^2 + 3(t + 2) + 6 = 0 \\
(&t^3 + 6t^2 + 12t + 8) - 6(t^2 + 4t + 4) + 3(t + 2) + 6 = 0 \\
&t^3 + 12t + 8 - 24t - 24 + 3t + 6 + 6 = 0 \\
&t^3 - 9t - 4 = 0
\end{alignedat}
$$

まず*Cardano*の解法で解いてみる。

$t = u + v$ とおいて整理。

$$
\begin{alignedat}{2}
&(u + v)^3 - 9(u + v) - 4 = 0 \\
&u^3 + v^3 - 4 + (3uv - 9)(u + v) = 0
\end{alignedat}
$$

よって

$$
\left\{
\begin{alignedat}{2}
u^3 + v^3 - 4 &= 0 \\
3uv - 9 &= 0
\end{alignedat}
\right.
$$

が成り立てば十分。変形して

$$
\left\{
\begin{alignedat}{2}
u^3 + v^3 &= 4 \\
u^3v^3 &= 27
\end{alignedat}
\right.
$$

よって $u^3, v^3$ は 2次方程式 $s^2 - 4s + 27 = 0$ の解になる。これを解いて

$$
\begin{alignedat}{2}
s &= 2 \pm \sqrt{(-2)^2 - 27} \\
&= 2 \pm i\sqrt{23}
\end{alignedat}
$$

二つある内のどちらか片方を $u^3$ とする。ここでは符号が正の方を選ぶ。

$$
\begin{alignedat}{2}
u^3 &= 2 + i\sqrt{23}
\end{alignedat}
$$

よって

$$
u = \omega^k \sqrt[3]{2 + i\sqrt{23}} \quad (k = 0, 1, 2)
$$

$uv = 3$ より

$$
\begin{alignedat}{2}
v &= \frac{3}{u} \\ \\
&= \frac{3\omega^{-k}}{\sqrt[3]{2 + i\sqrt{23}}} \quad (k = 0, 1, 2)
\end{alignedat}
$$

分母分子に $\sqrt[3]{2 - i\sqrt{23}}$ をかける。$2 + i\sqrt{23}$ と $2 - i\sqrt{23}$ は互いに共役な虚数であるので

$$
\sqrt[3]{2 + i\sqrt{23}}\sqrt[3]{2 - i\sqrt{23}} = \sqrt[3]{(2 + i\sqrt{23})(2 - i\sqrt{23})} = \sqrt[3]{27} = 3
$$

が成立する。よって

$$
\begin{alignedat}{2}
v &= \frac{3\omega^{-k}\sqrt[3]{2 - i\sqrt{23}}}{\sqrt[3]{2 + i\sqrt{23}}\sqrt[3]{2 - i\sqrt{23}}} \\ \\
&= \frac{3\omega^{-k}\sqrt[3]{2 - i\sqrt{23}}}{3} \\ \\
&= \omega^{-k}\sqrt[3]{2 - i\sqrt{23}} \quad (k = 0, 1, 2)
\end{alignedat}
$$

したがって $t$ は以下のように表せる。

$$
t = \omega^k \sqrt[3]{2 + i\sqrt{23}} + \omega^{-k} \sqrt[3]{2 - i\sqrt{23}} \quad (k = 0, 1, 2)
$$

よって $x^3 - 6x^2 + 3x + 6 = 0$ の解は

$$
x = 2 + \omega^k \sqrt[3]{2 + i\sqrt{23}} + \omega^{-k} \sqrt[3]{2 - i\sqrt{23}} \quad (k = 0, 1, 2)
$$

である。3つの解は全て実数であるが、この式から虚数単位 $i$ を除去することはできない（還元不能）。

*Viète*の解法でも求めてみる。$t = A\cos{\theta}$ とおいて代入。

$$
\begin{alignedat}{2}
&(A\cos{\theta})^3 - 9A\cos{\theta} - 4 = 0 \\ \\
&\cos^3{\theta} - \frac{9}{A^2} \cos{\theta} - \frac{4}{A^3} = 0
\end{alignedat}
$$

$\cos^3{\theta} - \dfrac{3}{4}\cos{\theta} - \dfrac{1}{4}\cos{3\theta} = 0$ と係数比較して

$$
\begin{alignedat}{2}
-\dfrac{9}{A^2} &= -\dfrac{3}{4} \\ \\
-\dfrac{4}{A^3} &= -\dfrac{1}{4}\cos{3\theta}
\end{alignedat}
$$

よって1つ目の式より $A = \pm 2\sqrt{3}$ である。ここでは正の方を採用する。2つ目に代入して

$$
\begin{gather*}
\cos{3\theta} = \frac{16}{A^3} = \frac{16}{8\cdot3\sqrt{3}} = \frac{2\sqrt{3}}{9} \\ \\
t = 2\sqrt{3} \cos{\left(\frac{1}{3} \operatorname{Cos}^{-1}{\frac{2\sqrt{3}}{9}} + \frac{2}{3} k\pi\right)} \quad (k = 0, 1, 2)
\end{gather*}
$$

よって $x^3 - 6x^2 + 3x + 6 = 0$ の解は

$$
x = 2 + 2\sqrt{3} \cos{\left(\frac{1}{3} \operatorname{Cos}^{-1}{\frac{2\sqrt{3}}{9}} + \frac{2}{3} k\pi\right)} \quad (k = 0, 1, 2)
$$

である。

## 4次方程式

$$
a_4x^4 + a_3 x^3 + a_2 x^2 + a_1 x + a_0 = 0
$$

### 3次の項の消去

まず $a_4$ で割り、$b_k = \dfrac{a_k}{a_4} \ (k = 0, 1, 2, 3)$ とおくと

$$
x^4 + b_3 x^3 + b_2 x^2 + b_1 x + b_0 = 0
$$

3次方程式と同様の方法で3次の項を消す。4次の項は $\left( x + \dfrac{b_3}{4} \right)^4$ となるので $x = t - \dfrac{b_3}{4}$ と変換する。代入して整理すると

$$
\begin{alignedat}{2}
& x^4 + b_3 x^3 + b_2 x^2 + b_1 x + b_0 = 0 \\ \\
& \left( t - \frac{b_3}{4} \right)^4 + b_3 \left( t - \frac{b_3}{4} \right)^3 + b_2 \left( t - \frac{b_3}{4} \right)^2 + b_1 \left( t - \frac{b_3}{4} \right) + b_0 = 0 \\ \\
& t^4 - b_3 t^3 + \frac{3b_3^2}{8} t^2 - \frac{b_3^3}{16} t + \frac{b_3^4}{256} + b_3 \left(t^3 - \frac{3b_3}{4} t^2 + \frac{3b_3^2}{16} t - \frac{b_3^3}{64}\right) + b_2 \left(t^2 - \frac{b_3}{2}t + \frac{b_3^2}{16} \right) + b_1 \left( t - \frac{b_3}{4} \right) + b_0 = 0 \\ \\
& t^4 + \left(b_2 - \frac{3b_3^2}{8}\right) t^2 + \left(b_1 + \frac{b_3^3}{8} - \frac{b_2b_3}{2}\right) t  + b_0 - \frac{3b_3^4}{256} + \frac{b_2b_3^2}{16} - \frac{b_1b_3}{4} = 0
\end{alignedat}
$$

となり

$$
\begin{alignedat}{2}
c_0 &= b_0 - \frac{3b_3^4}{256} + \frac{b_2b_3^2}{16} - \frac{b_1b_3}{4} \\ \\
c_1 &= b_1 + \frac{b_3^3}{8} - \frac{b_2b_3}{2} \\ \\
c_2 &= b_2 - \frac{3b_3^2}{8}
\end{alignedat}
$$

とおけば、$t^4 + c_2 t^2 + c_1 t + c_0 = 0$ を得る。$c_1 = 0$ のときは複二次式になり、また $c_0 = 0$ のときは3次式以下に因数分解できるので、以降 $c_0 \ne 0,\ c_1 \ne 0$ とする。

### *Ferrari*の解法

$\lambda$ をある複素数（値は後で求める）として、$2\lambda t^2 + \lambda^2 - 2 \lambda t^2 - \lambda^2$ を加える。$t^4 + 2\lambda t^2 + \lambda^2 = (t^2 + \lambda)^2$ であることを使って変形すると

$$
\begin{alignedat}{2}
& t^4 + 2\lambda t^2 + \lambda^2 - 2\lambda t^2 - \lambda^2 + c_2 t^2 + c_1 t + c_0 = 0 \\
& (t^2 + \lambda)^2 + (c_2 - 2\lambda) t^2 + c_1 t + c_0 - \lambda^2 = 0 \\
& (t^2 + \lambda)^2 - \{(2\lambda - c_2)t^2 - c_1 t + \lambda^2 - c_0\} = 0
\end{alignedat}
$$

ここで、左辺が (2乗) - (2乗) の形になれば、左辺は二つの2次式に因数分解出来て2次方程式に帰着できる。よって第2項 $(2\lambda - c_2)t^2 - c_1 t + \lambda^2 - c_0$ が完全平方になるように $\lambda$ の値を決める。これは2次方程式 $(2\lambda - c_2)t^2 - c_1 t + \lambda^2 - c_0 = 0$ が重解をもつこと、またその判別式が0であることと同値。判別式を $\Delta$ とすると

$$
\begin{alignedat}{2}
\Delta &= (-c_1)^2 - 4(2\lambda - c_2)(\lambda^2 - c_0) \\
&= - 4(2\lambda^3 - c_2\lambda^2 - 2c_0\lambda + c_0c_2) + c_1^2 \\
&= -8\lambda^3 + 4c_2\lambda^2 + 8c_0\lambda - 4c_0c_2 + c_1^2
\end{alignedat}
$$

であるので、$\lambda$ は3次方程式

$$
8\lambda^3 - 4c_2\lambda^2 - 8c_0\lambda + 4c_0c_2 - c_1^2 = 0
$$

を満たす。これを解いて $\lambda$ を求める。

2次方程式 $ax^2 + bx + c = 0$ が重解をもつとき

$$
\begin{alignedat}{2}
ax^2 + bx + c &= a\left(x + \frac{b}{2a}\right)^2 \\ \\
&= \left(\sqrt{a}x + \frac{b}{2\sqrt{a}}\right)^2
\end{alignedat}
$$

と変形できる。よって第2項は

$$
\begin{alignedat}{2}
&(2\lambda - c_2)t^2 - c_1 t + \lambda^2 - c_0 \\ \\
&= \left(\sqrt{2\lambda - c_2}t - \frac{c_1}{2\sqrt{2\lambda - c_2}}\right)^2
\end{alignedat}
$$

である。

$$
\begin{alignedat}{2}
d_1 &= \sqrt{2\lambda - c_2} \\ \\
d_2 &= -\frac{c_1}{2d_1}
\end{alignedat}
$$

とおけば、4次方程式は

$$
\begin{alignedat}{2}
&(t^2 + \lambda)^2 - \{(2\lambda - c_2)t^2 - c_1 t + \lambda^2 - c_0\} = 0 \\
&(t^2 + \lambda)^2 - \left(d_1t + d_2\right)^2 = 0 \\
\{&(t^2 + \lambda) + (d_1 t + d_2)\}\{(t^2 + \lambda) - (d_1 t + d_2)\} = 0 \\
&(t^2 + d_1 t + d_2 + \lambda)(t^2 - d_1 t - d_2 + \lambda) = 0
\end{alignedat}
$$

と分解できる。$t^2 + d_1 t + d_2 + \lambda = 0$ の解は

$$
t = -\frac{d_1}{2} \pm \sqrt{\frac{d_1^2}{4} - d_2 - \lambda}
$$

$t^2 - d_1 t - d_2 + \lambda = 0$ の解も同様に求めて

$$
t = \frac{d_1}{2} \pm \sqrt{\frac{d_1^2}{4} + d_2 - \lambda}
$$

よって $a_4 x^4 + a_3 x^3 + a_2 x^2 + a_1 x + a_0 = 0$ の解は

$$
\begin{alignedat}{2}
x = - &\frac{d_1}{2} - \frac{b_3}{4} \pm \sqrt{\frac{d_1^2}{4} - d_2 - \lambda}, \\ \\
&\frac{d_1}{2} - \frac{b_3}{4} \pm \sqrt{\frac{d_1^2}{4} + d_2 - \lambda}
\end{alignedat}
$$

ただし、$\lambda$ は3次方程式 $8\lambda^3 - 4c_2\lambda^2 - 8c_0\lambda + 4c_0c_2 - c_1^2 = 0$ の解であり、また

$$
\begin{alignedat}{2}
b_l &= \frac{a_l}{a_4} \ \ (l = 0, 1, 2, 3) \\ \\
c_0 &= b_0 - \frac{3b_3^4}{256} + \frac{b_2b_3^2}{16} - \frac{b_1b_3}{4} \\ \\
c_1 &= b_1 + \frac{b_3^3}{8} - \frac{b_2b_3}{2} \\ \\
c_2 &= b_2 - \frac{3b_3^2}{8} \\ \\
d_1 &= \sqrt{2\lambda - c_2} \\ \\
d_2 &= -\frac{c_1}{2d_1}
\end{alignedat}
$$

である。

### 例

次の4次方程式を解いてみる。

$$
x^4 - 4x^3 - 18x^2 + 16x + 2 = 0
$$

$x = t + 1$ とおいて3次の項を消す。

$$
\begin{alignedat}{2}
(&t + 1)^4 - 4(t + 1)^3 - 18(t + 1)^2 + 16(t + 1) + 2 = 0 \\
(&t^4 + 4t^3 + 6t^2 + 4t + 1) - 4(t^3 + 3t^2 + 3t + 1) - 18(t^2 + 2t + 1) + 16(t + 1) + 2 = 0 \\
&t^4 + 6t^2 + 4t + 1 - 12t^2 - 12t - 4 - 18t^2 - 36t - 18 + 16t + 16 + 2 = 0 \\
&t^4 - 24 t^2 - 28t - 3 = 0
\end{alignedat}
$$

$\lambda^2 + 2\lambda t^2 - \lambda^2 - 2\lambda t^2$ を加えて整理する。

$$
\begin{alignedat}{2}
&t^4 + 2\lambda t^2 + \lambda^2 - 24 t^2 - 2\lambda t^2 - 28t - \lambda^2 - 3 = 0 \\
&(t^2 + \lambda)^2 - (2\lambda + 24)t^2 - 28t - \lambda^2 - 3 = 0 \\
&(t^2 + \lambda)^2 - \{(2\lambda + 24)t^2 + 28t + \lambda^2 + 3\} = 0
\end{alignedat}
$$

これの第2項が完全平方になればよい。$t$ についての2次方程式 $(2\lambda + 24)t^2 + 28t + \lambda^2 + 3 = 0$ の判別式を $\Delta$ とおくと

$$
\begin{alignedat}{2}
\Delta &= 14^2 - (2\lambda + 24)(\lambda^2 + 3) \\
&= 196 - (2\lambda^3 + 6\lambda + 24\lambda^2 + 72) \\
&= -2\lambda^3 - 24\lambda^2 - 6\lambda + 124 \\
&= -2(\lambda^3 + 12\lambda^2 + 3\lambda - 62)
\end{alignedat}
$$

よって $\lambda$ は3次方程式 $\lambda^3 + 12\lambda^2 + 3\lambda - 62 = 0$ を満たす。

解を一つ（がんばって）探すと、$\lambda = 2$ が解になる事が分かる。よって、元の4次方程式は

$$
\begin{alignedat}{2}
&(t^2 + \lambda)^2 - \{(2\lambda + 24)t^2 + 28t + \lambda^2 + 3\} = 0 \\
&(t^2 + 2)^2 - (28t^2 + 28t + 7) = 0 \\
&(t^2 + 2)^2 - 7(2t + 1)^2 = 0 \\
\{&(t^2 + 2) - \sqrt{7}(2t + 1)\}\{(t^2 + 2) + \sqrt{7}(2t + 1)\} = 0 \\
&(t^2 - 2\sqrt{7}t + 2 - \sqrt{7})(t^2 + 2\sqrt{7}t + 2 + \sqrt{7}) = 0
\end{alignedat}
$$

と因数分解できる。$t^2 - 2\sqrt{7}t + 2 - \sqrt{7} = 0$ の解は

$$
t = \sqrt{7} \pm \sqrt{5 + \sqrt{7}}
$$


$t^2 + 2\sqrt{7}t + 2 + \sqrt{7} = 0$ の解も同様に求めると

$$
t = -\sqrt{7} \pm \sqrt{5 - \sqrt{7}}
$$

よって $x^4 - 4x^3 - 18x^2 + 16x + 2 = 0$ の解は

$$
\begin{alignedat}{2}
x = 1 &+ \sqrt{7} \pm \sqrt{5 + \sqrt{7}}, \\
1 &- \sqrt{7} \pm \sqrt{5 - \sqrt{7}}
\end{alignedat}
$$

である。

## 5次方程式

皆さんご存知の通り、5次以降の方程式には任意の方程式に対して使える代数的解法は存在しない。だが代数的解法に拘らなければ解く方法はある。楕円モジュラー関数を使う方法・正20面体方程式を使う方法・超冪根を用いる方法などがある。

工事中……
