---
title: "From Empirical Risk Minimization to REINFORCE"
date: 2026-01-24
draft: true
thumbnail: "/images/blog/docker/thumbnail.png"
summary: How are Empirical Risk Minimization, Montecarlo Estimation, Score Gradient Estimation and REINFORCE connected?
---

In this blog post I'll attempt to clearly link Empirical Risk Minimization, Montecarlo Estimation, Score Gradient Estimation and REINFORCE from first principles. The goal is to present them under the same view of a learning problem, estimation and inductive inference, which is the business that everyone in AI is involved with. To start let me set the stage first with Empirical Risk Minimization. 

## Empirical Risk Minimization

Vapnik in his book **The Nature of Statistical Learning Theory** [[1]](#ref-1) defined the learning problem as: 

`a problem of finding a desired dependence using a *limited* number of observations.`

This dependence is defined under three components:

1. A generator $G$ of random vectors $x \in \mathbb{R}^n$, drawn independently from a fixed but unknown probability distribution function $F(x)$.
2. A supervisor $S$ who returns an output value $y$ to every input vector $x$, according to a conditional distribution function $F(y|x)$, also fixed but unknown.
3. A learning machine $LM$ capable of implementing a set of functions $f(x, \alpha)$, $\alpha \in \Lambda$, where $\Lambda$ is a set of parameters.

This desired dependence is found by choosing from the given set of functions $f(x, \alpha)$, $\alpha \in \Lambda$, the one that best approximates the supervisor's response given a finite sample $\{(x\_i, y\_i)\}\_{i=1}^{l} \sim F(x,y) = F(x)F(y|x)$.

This learning problem can be approached via **Risk Minimization** in which the goal is to measure a loss or discrepancy $L(y, f(x, \alpha))$ between $y$ and $f(x, \alpha)$ and find the $\alpha$ that minimizes the expected discrepancy. Note that we are minimizing the *expected* risk functional $R(f)$ since both $x, y$ are random variables!

 $$R(f) = \int L(y, f(x, \alpha)) \, dF(x, y) = \underset{(x,y) \sim F(x,y)}{\mathbb{E}}[L(y, f(x, \alpha))]$$

Unfortunately we can't minimize this function as $F(x, y)$ is unknown. As such, we minimize the **Empirical Risk** which is defined as:


$$R\_{emp}(f) = \frac{1}{l} \sum\_{i=1}^{l} L(y\_i, f(x\_i))$$

Thus, the minimization of this empirical risk functional is solved by

$$f^* = \underset{f \in \mathcal{H}}{\arg\min} \, R\_{emp}(f) = \underset{f \in \mathcal{H}}{\arg\min} \frac{1}{l} \sum\_{i=1}^{l} L(y\_i, f(x\_i))$$

where $\mathcal{H} = \{f(x, \alpha) : \alpha \in \Lambda\}$ is the hypothesis space, the set of all functions that the learning machine can implement by varying the parameter $\alpha$ over the parameter space $\Lambda$.

Note that the Law of Large Numbers alone is not sufficient to guarantee that minimizing the empirical risk minimizes the risk functional. The LLN provides *pointwise* convergence: for any fixed $f$, the empirical risk converges to the true risk. However, ERM requires *uniform* convergence over all $f \in \mathcal{H}$ simultaneously (defined below), which depends on the complexity of the hypothesis space.

$$\sup\_{f \in \mathcal{H}} |R\_{emp}(f) - R(f)| \xrightarrow{P} 0$$

Under the above condition, we have guarantees that empirical risk minimization will minimize the risk functional $R(f)$. This however, doesn't mean that Monte Carlo Estimation (law of large numbers) is out of the picture!




## Monte Carlo Estimation

## References

<a id="ref-1"></a>[ 1 ] Vladimir N. Vapnik. The Nature of Statistical Learning Theory. Second Edition. Springer, 2000.

